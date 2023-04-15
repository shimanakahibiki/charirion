import { useState, useContext } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const context = useContext(AuthContext);


  const handleChangeEmail = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  const handleLoginButton = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/");
      })
      .catch((error) => {
        setAlert(true);
          setAlertMessage("EmailまたはPasswordが間違っています");
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.log(error);
      });
  };

  return (
    <>
      {context.isLoggedIn ? (
        <>
          <Navigate to={"/"} />
        </>
      ) : (
        <>
          <h1>ログイン</h1>
          {alert && <Alert variant="danger">{alertMessage}</Alert>}

          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleChangeEmail}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handleChangePassword}
              />
            </Form.Group>
            <Button variant="primary" type="button" onClick={handleLoginButton}>
              Submit
            </Button>
            <br></br>
            <small>
              <Link to={"/register"}>新規登録はこちら</Link>
            </small>
          </Form>
        </>
      )}
    </>
  );
};

export default LoginPage;
