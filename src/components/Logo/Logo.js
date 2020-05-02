import React from 'react'
import Tilt from 'react-tilt'
import './Log.css'
import robo from './a.png';


const Logo = () => {
    return (

        <div className="abc ma4 mt0">

            <Tilt className="Tilt br2 shadow-4" options={{ max: 25 }} style={{ height: 100, width: 100 }}>
                <div className="Tilt tc p3"> <img alt='logo' src={robo} /> </div>
            </Tilt>

        </div>


    )



}
export default Logo;