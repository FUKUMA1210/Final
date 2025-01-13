import React, { useState } from "react";
import { Container, Form, Button, Toast } from "react-bootstrap";
import { asyncPost } from "../utils/fetch";
import { useNavigate } from "react-router-dom";
import "../style/Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setToastMessage("請輸入帳號與密碼");
      setShowToast(true);
      return;
    }

    const response = await asyncPost("/api/v1/auth/login", { username, password });
    if (response.code === 200) {
      setToastMessage("登入成功！");
      navigate("/MessageBoard");
    } else {
      setToastMessage("登入失敗，請檢查帳號或密碼");
    }
    setShowToast(true);
  };

  return (
    <Container className="login-container mt-4">
      <h1 className="text-center">登入</h1>
      <Form>
        <Form.Group controlId="username">
          <Form.Label>帳號</Form.Label>
          <Form.Control
            type="text"
            placeholder="輸入帳號"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" className="mt-3">
          <Form.Label>密碼</Form.Label>
          <Form.Control
            type="password"
            placeholder="輸入密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" className="mt-3 w-100" onClick={handleLogin}>
          登入
        </Button>
      </Form>

      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        className="position-fixed top-0 start-50 translate-middle-x mt-3"
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </Container>
  );
}
