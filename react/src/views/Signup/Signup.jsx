import React, {useState} from 'react';
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../context/ContextProvider.jsx";
import styles from "./signup.module.css"
import {MyInput} from "../../components/UI/MyInput/MyInput.jsx";
import {MyButton} from "../../components/UI/MyButton/MyButton.jsx";
import {MyLink} from "../../components/UI/MyLink/MyLink.jsx";

const title = 'Заполните поля для регистрации';
const question = 'Уже есть учетная запись?';
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
    <>
      <h2 className={styles.header}>{title}</h2>
      <form
        className={styles.form}
        onSubmit={onSubmit}
      >
        <MyInput placeholder={"Ваше имя"} type={"text"} onChange={nameChange}/>
        <MyInput placeholder={"Email"} type={"email"} onChange={emailChange}/>
        <MyInput placeholder={"Пароль"} type={"password"} onChange={passwordChange}/>
        <MyInput placeholder={"Повторите пароль"} type={"password"} onChange={passwordConfirmationChange}/>
        <MyButton label={"Регистрация"}/>

      </form>
      <div className={styles.information}>
        <span>{question}</span>
        <MyLink link={"/login"} label={"Войти"}/>
      </div>

    </>
    // <div className="login-signup-form animated fadeInDown">
    //   <div className="form">
    //     <form onSubmit={onSubmit}>
    //       <h1 className="title">Signup for free</h1>
    //
    //       {errors &&
    //         <div className={"alert"}>
    //           {Object.keys(errors).map(key => (
    //             <p key={key}>{errors[key][0]}</p>
    //           ))}
    //         </div>
    //       }
    //       <input onChange={nameChange} type="text" placeholder="Ваше имя"/>
    //       <input onChange={emailChange} type="email" placeholder="Email"/>
    //       <input onChange={passwordChange} type="password" placeholder="Password"/>
    //       <input onChange={passwordConfirmationChange} type="password" placeholder="Password"/>
    //       <button className="btn btn-block">Login</button>
    //       <p className="message">Not registered? <Link to="/login">Create an account</Link></p>
    //     </form>
    //   </div>
    // </div>
  );
};
