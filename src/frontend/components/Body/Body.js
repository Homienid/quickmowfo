import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCcApplePay } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './style.css';
import moment from 'moment';
import { Map, GoogleApiWrapper } from 'google-maps-react'

const Body = ({state, order, errors, setErrors, setState, setOrder, clearState}) => {
    const history = useHistory();
    const [ mapsAc, setMapsAc ] = useState([]);

    const Map = ({google}) => GoogleApiWrapper({
        apiKey: 'AIzaSyD6qOUY3F4GA_8IiB4taXD58mfdNpYrPzM'
    })(<Map
            google={google}
            zoom={8}
            initialCenter={{ lat: 47.444, lng: -122.176}}
        />)
    // const RealMap = () => GoogleApiWrapper({
    //     apiKey: 'AIzaSyD6qOUY3F4GA_8IiB4taXD58mfdNpYrPzM'
    // })(Map)


    const getUnavailableDates = async () => {
        var dates =  await fetch('/availability', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({month: new Date().getTime()})
        })
        dates = await dates.json()
        dates = dates.map(d => new Date(d));
        console.log(dates)
        return dates
    };

    const handleAddressInput = async (e) => {
        setOrder({ ...order, address: e.target.value})
        let mapAc = await fetch(`/mapAc?input=${e.target.value}`)
        mapAc = await mapAc.json()
        setMapsAc(mapAc)
        console.log(mapAc)
    }

    const handleAddressClick = () => {
        clearState()
        setErrors({ ...errors, inRange: false})
    }

    const selectAddress = async (address) => {
        setState({ ...state, loading: true})
        setOrder({ ...order, address})
        setMapsAc([]);
        const distanceApiUrl = `/inRange?address=${address}`
        var distance = await fetch(distanceApiUrl)
        distance = await distance.json()
        console.log(distance)
        if(distance.inRange){
            var dates = await getUnavailableDates()
            setState({ ...state, unavailableDates: dates, inRange: true})
        } else {
            setErrors({ ...errors, inRange: true})
            setState({ ...state, inRange: false})
        }
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

      const nextStep = () => {
          history.push('/services');
      }

      const showMap = () => {
          document.getElementById('map_modal').style.display = 'flex'
      }
    
    return(
        <motion.div 
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className="input"> 
                
                {state.language == 1
                ? "Address"
                : "Direccion"
                }:
                <input 
                    value={order.address}
                    name="address" 
                    onClick={() => handleAddressClick()}
                    onChange={(e) => handleAddressInput(e) } 
                    placeholder={`${state.language == 1 ? "Enter your address here..." : "Introduzca su direccion aqui..."}`} type="text">
                </input>
                {!state.inRange && <button onClick={() => showMap()}>What areas do we cover?</button>}
                {errors.inRange && (state.language == 1 ? "Sorry we do not offer our services your area yet." : "Lo sentimos, aun no ofrecemos nuestros servicios en su area.") }
                
                <div className={`div-fade ${!mapsAc && 'hidden'}`}>
                    <div 
                        className={`ac`}
                        id="autocomplete">
                            {mapsAc && mapsAc.map(suggestion => 
                                <div name="address" 
                                    value={suggestion.description} 
                                    className="address_suggestion" 
                                    onClick={() => selectAddress(suggestion.description)}>
                                        {suggestion.description}
                                </div>)}
                    </div>
                </div>

                <div 
                    className={`div-fade ${!state.inRange && 'hidden'}`}>
                    {state.language == 1 
                    ? "Date"
                    : "Fecha"
                    }:<br/>
                    {<DayPicker
                        selectedDays={new Date(order.date)}
                        // onMonthChange={handleMonthChange}
                        onDayClick={(date) => setOrder({...order, date: new Date(date).getTime()})}
                        disabledDays={[
                            ...state.unavailableDates,
                            {
                                before: moment().add('days', 10).toDate()
                            }
                        ]}
                    />}
                </div>

                <div className={`div-fade ${(order.date == null || !state.inRange) && 'hidden'}`}>
                    {state.language == 1
                    ? "Time"
                    : "Hora"
                    }:<br/>
                    <select onChange={(e) => setOrder({...order, time: e.target.value })} value={order.time} placeholder={state.date} placeholder="Select a day to see if theres an available time slot..." className="" >
                        <option disabled selected>{state.language == 1 ? "Click here to select..." : "Oprima aqui para seleccionar..."}</option>
                        <option value="10:00AM">10:00AM</option>
                        <option value="12:00PM">12:00PM</option>
                        <option value="3:00PM">3:00PM</option>
                    </select>
                </div>

                <div className={`div-fade ${(order.time == null || !state.inRange) && 'hidden'}`}>
                    <button onClick={nextStep} className={`next_step_button`}>
                        {state.language == 1 ? "Next" : "Continuar"} <FaArrowRight/>
                    </button>
                </div>

        </motion.div>
    )
}

export default Body