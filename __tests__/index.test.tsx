// __tests__/index.test.jsx

import { prettyDOM, render, screen } from '@testing-library/react'
import Home from '../pages/index'

describe('Home', () => {
  it('renders a main element', () => {
    render(<Home />)

    const main = screen.getByRole('main')
    console.log(prettyDOM(main))
    expect(main).toBeTruthy()
  })
})