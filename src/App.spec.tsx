import '@testing-library/jest-dom';
import { render, screen} from '@testing-library/react'
import App from './App'


function renderApp() {
    render(<App/>)
}

describe('Renders App', () => {

    it('Renders Todo App Title', () => {
        renderApp();
        expect(screen.getByText('Vite + React')).toBeInTheDocument();
    })
})
