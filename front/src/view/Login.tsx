//import { useNavigate } from 'react-router-dom';
import '../style/Login.css';
//import { BaseImgPath } from '../data/BaseImgPath';
//import LandingNavBar from './LandingNavBar';
//import Footer from '../component/Footer';
//import { Button } from 'react-bootstrap';

export default function Landing() {
    //const bgImg = BaseImgPath + 'dish_bg.jpg'; // 背景圖片路徑
    //const navigate = useNavigate(); // 導航功能

    // 按下按鈕後跳轉到預約頁面
    //const handleReserveClick = () => {
    //    navigate('/DWRP');
    //};

    return (
        <div className="landing-page">
            
            {/* 背景與文字介紹 */}
            <div className="background-container">
                    <input type="text" placeholder="輸入使用者名稱"/>
                    <input type="text" placeholder="輸入密碼"/>
                <div className='flex-center'>
                <button>登入</button>
                </div>
                <div className='flex-center'>
                    <a href="../view/register.tsx">註冊</a>
                </div>
            </div>
        </div>
    );
}
