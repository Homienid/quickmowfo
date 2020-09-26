import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import StripeElement from '../StripeCard';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import InputMask from 'react-input-mask';
import "./style.css";

const Checkout = ({state, setState, order, setOrder, validateInput, errors, clearState, setReceipt}) => {
    const history = useHistory();

    {if(order.service.price == undefined) history.push('/')}

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

      const goBack = () => {
        history.push('/services')
      }

    return(
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className='input'>
                    <button className="return_button" onClick={goBack}><FaArrowLeft/>{state.language == 1 
                    ? "Return"
                    : "Regresar"
                    }</button>

                    <div>
                        {state.language == 1 
                        ? "Name"
                        : "Nombre"
                        }:
                        <br/>
                        <input 
                          name="name"
                          className={`${errors.name && 'error'}`}
                          placeholder={`${state.language == 1 ? "Enter your name..." : "Ingrese su nombre..."}`}
                          value={order.name} 
                          type="text"
                          onChange={(e) => setOrder({ ...order, name: e.target.value})}
                          ></input>
                          <div className="red_font">{errors.name}</div>
                    </div>

                    <div>
                        {state.language == 1 
                        ? "Email"
                        : "Correo Electronico"
                        }:
                        <br/>
                        <input 
                          name="email"
                          className={`${errors.email && 'error'}`}
                          placeholder={`${state.language == 1 ? "Enter your email..." : "Ingrese su correo electronico..."}`}
                          value={order.email} 
                          type="text"
                          onChange={(e) => setOrder({...order, email: e.target.value})}></input>
                          <div className="red_font">{errors.email}</div>
                    </div>
                    <div>
                        {state.language == 1
                        ? "Phone"
                        : "Number Telefonico"
                      }:
                        <br/>
                        <InputMask 
                          name="phone"
                          mask={order.phone != '' && `(999) 999-9999`} 
                          type="text" name="phone" 
                          className={`${errors.phone && 'error'}`}
                          value={order.phone}
                          placeholder={`${state.language == 1 ? "Enter your phone number..." : "Ingrese su numero telefonico..."}`}
                          onChange={(e) => setOrder({ ...order, phone: e.target.value} )}>
                  
                        </InputMask>
                        <div className="red_font">{errors.phone}</div>
                    </div>
                    <hr/>
                    <div className='credit_card_media border_top'>
                        {/* <div style={{fontSize: "10px"}}>{state.language == 1 ? "Pay with credit/debit card" : "Pagar con tarjeta de credito/debito"}:<br/></div> */}
                        <StripeElement order={order} setOrder={setOrder} state={state} setState={setState} clearState={clearState} validateInput={validateInput} errors={errors} setReceipt={setReceipt}/>
                    </div>
                    <div>
                      Total: ${order.service.price}
                    </div>
        </motion.div>
    )
}

export default Checkout