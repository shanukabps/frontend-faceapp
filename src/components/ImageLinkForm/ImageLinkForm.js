import React from 'react'
import './ilf.css'




const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div className=' ma4'>

            <p className='f3 tc'>
                {'majic brain detec face in your pictures'}
            </p>

            <div className='center'>
                <div className=' form center pa4 br3 shadow-3'>
                    <input className='f4 pa1 w-70 center' type="text" name="inputphoto" id="iphoto" onChange={onInputChange} />
                    <button className='w-30 grow shadow-2 f4 link ph3 pv1 dib white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>

        </div>


    )



}
export default ImageLinkForm;