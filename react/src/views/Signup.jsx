import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState(null)
  const {setUser, setToken} = useStateContext()
  const emailChange = (event) => {
    setEmail(event.target.value)
  }
  const nameChange = (event) => {
    setName(event.target.value)
  }
  const passwordChange = (event) => {
    setPassword(event.target.value)
  }
  const passwordConfirmationChange = (event) => {
    setPasswordConfirmation(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const payload = {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    }
    axiosClient.post('/signup', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token)
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })

  }
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup for free</h1>

          {errors &&
            <div className={"alert"}>
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
          <input onChange={nameChange} type="text" placeholder="Ваше имя"/>
          <input onChange={emailChange} type="email" placeholder="Email"/>
          <input onChange={passwordChange} type="password" placeholder="Password"/>
          <input onChange={passwordConfirmationChange} type="password" placeholder="Password"/>
          <button className="btn btn-block">Login</button>
          <p className="message">Not registered? <Link to="/login">Create an account</Link></p>
        </form>
      </div>
    </div>
  );
};
