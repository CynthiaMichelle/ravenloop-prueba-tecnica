import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser, useStateContext } from "../../state/auth.state";
import "./LoginForm.css";
// Utilizando Bcrypt para el hash de contraseñas con el objetivo de mejorar la seguridad..
import bcrypt from "bcryptjs";

const LoginForm = () => {
  const { auth, setAuth } = useStateContext();
  const [isLoaded, setLoaded] = useState(false);

  const [email, setEmail] = useState("email@gmail.com");
  const [password, setPassword] = useState("1234");

  const navigate = useNavigate();

  useEffect(() => {
    const userString: string | null =
      window.sessionStorage.getItem("_userCredential");
    if (userString) {
      const user = JSON.parse(userString);
      // Comprobando las credenciales del CEO para acceder a ciertas funcionalidades.
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
    // Almacenando las credenciales del usuario en sessionStorage para persistencia de sesión.
    window.sessionStorage.setItem("_userCredential", JSON.stringify(user));

    if (auth) {
      setAuth({
        isLogged: true,
        user,
      });
      navigate("/search");
    }
  };
  // Manejo del formulario: Verificación de credenciales y presentación de mensajes de error.
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
