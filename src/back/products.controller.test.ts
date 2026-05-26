import { ProductsController } from './products.controller';
import { Request, Response, NextFunction } from 'express';

describe('GIVEN <ProductsController> class', () => {
    const mockRepo = {
        read: vi.fn(),
        readById: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
    };
    let controller: ProductsController;

    const req = {} as Request;
    const res = {
        json: vi.fn(),
        status: vi.fn(),
    } as unknown as Response;
    const next = vi.fn() as NextFunction;

    beforeEach(() => {
        controller = new ProductsController(mockRepo);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('WHEN <ProductsController> is instatiated', () => {
        test('THEN controller is an instance of ProductController', () => {
            expect(controller).toBeInstanceOf(ProductsController);
        });
    });

    describe('WHEN <getAll> method is called', () => {
        describe('AND repo returns valid data', () => {
            test('THEN it should call <res.json> with products', async () => {
                mockRepo.read.mockResolvedValueOnce({
                    id: '1',
                    name: 'Product 1',
                });

                await controller.getAll(req, res, next);

                expect(mockRepo.read).toHaveBeenCalled();
                expect(res.json).toHaveBeenCalledWith({
                    results: { id: '1', name: 'Product 1' },
                    error: '',
                });
                expect(next).not.toHaveBeenCalled();
            });
        });

        describe('AND repo throws an error', () => {
            test('THEN it should call <next> with an error', async () => {
                mockRepo.read.mockRejectedValueOnce(new Error('Error message'));

                await controller.getAll(req, res, next);

                expect(mockRepo.read).toHaveBeenCalled();
                expect(next).toHaveBeenCalledWith(expect.any(Error));
            });
        });
    });

    describe('WHEN <getById> method is called', () => {
        describe('AND repo returns valid data', () => {
            test('THEN it should call <res.json> with product', async () => {
                req.params = { id: '1' };

                mockRepo.readById.mockResolvedValueOnce({
                    id: req.params.id,
                    name: 'Product 1',
                });

                await controller.getById(req, res, next);

                expect(mockRepo.readById).toHaveBeenCalled();
                expect(res.json).toHaveBeenCalledWith({
                    results: [{ id: '1', name: 'Product 1' }],
                    error: '',
                });
                expect(next).not.toHaveBeenCalled();
            });
        });

        describe('AND repo throws an error', () => {
            test('THEN it should call <next> with an error', async () => {
                mockRepo.readById.mockRejectedValueOnce(
                    new Error('Error message'),
                );

                await controller.getById(req, res, next);

                expect(mockRepo.readById).toHaveBeenCalled();
                expect(next).toHaveBeenCalledWith(expect.any(Error));
            });
        });
    });
});
