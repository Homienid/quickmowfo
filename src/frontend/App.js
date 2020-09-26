import React, { useState, useEffect } from 'react'
import Header from './components/Header/Header.js';
import Body from './components/Body/Body';
import { Switch, useLocation, Route, Link } from 'react-router-dom';
import Checkout from './components/Checkout/Checkout';
import Services from './components/Services/Services';
import Information from './components/Information/Information';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';
import Order from './components/Order/Order';
import Cancel from './components/Cancel';
import { AnimatePresence } from 'framer-motion';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Loader from 'react-loader-spinner';

const pk_live = 'pk_live_51HLMi3E6y0KrTKOG6ihgrqIre1uvGbOJIogxsQ8VUkh4zMfi78LXt3RltVggIUYxTuS2pPlvmeMCGtwEEFlaJNqf00m3BPxh5l'
const pk_test = 'pk_test_51HLMi3E6y0KrTKOGghSjHOYtodE5LpSXhxJjiPzpggLiRMwHnGgslWpMRA0i5KXdQu0B90tmwE6avNJBgVQh2DsR00FYIzCmrD'
const stripePromise = loadStripe(pk_live);

const App = () => {
    const location = useLocation();
    const initialState = {
        language: 1,
        inRange: false,
        error: false,
        address: '',
        mapsQuery: '',
        unavailableDates: [],
        loading: false
    };

    const orderInitState = {
        order_id: null,
        address: '',
        date: null,
        time: null,
        service: null,
        frequency: null,
        name: null,
        email: null,
        phone: '',
        price: 0
    };
    const [ receipt, setReceipt ] = useState();

    const [ order, setOrder ] = useState(orderInitState);
    const [ state, setState ] = useState(initialState);
    const [ errors, setErrors] = useState({});

    const validateInput = () => {
        let ers = {}
        if(order.name == null || order.name.length == 0) { ers.name = state.language == 1 ? "Name is required" : "Su nombre es requerido"}
        if(order.email == null || order.email.length == 0) { ers.email = state.language == 1 ? "Email is required" : "Su email es requerido"}
        if(order.phone == null || order.phone.length == 0) { ers.phone = state.language == 1 ? "Phone is required" : "Su numero telefonico es requerido"}
        if(Object.keys(ers).length > 0){
            setErrors(ers)
            return false
        } else {
            return true
        }
    }

    const clearState = () => {
        let language = state.language
        setState({ ...initialState, language });
        setOrder(orderInitState);
        console.log(state)
    };

    const handleInput = (e) => {
        console.log(e)
        setState({...state, [e.target.name]: e.target.value })
    };

    const setLanguage = (number) => {
        setState({...state, language: number})
    };


    return(
        <div className="">
                <header>
                    <Header state={state}/>
                </header>
                <main>
                    <div className={`loader div-fade ${!state.loading && 'hidden'}`}>
                        <Loader type="ThreeDots" color="#59a7ff" heigth='100' width="100"/>
                    </div>
                    <LanguageSelector state={state} setLanguage={setLanguage}/>
                    <AnimatePresence exitBeforeEnter>
                        <Switch location={location} key={location.pathname}>
                            <Route exact path='/'>
                                {/* <Cancel state={state} setState={setState}/> */}
                                <Body clearState={clearState} order={order} state={state} receipt={receipt} errors={errors} setErrors={setErrors} setState={setState} setOrder={setOrder} />
                            </Route>
                            <Route exact path='/information'>
                                <Information state={state}/>
                            </Route>
                            <Route path='/services'>
                                <Services order={order} state={state} setOrder={setOrder} setState={setState}/>
                            </Route>
                            <Route path='/checkout'>
                            <Elements stripe={stripePromise}>
                                <Checkout order={order} setOrder={setOrder} errors={errors} validateInput={validateInput} state={state} setState={setState} clearState={clearState} setReceipt={setReceipt}/>
                            </Elements>
                            </Route>
                            <Route path="/order">
                                <Order receipt={receipt} clearState={clearState}/>
                            </Route>
                            <Route path="/cancel/:order_id">
                                <Cancel state={state} setState={setState}/>
                            </Route>
                        </Switch>
                    </AnimatePresence>
                </main>
            {/* <footer>
                Contact Us
            </footer> */}
        </div>
    )
}

export default App