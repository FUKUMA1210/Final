import { useNavigate } from 'react-router-dom';
import Footer from '../component/Footer';
import '../style/Frontpage.css';
import myImage from '../assets/images/MessageBoard.jpg';

export default function Frontpage() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/add-user');
    };

    return (
        <div className="frontpage">
            {/* 頂部導航欄 */}
            <div className="top-bar">
                <p className="top-bar-title">TKU留言板</p>
                <div className="spacer"></div>
                <a className="nav-link" onClick={handleLogin}>
                    登入
                </a>
                <p className="separator">|</p>
                <a className="nav-link" onClick={handleRegister}>
                    註冊
                </a>
            </div>

            {/* 中間圖片區域 */}
            <div className="image-container">
                <img src={myImage} alt="留言板" className="frontpage-image" />
            </div>

            {/* 底部區域 */}
            <Footer />
        </div>
    );
}
