import React from 'react'
import { render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />)

    expect(baseElement).toBeTruthy()
  })

  it("should have a 'Sign up'' as the title", () => {
    render(<App />)

    expect(screen.findByText('Sign up')).toBeTruthy()
  })
})
