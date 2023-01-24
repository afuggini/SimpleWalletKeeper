import SignInForm from './SignInForm'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

const mockSubmit = jest.fn()

describe('SignInForm', () => {

  beforeEach(() => {
    mockSubmit.mockClear()
  })

  it('renders form', () => {
    render(<SignInForm onSubmit={mockSubmit} />);
    expect(screen.getByTestId('button')).toBeInTheDocument()
  })

  it('submits form content when clicking button', () => {
    render(<SignInForm onSubmit={mockSubmit} />);
    const USERNAME = 'someusername'
    const PASSWORD = '123456'
    const usernameInput = screen.getByTestId('username')
    const passwordInput = screen.getByTestId('password')
    fireEvent.change(usernameInput, { target: { value: USERNAME } })
    fireEvent.change(passwordInput, { target: { value: PASSWORD } })
    const submitButton = screen.getByTestId('button')
    submitButton.click()
    expect(mockSubmit).toHaveBeenCalledWith({ username: USERNAME, password: PASSWORD })
  })

  it('should not submit when either field is empty', () => {
    render(<SignInForm onSubmit={mockSubmit} />);
    const submitButton = screen.getByTestId('button')
    submitButton.click()
    expect(mockSubmit).not.toHaveBeenCalled()

    const USERNAME = 'someusername'
    const PASSWORD = '123456'
    const usernameInput = screen.getByTestId('username')
    const passwordInput = screen.getByTestId('password')
    fireEvent.change(usernameInput, { target: { value: USERNAME } })
    expect(mockSubmit).not.toHaveBeenCalled()

    fireEvent.change(usernameInput, { target: { value: '' } })
    fireEvent.change(passwordInput, { target: { value: PASSWORD } })
    expect(mockSubmit).not.toHaveBeenCalled()
  })

})
