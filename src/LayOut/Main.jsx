
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import Footer1 from '../Pages/Shared/Footer1/Footer1';

const Main = () => {
    const location = useLocation();
   
    const isLogin = location.pathname.includes('/login');
    return (
        <div>
            {isLogin || <Navbar></Navbar>}
            <Outlet></Outlet>
           {/* { isLogin || <Footer></Footer>} */}
           {isLogin || <Footer1></Footer1>}
        </div>
    );
};

export default Main;