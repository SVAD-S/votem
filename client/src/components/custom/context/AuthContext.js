import { createContext, useEffect, useReducer } from "react";
import {
  CLEAR_LOADING,
  LOGIN_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_LOADING,
} from "./type";

const INITIAL_STATE = {
  user: JSON.parse(sessionStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        user: null,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        user: null,
        loading: false,
        error: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);
  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  const setLoading = () => {
    dispatch({
      type: SET_LOADING,
    });
  };
  const clearLoading = () => {
    dispatch({
      type: CLEAR_LOADING,
    });
  };
  return (
    <AuthContext.Provider
      value={{ ...state, dispatch, setLoading, clearLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
