import React, { useEffect, useState } from "react";
import { Container, Button, Toast, ListGroup } from "react-bootstrap";
import { asyncGet, asyncDelete } from "../utils/fetch";
import "../style/MessageBoard.css";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await asyncGet("/api/v1/comment/getAllComments");
      if (response.code === 200) {
        setComments(response.body || []);
      } else {
        setToastMessage("無法獲取留言");
        setShowToast(true);
      }
    };

    fetchComments();
  }, []);

  const handleDelete = async (id: string) => {
    const response = await asyncDelete(`/api/v1/comment/delete/${id}`);
    if (response.code === 200) {
      setToastMessage("留言刪除成功");
      setComments(comments.filter((comment: any) => comment._id !== id));
    } else {
      setToastMessage("刪除留言失敗");
    }
    setShowToast(true);
  };

  return (
    <Container className="comments-container mt-4">
      <h1 className="text-center">留言列表</h1>
      <ListGroup>
        {comments.map((comment: any) => (
          <ListGroup.Item key={comment._id} className="d-flex justify-content-between align-items-center">
            <div>
              <p>{comment.text}</p>
              <small>發佈者: {comment.user}</small>
            </div>
            <Button variant="danger" onClick={() => handleDelete(comment._id)}>
              刪除
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

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
