import { useState } from 'react';

export default function SignInForm({
  errorMessage,
  onSubmit
}: {
  errorMessage: string
  onSubmit: (props: { username: string; password: string }) => void
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitClick = (e) => {
    e.preventDefault()
    onSubmit({ username, password })
  }

  return (
    <div>
      <h1 className="mb-3">Sign In</h1>
      {errorMessage && (
        <div className="mb-3 text-red-700">{errorMessage}</div>
      )}
      <div className="mb-3">
        <div className="mb-3">
          <input
            placeholder="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="mb-3">
          <input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <button onClick={onSubmitClick} disabled={!username || !password}>Sign In</button>
        </div>
      </div>
    </div>
  )
}
