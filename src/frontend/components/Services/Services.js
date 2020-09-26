import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft,FaArrowRight } from 'react-icons/fa';
import './style.css'

const Services = ({state, setState, order, setOrder}) => {
    const history = useHistory();
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
    };

    const services = [
      {
        id: 1,
        service: {
          en: "Lawn Mow",
          es: "Corte de Grama"
        },
        price: 50
      }
    ]

    const nextStep = () => {
      history.push('/checkout')
    };
    const goBack = () => {
      history.push('/')
    };
    return(
        <motion.div 
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className="input">
              
            <button className="return_button" onClick={goBack}><FaArrowLeft/>{state.language == 1 
            ? "Return"
            : "Regresar"
            }</button>
            
            <div className="services_header">{state.language == 1 
            ? "Choose the sevice you want from below:"
            : "Elija el servicio que desea:"
            }</div>
            <div className="">
                <select name="service" value={order.service} onChange={(e) => setOrder({ ...order, ...JSON.parse(e.target.value)})}>
                    <option disabled selected>{`${state.language == 1 ? "Click here to select..." : "Oprima aqui para seleccionar..."}`}</option>
                    {services.map(s => <option value={JSON.stringify({service: s})}>{s.service[state.language == 1 ? "en" : "es"]} | ${s.price}</option>)}
                    <option disabled>{`${state.language == 1 ? "More options coming in the future..." : "Habran mas opciones disponible pronto..."}`}</option>
                </select>
            </div>
            {/* <div
              className={`div-fade ${order.service == null && 'hidden'}`}>
              <br/>
              <hr/>
              {state.language == 1 
              ? "Frequency"
              : "Frequencia"
            }:
              <select name="frequency" value={order.frequency} onChange={(e) => setOrder({ ...order, frequency: e.target.value})}>
                  <option value={null} selected disabled>{state.language == 1 ? "Click here to select..." : "Oprima aqui para seleccionar..."}</option>
                  <option value={1}>{state.language == 1 ? "Once" : "Una vez"}</option>
                  <option value={2}>{state.language == 1 ? "Weekly - 20% off" : "Semanalmente - 20% descuento"}</option>
                  <option value={3}>{state.language == 1 ? "Monthly - 10% off" : "Mensualmente - 10% descuento"}</option>
              </select>
            </div> */}

            <div className={`div-fade ${order.service == null && 'hidden'}`}>
              <button onClick={nextStep} className="next_step_button" to='/checkout'>{state.language == 1 ? "Next" : "Continuar"} <FaArrowRight/></button>
            </div>
        </motion.div>
    )
}

export default Services