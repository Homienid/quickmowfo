import React from 'react'
import { renderToString } from 'react-dom/server';

const Order = ({order}) => {
    const styles = {
        container: {
            border: '.5px solid #d4d6d5',
            boxShadow: '1px 1px 2px grey',
            padding: '20px',
            fontFamily: 'sans-serif',
            maxWidth: "500px",
            margin: '0 auto'
        },
        button: {
            animationName: 'breathe',
        },
        table: {
            border: "1px solid black",
            width: '100%',
            borderRadius: "3px",
            margin: "10px 0",
            tableLayout: 'fixed',
            wordWrap: 'break-word',
            boxSizing: 'border-box',
            // backgroundColor: '#52AF47'
        },
        tr: {
            border: '1px solid black'
        },
        bordered: {
            // borderBottom: "1px solid black",
            backgroundColor: '#E9EBEA',
            padding: '2px',
            textAlign: 'left'
        },
        cancel: {
            // border: "1px solid red",
            borderRadius: "5px",
            padding: "5px",
            textDecoration: 'none',
            marginTop: '20px',
            color: "white",
            backgroundColor: 'red',
            backgroundImage: 'linear-gradient(to right, #ed213a, #93291e)',
        },
    }

    // var order = {}
    // order.order_id = "123098"
    // order.timestamp = "111"
    // order.name = "Luis"
    // order.phone = "(787)-249-3369"
    // order.email = 'luis.coolface@gmail.com'
    // order.address = "220 Zengele Ave."
    // order.cardLast4 = "3239"
    // order.date = "09/15/2020"

    return(<>
        <div class="invoice_media" style={styles.container}>
        <div class="" >
            <div>
            <img src="https://drive.google.com/uc?export=view&id=130Z0QS2ezMB7IBP0QEJJGUZBy5VVY9xS" width="640" height="50" style={{width: '150px'}}></img>
            </div>
        </div>

        <table style={styles.table}>
            <tr style={styles.tr}>
                <td style={styles.bordered}>Order ID</td>
                <td style={styles.bordered}>{order.order_id}</td>
            </tr>
            <tr style={styles.tr}>
                <td style={styles.bordered}>Transaction Date</td>
                <td style={styles.bordered}>{new Date(order.timestamp).toDateString()}</td>
            </tr>
        </table>

       
        <table style={styles.table}>
            <tr style={styles.tr}>
                <td style={styles.bordered}>Customer</td>
                <td style={styles.bordered}>{order.name}</td>
            </tr>
            <tr style={styles.tr}>
                <td style={styles.bordered}>Phone</td>
                <td style={styles.bordered}>{order.phone}</td>
            </tr>
            <tr style={styles.tr}>
                <td style={styles.bordered}>Email</td>
                <td style={styles.bordered}>{order.email}</td>
            </tr>
            <tr style={styles.tr}>
                <td style={styles.bordered}>Address</td>
                <td style={styles.bordered}>{order.address}</td>
            </tr>
            <tr style={styles.tr}>
                <td style={styles.bordered}>Service Date</td>
                <td style={styles.bordered}>{new Date(order.date).toDateString()}, {order.time}</td>
            </tr>
            <tr style={styles.tr}>
                <td style={styles.bordered}>Payment Method</td>
                <td style={styles.bordered}>xxxx-xxxx-xxxx-{order.cardLast4}</td>
            </tr>
        </table>
        <table style={styles.table}>
            <tr style={styles.tr}>
                <th style={styles.bordered}>Item</th>
                <th style={styles.bordered}>Price</th>
            </tr>
            <tr style={styles.tr}>
                <td style={styles.bordered}>Lawn Mow</td>
                <td style={styles.bordered}>${order.service.price}</td>
            </tr>
        </table>

        <div class="invoice_total">
            Total: ${order.service.price}
        </div>
        <div style={{marginTop: "10px"}} >
            <a href={`https://quickmowfo.com/cancel/${order.order_id}`} style={styles.cancel}>Cancel Order</a>
        </div>
    </div>
    </>)
};

export default (order) => renderToString(<Order order={order}/>)