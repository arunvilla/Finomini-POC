# OCR System Architecture Diagram

## High-Level Architecture

```mermaid
graph TB
    subgraph "User Interface Layer"
        UI[Receipt Upload UI]
        CAMERA[Camera Capture]
        BATCH[Batch Upload]
    end
    
    subgraph "OCR Service Layer"
        OCRS[OCR Service Singleton]
        VALIDATOR[File Validator]
        PREPROCESSOR[Image Preprocessor]
        EXTRACTOR[Text Extractor]
        PARSER[Data Parser]
    end
    
    subgraph "Core Processing Engine"
        TESSERACT[Tesseract.js Worker]
        CANVAS[Canvas API]
        FILEAPI[File API]
    end
    
    subgraph "AI Integration Layer"
        AIS[AI Service]
        CATEGORIZER[Transaction Categorizer]
        INSIGHTS[Insights Generator]
    end
    
    subgraph "Data Output"
        STRUCTURED[Structured Receipt Data]
        CONFIDENCE[Confidence Scores]
        METADATA[Processing Metadata]
    end
    
    UI --> OCRS
    CAMERA --> OCRS
    BATCH --> OCRS
    
    OCRS --> VALIDATOR
    VALIDATOR --> PREPROCESSOR
    PREPROCESSOR --> EXTRACTOR
    EXTRACTOR --> PARSER
    
    PREPROCESSOR --> CANVAS
    EXTRACTOR --> TESSERACT
    VALIDATOR --> FILEAPI
    
    PARSER --> AIS
    AIS --> CATEGORIZER
    AIS --> INSIGHTS
    
    PARSER --> STRUCTURED
    EXTRACTOR --> CONFIDENCE
    OCRS --> METADATA
    
    style OCRS fill:#e1f5fe
    style TESSERACT fill:#f3e5f5
    style AIS fill:#e8f5e8
```

## Detailed Processing Pipeline

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant OCRService
    participant ImageProcessor
    participant TesseractWorker
    participant DataParser
    participant AIService
    
    User->>UI: Upload Receipt Image
    UI->>OCRService: processReceipt(imageFile)
    
    OCRService->>OCRService: validateFile()
    Note over OCRService: Check file type, size limits
    
    OCRService->>ImageProcessor: preprocessImage()
    ImageProcessor->>ImageProcessor: Apply grayscale
    ImageProcessor->>ImageProcessor: Enhance contrast
    ImageProcessor->>ImageProcessor: Apply sharpening
    ImageProcessor-->>OCRService: processedImageURL
    
    OCRService->>TesseractWorker: recognize(processedImage)
    TesseractWorker->>TesseractWorker: OCR Processing
    TesseractWorker-->>OCRService: {text, confidence}
    
    OCRService->>DataParser: parseReceiptData(text)
    DataParser->>DataParser: Extract merchant
    DataParser->>DataParser: Extract amount
    DataParser->>DataParser: Extract date
    DataParser->>DataParser: Extract line items
    DataParser-->>OCRService: structuredData
    
    OCRService->>AIService: categorizeTransaction()
    AIService-->>OCRService: categoryData
    
    OCRService-->>UI: Complete Receipt Data
    UI-->>User: Display Results
```

## Component Interaction Flow

```mermaid
flowchart LR
    subgraph "Input Processing"
        A[Image File] --> B[File Validation]
        B --> C[Size Check < 10MB]
        C --> D[Type Check: image/*]
    end
    
    subgraph "Image Enhancement"
        D --> E[Load to Canvas]
        E --> F[Convert to Grayscale]
        F --> G[Enhance Contrast 1.5x]
        G --> H[Apply Sharpening]
        H --> I[Optional Noise Reduction]
    end
    
    subgraph "OCR Processing"
        I --> J[Tesseract Worker]
        J --> K[Character Recognition]
        K --> L[Confidence Scoring]
        L --> M[Raw Text Output]
    end
    
    subgraph "Data Extraction"
        M --> N[Merchant Pattern Matching]
        M --> O[Amount Pattern Matching]
        M --> P[Date Pattern Matching]
        M --> Q[Line Item Extraction]
    end
    
    subgraph "AI Enhancement"
        N --> R[AI Categorization]
        O --> S[Amount Validation]
        P --> T[Date Normalization]
        Q --> U[Item Classification]
    end
    
    subgraph "Output"
        R --> V[Structured Receipt Data]
        S --> V
        T --> V
        U --> V
        L --> W[Confidence Metrics]
        V --> X[Final Result]
        W --> X
    end
    
    style A fill:#ffeb3b
    style J fill:#9c27b0
    style R fill:#4caf50
    style X fill:#2196f3
```

## Data Flow Architecture

```mermaid
graph TD
    subgraph "Data Input Layer"
        IMG[Image File]
        META[File Metadata]
    end
    
    subgraph "Processing Layers"
        subgraph "Layer 1: Validation"
            VAL1[Type Validation]
            VAL2[Size Validation]
            VAL3[Content Validation]
        end
        
        subgraph "Layer 2: Preprocessing"
            PROC1[Grayscale Conversion]
            PROC2[Contrast Enhancement]
            PROC3[Sharpening Filter]
            PROC4[Noise Reduction]
        end
        
        subgraph "Layer 3: OCR Engine"
            OCR1[Tesseract Initialization]
            OCR2[Text Recognition]
            OCR3[Confidence Calculation]
        end
        
        subgraph "Layer 4: Data Parsing"
            PARSE1[Merchant Extraction]
            PARSE2[Amount Extraction]
            PARSE3[Date Extraction]
            PARSE4[Item Extraction]
        end
        
        subgraph "Layer 5: AI Enhancement"
            AI1[Category Classification]
            AI2[Data Validation]
            AI3[Confidence Boosting]
        end
    end
    
    subgraph "Data Output Layer"
        RESULT[Structured Receipt Data]
        CONF[Confidence Scores]
        TIME[Processing Metrics]
    end
    
    IMG --> VAL1
    META --> VAL2
    VAL1 --> VAL3
    VAL2 --> VAL3
    VAL3 --> PROC1
    
    PROC1 --> PROC2
    PROC2 --> PROC3
    PROC3 --> PROC4
    PROC4 --> OCR1
    
    OCR1 --> OCR2
    OCR2 --> OCR3
    OCR3 --> PARSE1
    
    PARSE1 --> PARSE2
    PARSE2 --> PARSE3
    PARSE3 --> PARSE4
    PARSE4 --> AI1
    
    AI1 --> AI2
    AI2 --> AI3
    AI3 --> RESULT
    
    OCR3 --> CONF
    OCR1 --> TIME
    
    style IMG fill:#ffcdd2
    style RESULT fill:#c8e6c9
    style OCR2 fill:#e1bee7
```

## Technology Stack Visualization

```mermaid
graph TB
    subgraph "Frontend Technologies"
        TS[TypeScript]
        REACT[React Components]
        CANVAS[HTML5 Canvas]
        FILEAPI[File API]
    end
    
    subgraph "OCR Technologies"
        TESS[Tesseract.js v4.x]
        WASM[WebAssembly Core]
        WORKER[Web Workers]
    end
    
    subgraph "Image Processing"
        IMGPROC[Canvas 2D Context]
        FILTERS[Custom Filters]
        PIXEL[Pixel Manipulation]
    end
    
    subgraph "AI Integration"
        OPENAI[OpenAI API]
        ANTHROPIC[Anthropic API]
        LOCAL[Local Processing]
    end
    
    subgraph "Testing Framework"
        VITEST[Vitest]
        MOCKS[Service Mocks]
        SAMPLES[Sample Data]
    end
    
    TS --> REACT
    REACT --> CANVAS
    REACT --> FILEAPI
    
    TESS --> WASM
    TESS --> WORKER
    
    CANVAS --> IMGPROC
    IMGPROC --> FILTERS
    FILTERS --> PIXEL
    
    OPENAI --> LOCAL
    ANTHROPIC --> LOCAL
    
    VITEST --> MOCKS
    MOCKS --> SAMPLES
    
    style TESS fill:#ff9800
    style OPENAI fill:#4caf50
    style VITEST fill:#2196f3
```

## Performance and Scalability Architecture

```mermaid
graph LR
    subgraph "Performance Optimization"
        LAZY[Lazy Initialization]
        SINGLETON[Singleton Pattern]
        CACHE[Result Caching]
        CLEANUP[Resource Cleanup]
    end
    
    subgraph "Scalability Features"
        BATCH[Batch Processing]
        QUEUE[Processing Queue]
        PARALLEL[Parallel Workers]
        THROTTLE[Rate Limiting]
    end
    
    subgraph "Memory Management"
        POOL[Worker Pool]
        GC[Garbage Collection]
        BUFFER[Buffer Management]
        DISPOSE[Resource Disposal]
    end
    
    subgraph "Error Handling"
        RETRY[Retry Logic]
        FALLBACK[Fallback Mechanisms]
        TIMEOUT[Timeout Handling]
        RECOVERY[Error Recovery]
    end
    
    LAZY --> BATCH
    SINGLETON --> QUEUE
    CACHE --> PARALLEL
    CLEANUP --> THROTTLE
    
    BATCH --> POOL
    QUEUE --> GC
    PARALLEL --> BUFFER
    THROTTLE --> DISPOSE
    
    POOL --> RETRY
    GC --> FALLBACK
    BUFFER --> TIMEOUT
    DISPOSE --> RECOVERY
    
    style LAZY fill:#e3f2fd
    style BATCH fill:#f3e5f5
    style POOL fill:#e8f5e8
    style RETRY fill:#fff3e0
```

## Future AI Enhancement Architecture

```mermaid
graph TB
    subgraph "Current Implementation"
        CURR_OCR[Tesseract.js OCR]
        CURR_PARSE[Regex Parsing]
        CURR_AI[Basic AI Integration]
    end
    
    subgraph "Planned AI Enhancements"
        subgraph "Advanced OCR"
            CUSTOM_MODEL[Custom Receipt Models]
            TFJS[TensorFlow.js]
            ONNX[ONNX.js Models]
        end
        
        subgraph "Intelligent Processing"
            ERROR_CORRECT[AI Error Correction]
            CONTEXT_AWARE[Context-Aware Parsing]
            LEARNING[Adaptive Learning]
        end
        
        subgraph "Computer Vision"
            SUPER_RES[Super Resolution]
            DENOISE[AI Denoising]
            PERSPECTIVE[Perspective Correction]
        end
    end
    
    subgraph "Integration Points"
        API_GATEWAY[AI API Gateway]
        MODEL_LOADER[Model Loader]
        FEEDBACK_LOOP[User Feedback Loop]
    end
    
    CURR_OCR --> CUSTOM_MODEL
    CURR_PARSE --> ERROR_CORRECT
    CURR_AI --> CONTEXT_AWARE
    
    CUSTOM_MODEL --> TFJS
    CUSTOM_MODEL --> ONNX
    
    ERROR_CORRECT --> LEARNING
    CONTEXT_AWARE --> LEARNING
    
    SUPER_RES --> DENOISE
    DENOISE --> PERSPECTIVE
    
    TFJS --> API_GATEWAY
    ONNX --> MODEL_LOADER
    LEARNING --> FEEDBACK_LOOP
    
    style CURR_OCR fill:#ffcdd2
    style CUSTOM_MODEL fill:#c8e6c9
    style ERROR_CORRECT fill:#bbdefb
    style SUPER_RES fill:#f8bbd9
```

## Security and Privacy Architecture

```mermaid
graph TD
    subgraph "Privacy Protection"
        CLIENT_SIDE[Client-Side Processing]
        NO_UPLOAD[No Server Upload]
        LOCAL_STORAGE[Local Data Storage]
        MEMORY_CLEAR[Memory Cleanup]
    end
    
    subgraph "Input Security"
        FILE_VALIDATION[File Type Validation]
        SIZE_LIMITS[Size Limit Enforcement]
        CONTENT_CHECK[Content Verification]
        SANITIZATION[Input Sanitization]
    end
    
    subgraph "Processing Security"
        SANDBOXED[Sandboxed Workers]
        ERROR_BOUNDARIES[Error Boundaries]
        TIMEOUT_PROTECTION[Timeout Protection]
        RESOURCE_LIMITS[Resource Limits]
    end
    
    subgraph "Data Security"
        ENCRYPTION[Data Encryption]
        SECURE_DISPOSAL[Secure Data Disposal]
        ACCESS_CONTROL[Access Control]
        AUDIT_LOGGING[Audit Logging]
    end
    
    CLIENT_SIDE --> FILE_VALIDATION
    NO_UPLOAD --> SIZE_LIMITS
    LOCAL_STORAGE --> CONTENT_CHECK
    MEMORY_CLEAR --> SANITIZATION
    
    FILE_VALIDATION --> SANDBOXED
    SIZE_LIMITS --> ERROR_BOUNDARIES
    CONTENT_CHECK --> TIMEOUT_PROTECTION
    SANITIZATION --> RESOURCE_LIMITS
    
    SANDBOXED --> ENCRYPTION
    ERROR_BOUNDARIES --> SECURE_DISPOSAL
    TIMEOUT_PROTECTION --> ACCESS_CONTROL
    RESOURCE_LIMITS --> AUDIT_LOGGING
    
    style CLIENT_SIDE fill:#e8f5e8
    style FILE_VALIDATION fill:#fff3e0
    style SANDBOXED fill:#e3f2fd
    style ENCRYPTION fill:#fce4ec
```

## Testing Architecture

```mermaid
graph LR
    subgraph "Test Categories"
        UNIT[Unit Tests]
        INTEGRATION[Integration Tests]
        E2E[End-to-End Tests]
        PERFORMANCE[Performance Tests]
    end
    
    subgraph "Test Data"
        SAMPLES[Sample Receipts]
        MOCK_IMAGES[Mock Images]
        EDGE_CASES[Edge Case Data]
        REAL_DATA[Real Receipt Data]
    end
    
    subgraph "Test Tools"
        VITEST[Vitest Framework]
        MOCKS[Service Mocks]
        FIXTURES[Test Fixtures]
        ASSERTIONS[Custom Assertions]
    end
    
    subgraph "Coverage Areas"
        OCR_ACCURACY[OCR Accuracy]
        DATA_EXTRACTION[Data Extraction]
        ERROR_HANDLING[Error Handling]
        PERFORMANCE_METRICS[Performance Metrics]
    end
    
    UNIT --> SAMPLES
    INTEGRATION --> MOCK_IMAGES
    E2E --> EDGE_CASES
    PERFORMANCE --> REAL_DATA
    
    SAMPLES --> VITEST
    MOCK_IMAGES --> MOCKS
    EDGE_CASES --> FIXTURES
    REAL_DATA --> ASSERTIONS
    
    VITEST --> OCR_ACCURACY
    MOCKS --> DATA_EXTRACTION
    FIXTURES --> ERROR_HANDLING
    ASSERTIONS --> PERFORMANCE_METRICS
    
    style UNIT fill:#e1f5fe
    style SAMPLES fill:#f3e5f5
    style VITEST fill:#e8f5e8
    style OCR_ACCURACY fill:#fff8e1
```

This architecture documentation provides a comprehensive visual representation of the OCR system's structure, data flow, and future enhancement possibilities. The diagrams illustrate how the system maintains privacy through client-side processing while providing robust OCR capabilities with AI integration potential.