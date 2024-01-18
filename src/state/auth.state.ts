import { createContext, useContext } from "react";

export type TAuthContext = {
  auth: IAuthState;
  setAuth: (state: IAuthState) => void;
};

export interface IUser {
  email: string;
  password: string;
}

export interface IAuthState {
  isLogged: boolean;
  user: IUser | null;
}

export const initialState: IAuthState = {
  isLogged: false,
  user: null,
};
// Contexto de autenticación para compartir el estado de autenticación en toda la aplicación.
export const AuthContext = createContext<TAuthContext>({
  auth: initialState,
  setAuth: () => {},
});

export const useStateContext = () => useContext(AuthContext);
