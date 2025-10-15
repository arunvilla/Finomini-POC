// OCR Service for receipt scanning using Tesseract.js

import { createWorker, Worker } from 'tesseract.js';
import { OCRService as IOCRService } from '../../types/services';

export interface OCRResult {
  text: string;
  merchant?: string;
  amount?: number;
  date?: Date;
  items?: Array<{
    name: string;
    amount: number;
    quantity?: number;
  }>;
  confidence: number;
  processing_time: number;
}

export interface ImageProcessingOptions {
  enhanceContrast?: boolean;
  removeNoise?: boolean;
  sharpen?: boolean;
  resize?: { width: number; height: number };
  grayscale?: boolean;
}

export class OCRService implements IOCRService {
  private static instance: OCRService;
  private worker: Worker | null = null;
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): OCRService {
    if (!OCRService.instance) {
      OCRService.instance = new OCRService();
    }
    return OCRService.instance;
  }

  /**
   * Initialize the Tesseract worker
   */
  async initialize(): Promise<void> {
    if (this.isInitialized && this.worker) {
      return;
    }

    try {
      console.log('Initializing Tesseract OCR worker...');
      
      this.worker = await createWorker('eng', 1, {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
          }
        }
      });

      // Configure Tesseract for better receipt recognition
      await this.worker.setParameters({
        tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.,/$-: ',
        tessedit_pageseg_mode: '6' as any, // Uniform block of text
        preserve_interword_spaces: '1',
      });

      this.isInitialized = true;
      console.log('Tesseract OCR worker initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Tesseract worker:', error);
      throw new Error('OCR initialization failed');
    }
  }

  /**
   * Terminate the Tesseract worker
   */
  async terminate(): Promise<void> {
    if (this.worker) {
      await this.worker.terminate();
      this.worker = null;
      this.isInitialized = false;
      console.log('Tesseract OCR worker terminated');
    }
  }

  /**
   * Preprocess image for better OCR accuracy
   */
  private async preprocessImage(
    imageFile: File, 
    options: ImageProcessingOptions = {}
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        try {
          // Set canvas size
          let { width, height } = img;
          
          if (options.resize) {
            width = options.resize.width;
            height = options.resize.height;
          }
          
          canvas.width = width;
          canvas.height = height;

          if (!ctx) {
            throw new Error('Could not get canvas context');
          }

          // Draw original image
          ctx.drawImage(img, 0, 0, width, height);

          // Get image data for processing
          const imageData = ctx.getImageData(0, 0, width, height);
          const data = imageData.data;

          // Apply image processing filters
          for (let i = 0; i < data.length; i += 4) {
            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];

            // Convert to grayscale if requested
            if (options.grayscale) {
              const gray = 0.299 * r + 0.587 * g + 0.114 * b;
              r = g = b = gray;
            }

            // Enhance contrast
            if (options.enhanceContrast) {
              const factor = 1.5; // Contrast factor
              r = Math.min(255, Math.max(0, (r - 128) * factor + 128));
              g = Math.min(255, Math.max(0, (g - 128) * factor + 128));
              b = Math.min(255, Math.max(0, (b - 128) * factor + 128));
            }

            // Remove noise (simple threshold)
            if (options.removeNoise) {
              const threshold = 128;
              const avg = (r + g + b) / 3;
              if (avg < threshold) {
                r = g = b = 0; // Black
              } else {
                r = g = b = 255; // White
              }
            }

            // Apply sharpening filter
            if (options.sharpen) {
              // Simple sharpening - increase contrast between adjacent pixels
              const sharpenFactor = 0.2;
              r = Math.min(255, Math.max(0, r + (r - 128) * sharpenFactor));
              g = Math.min(255, Math.max(0, g + (g - 128) * sharpenFactor));
              b = Math.min(255, Math.max(0, b + (b - 128) * sharpenFactor));
            }

            data[i] = r;
            data[i + 1] = g;
            data[i + 2] = b;
          }

          // Put processed image data back to canvas
          ctx.putImageData(imageData, 0, 0);

          // Convert to data URL
          const processedDataUrl = canvas.toDataURL('image/png');
          resolve(processedDataUrl);
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => {
        reject(new Error('Failed to load image for preprocessing'));
      };

      // Load the image
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.onerror = () => {
        reject(new Error('Failed to read image file'));
      };
      reader.readAsDataURL(imageFile);
    });
  }

  /**
   * Extract text from receipt image using OCR
   */
  async extractText(imageFile: File, options: ImageProcessingOptions = {}): Promise<{
    text: string;
    confidence: number;
    processing_time: number;
  }> {

    try {
      // Initialize worker if not already done
      await this.initialize();

      if (!this.worker) {
        throw new Error('OCR worker not initialized');
      }

      // Preprocess image for better OCR accuracy
      const processedImageUrl = await this.preprocessImage(imageFile, {
        grayscale: true,
        enhanceContrast: true,
        removeNoise: false, // Keep false for receipts to preserve text
        sharpen: true,
        ...options
      });

      // Perform OCR
      console.log('Starting OCR text extraction...');
      const { data } = await this.worker.recognize(processedImageUrl);

      console.log(`OCR completed with confidence: ${data.confidence}%`);

      return {
        text: data.text,
        confidence: data.confidence / 100, // Convert to 0-1 scale
        processing_time: 0
      };
    } catch (error) {
      console.error('OCR text extraction failed:', error);
      throw new Error(`OCR processing failed: ${(error as Error).message}`);
    }
  }

  /**
   * Parse receipt text to extract structured data
   */
  private parseReceiptData(text: string): {
    merchant?: string;
    amount?: number;
    date?: Date;
    items?: Array<{ name: string; amount: number; quantity?: number }>;
  } {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    let merchant: string | undefined;
    let amount: number | undefined;
    let date: Date | undefined;
    const items: Array<{ name: string; amount: number; quantity?: number }> = [];

    // Extract merchant (usually first few lines)
    for (let i = 0; i < Math.min(3, lines.length); i++) {
      const line = lines[i];
      // Skip lines that look like addresses or phone numbers
      if (!line.match(/^\d+/) && !line.match(/\d{3}-\d{3}-\d{4}/) && line.length > 3) {
        merchant = line;
        break;
      }
    }

    // Extract total amount (look for patterns like "Total: $XX.XX" or "TOTAL XX.XX")
    const amountPatterns = [
      /(?:total|subtotal|amount)\s*:?\s*\$?(\d+\.?\d*)/i,
      /\$(\d+\.\d{2})\s*(?:total|subtotal)?/i,
      /(\d+\.\d{2})\s*(?:total|subtotal|amount)/i
    ];

    for (const line of lines) {
      for (const pattern of amountPatterns) {
        const match = line.match(pattern);
        if (match) {
          const parsedAmount = parseFloat(match[1]);
          if (parsedAmount > 0 && (!amount || parsedAmount > amount)) {
            amount = parsedAmount;
          }
        }
      }
    }

    // Extract date (look for date patterns)
    const datePatterns = [
      /(\d{1,2}\/\d{1,2}\/\d{2,4})/,
      /(\d{1,2}-\d{1,2}-\d{2,4})/,
      /(\d{4}-\d{1,2}-\d{1,2})/,
      /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+\d{1,2},?\s+\d{2,4}/i
    ];

    for (const line of lines) {
      for (const pattern of datePatterns) {
        const match = line.match(pattern);
        if (match) {
          const parsedDate = new Date(match[0]);
          if (!isNaN(parsedDate.getTime())) {
            date = parsedDate;
            break;
          }
        }
      }
      if (date) break;
    }

    // Extract line items (look for patterns like "Item Name $X.XX" or "Qty Item $X.XX")
    const itemPatterns = [
      /^(.+?)\s+\$?(\d+\.?\d*)\s*$/,
      /^(\d+)\s+(.+?)\s+\$?(\d+\.?\d*)\s*$/,
      /^(.+?)\s+(\d+)\s*x\s*\$?(\d+\.?\d*)\s*$/
    ];

    for (const line of lines) {
      // Skip lines that look like totals, dates, or addresses
      if (line.match(/total|subtotal|tax|date|street|ave|blvd|phone/i)) {
        continue;
      }

      for (const pattern of itemPatterns) {
        const match = line.match(pattern);
        if (match) {
          let name: string;
          let itemAmount: number;
          let quantity: number | undefined;

          if (match.length === 3) {
            // Pattern: "Item Name $X.XX"
            name = match[1].trim();
            itemAmount = parseFloat(match[2]);
          } else if (match.length === 4) {
            if (line.includes('x')) {
              // Pattern: "Item Name Qty x $X.XX"
              name = match[1].trim();
              quantity = parseInt(match[2]);
              itemAmount = parseFloat(match[3]);
            } else {
              // Pattern: "Qty Item Name $X.XX"
              quantity = parseInt(match[1]);
              name = match[2].trim();
              itemAmount = parseFloat(match[3]);
            }
          } else {
            continue;
          }

          if (name.length > 1 && itemAmount > 0) {
            items.push({
              name,
              amount: itemAmount,
              quantity
            });
          }
          break;
        }
      }
    }

    return { merchant, amount, date, items };
  }

  /**
   * Process receipt image and extract structured data
   */
  async processReceipt(imageFile: File): Promise<{
    merchant?: string;
    amount?: number;
    date?: Date;
    items?: Array<{name: string, amount: number}>;
    confidence: number;
  }> {
    try {
      // Validate file type
      if (!imageFile.type.startsWith('image/')) {
        throw new Error('File must be an image');
      }

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (imageFile.size > maxSize) {
        throw new Error('Image file too large (max 10MB)');
      }

      // Extract text using OCR
      const { text, confidence } = await this.extractText(imageFile, {
        grayscale: true,
        enhanceContrast: true,
        sharpen: true
      });

      // Parse structured data from text
      const parsedData = this.parseReceiptData(text);

      const result = {
        merchant: parsedData.merchant,
        amount: parsedData.amount,
        date: parsedData.date,
        items: parsedData.items?.map(item => ({ name: item.name, amount: item.amount })),
        confidence
      };

      console.log('Receipt processing completed:', {
        merchant: result.merchant,
        amount: result.amount,
        itemCount: result.items?.length || 0,
        confidence: Math.round(confidence * 100) + '%'
      });

      return result;
    } catch (error) {
      console.error('Receipt processing failed:', error);
      throw error;
    }
  }

  /**
   * Process multiple receipt images in batch
   */
  async processReceiptBatch(imageFiles: File[]): Promise<Array<{
    merchant?: string;
    amount?: number;
    date?: Date;
    items?: Array<{name: string, amount: number}>;
    confidence: number;
  }>> {
    const results = [];
    
    for (const file of imageFiles) {
      try {
        const result = await this.processReceipt(file);
        results.push(result);
      } catch (error) {
        results.push({
          confidence: 0
        });
      }
    }
    
    return results;
  }

  /**
   * Get OCR service status
   */
  getStatus(): {
    isInitialized: boolean;
    isReady: boolean;
    workerStatus: string;
  } {
    return {
      isInitialized: this.isInitialized,
      isReady: this.isInitialized && this.worker !== null,
      workerStatus: this.worker ? 'active' : 'inactive'
    };
  }

  /**
   * Cleanup resources
   */
  async cleanup(): Promise<void> {
    await this.terminate();
  }
}

// Export singleton instance
export const ocrService = OCRService.getInstance();