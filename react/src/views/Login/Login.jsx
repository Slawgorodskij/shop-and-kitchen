import React, {useState} from 'react';
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../context/ContextProvider.jsx";
import styles from "./login.module.css"
import {MyInput} from "../../components/UI/MyInput/MyInput.jsx";
import {MyLink} from "../../components/UI/MyLink/MyLink.jsx";
import {MyButton} from "../../components/UI/MyButton/MyButton.jsx";

const title = 'Войдите в свою учетную запись';
const question = 'Нет учетной записи?';
export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null)

  const {setUser, setToken} = useStateContext()
  const emailChange = (event) => {
    setEmail(event.target.value)
  }
  const passwordChange = (event) => {
    setPassword(event.target.value)
  }
  const onSubmit = (event) => {
    event.preventDefault()
    const payload = {
      email: email,
      password: password,
    }
    axiosClient.post('/login', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token)
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message)
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
        <MyInput placeholder={"Email"} type={"email"} onChange={emailChange}/>
        <MyInput placeholder={"Пароль"} type={"password"} onChange={passwordChange}/>
        <MyButton label={"Войти"}/>

      </form>
      <div className={styles.information}>
        <span>{question}</span>
        <MyLink link={"/signup"} label={"Создать учетную запись"}/>
      </div>

    </>
    // <div className="login-signup-form animated fadeInDown">
    //   <div className="form">
    //     <form onSubmit={onSubmit}>
    //       <h2 className="title">Login into your account</h2>
    //
    //       {message &&
    //         <div className="alert">
    //           <p>{message}</p>
    //         </div>
    //       }
    //
    //       <input onChange={emailChange} type="email" placeholder="Email"/>
    //       <input onChange={passwordChange} type="password" placeholder="Password"/>
    //       <button className="btn btn-block">Login</button>
    //       <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
    //     </form>
    //   </div>
    // </div>
  );
};
