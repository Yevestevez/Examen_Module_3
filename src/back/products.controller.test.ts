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

    describe('WHEN <create> method is called', () => {
        describe('AND repo returns valid data', () => {
            test('THEN it should call <res.json> with product', async () => {
                req.body = { name: 'New product' };

                mockRepo.create.mockResolvedValueOnce({
                    id: '1',
                    name: req.body.name,
                });

                await controller.create(req, res, next);

                expect(mockRepo.create).toHaveBeenCalled();
                expect(res.json).toHaveBeenCalledWith({
                    results: [{ id: '1', name: 'New product' }],
                    error: '',
                });
                expect(next).not.toHaveBeenCalled();
            });
        });

        describe('AND repo throws an error', () => {
            test('THEN it should call <next> with an error', async () => {
                mockRepo.create.mockRejectedValueOnce(
                    new Error('Error message'),
                );

                await controller.create(req, res, next);

                expect(mockRepo.create).toHaveBeenCalled();
                expect(next).toHaveBeenCalledWith(expect.any(Error));
            });
        });
    });

    describe('WHEN <update> method is called', () => {
        describe('AND repo returns valid data', () => {
            test('THEN it should call <res.json> with product', async () => {
                req.params = { id: '1' };
                req.body = {
                    name: 'Updated product',
                };

                mockRepo.update.mockResolvedValueOnce({
                    id: req.params.id,
                    name: req.body.name,
                });

                await controller.update(req, res, next);

                expect(mockRepo.update).toHaveBeenCalled();
                expect(res.json).toHaveBeenCalledWith({
                    results: [{ id: '1', name: 'Updated product' }],
                    error: '',
                });
                expect(next).not.toHaveBeenCalled();
            });
        });

        describe('AND repo throws an error', () => {
            test('THEN it should call <next> with an error', async () => {
                mockRepo.update.mockRejectedValueOnce(
                    new Error('Error message'),
                );

                await controller.update(req, res, next);

                expect(mockRepo.update).toHaveBeenCalled();
                expect(next).toHaveBeenCalledWith(expect.any(Error));
            });
        });
    });

    describe('WHEN <delete> method is called', () => {
        describe('AND repo returns valid data', () => {
            test('THEN it should call <res.json> with product', async () => {
                req.params = { id: '1' };

                mockRepo.delete.mockResolvedValueOnce({
                    id: req.params.id,
                    name: 'Product 1',
                });

                await controller.delete(req, res, next);

                expect(mockRepo.delete).toHaveBeenCalled();
                expect(res.json).toHaveBeenCalledWith({
                    results: [{ id: '1', name: 'Product 1' }],
                    error: '',
                });
                expect(next).not.toHaveBeenCalled();
            });
        });

        describe('AND repo throws an error', () => {
            test('THEN it should call <next> with an error', async () => {
                mockRepo.delete.mockRejectedValueOnce(
                    new Error('Error message'),
                );

                await controller.delete(req, res, next);

                expect(mockRepo.delete).toHaveBeenCalled();
                expect(next).toHaveBeenCalledWith(expect.any(Error));
            });
        });
    });
});
