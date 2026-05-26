import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { createHeader } from './header';

describe('GIVEN <createHeader> component', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        createHeader();
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('It should render HTML elements: logo, title and button and its attributes', () => {
        const logo = screen.getByAltText('Logo de la empresa');
        const title = screen.getByRole('heading', { name: /productos/i });
        const button = screen.getByRole('button', { name: /add/i });
        const summary = screen.getByText('Add', { selector: 'summary' });

        expect(logo).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('aria-expanded', 'false');
        expect(button).toHaveAttribute('aria-controls', 'add');
        expect(summary).toBeInTheDocument();
    });
});
