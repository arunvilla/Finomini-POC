// OCR service implementation for receipt scanning
// This is a placeholder implementation - will be completed in task 6

import type { OCRService as IOCRService } from '../../types/services';

class OCRService implements IOCRService {
  async processReceipt(imageFile: File): Promise<{
    merchant?: string;
    amount?: number;
    date?: Date;
    items?: Array<{name: string, amount: number}>;
    confidence: number;
  }> {
    // TODO: Implement Tesseract.js OCR processing in task 6
    console.log('OCR receipt processing - to be implemented in task 6');
    
    // Placeholder response
    return {
      merchant: 'Sample Merchant',
      amount: 25.99,
      date: new Date(),
      items: [
        { name: 'Sample Item 1', amount: 15.99 },
        { name: 'Sample Item 2', amount: 10.00 }
      ],
      confidence: 0.5
    };
  }
}

// Export singleton instance
export const ocrService = new OCRService();
export default OCRService;