import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser, useStateContext } from "../../state/auth.state";
import "./LoginForm.css";
import "boxicons/css/boxicons.min.css";
import bcrypt from "bcryptjs";

const LoginForm = () => {
  const { auth, setAuth } = useStateContext();
  const [isLoaded, setLoaded] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const userString: string | null =
      window.sessionStorage.getItem("_userCredential");
    if (userString) {
      const user = JSON.parse(userString);
      const isCeoPassword = bcrypt.compareSync(
        import.meta.env.VITE_PASSWORD_CEO,
        user.password
      );
      const isCeoEmail = import.meta.env.VITE_EMAIL_CEO === user.email;
      if (isCeoPassword && isCeoEmail) {
        setAuth({
          isLogged: true,
          user,
        });
        navigate("/search");
      } else {
        setLoaded(true);
      }
    } else {
      setLoaded(true);
    }
  }, []);

  const handleCorrectLogin = (user: IUser): void => {
    const hashPassword = bcrypt.hashSync(user.password, 12);
    user.password = hashPassword;
    window.sessionStorage.setItem("_userCredential", JSON.stringify(user));

    setAuth({
      isLogged: true,
      user,
    });
    navigate("/search");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      email === import.meta.env.VITE_EMAIL_CEO &&
      password === import.meta.env.VITE_PASSWORD_CEO
    ) {
      handleCorrectLogin({ email, password });
    } else {
      return window.alert("Credenciales incorrectas");
    }
  };

  return isLoaded ? (
    <form onSubmit={handleSubmit} className="loginForm">
      <h1 className="title">Bienvenido</h1>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <br></br>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit">Iniciar sesión</button>
    </form>
  ) : (
    <p>Cargando datos...</p>
  );
};

export default LoginForm;
