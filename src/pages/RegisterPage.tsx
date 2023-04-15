import { useContext, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const RegisterPage = () => {
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const auth = getAuth();
  const navigate = useNavigate();
  const context = useContext(AuthContext);


  const handleChangeName = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setName(event.target.value);
  };

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

  const handleRegisterButton = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        console.log(user.uid);

        try {
          setDoc(doc(db, "users", user.uid), {
            name: name,
            role: 0, // 0: user, 1: admin
          })
            .then((result) => {
              console.log(result);
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (e) {
          console.error("Error adding document: ", e);
        }

        navigate("/login");
      })
      .catch((error) => {
        setAlert(true);
        if (error.code === "auth/email-already-in-use") {
          setAlertMessage("このメールアドレスは既存です");
        } else if (error.code === "auth/weak-password") {
          setAlertMessage("パスワードは６文字以上です");
        } else if (error.code === "auth/invalid-email"){
          setAlertMessage("メールに不備があります(例：○○@△△.com)");
        }
        // else if (email === "") {
        //   setAlertMessage("Emailが未入力です");
        // } else if (name === "") {
        //   setAlertMessage("Your nameが未入力です");
        // } else if (password === "") {
        //   setAlertMessage("passwordが未入力です");
        // } 
        else {
          setAlertMessage("入力に不備があります");
        }
        console.log(error.code)
        // const errorCode = error.code;
        // const errorMessage = error.message;
      });
  };

  return (
    <>
      {context.isLoggedIn ? (
        <Navigate to={"/"} />
      ) : (
        <>
          <h1>新規登録</h1>
          {alert && <Alert variant="danger">{alertMessage}</Alert>}

          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Your name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={handleChangeName}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleChangeEmail}
              />
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
            <Button
              variant="primary"
              type="button"
              onClick={handleRegisterButton}
            >
              Submit
            </Button>
            <br></br>
            <small>
              <Link to={"/login"}>ログインはこちら</Link>
            </small>
          </Form>
        </>
      )}
    </>
  );
};

export default RegisterPage;
