import React from "react";
import LoginForm from "../../components/loginForm/LoginForm";
import "./LoginPage.css"

const LoginPage: React.FC = () => {
  return (
    <div className="container-login">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
