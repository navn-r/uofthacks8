import React, { createContext, useContext, useEffect, useState } from "react";

import firebase from "firebase/app";
import "firebase/auth";

import { auth } from "../../firebase/config";

const AuthContext = createContext(null as any);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  const [authState, setAuthState] = useState({
    user: null as firebase.User | null,
    authenticated: false,
    loading: true,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((newUser) => {
      setAuthState({
        user: newUser,
        authenticated: !!newUser,
        loading: false,
      })
    }
    );
    return unsubscribe;
  }, []);

  const login = async (cb: Function) => {
    try {
      await Promise.all([
        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL),
        auth.signInWithPopup(googleAuthProvider),
      ]);
      cb();
    } catch (err) {
      return console.error(err);
    }
  };

  const logout = async (cb: Function) => {
    try {
      await auth.signOut();
      cb();
    } catch (err) {
      return console.error(err);
    }
  };

  const value = {
    ...authState,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};