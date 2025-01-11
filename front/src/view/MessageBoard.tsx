import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/MessageBoard.css';

export default function MessageBoard() {
        const currentDate = new Date();
      
    const [comments, setComments] = useState([
        { id: 1, user: 'user', text: '留言文字', date: currentDate.toLocaleDateString() },
        { id: 2, user: 'user', text: '留言文字', date: currentDate.toLocaleDateString() },
        { id: 3, user: 'user', text: '留言文字', date: currentDate.toLocaleDateString() },
    ]);
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments([
                ...comments,
                {
                    id: comments.length + 1,
                    user: 'user',
                    text: newComment,
                    date: new Date().toISOString().split('T')[0],
                },
            ]);
            setNewComment('');
        }
    };

    const handleDelete = (id: number) => {
        setComments(comments.filter(comment => comment.id !== id));
    };

    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div>
            <div className="top-bar2">
                    <a onClick={handleLogout}>登出&nbsp;&nbsp;&nbsp;</a>
                </div>
            <h1>想說什麼？</h1>
        <div className="message-board">
            <div className="comment-list">
                {comments.map(comment => (
                    <div key={comment.id} className="comment">
                        <div className="comment-header">
                            <span>{comment.user}</span>
                            <p className='space'></p>
                            <div className="actions">
                                <button onClick={() => handleDelete(comment.id)}>刪除</button>
                                <button>編輯</button>
                            </div>
                        </div>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{comment.text}</p>
                        <div className="comment-header">
                        {comment.date && <small>{comment.date}</small>}
                        <p className='space'></p>
                        <button className="reply">回復</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="comment-input">
                <input
                    type="text"
                    placeholder="輸入文字來留言"
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                />
                <button onClick={handleAddComment}>發送</button>
            </div>
        </div>
        </div>
    );
}
