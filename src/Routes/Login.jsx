import LoginForm from "../Components/LoginForm";
import { useTheme } from "../hooks/useTheme";

const Contact = () => {

  const { theme } = useTheme()

  return (
    <>
      <h1 className={`h1-${theme}`}>Login</h1>
      <LoginForm />
    </>
  );
};

export default Contact;
