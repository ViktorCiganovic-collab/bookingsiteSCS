import { Outlet } from 'react-router';
import NavComponent from './Nav';
import Footer from './Footer';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from "react"; 

export default function Layout({ context }) {

    
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true, // Only animate once while scrolling down
    });
  }, []);

    return (
        <div id='root_c'>
            <div className='nav_c'>
                <NavComponent />
            </div>
            <div>
                <Outlet context={context} />

                <div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
