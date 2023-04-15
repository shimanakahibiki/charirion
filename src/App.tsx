import React from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import NavBar from "./components/NavBar";
import TopPage from "./pages/TopPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import MyPage from "./pages/MyPage";
import ChatRoom from "./pages/ChatRoom";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <NavBar />
          <Container className="mt-4">
            <main>
              <Routes>
                <Route path="/" element={<TopPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/chat/:id" element={<ChatRoom />} />
                <Route path='/*' element={<NotFound/>} />
              </Routes>
            </main>
          </Container>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
