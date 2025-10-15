import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { plaidService } from './PlaidService';
import { storageService } from '../storage/StorageService';
import { ErrorType } from '../../types/services';

// Mock the storage service
vi.mock('../storage/StorageService', () => ({
    storageService: {
        getSecureData: vi.fn(),
        saveSecureData: vi.fn(),
    },
}));

// Mock environment variables
vi.mock('../../utils', () => ({
    generateId: vi.fn(() => `test-id-${Date.now()}`),
}));

describe('PlaidService Integration Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Reset service state
        plaidService['isInitialized'] = false;
        plaidService['linkToken'] = null;
        plaidService['connectedTokens'].clear();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('Plaid Link Connection Flow', () => {
        it('should initialize Plaid Link successfully', async () => {
            // Mock successful initialization
            vi.spyOn(plaidService as any, 'createLinkToken').mockResolvedValue('test-link-token');

            await plaidService.initializePlaid();

            expect(plaidService['isInitialized']).toBe(true);
            expect(plaidService['linkToken']).toBe('test-link-token');
        });

        it('should handle initialization failure', async () => {
            // Mock failed initialization
            vi.spyOn(plaidService as any, 'createLinkToken').mockRejectedValue(new Error('Network error'));

            await expect(plaidService.initializePlaid()).rejects.toMatchObject({
                type: ErrorType.PLAID_CONNECTION,
                message: 'Failed to initialize Plaid Link. Please check your configuration.',
            });
        });

        it('should return Plaid Link configuration after initialization', async () => {
            // Initialize first
            vi.spyOn(plaidService as any, 'createLinkToken').mockResolvedValue('test-link-token');
            await plaidService.initializePlaid();

            const config = plaidService.getPlaidLinkConfig();

            expect(config).toMatchObject({
                token: 'test-link-token',
                env: 'sandbox',
                product: ['transactions', 'accounts', 'investments'],
                countryCodes: ['US'],
            });
            expect(typeof config.onSuccess).toBe('function');
            expect(typeof config.onExit).toBe('function');
            expect(typeof config.onEvent).toBe('function');
        });

        it('should throw error when getting config before initialization', () => {
            expect(() => plaidService.getPlaidLinkConfig()).toThrow();
        });

        it('should handle successful link connection', async () => {
            // Mock storage operations
            (storageService.saveSecureData as any).mockResolvedValue(undefined);

            // Mock token exchange
            vi.spyOn(plaidService as any, 'exchangePublicToken').mockResolvedValue('test-access-token');

            const mockMetadata = {
                link_session_id: 'test-session-id',
                institution: {
                    institution_id: 'test-institution-id',
                    name: 'Test Bank',
                },
                accounts: [],
            };

            // Call the success handler directly
            await plaidService['handleLinkSuccess']('test-public-token', mockMetadata);

            expect(plaidService.getConnectedTokens()).toContain('test-access-token');
            expect(storageService.saveSecureData).toHaveBeenCalledWith('plaid_tokens', expect.any(Array));
        });

        it('should handle link connection failure', async () => {
            // Mock failed token exchange
            vi.spyOn(plaidService as any, 'exchangePublicToken').mockRejectedValue(new Error('Exchange failed'));

            const mockMetadata = {
                link_session_id: 'test-session-id',
                institution: {
                    institution_id: 'test-institution-id',
                    name: 'Test Bank',
                },
                accounts: [],
            };

            await expect(
                plaidService['handleLinkSuccess']('test-public-token', mockMetadata)
            ).rejects.toMatchObject({
                type: ErrorType.PLAID_CONNECTION,
                message: 'Failed to complete account connection',
            });
        });
    });

    describe('Transaction Syncing with Mock Data', () => {
        const mockAccessToken = 'test-access-token';

        beforeEach(() => {
            // Set up connected token
            plaidService['connectedTokens'].set(mockAccessToken, {
                access_token: mockAccessToken,
                item_id: 'test-item-id',
                institution_name: 'Test Bank',
                created_at: new Date(),
            });
        });

        it('should sync transactions successfully', async () => {
            // Mock successful transaction fetch
            const mockPlaidTransactions = [
                {
                    transaction_id: 'plaid_tx_1',
                    account_id: 'plaid_acc_1',
                    amount: 25.50,
                    date: '2024-01-15',
                    name: 'Coffee Shop',
                    merchant_name: 'Local Coffee',
                    category: 'Food and Drink',
                    subcategory: 'Restaurants',
                },
                {
                    transaction_id: 'plaid_tx_2',
                    account_id: 'plaid_acc_1',
                    amount: 150.00,
                    date: '2024-01-14',
                    name: 'Grocery Store',
                    merchant_name: 'SuperMart',
                    category: 'Shops',
                    subcategory: 'Groceries',
                },
            ];

            vi.spyOn(plaidService as any, 'fetchPlaidTransactions').mockResolvedValue(mockPlaidTransactions);
            (storageService.saveSecureData as any).mockResolvedValue(undefined);

            const transactions = await plaidService.syncTransactions(mockAccessToken);

            expect(transactions).toHaveLength(2);
            expect(transactions[0]).toMatchObject({
                amount: 25.50,
                description: 'Coffee Shop',
                category: 'Food and Drink',
                is_manual: false,
                plaid_transaction_id: 'plaid_tx_1',
            });
            expect(transactions[1]).toMatchObject({
                amount: 150.00,
                description: 'Grocery Store',
                category: 'Shops',
                is_manual: false,
                plaid_transaction_id: 'plaid_tx_2',
            });
        });

        it('should handle invalid access token', async () => {
            await expect(plaidService.syncTransactions('invalid-token')).rejects.toMatchObject({
                type: ErrorType.PLAID_CONNECTION,
                message: 'Invalid access token. Please reconnect your account.',
            });
        });

        it('should filter out invalid transactions', async () => {
            // Mock transactions with some invalid data
            const mockPlaidTransactions = [
                {
                    transaction_id: 'plaid_tx_1',
                    account_id: 'plaid_acc_1',
                    amount: 25.50,
                    date: '2024-01-15',
                    name: 'Valid Transaction',
                    category: 'Food and Drink',
                },
                {
                    transaction_id: 'plaid_tx_2',
                    account_id: 'plaid_acc_1',
                    // Missing required fields - should be filtered out
                    date: '2024-01-14',
                },
            ];

            vi.spyOn(plaidService as any, 'fetchPlaidTransactions').mockResolvedValue(mockPlaidTransactions);
            (storageService.saveSecureData as any).mockResolvedValue(undefined);

            const transactions = await plaidService.syncTransactions(mockAccessToken);

            // Should only return valid transactions
            expect(transactions).toHaveLength(1);
            expect(transactions[0].description).toBe('Valid Transaction');
        });

        it('should update last sync time after successful sync', async () => {
            const mockPlaidTransactions = [{
                transaction_id: 'plaid_tx_1',
                account_id: 'plaid_acc_1',
                amount: 25.50,
                date: '2024-01-15',
                name: 'Test Transaction',
                category: 'Food and Drink',
            }];

            vi.spyOn(plaidService as any, 'fetchPlaidTransactions').mockResolvedValue(mockPlaidTransactions);
            (storageService.saveSecureData as any).mockResolvedValue(undefined);

            const beforeSync = new Date();
            await plaidService.syncTransactions(mockAccessToken);

            const tokenData = plaidService.getTokenInfo(mockAccessToken);
            expect(tokenData?.last_synced).toBeDefined();
            expect(tokenData?.last_synced!.getTime()).toBeGreaterThanOrEqual(beforeSync.getTime());
        });

        it('should sync accounts successfully', async () => {
            const mockPlaidAccounts = [
                {
                    account_id: 'plaid_acc_1',
                    name: 'Primary Checking',
                    type: 'depository',
                    subtype: 'checking',
                    balances: {
                        available: 2500.50,
                        current: 2500.50,
                    },
                    institution_name: 'Test Bank',
                },
                {
                    account_id: 'plaid_acc_2',
                    name: 'Savings Account',
                    type: 'depository',
                    subtype: 'savings',
                    balances: {
                        available: 15000.00,
                        current: 15000.00,
                    },
                    institution_name: 'Test Bank',
                },
            ];

            vi.spyOn(plaidService as any, 'fetchPlaidAccounts').mockResolvedValue(mockPlaidAccounts);

            const accounts = await plaidService.getAccounts(mockAccessToken);

            expect(accounts).toHaveLength(2);
            expect(accounts[0]).toMatchObject({
                name: 'Primary Checking',
                type: 'checking',
                balance: 2500.50,
                institution_name: 'Test Bank',
                plaid_account_id: 'plaid_acc_1',
            });
            expect(accounts[1]).toMatchObject({
                name: 'Savings Account',
                type: 'savings',
                balance: 15000.00,
                institution_name: 'Test Bank',
                plaid_account_id: 'plaid_acc_2',
            });
        });

        it('should sync investments successfully', async () => {
            const mockPlaidInvestments = [
                {
                    account_id: 'plaid_acc_investment',
                    security_id: 'sec_aapl',
                    name: 'Apple Inc.',
                    ticker_symbol: 'AAPL',
                    quantity: 10,
                    price: 150.25,
                    value: 1502.50,
                    type: 'equity',
                },
                {
                    account_id: 'plaid_acc_investment',
                    security_id: 'sec_spy',
                    name: 'SPDR S&P 500 ETF Trust',
                    ticker_symbol: 'SPY',
                    quantity: 5,
                    price: 420.80,
                    value: 2104.00,
                    type: 'etf',
                },
            ];

            vi.spyOn(plaidService as any, 'fetchPlaidInvestments').mockResolvedValue(mockPlaidInvestments);

            const investments = await plaidService.getInvestments(mockAccessToken);

            expect(investments).toHaveLength(2);
            expect(investments[0]).toMatchObject({
                security_name: 'Apple Inc.',
                ticker_symbol: 'AAPL',
                quantity: 10,
                price: 150.25,
                value: 1502.50,
                type: 'stock',
            });
            expect(investments[1]).toMatchObject({
                security_name: 'SPDR S&P 500 ETF Trust',
                ticker_symbol: 'SPY',
                quantity: 5,
                price: 420.80,
                value: 2104.00,
                type: 'etf',
            });
        });
    });

    describe('Error Handling and Retry Logic', () => {
        const mockAccessToken = 'test-access-token';

        beforeEach(() => {
            // Set up connected token
            plaidService['connectedTokens'].set(mockAccessToken, {
                access_token: mockAccessToken,
                item_id: 'test-item-id',
                institution_name: 'Test Bank',
                created_at: new Date(),
            });
        });

        it('should retry failed operations with exponential backoff', async () => {
            let attemptCount = 0;
            const mockFetchTransactions = vi.fn().mockImplementation(() => {
                attemptCount++;
                if (attemptCount < 3) {
                    return Promise.reject(new Error('Network error'));
                }
                return Promise.resolve([{
                    transaction_id: 'plaid_tx_1',
                    account_id: 'plaid_acc_1',
                    amount: 25.50,
                    date: '2024-01-15',
                    name: 'Test Transaction',
                    category: 'Food and Drink',
                }]);
            });

            vi.spyOn(plaidService as any, 'fetchPlaidTransactions').mockImplementation(mockFetchTransactions);
            (storageService.saveSecureData as any).mockResolvedValue(undefined);

            const startTime = Date.now();
            const transactions = await plaidService.syncTransactions(mockAccessToken);
            const endTime = Date.now();

            // Should succeed after retries
            expect(transactions).toHaveLength(1);
            expect(attemptCount).toBe(3);

            // Should have taken some time due to backoff delays
            expect(endTime - startTime).toBeGreaterThan(1000); // At least 1 second for retries
        });

        it('should fail after maximum retry attempts', async () => {
            const mockFetchTransactions = vi.fn().mockRejectedValue(new Error('Persistent network error'));
            vi.spyOn(plaidService as any, 'fetchPlaidTransactions').mockImplementation(mockFetchTransactions);

            await expect(plaidService.syncTransactions(mockAccessToken)).rejects.toMatchObject({
                type: ErrorType.PLAID_CONNECTION,
                message: 'Failed to sync transactions from your bank',
            });

            // Should have attempted the maximum number of retries
            expect(mockFetchTransactions).toHaveBeenCalledTimes(4); // Initial attempt + 3 retries
        });

        it('should handle Plaid API errors gracefully', async () => {
            const plaidError = new Error('INVALID_ACCESS_TOKEN');
            vi.spyOn(plaidService as any, 'fetchPlaidTransactions').mockRejectedValue(plaidError);

            await expect(plaidService.syncTransactions(mockAccessToken)).rejects.toMatchObject({
                type: ErrorType.PLAID_CONNECTION,
                message: 'Failed to sync transactions from your bank',
                details: plaidError,
            });
        });

        it('should handle storage errors during token save', async () => {
            const mockPlaidTransactions = [{
                transaction_id: 'plaid_tx_1',
                account_id: 'plaid_acc_1',
                amount: 25.50,
                date: '2024-01-15',
                name: 'Test Transaction',
                category: 'Food and Drink',
            }];

            vi.spyOn(plaidService as any, 'fetchPlaidTransactions').mockResolvedValue(mockPlaidTransactions);
            (storageService.saveSecureData as any).mockRejectedValue(new Error('Storage full'));

            // Should still return transactions even if token save fails
            const transactions = await plaidService.syncTransactions(mockAccessToken);
            expect(transactions).toHaveLength(1);
        });

        it('should handle account fetch errors', async () => {
            vi.spyOn(plaidService as any, 'fetchPlaidAccounts').mockRejectedValue(new Error('Account fetch failed'));

            await expect(plaidService.getAccounts(mockAccessToken)).rejects.toMatchObject({
                type: ErrorType.PLAID_CONNECTION,
                message: 'Failed to fetch account information',
            });
        });

        it('should handle investment fetch errors', async () => {
            vi.spyOn(plaidService as any, 'fetchPlaidInvestments').mockRejectedValue(new Error('Investment fetch failed'));

            await expect(plaidService.getInvestments(mockAccessToken)).rejects.toMatchObject({
                type: ErrorType.PLAID_CONNECTION,
                message: 'Failed to fetch investment information',
            });
        });

        it('should handle disconnect account errors', async () => {
            (storageService.saveSecureData as any).mockRejectedValue(new Error('Storage error'));

            await expect(plaidService.disconnectAccount(mockAccessToken)).rejects.toMatchObject({
                type: ErrorType.PLAID_CONNECTION,
                message: 'Failed to disconnect account',
            });
        });

        it('should handle disconnect of non-existent account', async () => {
            await expect(plaidService.disconnectAccount('non-existent-token')).rejects.toMatchObject({
                type: ErrorType.PLAID_CONNECTION,
                message: 'Account not found or already disconnected',
            });
        });
    });

    describe('Token Management', () => {
        it('should load stored tokens on initialization', async () => {
            const mockStoredTokens = [
                {
                    access_token: 'stored-token-1',
                    item_id: 'item-1',
                    institution_name: 'Bank 1',
                    created_at: new Date().toISOString(),
                },
                {
                    access_token: 'stored-token-2',
                    item_id: 'item-2',
                    institution_name: 'Bank 2',
                    created_at: new Date().toISOString(),
                },
            ];

            (storageService.getSecureData as any).mockResolvedValue(mockStoredTokens);

            // Create new service instance to test loading
            const newService = new (plaidService.constructor as any)();
            await new Promise(resolve => setTimeout(resolve, 10)); // Allow async loading

            expect(newService.getConnectedTokens()).toHaveLength(2);
            expect(newService.getConnectedTokens()).toContain('stored-token-1');
            expect(newService.getConnectedTokens()).toContain('stored-token-2');
        });

        it('should handle corrupted stored token data', async () => {
            (storageService.getSecureData as any).mockResolvedValue('invalid-data');

            // Should not throw error, just log and continue
            const newService = new (plaidService.constructor as any)();
            await new Promise(resolve => setTimeout(resolve, 10)); // Allow async loading

            expect(newService.getConnectedTokens()).toHaveLength(0);
        });

        it('should get token information', () => {
            const tokenData = {
                access_token: 'test-token',
                item_id: 'test-item',
                institution_name: 'Test Bank',
                created_at: new Date(),
            };

            plaidService['connectedTokens'].set('test-token', tokenData);

            const info = plaidService.getTokenInfo('test-token');
            expect(info).toEqual(tokenData);

            const nonExistentInfo = plaidService.getTokenInfo('non-existent');
            expect(nonExistentInfo).toBeNull();
        });

        it('should check connection status', () => {
            expect(plaidService.isConnected()).toBe(false);
            expect(plaidService.isConnected('non-existent')).toBe(false);

            plaidService['connectedTokens'].set('test-token', {
                access_token: 'test-token',
                item_id: 'test-item',
                institution_name: 'Test Bank',
                created_at: new Date(),
            });

            expect(plaidService.isConnected()).toBe(true);
            expect(plaidService.isConnected('test-token')).toBe(true);
            expect(plaidService.isConnected('other-token')).toBe(false);
        });

        it('should get connected institutions', async () => {
            const now = new Date();
            plaidService['connectedTokens'].set('token-1', {
                access_token: 'token-1',
                item_id: 'item-1',
                institution_name: 'Bank 1',
                created_at: now,
                last_synced: now,
            });

            plaidService['connectedTokens'].set('token-2', {
                access_token: 'token-2',
                item_id: 'item-2',
                institution_name: 'Bank 2',
                created_at: now,
            });

            // Mock the async methods that getConnectedInstitutions calls
            vi.spyOn(plaidService as any, 'getInstitutionMetadata').mockResolvedValue({
                institutionName: 'Bank 1',
                status: 'connected'
            });
            vi.spyOn(plaidService as any, 'validateAccessToken').mockResolvedValue(true);

            const institutions = await plaidService.getConnectedInstitutions();
            expect(institutions).toHaveLength(2);
            expect(institutions[0]).toMatchObject({
                accessToken: 'token-1',
                institutionName: 'Bank 1',
                lastSynced: now,
            });
            expect(institutions[1]).toMatchObject({
                accessToken: 'token-2',
                institutionName: 'Bank 2',
                lastSynced: undefined,
            });
        });

        it('should disconnect account successfully', async () => {
            const mockAccessToken = 'test-token';
            plaidService['connectedTokens'].set(mockAccessToken, {
                access_token: mockAccessToken,
                item_id: 'test-item',
                institution_name: 'Test Bank',
                created_at: new Date(),
            });

            (storageService.saveSecureData as any).mockResolvedValue(undefined);

            await plaidService.disconnectAccount(mockAccessToken);

            expect(plaidService.isConnected(mockAccessToken)).toBe(false);
            expect(storageService.saveSecureData).toHaveBeenCalledWith('plaid_tokens', []);
        });
    });

    describe('Raw Transaction Fetching', () => {
        const mockAccessToken = 'test-access-token';

        beforeEach(() => {
            // Set up connected token
            plaidService['connectedTokens'].set(mockAccessToken, {
                access_token: mockAccessToken,
                item_id: 'test-item-id',
                institution_name: 'Test Bank',
                created_at: new Date(),
            });
        });

        it('should fetch raw Plaid transaction data', async () => {
            const mockRawTransactions = [
                {
                    transaction_id: 'plaid_tx_1',
                    account_id: 'plaid_acc_1',
                    amount: 25.50,
                    date: '2024-01-15',
                    name: 'Coffee Shop',
                    merchant_name: 'Local Coffee',
                    category: ['Food and Drink', 'Restaurants'],
                    category_id: '13005043',
                    location: {
                        address: '123 Main St',
                        city: 'Anytown',
                        region: 'CA',
                        postal_code: '12345',
                        country: 'US',
                    },
                },
            ];

            vi.spyOn(plaidService as any, 'fetchPlaidTransactions').mockResolvedValue(mockRawTransactions);

            const rawTransactions = await plaidService.fetchRawTransactions(mockAccessToken);

            expect(rawTransactions).toEqual(mockRawTransactions);
            expect(rawTransactions[0]).toHaveProperty('location');
            expect(rawTransactions[0]).toHaveProperty('category_id');
        });

        it('should handle invalid access token for raw fetch', async () => {
            await expect(plaidService.fetchRawTransactions('invalid-token')).rejects.toMatchObject({
                type: ErrorType.PLAID_CONNECTION,
                message: 'Invalid access token. Please reconnect your account.',
            });
        });

        it('should retry raw transaction fetch on failure', async () => {
            let attemptCount = 0;
            const mockFetchTransactions = vi.fn().mockImplementation(() => {
                attemptCount++;
                if (attemptCount < 2) {
                    return Promise.reject(new Error('Network error'));
                }
                return Promise.resolve([{ transaction_id: 'test' }]);
            });

            vi.spyOn(plaidService as any, 'fetchPlaidTransactions').mockImplementation(mockFetchTransactions);

            const result = await plaidService.fetchRawTransactions(mockAccessToken);

            expect(result).toEqual([{ transaction_id: 'test' }]);
            expect(attemptCount).toBe(2);
        });
    });

    describe('Data Transformation', () => {
        it('should transform Plaid transactions correctly', () => {
            const plaidTransaction = {
                transaction_id: 'plaid_tx_123',
                account_id: 'plaid_acc_456',
                amount: 25.50,
                date: '2024-01-15',
                name: 'Starbucks Coffee #1234',
                merchant_name: 'Starbucks',
                category: 'Food and Drink',
                subcategory: 'Coffee Shops',
            };

            const transformed = plaidService['transformPlaidTransaction'](plaidTransaction);

            expect(transformed).toMatchObject({
                amount: 25.50,
                description: 'Starbucks Coffee #1234',
                category: 'Food and Drink',
                subcategory: 'Coffee Shops',
                account_id: 'plaid_acc_456',
                plaid_transaction_id: 'plaid_tx_123',
                is_manual: false,
                is_hidden: false,
                confidence_score: 0.9,
                merchant: 'Starbucks',
                status: 'posted',
            });

            expect(transformed.date).toEqual(new Date('2024-01-15'));
            expect(transformed.created_at).toBeInstanceOf(Date);
            expect(transformed.updated_at).toBeInstanceOf(Date);
        });

        it('should transform Plaid accounts correctly', () => {
            const plaidAccount = {
                account_id: 'plaid_acc_123',
                name: 'Primary Checking',
                type: 'depository',
                subtype: 'checking',
                balances: {
                    available: 2500.50,
                    current: 2500.50,
                },
                institution_name: 'Chase Bank',
            };

            const transformed = plaidService['transformPlaidAccount'](plaidAccount);

            expect(transformed).toMatchObject({
                plaid_account_id: 'plaid_acc_123',
                name: 'Primary Checking',
                type: 'checking',
                balance: 2500.50,
                institution_name: 'Chase Bank',
                is_active: true,
            });

            expect(transformed.last_synced).toBeInstanceOf(Date);
            expect(transformed.created_at).toBeInstanceOf(Date);
            expect(transformed.updated_at).toBeInstanceOf(Date);
        });

        it('should transform Plaid investments correctly', () => {
            const plaidInvestment = {
                account_id: 'plaid_acc_investment',
                security_id: 'sec_aapl',
                name: 'Apple Inc.',
                ticker_symbol: 'AAPL',
                quantity: 10,
                price: 150.25,
                value: 1502.50,
                type: 'equity',
                cost_basis: 140.00,
                daily_change: 5.25,
                daily_change_percent: 0.035,
            };

            const transformed = plaidService['transformPlaidInvestment'](plaidInvestment);

            expect(transformed).toMatchObject({
                account_id: 'plaid_acc_investment',
                security_name: 'Apple Inc.',
                ticker_symbol: 'AAPL',
                quantity: 10,
                price: 150.25,
                value: 1502.50,
                type: 'stock',
                average_cost_basis: 140.00,
                daily_change: 5.25,
                daily_change_percent: 0.035,
            });

            expect(transformed.last_updated).toBeInstanceOf(Date);
        });

        it('should handle missing optional fields in transformations', () => {
            const minimalPlaidTransaction = {
                transaction_id: 'plaid_tx_123',
                account_id: 'plaid_acc_456',
                amount: 25.50,
                date: '2024-01-15',
                name: 'Unknown Merchant',
            };

            const transformed = plaidService['transformPlaidTransaction'](minimalPlaidTransaction);

            expect(transformed).toMatchObject({
                amount: 25.50,
                description: 'Unknown Merchant',
                category: 'Other', // Default category
                account_id: 'plaid_acc_456',
                plaid_transaction_id: 'plaid_tx_123',
                is_manual: false,
                subcategory: undefined,
                merchant: undefined,
            });
        });

        it('should map account types correctly', () => {
            const accountTypes = [
                { subtype: 'checking', expected: 'checking' },
                { subtype: 'savings', expected: 'savings' },
                { subtype: 'credit card', expected: 'credit' },
                { subtype: 'investment', expected: 'investment' },
                { subtype: 'unknown', expected: 'checking' }, // Default fallback
            ];

            accountTypes.forEach(({ subtype, expected }) => {
                const plaidAccount = {
                    account_id: 'test',
                    name: 'Test Account',
                    type: 'depository',
                    subtype,
                    balances: { current: 1000 },
                    institution_name: 'Test Bank',
                };

                const transformed = plaidService['transformPlaidAccount'](plaidAccount);
                expect(transformed.type).toBe(expected);
            });
        });

        it('should map investment types correctly', () => {
            const investmentTypes = [
                { type: 'equity', expected: 'stock' },
                { type: 'etf', expected: 'etf' },
                { type: 'mutual fund', expected: 'mutual_fund' },
                { type: 'bond', expected: 'bond' },
                { type: 'cash', expected: 'cash' },
                { type: 'cryptocurrency', expected: 'crypto' },
                { type: 'unknown', expected: 'stock' }, // Default fallback
            ];

            investmentTypes.forEach(({ type, expected }) => {
                const plaidInvestment = {
                    account_id: 'test',
                    security_id: 'test',
                    name: 'Test Security',
                    quantity: 1,
                    price: 100,
                    value: 100,
                    type,
                };

                const transformed = plaidService['transformPlaidInvestment'](plaidInvestment);
                expect(transformed.type).toBe(expected);
            });
        });
    });

    describe('Error Creation and Handling', () => {
        it('should create standardized error objects', () => {
            const error = plaidService['createError'](
                ErrorType.PLAID_CONNECTION,
                'Test error message',
                { detail: 'test' }
            );

            expect(error).toMatchObject({
                type: ErrorType.PLAID_CONNECTION,
                message: 'Test error message',
                details: { detail: 'test' },
                recoverable: false, // Plaid connection errors are not recoverable
            });

            expect(error.timestamp).toBeInstanceOf(Date);
        });

        it('should mark storage errors as recoverable', () => {
            const error = plaidService['createError'](
                ErrorType.STORAGE,
                'Storage error'
            );

            expect(error.recoverable).toBe(true);
        });

        it('should handle link exit with error', () => {
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

            const mockError = {
                error_code: 'INVALID_CREDENTIALS',
                error_type: 'INVALID_CREDENTIALS',
                error_message: 'Invalid credentials',
                display_message: 'Please check your credentials'
            };
            const mockMetadata = {
                institution: {
                    name: 'Test Bank',
                    institution_id: 'test-institution-id'
                },
                status: 'requires_credentials',
                link_session_id: 'test-session',
                request_id: 'test-request'
            };

            // Should not throw, just log
            plaidService['handleLinkExit'](mockError, mockMetadata);

            expect(consoleSpy).toHaveBeenCalledWith('Plaid Link exit with error:', mockError);

            consoleSpy.mockRestore();
        });

        it('should handle link exit without error', () => {
            const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { });

            const mockMetadata = {
                institution: {
                    name: 'Test Bank',
                    institution_id: 'test-institution-id'
                },
                status: 'connected',
                link_session_id: 'test-session',
                request_id: 'test-request'
            };

            // Should not throw, just log
            plaidService['handleLinkExit'](null, mockMetadata);

            expect(consoleSpy).toHaveBeenCalledWith('Plaid Link exit:', mockMetadata);

            consoleSpy.mockRestore();
        });

        it('should handle link events', () => {
            const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { });

            const eventName = 'OPEN';
            const mockMetadata = {
                view_name: 'CONNECTED',
                error_type: null,
                error_code: null,
                error_message: null,
                exit_status: null,
                institution_id: 'test-institution',
                institution_name: 'Test Bank',
                institution_search_query: null,
                link_session_id: 'test-session',
                mfa_type: null,
                request_id: 'test-request',
                timestamp: '2024-01-01T00:00:00Z',
                selection: null
            };

            // Should not throw, just log
            plaidService['handleLinkEvent'](eventName, mockMetadata);

            expect(consoleSpy).toHaveBeenCalledWith('Plaid Link event:', eventName, mockMetadata);

            consoleSpy.mockRestore();
        });
    });
});

describe('Account and Investment Syncing', () => {
    const mockAccessToken = 'test-access-token';

    beforeEach(() => {
        // Set up connected token
        plaidService['connectedTokens'].set(mockAccessToken, {
            access_token: mockAccessToken,
            item_id: 'test-item-id',
            institution_name: 'Test Bank',
            created_at: new Date(),
        });
    });

    it('should sync accounts successfully', async () => {
        const mockPlaidAccounts = [
            {
                account_id: 'plaid_acc_1',
                name: 'Primary Checking',
                type: 'depository',
                subtype: 'checking',
                balances: {
                    available: 2500.50,
                    current: 2500.50,
                },
                institution_name: 'Test Bank',
            },
            {
                account_id: 'plaid_acc_2',
                name: 'Savings Account',
                type: 'depository',
                subtype: 'savings',
                balances: {
                    available: 15000.00,
                    current: 15000.00,
                },
                institution_name: 'Test Bank',
            },
        ];

        vi.spyOn(plaidService as any, 'fetchPlaidAccounts').mockResolvedValue(mockPlaidAccounts);

        const accounts = await plaidService.getAccounts(mockAccessToken);

        expect(accounts).toHaveLength(2);
        expect(accounts[0]).toMatchObject({
            name: 'Primary Checking',
            type: 'checking',
            balance: 2500.50,
            institution_name: 'Test Bank',
            plaid_account_id: 'plaid_acc_1',
        });
        expect(accounts[1]).toMatchObject({
            name: 'Savings Account',
            type: 'savings',
            balance: 15000.00,
            institution_name: 'Test Bank',
            plaid_account_id: 'plaid_acc_2',
        });
    });

    it('should sync investments successfully', async () => {
        const mockPlaidInvestments = [
            {
                account_id: 'plaid_acc_investment',
                security_id: 'sec_aapl',
                name: 'Apple Inc.',
                ticker_symbol: 'AAPL',
                quantity: 10,
                price: 150.25,
                value: 1502.50,
                type: 'equity',
            },
            {
                account_id: 'plaid_acc_investment',
                security_id: 'sec_spy',
                name: 'SPDR S&P 500 ETF Trust',
                ticker_symbol: 'SPY',
                quantity: 5,
                price: 420.80,
                value: 2104.00,
                type: 'etf',
            },
        ];

        vi.spyOn(plaidService as any, 'fetchPlaidInvestments').mockResolvedValue(mockPlaidInvestments);

        const investments = await plaidService.getInvestments(mockAccessToken);

        expect(investments).toHaveLength(2);
        expect(investments[0]).toMatchObject({
            security_name: 'Apple Inc.',
            ticker_symbol: 'AAPL',
            quantity: 10,
            price: 150.25,
            value: 1502.50,
            type: 'stock',
        });
        expect(investments[1]).toMatchObject({
            security_name: 'SPDR S&P 500 ETF Trust',
            ticker_symbol: 'SPY',
            quantity: 5,
            price: 420.80,
            value: 2104.00,
            type: 'etf',
        });
    });

    it('should handle account fetch errors', async () => {
        vi.spyOn(plaidService as any, 'fetchPlaidAccounts').mockRejectedValue(new Error('Account fetch failed'));

        await expect(plaidService.getAccounts(mockAccessToken)).rejects.toMatchObject({
            type: ErrorType.PLAID_CONNECTION,
            message: 'Failed to fetch account information',
        });
    });

    it('should handle investment fetch errors', async () => {
        vi.spyOn(plaidService as any, 'fetchPlaidInvestments').mockRejectedValue(new Error('Investment fetch failed'));

        await expect(plaidService.getInvestments(mockAccessToken)).rejects.toMatchObject({
            type: ErrorType.PLAID_CONNECTION,
            message: 'Failed to fetch investment information',
        });
    });
});

describe('Token Management and Connection Status', () => {
    it('should load stored tokens on initialization', async () => {
        const mockStoredTokens = [
            {
                access_token: 'stored-token-1',
                item_id: 'item-1',
                institution_name: 'Bank 1',
                created_at: new Date().toISOString(),
            },
            {
                access_token: 'stored-token-2',
                item_id: 'item-2',
                institution_name: 'Bank 2',
                created_at: new Date().toISOString(),
            },
        ];

        (storageService.getSecureData as any).mockResolvedValue(mockStoredTokens);

        // Create new service instance to test loading
        const newService = new (plaidService.constructor as any)();
        await new Promise(resolve => setTimeout(resolve, 10)); // Allow async loading

        expect(newService.getConnectedTokens()).toHaveLength(2);
        expect(newService.getConnectedTokens()).toContain('stored-token-1');
        expect(newService.getConnectedTokens()).toContain('stored-token-2');
    });

    it('should handle corrupted stored token data', async () => {
        (storageService.getSecureData as any).mockResolvedValue('invalid-data');

        // Should not throw error, just log and continue
        const newService = new (plaidService.constructor as any)();
        await new Promise(resolve => setTimeout(resolve, 10)); // Allow async loading

        expect(newService.getConnectedTokens()).toHaveLength(0);
    });

    it('should get token information', () => {
        const tokenData = {
            access_token: 'test-token',
            item_id: 'test-item',
            institution_name: 'Test Bank',
            created_at: new Date(),
        };

        plaidService['connectedTokens'].set('test-token', tokenData);

        const info = plaidService.getTokenInfo('test-token');
        expect(info).toEqual(tokenData);

        const nonExistentInfo = plaidService.getTokenInfo('non-existent');
        expect(nonExistentInfo).toBeNull();
    });

    it('should check connection status', () => {
        expect(plaidService.isConnected()).toBe(false);
        expect(plaidService.isConnected('non-existent')).toBe(false);

        plaidService['connectedTokens'].set('test-token', {
            access_token: 'test-token',
            item_id: 'test-item',
            institution_name: 'Test Bank',
            created_at: new Date(),
        });

        expect(plaidService.isConnected()).toBe(true);
        expect(plaidService.isConnected('test-token')).toBe(true);
        expect(plaidService.isConnected('other-token')).toBe(false);
    });

    it('should get connected institutions', async () => {
        const now = new Date();
        plaidService['connectedTokens'].set('token-1', {
            access_token: 'token-1',
            item_id: 'item-1',
            institution_name: 'Bank 1',
            created_at: now,
            last_synced: now,
        });

        plaidService['connectedTokens'].set('token-2', {
            access_token: 'token-2',
            item_id: 'item-2',
            institution_name: 'Bank 2',
            created_at: now,
        });

        // Mock the async methods that getConnectedInstitutions calls
        vi.spyOn(plaidService as any, 'getInstitutionMetadata').mockResolvedValue({
            institutionName: 'Bank 1',
            status: 'connected'
        });
        vi.spyOn(plaidService as any, 'validateAccessToken').mockResolvedValue(true);

        const institutions = await plaidService.getConnectedInstitutions();
        expect(institutions).toHaveLength(2);
        expect(institutions[0]).toMatchObject({
            accessToken: 'token-1',
            institutionName: 'Bank 1',
            lastSynced: now,
        });
        expect(institutions[1]).toMatchObject({
            accessToken: 'token-2',
            institutionName: 'Bank 2',
            lastSynced: undefined,
        });
    });

    it('should disconnect account successfully', async () => {
        const mockAccessToken = 'test-token';
        plaidService['connectedTokens'].set(mockAccessToken, {
            access_token: mockAccessToken,
            item_id: 'test-item',
            institution_name: 'Test Bank',
            created_at: new Date(),
        });

        (storageService.saveSecureData as any).mockResolvedValue(undefined);

        await plaidService.disconnectAccount(mockAccessToken);

        expect(plaidService.isConnected(mockAccessToken)).toBe(false);
        expect(storageService.saveSecureData).toHaveBeenCalledWith('plaid_tokens', []);
    });

    it('should handle disconnect of non-existent account', async () => {
        await expect(plaidService.disconnectAccount('non-existent-token')).rejects.toMatchObject({
            type: ErrorType.PLAID_CONNECTION,
            message: 'Account not found or already disconnected',
        });
    });

    it('should handle disconnect account errors', async () => {
        const mockAccessToken = 'test-token';
        plaidService['connectedTokens'].set(mockAccessToken, {
            access_token: mockAccessToken,
            item_id: 'test-item',
            institution_name: 'Test Bank',
            created_at: new Date(),
        });

        (storageService.saveSecureData as any).mockRejectedValue(new Error('Storage error'));

        await expect(plaidService.disconnectAccount(mockAccessToken)).rejects.toMatchObject({
            type: ErrorType.PLAID_CONNECTION,
            message: 'Failed to disconnect account',
        });
    });
});

describe('Data Transformation and Validation', () => {
    it('should transform Plaid transactions correctly', () => {
        const plaidTransaction = {
            transaction_id: 'plaid_tx_123',
            account_id: 'plaid_acc_456',
            amount: 25.50,
            date: '2024-01-15',
            name: 'Starbucks Coffee #1234',
            merchant_name: 'Starbucks',
            category: 'Food and Drink',
            subcategory: 'Coffee Shops',
        };

        const transformed = plaidService['transformPlaidTransaction'](plaidTransaction);

        expect(transformed).toMatchObject({
            amount: 25.50,
            description: 'Starbucks Coffee #1234',
            category: 'Food and Drink',
            subcategory: 'Coffee Shops',
            account_id: 'plaid_acc_456',
            plaid_transaction_id: 'plaid_tx_123',
            is_manual: false,
            is_hidden: false,
            confidence_score: 0.9,
            merchant: 'Starbucks',
            status: 'posted',
        });

        expect(transformed.date).toEqual(new Date('2024-01-15'));
        expect(transformed.created_at).toBeInstanceOf(Date);
        expect(transformed.updated_at).toBeInstanceOf(Date);
    });

    it('should transform Plaid accounts correctly', () => {
        const plaidAccount = {
            account_id: 'plaid_acc_123',
            name: 'Primary Checking',
            type: 'depository',
            subtype: 'checking',
            balances: {
                available: 2500.50,
                current: 2500.50,
            },
            institution_name: 'Chase Bank',
        };

        const transformed = plaidService['transformPlaidAccount'](plaidAccount);

        expect(transformed).toMatchObject({
            plaid_account_id: 'plaid_acc_123',
            name: 'Primary Checking',
            type: 'checking',
            balance: 2500.50,
            institution_name: 'Chase Bank',
            is_active: true,
        });

        expect(transformed.last_synced).toBeInstanceOf(Date);
        expect(transformed.created_at).toBeInstanceOf(Date);
        expect(transformed.updated_at).toBeInstanceOf(Date);
    });

    it('should transform Plaid investments correctly', () => {
        const plaidInvestment = {
            account_id: 'plaid_acc_investment',
            security_id: 'sec_aapl',
            name: 'Apple Inc.',
            ticker_symbol: 'AAPL',
            quantity: 10,
            price: 150.25,
            value: 1502.50,
            type: 'equity',
            cost_basis: 140.00,
            daily_change: 5.25,
            daily_change_percent: 0.035,
        };

        const transformed = plaidService['transformPlaidInvestment'](plaidInvestment);

        expect(transformed).toMatchObject({
            account_id: 'plaid_acc_investment',
            security_name: 'Apple Inc.',
            ticker_symbol: 'AAPL',
            quantity: 10,
            price: 150.25,
            value: 1502.50,
            type: 'stock',
            average_cost_basis: 140.00,
            daily_change: 5.25,
            daily_change_percent: 0.035,
        });

        expect(transformed.last_updated).toBeInstanceOf(Date);
    });

    it('should handle missing optional fields in transformations', () => {
        const minimalPlaidTransaction = {
            transaction_id: 'plaid_tx_123',
            account_id: 'plaid_acc_456',
            amount: 25.50,
            date: '2024-01-15',
            name: 'Unknown Merchant',
        };

        const transformed = plaidService['transformPlaidTransaction'](minimalPlaidTransaction);

        expect(transformed).toMatchObject({
            amount: 25.50,
            description: 'Unknown Merchant',
            category: 'Other', // Default category
            account_id: 'plaid_acc_456',
            plaid_transaction_id: 'plaid_tx_123',
            is_manual: false,
            subcategory: undefined,
            merchant: undefined,
        });
    });

    it('should filter out invalid transactions during sync', async () => {
        const mockAccessToken = 'test-access-token';
        plaidService['connectedTokens'].set(mockAccessToken, {
            access_token: mockAccessToken,
            item_id: 'test-item-id',
            institution_name: 'Test Bank',
            created_at: new Date(),
        });

        // Mock transactions with some invalid data
        const mockPlaidTransactions = [
            {
                transaction_id: 'plaid_tx_1',
                account_id: 'plaid_acc_1',
                amount: 25.50,
                date: '2024-01-15',
                name: 'Valid Transaction',
                category: 'Food and Drink',
            },
            {
                transaction_id: 'plaid_tx_2',
                account_id: 'plaid_acc_1',
                // Missing required fields - should be filtered out
                date: '2024-01-14',
            },
        ];

        vi.spyOn(plaidService as any, 'fetchPlaidTransactions').mockResolvedValue(mockPlaidTransactions);
        (storageService.saveSecureData as any).mockResolvedValue(undefined);

        const transactions = await plaidService.syncTransactions(mockAccessToken);

        // Should only return valid transactions
        expect(transactions).toHaveLength(1);
        expect(transactions[0].description).toBe('Valid Transaction');
    });
});

describe('Link Success Handler Integration', () => {
    it('should handle successful link connection with token exchange', async () => {
        // Mock storage operations
        (storageService.saveSecureData as any).mockResolvedValue(undefined);

        // Mock token exchange
        vi.spyOn(plaidService as any, 'exchangePublicToken').mockResolvedValue('test-access-token');

        const mockMetadata = {
            link_session_id: 'test-session-id',
            institution: {
                institution_id: 'test-institution-id',
                name: 'Test Bank',
            },
            accounts: [],
        };

        // Call the success handler directly
        await plaidService['handleLinkSuccess']('test-public-token', mockMetadata);

        expect(plaidService.getConnectedTokens()).toContain('test-access-token');
        expect(storageService.saveSecureData).toHaveBeenCalledWith('plaid_tokens', expect.any(Array));

        // Verify token data is stored correctly
        const tokenInfo = plaidService.getTokenInfo('test-access-token');
        expect(tokenInfo).toMatchObject({
            access_token: 'test-access-token',
            item_id: 'test-session-id',
            institution_id: 'test-institution-id',
            institution_name: 'Test Bank',
        });
    });

    it('should handle link connection failure during token exchange', async () => {
        // Mock failed token exchange
        vi.spyOn(plaidService as any, 'exchangePublicToken').mockRejectedValue(new Error('Exchange failed'));

        const mockMetadata = {
            link_session_id: 'test-session-id',
            institution: {
                institution_id: 'test-institution-id',
                name: 'Test Bank',
            },
            accounts: [],
        };

        await expect(
            plaidService['handleLinkSuccess']('test-public-token', mockMetadata)
        ).rejects.toMatchObject({
            type: ErrorType.PLAID_CONNECTION,
            message: 'Failed to complete account connection',
        });
    });
});

describe('Investment and Liabilities API Tests', () => {
    const mockAccessToken = 'test-access-token';

    beforeEach(() => {
        vi.clearAllMocks();
        // Reset service state
        plaidService['isInitialized'] = false;
        plaidService['linkToken'] = null;
        plaidService['connectedTokens'].clear();

        // Set up connected token
        plaidService['connectedTokens'].set(mockAccessToken, {
            access_token: mockAccessToken,
            item_id: 'test-item-id',
            institution_name: 'Test Bank',
            created_at: new Date(),
        });
    });

    describe('Investment API Tests', () => {
        it('should fetch investments with comprehensive data', async () => {
            const mockPlaidInvestments = [
                {
                    account_id: 'plaid_acc_investment_1',
                    security_id: 'sec_aapl',
                    name: 'Apple Inc.',
                    ticker_symbol: 'AAPL',
                    quantity: 25,
                    price: 175.50,
                    value: 4387.50,
                    type: 'equity',
                    cost_basis: 150.00,
                    daily_change: 2.25,
                    daily_change_percent: 0.013,
                },
                {
                    account_id: 'plaid_acc_investment_1',
                    security_id: 'sec_vti',
                    name: 'Vanguard Total Stock Market ETF',
                    ticker_symbol: 'VTI',
                    quantity: 50,
                    price: 220.80,
                    value: 11040.00,
                    type: 'etf',
                    cost_basis: 200.00,
                    daily_change: -1.20,
                    daily_change_percent: -0.005,
                },
                {
                    account_id: 'plaid_acc_investment_2',
                    security_id: 'sec_btc',
                    name: 'Bitcoin',
                    ticker_symbol: 'BTC',
                    quantity: 0.5,
                    price: 45000.00,
                    value: 22500.00,
                    type: 'cryptocurrency',
                    cost_basis: 40000.00,
                    daily_change: 1500.00,
                    daily_change_percent: 0.034,
                },
                {
                    account_id: 'plaid_acc_investment_1',
                    security_id: 'sec_bond',
                    name: 'US Treasury Bond 10Y',
                    ticker_symbol: 'UST10Y',
                    quantity: 10,
                    price: 1000.00,
                    value: 10000.00,
                    type: 'bond',
                    cost_basis: 1000.00,
                    daily_change: 0.00,
                    daily_change_percent: 0.000,
                }
            ];

            vi.spyOn(plaidService as any, 'fetchPlaidInvestments').mockResolvedValue(mockPlaidInvestments);

            const investments = await plaidService.getInvestments(mockAccessToken);

            expect(investments).toHaveLength(4);

            // Test Apple stock
            expect(investments[0]).toMatchObject({
                security_name: 'Apple Inc.',
                ticker_symbol: 'AAPL',
                quantity: 25,
                price: 175.50,
                value: 4387.50,
                type: 'stock',
                average_cost_basis: 150.00,
                daily_change: 2.25,
                daily_change_percent: 0.013,
            });

            // Test VTI ETF
            expect(investments[1]).toMatchObject({
                security_name: 'Vanguard Total Stock Market ETF',
                ticker_symbol: 'VTI',
                type: 'etf',
                quantity: 50,
                price: 220.80,
                value: 11040.00,
                daily_change: -1.20,
                daily_change_percent: -0.005,
            });

            // Test Bitcoin (crypto)
            expect(investments[2]).toMatchObject({
                security_name: 'Bitcoin',
                ticker_symbol: 'BTC',
                type: 'crypto',
                quantity: 0.5,
                price: 45000.00,
                value: 22500.00,
            });

            // Test Bond
            expect(investments[3]).toMatchObject({
                security_name: 'US Treasury Bond 10Y',
                type: 'bond',
                quantity: 10,
                price: 1000.00,
                value: 10000.00,
            });

            // Verify all have required fields
            investments.forEach(investment => {
                expect(investment.id).toBeDefined();
                expect(investment.account_id).toBeDefined();
                expect(investment.last_updated).toBeInstanceOf(Date);
            });
        });

        it('should handle investment type mapping correctly', async () => {
            const investmentTypes = [
                { plaidType: 'equity', expectedType: 'stock' },
                { plaidType: 'etf', expectedType: 'etf' },
                { plaidType: 'mutual fund', expectedType: 'mutual_fund' },
                { plaidType: 'bond', expectedType: 'bond' },
                { plaidType: 'cash', expectedType: 'cash' },
                { plaidType: 'cryptocurrency', expectedType: 'crypto' },
                { plaidType: 'unknown_type', expectedType: 'stock' }, // Default fallback
            ];

            for (const { plaidType, expectedType } of investmentTypes) {
                const mockInvestment = [{
                    account_id: 'test_account',
                    security_id: 'test_security',
                    name: 'Test Security',
                    quantity: 1,
                    price: 100,
                    value: 100,
                    type: plaidType,
                }];

                vi.spyOn(plaidService as any, 'fetchPlaidInvestments').mockResolvedValue(mockInvestment);

                const investments = await plaidService.getInvestments(mockAccessToken);
                expect(investments[0].type).toBe(expectedType);
            }
        });

        it('should handle investment fetch errors with retry', async () => {
            let attemptCount = 0;
            const mockFetchInvestments = vi.fn().mockImplementation(() => {
                attemptCount++;
                if (attemptCount < 3) {
                    return Promise.reject(new Error('Investment API error'));
                }
                return Promise.resolve([{
                    account_id: 'test_account',
                    security_id: 'test_security',
                    name: 'Test Security',
                    quantity: 1,
                    price: 100,
                    value: 100,
                    type: 'equity',
                }]);
            });

            vi.spyOn(plaidService as any, 'fetchPlaidInvestments').mockImplementation(mockFetchInvestments);

            const investments = await plaidService.getInvestments(mockAccessToken);

            expect(investments).toHaveLength(1);
            expect(attemptCount).toBe(3);
        });

        it('should handle investment validation and filtering', async () => {
            const mockPlaidInvestments = [
                {
                    account_id: 'plaid_acc_1',
                    security_id: 'sec_valid',
                    name: 'Valid Investment',
                    quantity: 10,
                    price: 100,
                    value: 1000,
                    type: 'equity',
                },
                {
                    // Missing required fields - should be filtered out
                    account_id: 'plaid_acc_1',
                    security_id: 'sec_invalid',
                    // Missing name, quantity, price, value
                    type: 'equity',
                },
            ];

            vi.spyOn(plaidService as any, 'fetchPlaidInvestments').mockResolvedValue(mockPlaidInvestments);

            const investments = await plaidService.getInvestments(mockAccessToken);

            // Should only return valid investments
            expect(investments).toHaveLength(1);
            expect(investments[0].security_name).toBe('Valid Investment');
        });

        it('should handle missing optional investment fields', async () => {
            const mockPlaidInvestments = [{
                account_id: 'plaid_acc_1',
                security_id: 'sec_minimal',
                name: 'Minimal Investment',
                quantity: 5,
                price: 50,
                value: 250,
                type: 'equity',
                // Missing optional fields: cost_basis, daily_change, etc.
            }];

            vi.spyOn(plaidService as any, 'fetchPlaidInvestments').mockResolvedValue(mockPlaidInvestments);

            const investments = await plaidService.getInvestments(mockAccessToken);

            expect(investments).toHaveLength(1);
            expect(investments[0]).toMatchObject({
                security_name: 'Minimal Investment',
                quantity: 5,
                price: 50,
                value: 250,
                type: 'stock',
                daily_change: 0,
                daily_change_percent: 0,
            });
            expect(investments[0].average_cost_basis).toBeUndefined();
        });
    });

    describe('Liabilities API Tests', () => {
        it('should fetch liabilities with comprehensive data', async () => {
            const mockPlaidLiabilities = [
                {
                    account_id: 'plaid_acc_credit_1',
                    name: 'Chase Sapphire Preferred',
                    type: 'credit_card',
                    balance: 3250.75,
                    minimum_payment: 95.00,
                    interest_rate: 19.99,
                    due_date: '2024-02-15',
                    last_payment_date: '2024-01-12',
                    last_payment_amount: 200.00,
                },
                {
                    account_id: 'plaid_acc_mortgage_1',
                    name: 'Primary Residence Mortgage',
                    type: 'mortgage',
                    balance: 425000.00,
                    minimum_payment: 2150.00,
                    interest_rate: 3.875,
                    due_date: '2024-02-01',
                    last_payment_date: '2024-01-01',
                    last_payment_amount: 2150.00,
                },
                {
                    account_id: 'plaid_acc_auto_1',
                    name: '2022 Honda Accord Loan',
                    type: 'auto',
                    balance: 22500.00,
                    minimum_payment: 485.00,
                    interest_rate: 4.25,
                    due_date: '2024-02-18',
                    last_payment_date: '2024-01-18',
                    last_payment_amount: 485.00,
                },
                {
                    account_id: 'plaid_acc_student_1',
                    name: 'Federal Student Loan',
                    type: 'student',
                    balance: 15750.00,
                    minimum_payment: 175.00,
                    interest_rate: 5.50,
                    due_date: '2024-02-10',
                    last_payment_date: '2024-01-10',
                    last_payment_amount: 175.00,
                }
            ];

            vi.spyOn(plaidService as any, 'fetchPlaidLiabilities').mockResolvedValue(mockPlaidLiabilities);

            const liabilities = await plaidService.getLiabilities(mockAccessToken);

            expect(liabilities).toHaveLength(4);

            // Test Credit Card
            expect(liabilities[0]).toMatchObject({
                name: 'Chase Sapphire Preferred',
                type: 'credit_card',
                balance: 3250.75,
                minimum_payment: 95.00,
                interest_rate: 19.99,
                plaid_account_id: 'plaid_acc_credit_1',
            });
            expect(liabilities[0].due_date).toEqual(new Date('2024-02-15'));
            expect(liabilities[0].last_payment_date).toEqual(new Date('2024-01-12'));

            // Test Mortgage
            expect(liabilities[1]).toMatchObject({
                name: 'Primary Residence Mortgage',
                type: 'mortgage',
                balance: 425000.00,
                minimum_payment: 2150.00,
                interest_rate: 3.875,
            });

            // Test Auto Loan
            expect(liabilities[2]).toMatchObject({
                name: '2022 Honda Accord Loan',
                type: 'auto_loan',
                balance: 22500.00,
                minimum_payment: 485.00,
                interest_rate: 4.25,
            });

            // Test Student Loan
            expect(liabilities[3]).toMatchObject({
                name: 'Federal Student Loan',
                type: 'student_loan',
                balance: 15750.00,
                minimum_payment: 175.00,
                interest_rate: 5.50,
            });

            // Verify all have required fields
            liabilities.forEach(liability => {
                expect(liability.id).toBeDefined();
                expect(liability.account_id).toBeDefined();
                expect(liability.last_updated).toBeInstanceOf(Date);
                expect(liability.balance).toBeGreaterThan(0); // Liabilities should have positive balances
            });
        });

        it('should handle liability type mapping correctly', async () => {
            const liabilityTypes = [
                { plaidType: 'credit_card', expectedType: 'credit_card' },
                { plaidType: 'mortgage', expectedType: 'mortgage' },
                { plaidType: 'student', expectedType: 'student_loan' },
                { plaidType: 'auto', expectedType: 'auto_loan' },
                { plaidType: 'personal', expectedType: 'personal_loan' },
                { plaidType: 'line_of_credit', expectedType: 'line_of_credit' },
                { plaidType: 'unknown_type', expectedType: 'credit_card' }, // Default fallback
            ];

            for (const { plaidType, expectedType } of liabilityTypes) {
                const mockLiability = [{
                    account_id: 'test_account',
                    name: 'Test Liability',
                    type: plaidType,
                    balance: 1000,
                    minimum_payment: 50,
                    interest_rate: 5.0,
                }];

                vi.spyOn(plaidService as any, 'fetchPlaidLiabilities').mockResolvedValue(mockLiability);

                const liabilities = await plaidService.getLiabilities(mockAccessToken);
                expect(liabilities[0].type).toBe(expectedType);
            }
        });

        it('should handle liability fetch errors with retry', async () => {
            let attemptCount = 0;
            const mockFetchLiabilities = vi.fn().mockImplementation(() => {
                attemptCount++;
                if (attemptCount < 3) {
                    return Promise.reject(new Error('Liability API error'));
                }
                return Promise.resolve([{
                    account_id: 'test_account',
                    name: 'Test Liability',
                    type: 'credit_card',
                    balance: 1000,
                    minimum_payment: 50,
                }]);
            });

            vi.spyOn(plaidService as any, 'fetchPlaidLiabilities').mockImplementation(mockFetchLiabilities);

            const liabilities = await plaidService.getLiabilities(mockAccessToken);

            expect(liabilities).toHaveLength(1);
            expect(attemptCount).toBe(3);
        });

        it('should handle liability validation and filtering', async () => {
            const mockPlaidLiabilities = [
                {
                    account_id: 'plaid_acc_1',
                    name: 'Valid Credit Card',
                    type: 'credit_card',
                    balance: 1500.00,
                    minimum_payment: 45.00,
                    interest_rate: 18.99,
                },
                {
                    // Missing required fields - should be filtered out
                    account_id: 'plaid_acc_2',
                    // Missing name and balance
                    type: 'credit_card',
                },
                {
                    // Invalid balance type - should be filtered out
                    account_id: 'plaid_acc_3',
                    name: 'Invalid Liability',
                    type: 'credit_card',
                    balance: 'invalid_balance',
                },
            ];

            vi.spyOn(plaidService as any, 'fetchPlaidLiabilities').mockResolvedValue(mockPlaidLiabilities);

            const liabilities = await plaidService.getLiabilities(mockAccessToken);

            // Should only return valid liabilities
            expect(liabilities).toHaveLength(1);
            expect(liabilities[0].name).toBe('Valid Credit Card');
        });

        it('should handle missing optional liability fields', async () => {
            const mockPlaidLiabilities = [{
                account_id: 'plaid_acc_1',
                name: 'Minimal Credit Card',
                type: 'credit_card',
                balance: 800.00,
                // Missing optional fields: minimum_payment, interest_rate, dates
            }];

            vi.spyOn(plaidService as any, 'fetchPlaidLiabilities').mockResolvedValue(mockPlaidLiabilities);

            const liabilities = await plaidService.getLiabilities(mockAccessToken);

            expect(liabilities).toHaveLength(1);
            expect(liabilities[0]).toMatchObject({
                name: 'Minimal Credit Card',
                type: 'credit_card',
                balance: 800.00,
            });
            expect(liabilities[0].minimum_payment).toBeUndefined();
            expect(liabilities[0].interest_rate).toBeUndefined();
            expect(liabilities[0].due_date).toBeUndefined();
        });

        it('should ensure liability balances are positive', async () => {
            const mockPlaidLiabilities = [{
                account_id: 'plaid_acc_1',
                name: 'Test Credit Card',
                type: 'credit_card',
                balance: -1500.00, // Negative balance from Plaid
                minimum_payment: 45.00,
            }];

            vi.spyOn(plaidService as any, 'fetchPlaidLiabilities').mockResolvedValue(mockPlaidLiabilities);

            const liabilities = await plaidService.getLiabilities(mockAccessToken);

            expect(liabilities).toHaveLength(1);
            expect(liabilities[0].balance).toBe(1500.00); // Should be converted to positive
        });

        it('should handle invalid access token for liabilities', async () => {
            await expect(plaidService.getLiabilities('invalid-token')).rejects.toMatchObject({
                type: ErrorType.PLAID_CONNECTION,
                message: 'Failed to fetch liability information',
            });
        });

        it('should handle liability API failure after max retries', async () => {
            const mockFetchLiabilities = vi.fn().mockRejectedValue(new Error('Persistent liability API error'));
            vi.spyOn(plaidService as any, 'fetchPlaidLiabilities').mockImplementation(mockFetchLiabilities);

            await expect(plaidService.getLiabilities(mockAccessToken)).rejects.toMatchObject({
                type: ErrorType.PLAID_CONNECTION,
                message: 'Failed to fetch liability information',
            });

            // Should have attempted the maximum number of retries
            expect(mockFetchLiabilities).toHaveBeenCalledTimes(4); // Initial attempt + 3 retries
        }, 10000); // Increase timeout for retry logic
    });

    describe('Combined Investment and Liabilities Tests', () => {
        it('should fetch both investments and liabilities for portfolio overview', async () => {
            const mockInvestments = [{
                account_id: 'plaid_acc_investment',
                security_id: 'sec_aapl',
                name: 'Apple Inc.',
                ticker_symbol: 'AAPL',
                quantity: 10,
                price: 150.00,
                value: 1500.00,
                type: 'equity',
            }];

            const mockLiabilities = [{
                account_id: 'plaid_acc_credit',
                name: 'Credit Card',
                type: 'credit_card',
                balance: 2000.00,
                minimum_payment: 60.00,
                interest_rate: 18.99,
            }];

            vi.spyOn(plaidService as any, 'fetchPlaidInvestments').mockResolvedValue(mockInvestments);
            vi.spyOn(plaidService as any, 'fetchPlaidLiabilities').mockResolvedValue(mockLiabilities);

            const [investments, liabilities] = await Promise.all([
                plaidService.getInvestments(mockAccessToken),
                plaidService.getLiabilities(mockAccessToken)
            ]);

            expect(investments).toHaveLength(1);
            expect(liabilities).toHaveLength(1);

            // Calculate net worth
            const totalInvestmentValue = investments.reduce((sum, inv) => sum + inv.value, 0);
            const totalLiabilityBalance = liabilities.reduce((sum, liab) => sum + liab.balance, 0);
            const netWorth = totalInvestmentValue - totalLiabilityBalance;

            expect(totalInvestmentValue).toBe(1500.00);
            expect(totalLiabilityBalance).toBe(2000.00);
            expect(netWorth).toBe(-500.00); // Net negative due to higher liabilities
        });

        it('should handle mixed success/failure for investments and liabilities', async () => {
            // Mock investments to succeed
            const mockInvestments = [{
                account_id: 'plaid_acc_investment',
                security_id: 'sec_aapl',
                name: 'Apple Inc.',
                quantity: 10,
                price: 150.00,
                value: 1500.00,
                type: 'equity',
            }];

            vi.spyOn(plaidService as any, 'fetchPlaidInvestments').mockResolvedValue(mockInvestments);

            // Mock liabilities to fail
            vi.spyOn(plaidService as any, 'fetchPlaidLiabilities').mockRejectedValue(new Error('Liability API error'));

            // Investments should succeed
            const investments = await plaidService.getInvestments(mockAccessToken);
            expect(investments).toHaveLength(1);

            // Liabilities should fail
            await expect(plaidService.getLiabilities(mockAccessToken)).rejects.toMatchObject({
                type: ErrorType.PLAID_CONNECTION,
                message: 'Failed to fetch liability information',
            });
        }, 10000); // Increase timeout for retry logic
    });
});