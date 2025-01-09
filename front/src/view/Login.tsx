import '../style/Login.css';
import Footer from '../component/Footer';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const handleFrontpage = () => {
        navigate('/');
    };
    const handleregister = () => {
        navigate('/Register');
    };
    const handleMessageBoard = () => {
        navigate('/MessageBoard');
    };

    return (
        <div>
            <div className="top-bar">
                <p><a onClick={handleFrontpage}>TKU留言板</a></p>
            </div>

            {/* 登入畫面 */}
            <div>
                <input type="text" placeholder="輸入使用者名稱" />
                <input type="text" placeholder="輸入密碼" />
                <div className='flex-center'>
                    <button>登入</button>
                </div>
                <div className='flex-center'>
                    <a onClick={handleregister}>註冊</a>
                </div>
            </div>
            <Footer />
        </div>
    );
}
