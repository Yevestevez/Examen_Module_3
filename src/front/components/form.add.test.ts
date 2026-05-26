import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
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
        expect(screen.getByLabelText(/promoción/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();

        expect(
            screen.getByRole('button', { name: /Crear/i }),
        ).toBeInTheDocument();
    });

    test('It should call handleSubmit with form data', async () => {
        const spy = vi.spyOn(console, 'log');

        // const form = screen.getByRole('form', { name: /add/i });

        await userEvent.type(screen.getByLabelText(/Name/i), 'Patata');
        await userEvent.type(
            screen.getByLabelText(/Description/i),
            'Las mejores patatas de la comarca',
        );
        await userEvent.type(screen.getByLabelText(/Price/i), '1000');
        await userEvent.click(screen.getByLabelText(/promoción/i));
        await userEvent.selectOptions(
            screen.getByLabelText(/Category/i),
            'components',
        );

        await userEvent.click(screen.getByRole('button', { name: /Crear/i }));
        expect(spy).toBeCalled();

        // expect(spy).toHaveBeenCalledWith(
        //     'Form submitted:',
        //     expect.objectContaining({
        //         id: 1,
        //         name: 'Patata',
        //         description: 'Una Las mejores patatas de la comarca',
        //         price: 1000,
        //         hasPromo: true,
        //         category: 'components',
        //     }),
        // );
    });
});
