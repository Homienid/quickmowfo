import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from './QuickMowFo.svg';

const Header = ({state}) => {
    const history = useHistory();
    const [ espanol, setEspanol ] = useState(false)

    const handleRouter = () => {
        history.push('/information')
    };
    
    return(
        <>
            <Link to="/"><img src={logo} style={{width: '150px'}}></img></Link>
            {/* <img src={logo} style={{width: '100px'}}></img> */}
            <div><button onClick={handleRouter}>{state.language == 1 ? "Information" : "Informacion" }</button></div>
        </>
    )
}

export default Header