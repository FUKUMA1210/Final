import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/MessageBoard.css';
import { getAllComments, addComment } from '../utils/fetch';

interface Reply {
    user: string;
    text: string;
    date: string;
}

interface Comment {
    id: number;
    user: string;
    text: string;
    date: string;
    replies: Reply[];
}

export default function MessageBoard() {
    const currentDate = new Date();
    
    // 記錄留言的 state，包含主留言和回復
    const [comments, setComments] = useState<Comment[]>([
        { id: 1, user: 'user', text: '留言文字', date: currentDate.toLocaleDateString(), replies: [] },
        { id: 2, user: 'user', text: '留言文字', date: currentDate.toLocaleDateString(), replies: [] },
        { id: 3, user: 'user', text: '留言文字', date: currentDate.toLocaleDateString(), replies: [] },
    ]);
    
    const [newComment, setNewComment] = useState('');
    const [editCommentId, setEditCommentId] = useState<number | null>(null); // 用來標記當前正在編輯的留言
    const [editText, setEditText] = useState('');
    const [replyText, setReplyText] = useState('');
    const [replyTo, setReplyTo] = useState<number | null>(null); // 用來標記正在回復的留言


    const navigate = useNavigate();

    // 初始化時獲取留言
    useEffect(() => {
        const loadComments = async () => {
            try {
                const fetchedComments = await getAllComments();
                setComments(fetchedComments);
            } catch (error) {
                console.error('Failed to load comments:', error);
            }
        };
        loadComments();
    }, []);

    // 添加新留言
    const handleAddComment = async () => {
        if (newComment.trim()) {
            try {
                const newCommentData = await addComment(newComment);
                setComments([...comments, { ...newCommentData, replies: [] }]);
                setNewComment('');
            } catch (error) {
                console.error('Failed to post comment:', error);
            }
        }
    };

    // 編輯留言
    const handleEdit = (id: number, text: string) => {
        setEditCommentId(id);
        setEditText(text);
    };

    const handleSaveEdit = () => {
        if (editCommentId !== null) {
            setComments(comments.map(comment => 
                comment.id === editCommentId ? { ...comment, text: editText } : comment
            ));
            setEditCommentId(null);
            setEditText('');
        }
    };

    // 刪除留言
    const handleDelete = (id: number) => {
        setComments(comments.filter(comment => comment.id !== id));
    };

    // 添加回復
    const handleAddReply = (id: number) => {
        if (replyText.trim()) {
            setComments(comments.map(comment =>
                comment.id === id
                    ? { 
                        ...comment, 
                        replies: [
                            ...comment.replies, 
                            { user: 'user', text: replyText, date: new Date().toISOString().split('T')[0] }
                        ]
                    }
                    : comment
            ));
            setReplyText('');
            setReplyTo(null);
        }
    };

    // 顯示登出
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
                                    <button onClick={() => handleEdit(comment.id, comment.text)}>編輯</button>
                                </div>
                            </div>
                            {editCommentId === comment.id ? (
                                <div>
                                    <input 
                                        type="text" 
                                        value={editText} 
                                        onChange={e => setEditText(e.target.value)} 
                                    />
                                    <button onClick={handleSaveEdit}>保存</button>
                                </div>
                            ) : (
                                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{comment.text}</p>
                            )}
                            <div className="comment-header">
                                {comment.date && <small>{comment.date}</small>}
                                <p className='space'></p>
                                <button className="reply" onClick={() => setReplyTo(comment.id)}>回復</button>
                            </div>

                            {/* 顯示回復 */}
                            {comment.replies.map((reply, index) => (
                                <div key={index} className="reply">
                                    <span>{reply.user}</span>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{reply.text}</p>
                                    <small>{reply.date}</small>
                                </div>
                            ))}

                            {/* 回復輸入框 */}
                            {replyTo === comment.id && (
                                <div className="reply-input">
                                    <input 
                                        type="text" 
                                        placeholder="輸入回復" 
                                        value={replyText} 
                                        onChange={e => setReplyText(e.target.value)} 
                                    />
                                    <button onClick={() => handleAddReply(comment.id)}>發送回復</button>
                                </div>
                            )}
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
