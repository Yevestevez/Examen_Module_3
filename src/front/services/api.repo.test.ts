import { ApiRepo } from './api.repo';

describe('GIVEN <ApiRepo> class', () => {
    const repo = new ApiRepo();

    describe('WHEN it is instantiated', () => {
        test('THEN new repo should be instance of ApiRepo', () => {
            expect(repo).toBeInstanceOf(ApiRepo);
        });
    });
});
