// Receipt image management service

export interface ReceiptImage {
  id: string;
  transactionId: string;
  originalUrl: string;
  compressedUrl: string;
  thumbnailUrl: string;
  fileName: string;
  fileSize: number;
  compressedSize: number;
  mimeType: string;
  uploadDate: Date;
  metadata?: {
    width: number;
    height: number;
    ocrConfidence?: number;
    processingTime?: number;
  };
}

export interface ImageCompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'jpeg' | 'webp' | 'png';
  thumbnailSize?: number;
}

export class ReceiptImageService {
  private static instance: ReceiptImageService;
  private readonly STORAGE_KEY = 'ai_finance_receipt_images';
  private readonly DEFAULT_COMPRESSION: ImageCompressionOptions = {
    maxWidth: 1200,
    maxHeight: 1600,
    quality: 0.8,
    format: 'jpeg',
    thumbnailSize: 200
  };

  private constructor() {}

  public static getInstance(): ReceiptImageService {
    if (!ReceiptImageService.instance) {
      ReceiptImageService.instance = new ReceiptImageService();
    }
    return ReceiptImageService.instance;
  }

  /**
   * Compress image for storage efficiency
   */
  async compressImage(
    file: File, 
    options: ImageCompressionOptions = {}
  ): Promise<{
    compressed: Blob;
    thumbnail: Blob;
    metadata: { width: number; height: number };
  }> {
    const opts = { ...this.DEFAULT_COMPRESSION, ...options };
    
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        try {
          const { width: originalWidth, height: originalHeight } = img;
          
          // Calculate compressed dimensions
          let { width, height } = this.calculateDimensions(
            originalWidth, 
            originalHeight, 
            opts.maxWidth!, 
            opts.maxHeight!
          );

          // Create compressed image
          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (compressedBlob) => {
              if (!compressedBlob) {
                reject(new Error('Failed to compress image'));
                return;
              }

              // Create thumbnail
              const thumbSize = opts.thumbnailSize!;
              const thumbDimensions = this.calculateDimensions(
                originalWidth, 
                originalHeight, 
                thumbSize, 
                thumbSize
              );

              canvas.width = thumbDimensions.width;
              canvas.height = thumbDimensions.height;
              ctx?.drawImage(img, 0, 0, thumbDimensions.width, thumbDimensions.height);

              canvas.toBlob(
                (thumbnailBlob) => {
                  if (!thumbnailBlob) {
                    reject(new Error('Failed to create thumbnail'));
                    return;
                  }

                  resolve({
                    compressed: compressedBlob,
                    thumbnail: thumbnailBlob,
                    metadata: { width, height }
                  });
                },
                `image/${opts.format}`,
                opts.quality
              );
            },
            `image/${opts.format}`,
            opts.quality
          );
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }  /**

   * Calculate optimal dimensions while maintaining aspect ratio
   */
  private calculateDimensions(
    originalWidth: number,
    originalHeight: number,
    maxWidth: number,
    maxHeight: number
  ): { width: number; height: number } {
    let { width, height } = { width: originalWidth, height: originalHeight };

    if (width > maxWidth || height > maxHeight) {
      const aspectRatio = width / height;

      if (width > height) {
        width = maxWidth;
        height = width / aspectRatio;
      } else {
        height = maxHeight;
        width = height * aspectRatio;
      }
    }

    return { width: Math.round(width), height: Math.round(height) };
  }

  /**
   * Store receipt image with compression
   */
  async storeReceiptImage(
    file: File,
    transactionId: string,
    options?: ImageCompressionOptions
  ): Promise<ReceiptImage> {
    try {
      // Compress image
      const { compressed, thumbnail, metadata } = await this.compressImage(file, options);

      // Create data URLs for storage
      const originalUrl = URL.createObjectURL(file);
      const compressedUrl = URL.createObjectURL(compressed);
      const thumbnailUrl = URL.createObjectURL(thumbnail);

      // Create receipt image record
      const receiptImage: ReceiptImage = {
        id: crypto.randomUUID(),
        transactionId,
        originalUrl,
        compressedUrl,
        thumbnailUrl,
        fileName: file.name,
        fileSize: file.size,
        compressedSize: compressed.size,
        mimeType: file.type,
        uploadDate: new Date(),
        metadata
      };

      // Store in localStorage
      await this.saveReceiptImage(receiptImage);

      return receiptImage;
    } catch (error) {
      console.error('Failed to store receipt image:', error);
      throw new Error(`Failed to store receipt image: ${(error as Error).message}`);
    }
  }

  /**
   * Save receipt image to storage
   */
  private async saveReceiptImage(receiptImage: ReceiptImage): Promise<void> {
    try {
      const existingImages = await this.getAllReceiptImages();
      const updatedImages = [...existingImages, receiptImage];
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedImages));
    } catch (error) {
      throw new Error('Failed to save receipt image to storage');
    }
  }

  /**
   * Get all receipt images
   */
  async getAllReceiptImages(): Promise<ReceiptImage[]> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];
      
      const images = JSON.parse(stored) as ReceiptImage[];
      return images.map(img => ({
        ...img,
        uploadDate: new Date(img.uploadDate)
      }));
    } catch (error) {
      console.error('Failed to load receipt images:', error);
      return [];
    }
  }

  /**
   * Get receipt images for a specific transaction
   */
  async getReceiptImagesForTransaction(transactionId: string): Promise<ReceiptImage[]> {
    const allImages = await this.getAllReceiptImages();
    return allImages.filter(img => img.transactionId === transactionId);
  }

  /**
   * Get receipt image by ID
   */
  async getReceiptImageById(id: string): Promise<ReceiptImage | null> {
    const allImages = await this.getAllReceiptImages();
    return allImages.find(img => img.id === id) || null;
  }

  /**
   * Delete receipt image
   */
  async deleteReceiptImage(id: string): Promise<void> {
    try {
      const allImages = await this.getAllReceiptImages();
      const imageToDelete = allImages.find(img => img.id === id);
      
      if (imageToDelete) {
        // Revoke object URLs to free memory
        URL.revokeObjectURL(imageToDelete.originalUrl);
        URL.revokeObjectURL(imageToDelete.compressedUrl);
        URL.revokeObjectURL(imageToDelete.thumbnailUrl);
      }
      
      const updatedImages = allImages.filter(img => img.id !== id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedImages));
    } catch (error) {
      throw new Error('Failed to delete receipt image');
    }
  }

  /**
   * Delete all receipt images for a transaction
   */
  async deleteReceiptImagesForTransaction(transactionId: string): Promise<void> {
    const imagesToDelete = await this.getReceiptImagesForTransaction(transactionId);
    
    for (const image of imagesToDelete) {
      await this.deleteReceiptImage(image.id);
    }
  }

  /**
   * Get storage usage statistics
   */
  async getStorageStats(): Promise<{
    totalImages: number;
    totalSize: number;
    compressedSize: number;
    compressionRatio: number;
  }> {
    const allImages = await this.getAllReceiptImages();
    
    const totalSize = allImages.reduce((sum, img) => sum + img.fileSize, 0);
    const compressedSize = allImages.reduce((sum, img) => sum + img.compressedSize, 0);
    
    return {
      totalImages: allImages.length,
      totalSize,
      compressedSize,
      compressionRatio: totalSize > 0 ? (totalSize - compressedSize) / totalSize : 0
    };
  }

  /**
   * Cleanup orphaned images (images without associated transactions)
   */
  async cleanupOrphanedImages(existingTransactionIds: string[]): Promise<number> {
    const allImages = await this.getAllReceiptImages();
    const orphanedImages = allImages.filter(
      img => !existingTransactionIds.includes(img.transactionId)
    );
    
    for (const image of orphanedImages) {
      await this.deleteReceiptImage(image.id);
    }
    
    return orphanedImages.length;
  }

  /**
   * Export receipt image as base64
   */
  async exportImageAsBase64(id: string, useCompressed: boolean = true): Promise<string | null> {
    const image = await this.getReceiptImageById(id);
    if (!image) return null;
    
    const url = useCompressed ? image.compressedUrl : image.originalUrl;
    
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const base64 = canvas.toDataURL('image/jpeg', 0.8);
        resolve(base64);
      };
      img.onerror = () => resolve(null);
      img.src = url;
    });
  }
}

// Export singleton instance
export const receiptImageService = ReceiptImageService.getInstance();