import { createContext, useState } from "react";

const UserContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export default UserContext;

export function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const login = () => {
    
  }
}