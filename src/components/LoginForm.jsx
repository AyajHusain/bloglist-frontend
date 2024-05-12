import Message from './message'
import { useState } from 'react'
const LoginForm = (props) => {

  const [username,setUserName] = useState('')
  const [password,setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    props.handleCredential({
      username,password
    })
    setUserName('')
    setPassword('')
  }

  return (
    <div>
      <h2>log in to application</h2>
      {props.message!==''&&<Message msg = {props.message}/>}
      <form className = 'loginForm' onSubmit = {handleLogin}>
        <div>
            username<input
            type='text'
            data-testid='username'
            value = {username}
            name='Username'
            onChange = {({ target }) => setUserName(target.value)}/>
        </div>
        <div>
            password<input
            type = 'password'
            data-testid = 'password'
            name = 'password'
            value = {password}
            onChange = {({ target }) => setPassword(target.value)}/>
        </div>
        <button type = 'submit'>submit</button>
      </form>
    </div>
  )
}


export default LoginForm