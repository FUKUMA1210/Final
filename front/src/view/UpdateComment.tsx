import React, { useState } from "react";
import { Container, Form, Button, Toast } from "react-bootstrap";
import { asyncPatch } from "../utils/fetch";

export default function UpdateComment() {
  const [commentId, setCommentId] = useState("");
  const [newCommentText, setNewCommentText] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleUpdateComment = async () => {
    if (!commentId || !newCommentText) {
      setToastMessage("請輸入留言 ID 和新的內容");
      setShowToast(true);
      return;
    }

    const response = await asyncPatch(`/api/v1/comment/update/${commentId}`, { text: newCommentText });
    if (response.code === 200) {
      setToastMessage("留言更新成功");
    } else {
      setToastMessage("留言更新失敗");
    }
    setShowToast(true);
  };

  return (
    <Container className="update-comment-container mt-4">
      <h1 className="text-center">更新留言</h1>
      <Form>
        <Form.Group controlId="commentId">
          <Form.Label>留言 ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="輸入留言 ID"
            value={commentId}
            onChange={(e) => setCommentId(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="newCommentText" className="mt-3">
          <Form.Label>新的留言內容</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="輸入新的留言內容"
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          className="mt-3 w-100"
          onClick={handleUpdateComment}
        >
          更新留言
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
