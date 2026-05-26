import { screen } from '@testing-library/dom';
//import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { createFormAdd } from './form.add';

describe('GIVEN <createFormAdd> component', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        createFormAdd();
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('It should render the component and its HTML elements', () => {
        const form = screen.getByRole('form', { name: /add/i });
        expect(form).toBeInTheDocument();

        expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Esta en promoción/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();

        expect(
            screen.getByRole('button', { name: /Crear/i }),
        ).toBeInTheDocument();
    });
});
