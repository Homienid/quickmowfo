import React, { useState } from 'react'
import "./style.css"

const LanguageSelector = ({state, setLanguage}) => {

    return(
    <div className="language_selector">
        <div className={`selected_bubble ${state.language == 1 ? 'english' : 'espanol'}`}>
            
        </div>
        <div className="languages">
            <div onClick={() => setLanguage(1)}>
                English
            </div>
            <div onClick={() => setLanguage(2)}>
                Español
            </div>
        </div>
    </div>
    )
}

export default LanguageSelector