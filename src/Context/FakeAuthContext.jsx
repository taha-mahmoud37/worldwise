import { createContext, useReducer } from "react";

const inintialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: false };
    case "logout":
      return { ...state, user: null, isAuthenticated: true };
    default:
      throw new Error("Unknown action ");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = createContext();

const [{ user, isAuthenticated }, dispatch] = useReducer(
  reducer,
  inintialState
);

function AuthProvider({ children }) {
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }
  function logout() {
    dispatch({ type: "logout"});
  }
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
}
