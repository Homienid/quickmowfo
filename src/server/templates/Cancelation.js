import React from 'react'
import { renderToString } from 'react-dom/server'

const Cancelation = () => {
    const style={
        container: {
            maxWidth: "400px",
            height: "85%",
            border: "1px solid black",
            borderRadius: "5px",
            margin: '0 auto',
            padding: '10px'
        }
    }
    return(
        <div style={style.container}>
            <div>
                <img src="https://drive.google.com/uc?export=view&id=130Z0QS2ezMB7IBP0QEJJGUZBy5VVY9xS" width="640" height="50" style={{width: '150px'}}></img>
            </div>
            You order has been cancelled. You should recieve a refund within 15 days.
        </div>

    )
}

export default () => renderToString(<Cancelation/>)