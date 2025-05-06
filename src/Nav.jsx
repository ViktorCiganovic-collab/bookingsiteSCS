import React from 'react'
import { Link } from 'react-router'

export default function Nav() {
    return (
        <div className='nav_c'>
            <div className='grid4 text_c'>
                <div><Link to='/'>Home</Link></div>
                <div><Link to='/cert'>Certifieringar</Link></div>
                <div><Link to='#'>Link A</Link></div>
                <div><Link to='#'>Link B</Link></div>
            </div>
        </div>
    )
}
