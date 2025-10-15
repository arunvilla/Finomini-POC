// Image processing utilities for OCR enhancement

export interface ImageProcessingResult {
  processedImageUrl: string;
  originalSize: { width: number; height: number };
  processedSize: { width: number; height: number };
  processingTime: number;
}

export interface ImageEnhancementOptions {
  brightness?: number; // -100 to 100
  contrast?: number; // -100 to 100
  saturation?: number; // -100 to 100
  gamma?: number; // 0.1 to 3.0
  blur?: number; // 0 to 10
  sharpen?: number; // 0 to 10
  denoise?: boolean;
  autoLevel?: boolean;
}

export class ImageProcessor {
  /**
   * Validate image file
   */
  static validateImageFile(file: File): { isValid: boolean; error?: string } {
    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/bmp'];
    if (!validTypes.includes(file.type)) {
      return {
        isValid: false,
        error: 'Invalid file type. Please use JPEG, PNG, WebP, or BMP images.'
      };
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return {
        isValid: false,
        error: 'File too large. Maximum size is 10MB.'
      };
    }

    // Check minimum dimensions (at least 100x100)
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        if (img.width < 100 || img.height < 100) {
          resolve({
            isValid: false,
            error: 'Image too small. Minimum size is 100x100 pixels.'
          });
        } else {
          resolve({ isValid: true });
        }
      };
      img.onerror = () => {
        resolve({
          isValid: false,
          error: 'Invalid or corrupted image file.'
        });
      };
      img.src = URL.createObjectURL(file);
    }) as any;
  }

  /**
   * Get image dimensions
   */
  static getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Resize image while maintaining aspect ratio
   */
  static resizeImage(
    imageFile: File,
    maxWidth: number,
    maxHeight: number,
    quality: number = 0.9
  ): Promise<{ file: File; dimensions: { width: number; height: number } }> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        try {
          // Calculate new dimensions
          let { width, height } = img;
          
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

          canvas.width = width;
          canvas.height = height;

          if (!ctx) {
            throw new Error('Could not get canvas context');
          }

          // Draw resized image
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to blob
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Failed to create resized image'));
                return;
              }

              const resizedFile = new File([blob], imageFile.name, {
                type: imageFile.type,
                lastModified: Date.now()
              });

              resolve({
                file: resizedFile,
                dimensions: { width, height }
              });
            },
            imageFile.type,
            quality
          );
        } catch (error) {
          reject(error);
        } finally {
          URL.revokeObjectURL(img.src);
        }
      };

      img.onerror = () => {
        reject(new Error('Failed to load image for resizing'));
      };

      img.src = URL.createObjectURL(imageFile);
    });
  }

  /**
   * Apply advanced image enhancements
   */
  static enhanceImage(
    imageFile: File,
    options: ImageEnhancementOptions = {}
  ): Promise<ImageProcessingResult> {
    const startTime = Date.now();

    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        try {
          const originalSize = { width: img.width, height: img.height };
          
          canvas.width = img.width;
          canvas.height = img.height;

          if (!ctx) {
            throw new Error('Could not get canvas context');
          }

          // Apply CSS filters for basic adjustments
          let filters: string[] = [];
          
          if (options.brightness !== undefined) {
            filters.push(`brightness(${100 + options.brightness}%)`);
          }
          
          if (options.contrast !== undefined) {
            filters.push(`contrast(${100 + options.contrast}%)`);
          }
          
          if (options.saturation !== undefined) {
            filters.push(`saturate(${100 + options.saturation}%)`);
          }
          
          if (options.blur !== undefined && options.blur > 0) {
            filters.push(`blur(${options.blur}px)`);
          }

          ctx.filter = filters.join(' ');
          ctx.drawImage(img, 0, 0);

          // Apply pixel-level processing
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          // Apply gamma correction
          if (options.gamma && options.gamma !== 1.0) {
            const gammaCorrection = 1.0 / options.gamma;
            for (let i = 0; i < data.length; i += 4) {
              data[i] = Math.pow(data[i] / 255, gammaCorrection) * 255;     // Red
              data[i + 1] = Math.pow(data[i + 1] / 255, gammaCorrection) * 255; // Green
              data[i + 2] = Math.pow(data[i + 2] / 255, gammaCorrection) * 255; // Blue
            }
          }

          // Apply sharpening
          if (options.sharpen && options.sharpen > 0) {
            const sharpenKernel = [
              0, -1, 0,
              -1, 5, -1,
              0, -1, 0
            ];
            this.applyConvolutionFilter(data, canvas.width, canvas.height, sharpenKernel, options.sharpen / 10);
          }

          // Apply denoising (simple median filter)
          if (options.denoise) {
            this.applyMedianFilter(data, canvas.width, canvas.height);
          }

          // Apply auto-level adjustment
          if (options.autoLevel) {
            this.applyAutoLevel(data);
          }

          // Put processed data back
          ctx.putImageData(imageData, 0, 0);

          const processedImageUrl = canvas.toDataURL('image/png');
          const processingTime = Date.now() - startTime;

          resolve({
            processedImageUrl,
            originalSize,
            processedSize: { width: canvas.width, height: canvas.height },
            processingTime
          });
        } catch (error) {
          reject(error);
        } finally {
          URL.revokeObjectURL(img.src);
        }
      };

      img.onerror = () => {
        reject(new Error('Failed to load image for enhancement'));
      };

      img.src = URL.createObjectURL(imageFile);
    });
  }

  /**
   * Apply convolution filter (for sharpening, edge detection, etc.)
   */
  private static applyConvolutionFilter(
    data: Uint8ClampedArray,
    width: number,
    height: number,
    kernel: number[],
    intensity: number = 1.0
  ): void {
    const kernelSize = Math.sqrt(kernel.length);
    const half = Math.floor(kernelSize / 2);
    const output = new Uint8ClampedArray(data.length);

    for (let y = half; y < height - half; y++) {
      for (let x = half; x < width - half; x++) {
        let r = 0, g = 0, b = 0;

        for (let ky = 0; ky < kernelSize; ky++) {
          for (let kx = 0; kx < kernelSize; kx++) {
            const px = x + kx - half;
            const py = y + ky - half;
            const idx = (py * width + px) * 4;
            const weight = kernel[ky * kernelSize + kx];

            r += data[idx] * weight;
            g += data[idx + 1] * weight;
            b += data[idx + 2] * weight;
          }
        }

        const idx = (y * width + x) * 4;
        output[idx] = Math.max(0, Math.min(255, data[idx] + (r - data[idx]) * intensity));
        output[idx + 1] = Math.max(0, Math.min(255, data[idx + 1] + (g - data[idx + 1]) * intensity));
        output[idx + 2] = Math.max(0, Math.min(255, data[idx + 2] + (b - data[idx + 2]) * intensity));
        output[idx + 3] = data[idx + 3]; // Alpha
      }
    }

    // Copy processed data back
    for (let i = 0; i < data.length; i++) {
      data[i] = output[i];
    }
  }

  /**
   * Apply median filter for noise reduction
   */
  private static applyMedianFilter(
    data: Uint8ClampedArray,
    width: number,
    height: number,
    radius: number = 1
  ): void {
    const output = new Uint8ClampedArray(data.length);

    for (let y = radius; y < height - radius; y++) {
      for (let x = radius; x < width - radius; x++) {
        const rValues: number[] = [];
        const gValues: number[] = [];
        const bValues: number[] = [];

        // Collect neighboring pixel values
        for (let dy = -radius; dy <= radius; dy++) {
          for (let dx = -radius; dx <= radius; dx++) {
            const idx = ((y + dy) * width + (x + dx)) * 4;
            rValues.push(data[idx]);
            gValues.push(data[idx + 1]);
            bValues.push(data[idx + 2]);
          }
        }

        // Sort and get median
        rValues.sort((a, b) => a - b);
        gValues.sort((a, b) => a - b);
        bValues.sort((a, b) => a - b);

        const medianIdx = Math.floor(rValues.length / 2);
        const idx = (y * width + x) * 4;

        output[idx] = rValues[medianIdx];
        output[idx + 1] = gValues[medianIdx];
        output[idx + 2] = bValues[medianIdx];
        output[idx + 3] = data[idx + 3]; // Alpha
      }
    }

    // Copy processed data back
    for (let i = 0; i < data.length; i++) {
      data[i] = output[i];
    }
  }

  /**
   * Apply auto-level adjustment to improve contrast
   */
  private static applyAutoLevel(data: Uint8ClampedArray): void {
    // Find min and max values for each channel
    let minR = 255, maxR = 0;
    let minG = 255, maxG = 0;
    let minB = 255, maxB = 0;

    for (let i = 0; i < data.length; i += 4) {
      minR = Math.min(minR, data[i]);
      maxR = Math.max(maxR, data[i]);
      minG = Math.min(minG, data[i + 1]);
      maxG = Math.max(maxG, data[i + 1]);
      minB = Math.min(minB, data[i + 2]);
      maxB = Math.max(maxB, data[i + 2]);
    }

    // Calculate scaling factors
    const scaleR = 255 / (maxR - minR);
    const scaleG = 255 / (maxG - minG);
    const scaleB = 255 / (maxB - minB);

    // Apply auto-level adjustment
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.max(0, Math.min(255, (data[i] - minR) * scaleR));
      data[i + 1] = Math.max(0, Math.min(255, (data[i + 1] - minG) * scaleG));
      data[i + 2] = Math.max(0, Math.min(255, (data[i + 2] - minB) * scaleB));
    }
  }

  /**
   * Convert image to grayscale optimized for OCR
   */
  static convertToGrayscale(imageFile: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        try {
          canvas.width = img.width;
          canvas.height = img.height;

          if (!ctx) {
            throw new Error('Could not get canvas context');
          }

          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          // Convert to grayscale using luminance formula
          for (let i = 0; i < data.length; i += 4) {
            const gray = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
            data[i] = gray;     // Red
            data[i + 1] = gray; // Green
            data[i + 2] = gray; // Blue
            // Alpha channel remains unchanged
          }

          ctx.putImageData(imageData, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        } catch (error) {
          reject(error);
        } finally {
          URL.revokeObjectURL(img.src);
        }
      };

      img.onerror = () => {
        reject(new Error('Failed to load image for grayscale conversion'));
      };

      img.src = URL.createObjectURL(imageFile);
    });
  }
}