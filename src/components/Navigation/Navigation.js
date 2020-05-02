import React from 'react'
import './Navigation.css'



const Navigation = ({ onRouteChange, isSignin }) => {


    if (isSignin) {
        return (
            <nav className='navb'>
                <h4 onClick={() => onRouteChange('signout')} className='fs link dim black underline pa3 pointer'>Sing Out</h4>
            </nav>
        )
    } else
        return (
            <nav className='navb'>
                <h4 onClick={() => onRouteChange('signin')} className='fs link dim black underline pa3 pointer'>Sing in</h4>
                <h4 onClick={() => onRouteChange('register')} className='fs link dim black underline pa3 pointer'>Register</h4>
            </nav>
        )


}
export default Navigation;