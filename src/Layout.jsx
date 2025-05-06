import { Outlet } from 'react-router'
import Nav from './Nav'
import Footer from './Footer'

export default function Layout({ context }) {
    return (
        <div id='root_c'>
            <div className='nav_c'>
                <Nav />
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
