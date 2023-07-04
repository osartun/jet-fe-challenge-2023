import React, { ChangeEventHandler, FormEventHandler, useState } from "react"
import { login } from "../app/apiClient";
import { navigate } from "gatsby";

const LoginPage = () => {
  const [username, setUsername] = useState('');

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUsername(e.target.value);
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    login(username);
    navigate('/rooms');
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="username">
        Please enter your username:
      </label>
      <input id="username" value={username} onChange={onChange} placeholder="Emilie" />
      <button>Login</button>
    </form>
  )
}

export default LoginPage