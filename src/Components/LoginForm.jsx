import styles from "./Form.module.css";
import { useState } from "react";
import { redirect } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

/*eslint-disable */


const LoginForm = () => {

  var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const login = async (username, password) =>  {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password })
    };
    await fetch('https://dhodonto.ctdprojetos.com.br/auth', requestOptions)
        .then(response => {

            response.json().then(data => {

            console.log(data)

            localStorage.setItem("token", data.token);
            setToken(data.token);
            window.location.href = "http://localhost:3000/home"
            toast.success('Login feito com sucesso');
          }).catch(e => {
            toast.error('Error ao fazer login, verifique seus dados e tente novamente.')
          })
        })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validate = await validateFields(username, password);

    if (validate) {
      await login(username, password);
    }
  }

  async function validateFields(username, password) {
    if (username == "" || password == "") {
      messageError("Login ou Senha não pode ser nulos.")
    }

    else if (username.length < 3 | password.length < 3) {
      messageError("Username ou Senha precisa ser maior que 3 caracters")
    }
    else {
      return true;
    }
  }

  const messageError = (message) => {
    toast.error(message,{
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }

  return (
    <>
   <ToastContainer />
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center card container ${styles.card}`}
      >
        <div className={`card-body ${styles.CardBody}`}>
          <form>
            <input className={`form-control ${styles.inputSpacing}`}
            placeholder="Login"
            name="login"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            />

            <input className={`form-control ${styles.inputSpacing}`}
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            />
            <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
