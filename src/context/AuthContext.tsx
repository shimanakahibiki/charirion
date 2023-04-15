import React, { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const auth = getAuth();

type ContextProps = {
  isLoggedIn: boolean; // 認証状態(true: ログイン中, false: 未ログイン)
  uid: string; // ユーザに与えられる一意の識別子
  email: string | null; // メールアドレス
  name: string; // ニックネーム
  role: number; // ロール(0: 一般, 1: 管理者)
};
const initUser = { isLoggedIn: false, uid: "", email: "", name: "", role: 0 };
export const AuthContext = createContext<ContextProps>(initUser);
export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<ContextProps>(initUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        const email = user.email;

        const docRef = doc(db, "users", uid);
        const docSnap = getDoc(docRef);

        docSnap
          .then((result) => {
            const data = result.data();

            setUser({
              isLoggedIn: true,
              uid: uid,
              email: email,
              name: data?.name,
              role: data?.role,
            });
          })
          .catch((err) => {
            console.log(err);
          });

      }
    });

  }, []);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
