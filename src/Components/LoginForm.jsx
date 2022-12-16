import styles from "./Form.module.css";
import { useEffect, useState } from "react";
import { messageError  } from "../functions/toast";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";

const LoginForm = () => {
  const { login } = useAuth();
  const { theme } = useTheme()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    localStorage.getItem('token') != null ? window.location.href = "/home" : null;
  }, []);

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

    else if (username.length < 5) {
      messageError("Username não pode ser menor que 5 caracters")
    }
    else if (password.length < 3) {
      messageError("Senha não pode ser menor que 3 caracters")
    }
    else {
      return true;
    }
  }

  return (
    <>
   <ToastContainer />
      <div
        className={`text-center card container ${styles.card} ${theme}`}
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
