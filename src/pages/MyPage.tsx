import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const MyPage = () => {
  const context = useContext(AuthContext);

  return (
    <>
      {context.isLoggedIn ? (
        <>
          <h1>mypage</h1>
          <p>uid: {context.uid}</p>
          <p>name: {context.name}</p>
          <p>email: {context.email}</p>
          <p>isLoggedIn: {String(context.isLoggedIn)}</p>
        </>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default MyPage;
