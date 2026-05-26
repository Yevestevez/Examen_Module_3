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

    test('It should render HTML elements: logo, title and button', () => {
        const logo = screen.getByAltText('Logo de la empresa');
        const title = screen.getByRole('heading', { name: /productos/i });
        const button = screen.getByRole('button', { name: /add/i });

        expect(logo).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });
});
