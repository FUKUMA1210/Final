import '../style/register.css';
import Footer from '../component/Footer';
import { useNavigate } from 'react-router-dom';

//註冊畫面
export default function register() {

    const navigate = useNavigate();
    const handleFrontpage = () => {
        navigate('/');
    };

    return (
            <div>
                <div className="top-bar">
                    <p><a onClick={handleFrontpage}>TKU留言板</a></p>
                </div>
    
                {/* 登入畫面 */}
                <div>
                    <div className='d1'>註冊帳號</div>
                    <input className='i1' type="text" placeholder="輸入使用者名稱" />
                    <input className='i1' type="text" placeholder="輸入密碼" />
                    <div className='flex-center1'>
                        <button className='bt1'>註冊</button>
                    </div>
                </div>
                <Footer />
            </div>
        );
}