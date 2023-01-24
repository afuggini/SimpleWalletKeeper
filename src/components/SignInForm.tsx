import { SyntheticEvent, useState } from 'react'

export default function SignInForm({
  errorMessage,
  onSubmit
}: {
  errorMessage?: string
  onSubmit: (props: { username: string; password: string }) => void
}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitClick = (e: SyntheticEvent) => {
    e.preventDefault()
    onSubmit({ username, password })
  }

  return (
    <div>
      <h1 className="mb-3 pb-3 border-b-2">Sign In</h1>
      {errorMessage && (
        <div className="mb-3 text-red-700">{errorMessage}</div>
      )}
      <div className="mb-3">
        <div className="mb-3">
          <input
            data-testid="username"
            placeholder="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="mb-3">
          <input
            data-testid="password"
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <button
            data-testid="button"
            disabled={!username || !password}
            onClick={onSubmitClick}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
}
