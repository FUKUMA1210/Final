import '../style/register.css';
import Footer from '../component/Footer';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


//註冊畫面
export default function register() {
    // 註冊表單的狀態
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 處理註冊邏輯
  const handleRegister = () => {
    // 基本的表單驗證
    if (!username || !email || !password) {
      setError('所有欄位都是必填的');
      return;
    }
    if (password.length < 6) {
      setError('密碼長度應該大於等於 6 位');
      return;
    }
    // 進行註冊邏輯
    alert('註冊成功！請按 TKU留言板 回到主頁點登入');
    }
    const navigate = useNavigate();
    const handleFrontpage = () => {
        navigate('/');
    }

    return (
            <div>
                <div className="top-bar">
                    <p><a onClick={handleFrontpage}>TKU留言板</a></p>
                </div>
    
                {/* 登入畫面 */}
                <div>
                    <div className='d1'>註冊帳號</div>
                    <input className='i1' type="text" placeholder="輸入使用者名稱" value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                    <input className='i1' type="text" placeholder="輸入電子郵件" value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                    <input className='i1' type="text" placeholder="輸入密碼" value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                    <div className='flex-center1'>
                        <button className='bt1' onClick={handleRegister}>註冊</button>
                    </div>
                </div>
                <Footer />
            </div>
        );
}
