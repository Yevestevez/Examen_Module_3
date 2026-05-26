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
});
