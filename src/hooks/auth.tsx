import React, { createContext, useContext, useEffect, useState } from "react";
import * as AuthSessions from "expo-auth-session";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CLIENT_ID = "755a7e3ef101cbbe1058";
const SCOPE = "read:user";
const USER_STORAGE = "@nlwheat:user";
const TOKEN_STORAGE = "@nlwheat:token";

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
};

type AuthContextData = {
  user: User | null;
  isSigningIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthProvaiderProps = {
  children: React.ReactNode;
};
type AuthResponse = {
  token: string;
  user: User;
};
type AuthorizationResponse = {
  params: {
    code?: string;
    error?: string;
  };
  type?: string;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvaider({ children }: AuthProvaiderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(true);

  async function signIn() {
    try {
      setIsSigningIn(true);
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;

      const authSessionResponse = (await AuthSessions.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (
        authSessionResponse.type === "success" &&
        authSessionResponse.params.error !== "access_denied"
      ) {
        const authResponse = await api.post("/authenticate", {
          code: authSessionResponse.params.code,
        });
        const { user, token } = authResponse.data as AuthResponse;
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
        await AsyncStorage.setItem(TOKEN_STORAGE, token);
        setUser(user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSigningIn(false);
    }
  }

  async function signOut() {
    try {
      await AsyncStorage.removeItem(USER_STORAGE);
      await AsyncStorage.removeItem(TOKEN_STORAGE);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem(USER_STORAGE);
      const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);

      if (userStorage && tokenStorage) {
        api.defaults.headers.common["Authorization"] = `Bearer ${tokenStorage}`;
        setUser(JSON.parse(userStorage));
      }

      setIsSigningIn(false);
    }

    loadUserStorageData();
  }, []);
  return (
    <AuthContext.Provider value={{ user, isSigningIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvaider, useAuth };
