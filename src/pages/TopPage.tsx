import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Map from "../components/Map";
import { Navigate } from "react-router-dom";

const TopPage = () => {
  const context = useContext(AuthContext);

  return (
    <>
      {context.isLoggedIn ? (
        <>
          <Map />
        </>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
};

export default TopPage;
