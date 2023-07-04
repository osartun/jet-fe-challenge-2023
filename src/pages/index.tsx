import React, { ChangeEventHandler, FormEventHandler } from "react"
import { login } from "../app/apiClient";
import { navigate } from "gatsby";
import { useAppDispatch, useAppSelector } from "../app/store/hooks";
import { setUsername } from "../app/store/usernameSlice";

const LoginPage = () => {
  const username = useAppSelector((state) => state.username.value);
  const dispatch = useAppDispatch();

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setUsername(e.target.value));
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