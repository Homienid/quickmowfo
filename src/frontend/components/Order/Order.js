import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {motion} from 'framer-motion';
import './style.css';

const Order = ({receipt, clearState}) => {
    const history = useHistory();

    // receipt = {
    //     order_id: '23495870jf',
    //     timestamp: "2020",
    //     name: "Luis",
    //     email: "luis.coolface@gmail.com",
    //     address: "220 zengele ave",
    //     phone: "787-249-3369"
    // }

    console.log(receipt);
    
    useEffect(() => {
        clearState();
    }, [])

    const goHome = () => {
      clearState()
      history.push('/')
    }

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
            className="invoice_media">


            <div>
                You order has been placed.
            </div>
            <div>
                A copy of this receipt was sent to your email.
            </div>

            <table class="">
                <tr>
                    <td>Order ID</td>
                    <td>#{receipt.order_id}</td>
                </tr>
                <tr>
                    <td>Transaction Date</td>
                    <td>{new Date(receipt.timestamp).toDateString()}</td>
                </tr>
            </table>

            <table class="">
                <tbody>
                    <tr>
                        <td>Customer</td>
                        <td>{receipt.name}</td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td>{receipt.phone}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{receipt.email}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>{receipt.address}</td>
                    </tr>
                    <tr>
                        <td>Service Date</td>
                        <td>{new Date(receipt.date).toDateString()}, {receipt.time}</td>
                    </tr>
                </tbody>
            </table>

            <table class="">
                <tr>
                    <th>Item</th>
                    <th>Price</th>
                </tr>
                <tr>
                    <td>Lawn Mow</td>
                    <td>${receipt.service.price}</td>
                </tr>
            </table>
            <button onClick={() => history.push('/')}>Go Home</button>
      </motion.div>
    )
}

export default Order