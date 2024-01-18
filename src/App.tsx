import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage";
import { useState } from "react";
import { AuthContext, IAuthState, initialState } from "./state/auth.state";
import { PrivateRoutes } from "./components/privateRoutes/PrivateRoutes";
import SearchPage from "./pages/searchPage/SearchPage";


function App() {
  const [auth, setAuth] = useState<IAuthState>(initialState);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/search"
            element={
              <PrivateRoutes>
                <SearchPage />
              </PrivateRoutes>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
