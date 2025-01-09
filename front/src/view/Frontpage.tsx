import '../style/Frontpage.css'
import Footer from '../component/Footer';
import myImage from '../assets/images/MessageBoard.jpg';
import { useNavigate } from 'react-router-dom';

export default function Frontpage() {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/Login');
    };

    const handleregister = () => {
        navigate('/register');
    };

    return (
            <div>
                {/* 頂部導航欄 */}
                <div className="top-bar">
                    <p>TKU留言板</p>
                    <div className="space"></div>
                    <a onClick={handleLogin}>登入</a>
                    <p>|</p>
                    <a onClick={handleregister}>註冊</a>
                </div>

                {/* 中間圖片區域 */}
                <div className="image-container">
                <img src={myImage} className="image"/>
                </div>

                {/* 底部區域 */}
                <Footer />
            </div>
        );
}