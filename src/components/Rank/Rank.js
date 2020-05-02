import React from 'react'

import './Rank.css'



const Rank = ({ name, entier }) => {
    return (
        <div>
            <div className='white f3'>
                {`abcnd ${name} your current entire count is.... `}

            </div>
            <div className='white f1'>
                {`${entier}`}

            </div>

        </div>


    )



}
export default Rank;