import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Tesseract.js for testing
vi.mock('tesseract.js', () => ({
    createWorker: vi.fn(() => ({
        loadLanguage: vi.fn(),
        initialize: vi.fn(),
        setParameters: vi.fn(),
        recognize: vi.fn(),
        terminate: vi.fn(),
    })),
}));

// Mock Web Crypto API for testing
Object.defineProperty(window, 'crypto', {
    value: {
        subtle: {
            generateKey: vi.fn(),
            encrypt: vi.fn(),
            decrypt: vi.fn(),
        },
    },
});

// Mock FileReader for testing
global.FileReader = class {
    result: string | ArrayBuffer | null = null;
    error: DOMException | null = null;
    readyState: number = 0;
    onload: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null = null;
    onerror: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null = null;

    static readonly EMPTY = 0;
    static readonly LOADING = 1;
    static readonly DONE = 2;

    readAsDataURL(_file: Blob): void {
        const self = this;
        setTimeout(() => {
            self.result = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
            self.readyState = 2;
            if (self.onload) {
                self.onload.call(self as any, {} as ProgressEvent<FileReader>);
            }
        }, 0);
    }

    abort(): void { }
    readAsArrayBuffer(_file: Blob): void { }
    readAsBinaryString(_file: Blob): void { }
    readAsText(_file: Blob, _encoding?: string): void { }
} as any;

// Mock Image for testing
global.Image = class {
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    src: string = '';
    width: number = 100;
    height: number = 100;

    constructor() {
        setTimeout(() => {
            if (this.onload) {
                this.onload();
            }
        }, 0);
    }
} as any;

// Mock Canvas and CanvasRenderingContext2D
const mockCanvas = {
    width: 0,
    height: 0,
    getContext: vi.fn(() => ({
        drawImage: vi.fn(),
        getImageData: vi.fn(() => ({
            data: new Uint8ClampedArray(400), // 100x100 RGBA
            width: 100,
            height: 100,
        })),
        putImageData: vi.fn(),
    })),
    toDataURL: vi.fn(() => 'data:image/png;base64,mock-processed-image'),
};

global.HTMLCanvasElement = class {
    width: number = 0;
    height: number = 0;

    getContext() {
        return mockCanvas.getContext();
    }

    toDataURL() {
        return mockCanvas.toDataURL();
    }
} as any;

Object.defineProperty(document, 'createElement', {
    value: vi.fn((tagName: string) => {
        if (tagName === 'canvas') {
            return mockCanvas;
        }
        return {};
    }),
});