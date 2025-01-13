import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Toast } from "react-bootstrap";
import { asyncPut } from "../utils/fetch";
import "../style/AddUser.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password) {
      setToastMessage("所有欄位都是必填的");
      setShowToast(true);
      return;
    }
    if (password.length < 6) {
      setToastMessage("密碼長度應該大於等於 6 位");
      setShowToast(true);
      return;
    }
  
    try {
      const response = await asyncPut("/api/v1/user/addUser", { username, password });
  
      if (response.code === 201) {
        setToastMessage("註冊成功！請返回主頁點擊登入");
        setTimeout(() => navigate("/"), 3000); // 自動跳轉到主頁
      } else {
        setToastMessage(response.message || "註冊失敗");
      }
    } catch (error) {
      setToastMessage("伺服器錯誤，請稍後再試");
    } finally {
      setShowToast(true);
    }
  };

  return (
    <Container className="register-page mt-4">
      <h1 className="text-center">註冊帳號</h1>
      <Form>
        <Form.Group controlId="username">
          <Form.Label>使用者名稱</Form.Label>
          <Form.Control
            type="text"
            placeholder="輸入使用者名稱"
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
        <Button
          variant="primary"
          className="mt-3 w-100"
          onClick={handleRegister}
        >
          註冊
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
