import { createContext, useContext } from "react"
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthProvider(props) {

  async function login(username, password) {

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    };

    await fetch(
      "https://dhodonto.ctdprojetos.com.br/auth",
      requestOptions
    ).then((response) => {
      response
        .json()
        .then((data) => {
          console.log(data);

          localStorage.setItem("token", data.token);
          toast.success("Login feito com sucesso");
          setTimeout(() => window.location.href = "/home", 2000)          
        })
        .catch((e) => {
          toast.error(
            "Error ao fazer login, verifique seus dados e tente novamente."
          );
        });
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setTimeout(() => window.location.href = "/login", 2000)          
  }

  return (
    <AuthContext.Provider value={{
      login,
      logout
    }}>
      { props.children }
     </AuthContext.Provider>
  )
};

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}
