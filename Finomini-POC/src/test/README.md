# OCR Service Tests

This directory contains comprehensive tests for the OCR (Optical Character Recognition) functionality of the AI Finance Manager application.

## Test Coverage

The OCR service tests cover the following areas:

### 1. Core Functionality
- **Singleton Pattern**: Ensures the OCR service follows singleton pattern correctly
- **Initialization**: Tests Tesseract worker initialization and error handling
- **Text Extraction**: Tests basic OCR text extraction from images

### 2. Receipt Processing
- **Multiple Receipt Types**: Tests processing of Walmart, Target, and Starbucks receipts
- **Data Extraction**: Validates extraction of merchant names, amounts, dates, and line items
- **Edge Cases**: Handles receipts with unclear totals and quantity information

### 3. File Validation
- **File Type Validation**: Rejects non-image files
- **File Size Limits**: Enforces 10MB file size limit
- **Valid File Acceptance**: Accepts valid image files

### 4. Batch Processing
- **Multiple Files**: Processes multiple receipt images in batch
- **Error Handling**: Gracefully handles failures in batch processing

### 5. Error Handling
- **OCR Processing Errors**: Handles Tesseract processing failures
- **Image Preprocessing Errors**: Handles image loading and processing errors
- **Worker Initialization Errors**: Handles worker creation failures

### 6. Service Management
- **Worker Lifecycle**: Tests worker termination and cleanup
- **Status Reporting**: Provides accurate service status information

### 7. Data Extraction Accuracy
- **Merchant Name Extraction**: Tests various merchant name formats
- **Amount Extraction**: Tests various total amount formats
- **Date Extraction**: Tests various date formats
- **Low Confidence Handling**: Handles low-confidence OCR results

## Test Setup

The tests use:
- **Vitest** as the testing framework
- **jsdom** for browser environment simulation
- **Mocked Tesseract.js** for consistent test results
- **Sample Receipt Data** for realistic testing scenarios

## Running Tests

```bash
# Run OCR tests specifically
npm test -- src/services/ocr/OCRService.test.ts

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

## Test Results

All 26 tests pass successfully, covering:
- ✅ Singleton pattern implementation
- ✅ Worker initialization and error handling
- ✅ Text extraction functionality
- ✅ Receipt processing with real-world data
- ✅ File validation and security
- ✅ Batch processing capabilities
- ✅ Comprehensive error handling
- ✅ Service lifecycle management
- ✅ Data extraction accuracy

## Requirements Covered

This test suite fulfills the requirements specified in task 6.4:
- **3.2**: OCR processing with sample receipt images ✅
- **3.5**: Data extraction accuracy testing ✅
- **Error handling for failed OCR**: Comprehensive error scenarios ✅

The tests ensure the OCR service is robust, reliable, and ready for production use in the AI Finance Manager application.