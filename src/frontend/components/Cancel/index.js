import React, { useState } from 'react';
import {motion} from 'framer-motion';
import { Link, useParams } from 'react-router-dom';

const Cancel = ({state, setState}) => {
    const [cancelMessage, setCancelMessage] = useState('');
    const { order_id } = useParams();
    console.log(order_id)

    const cancelOrder = () => {
      setState({
        ...state,
        loading: true
      })
        fetch(`/cancel`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({order_id})
        })
        .then(res => res.json())
        .then(res => {
          setState({
            ...state,
            loading: false
          })
          setCancelMessage(res.message)
        });
    };

    const pageVariants = {
        initial: {
          opacity: 0,
        },
        in: {
          opacity: 1,
        },
        out: {
          opacity: 0,
        },
      }

    return(
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className='input'>
            {/* <Link to ={`/cancel/0c1c6e12-524b-46fe-a5b6-3f7967e64a7d`}>cancel</Link> */}

            {cancelMessage == '' 
            ? 'Are you sure you want to cancel your order?'
            : cancelMessage}  
            <br/>
            {cancelMessage == '' &&
              <div style={{width: '100%', display: "flex", justifyContent: 'center'}}>
              <button style={{margin: '0 auto', width: '50px'}} onClick={() => cancelOrder()}>Yes</button> 
            </div>
            }
        </motion.div>
    )
}

export default Cancel