import { ProductsController } from './products.controller';

describe('GIVEN <ProductsController> class', () => {
    const mockRepo = {
        read: vi.fn(),
        readById: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
    };
    let controller: ProductsController;

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

    describe('WHEN <getAll> method is intantiated', () => {
        describe('AND repo returns valid data', () => {
            test('THEN it should call res.json with products', () => {
                // TODO Test
            });
        });

        describe('AND repo throws an error', () => {
            test('THEN it should call next with an error', () => {
                // TODO Test
            });
        });
    });
});
