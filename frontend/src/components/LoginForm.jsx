import { useState, useEffect, useRef } from 'react'

const LoginForm = ({ handleLogin }) => {
  const inputRef = useRef()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const loginUser = event => {
    event.preventDefault()

    handleLogin({
      username: username,
      password: password
    })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h1>log in to application</h1>
      <form onSubmit={loginUser}>
        <div>
          username
          <input
            ref={inputRef}
            type="text"
            value={username}
            name="Username"
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
            password
            <input
              type="text"
              value={password}
              name="Password"
              onChange={({target}) => setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm