import { ApiRepo } from './api.repo';

describe('GIVEN <ApiRepo> class', () => {
    const repo = new ApiRepo();

    describe('WHEN it is instantiated', () => {
        test('THEN new repo should be instance of ApiRepo', () => {
            expect(repo).toBeInstanceOf(ApiRepo);
        });
    });

    describe('WHEN the method <getProducts> is called', () => {
        describe('AND response is OK', () => {
            beforeEach(() => {
                vi.spyOn(globalThis, 'fetch').mockResolvedValue({
                    ok: true,
                    json: vi.fn().mockResolvedValueOnce([]),
                } as unknown as Response);
            });

            test('THEN it should return the fetch data', async () => {
                const products = await repo.getProducts();
                expect(fetch).toHaveBeenCalled();
                expect(products).toBeInstanceOf(Array);
            });
        });

        describe('AND response is NOT OK', () => {
            beforeEach(() => {
                vi.spyOn(globalThis, 'fetch').mockRejectedValue({
                    ok: false,
                }) as unknown as Response;
            });

            test('THEN it should reject the promise', () => {
                expect(repo.getProducts()).rejects.toThrow();
            });
        });
    });

    describe('WHEN the method <createProduct> is called', () => {
        describe('AND response is OK', () => {
            beforeEach(() => {
                vi.spyOn(globalThis, 'fetch').mockResolvedValue({
                    ok: true,
                    json: vi.fn().mockResolvedValueOnce({}),
                } as unknown as Response);
            });

            test('THEN it should return the fetch data', async () => {
                const product = await repo.createProduct({
                    name: 'Producto 1',
                });
                expect(fetch).toHaveBeenCalled();
                expect(product).toBeInstanceOf(Object);
            });
        });

        describe('AND response is NOT OK', () => {
            beforeEach(() => {
                vi.spyOn(globalThis, 'fetch').mockRejectedValue({
                    ok: false,
                }) as unknown as Response;
            });

            test('THEN it should reject the promise', () => {
                expect(repo.createProduct({})).rejects.toThrow();
            });
        });
    });

    describe('WHEN the method <updateProduct> is called', () => {
        describe('AND response is OK', () => {
            beforeEach(() => {
                vi.spyOn(globalThis, 'fetch').mockResolvedValue({
                    ok: true,
                    json: vi.fn().mockResolvedValueOnce({}),
                } as unknown as Response);
            });

            test('THEN it should return the fetch data', async () => {
                const product = await repo.updateProduct(1, {
                    name: 'Updated product',
                });
                expect(fetch).toHaveBeenCalled();
                expect(product).toBeInstanceOf(Object);
            });
        });

        describe('AND response is NOT OK', () => {
            beforeEach(() => {
                vi.spyOn(globalThis, 'fetch').mockRejectedValue({
                    ok: false,
                }) as unknown as Response;
            });

            test('THEN it should reject the promise', () => {
                expect(
                    repo.updateProduct(1, { name: 'Producto 1' }),
                ).rejects.toThrow();
            });
        });
    });

    describe('WHEN the method <deleteProduct> is called', () => {
        describe('AND response is OK', () => {
            beforeEach(() => {
                vi.spyOn(globalThis, 'fetch').mockResolvedValue({
                    ok: true,
                    json: vi.fn().mockResolvedValueOnce({}),
                } as unknown as Response);
            });

            test('THEN it should return the fetch data', async () => {
                const product = await repo.deleteProduct(1);
                expect(fetch).toHaveBeenCalled();
                expect(product).toBeInstanceOf(Object);
            });
        });

        describe('AND response is NOT OK', () => {
            beforeEach(() => {
                vi.spyOn(globalThis, 'fetch').mockRejectedValue({
                    ok: false,
                }) as unknown as Response;
            });

            test('THEN it should reject the promise', () => {
                expect(repo.deleteProduct(1)).rejects.toThrow();
            });
        });
    });
});
