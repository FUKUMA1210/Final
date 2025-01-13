import React, { useState } from "react";
import { Container, Form, Button, Toast } from "react-bootstrap";
import { asyncPost } from "../utils/fetch";

export default function AddComment() {
  const [commentText, setCommentText] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // 添加留言邏輯
  const handleAddComment = async () => {
    if (!commentText.trim()) {
      setToastMessage("請輸入留言內容");
      setShowToast(true);
      return;
    }

    const commentData = {
      text: commentText,
    };

    const response = await asyncPost("/api/v1/comment/addComment", commentData);

    if (response.code === 201) {
      setToastMessage("留言新增成功！");
      setCommentText("");
    } else {
      setToastMessage(response.message || "留言新增失敗");
    }
    setShowToast(true);
  };

  return (
    <Container className="add-comment-container mt-4">
      <h1 className="text-center">新增留言</h1>
      <Form>
        <Form.Group controlId="commentText">
          <Form.Label>留言內容</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="輸入留言內容"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="comment-textarea"
          />
        </Form.Group>
        <Button
          variant="primary"
          className="mt-3 w-100"
          onClick={handleAddComment}
        >
          發佈留言
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
