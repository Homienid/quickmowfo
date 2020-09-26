import React, { useEffect, useState } from 'react';
import {PaymentRequestButtonElement, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { useHistory } from 'react-router-dom';
import { FaArrowRight, FaCcApplePay } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const StripeElement = ({state, setState, order, setOrder, setReceipt, clearState, validateInput, errors}) => {
    const history = useHistory();
    const stripe = useStripe();
    const [paymentRequest, setPaymentRequest] = useState(null);
    const [paymentError, setPaymentError] = useState(false);

    var getIntent = async () => {
      var request = await fetch('/intent', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
      });
      
      request = await request.json();
      console.log('getIntent()', request);
      return request;
  };

  const confirmPayment = async (paymentIntent_id, order_id) => {
    fetch('/confirm_payment', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({paymentIntent_id, order_id})
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      setReceipt(res);
      history.push(`/order`);
    });
  };

  const handleMobilePayClick = async (e) => {
    if(validateInput()){
      setState({ ...state, loading: true})

      paymentRequest.on('paymentmethod', async (ev) => {
        let intent = await getIntent();

        console.log("intent: ", intent);
        console.log("ev: ", ev);
        
        const { id, error: confirmError } = await stripe.confirmCardPayment(
          intent.client_secret,
          {payment_method: ev.paymentMethod.id},
          {handleActions: false}
        )

        if(confirmError){
          ev.complete('fail');
        } else {
          const { error, paymentIntent } = await stripe.confirmCardPayment(intent.client_secret);
          if(error){
            ev.complete('fail')
            console.log(error)
            setPaymentError("Sorry couldn't process your payment. Try again later or contact us on our facebook page.")
          } else {
            ev.complete('success');
            // setPaymentError(JSON.stringify(paymentIntent))
            confirmPayment(paymentIntent.id, intent.order_id)
          }
        }       
      
    })
      setState({ ...state, loading: false})
      paymentRequest.show()
    } else {
      return;
    }
  };

  useEffect(() => {
    console.log('hi mom')
    if(stripe){
      const pr = stripe.paymentRequest({
        country: "US",
        currency: 'usd',
        total: {
          label: "QuickMowFo Checkout",
          amount: order.service.price * 100
        },
        requestPayerName: false,
        requestPayerEmail: false,
        requestPayerPhone: false,
        requestShipping: false
      });

      pr.canMakePayment()
      .then(result => {
        if(result){
          console.log('can make payment');    
            setPaymentRequest(pr);
        }
      });
    }
  }, [stripe])
  
  const style = {
      base: {
          fontSize: '13px',
          border: '.3px solid grey',
          padding: '10px',
          color: '#424770',
          '::placeholder': {
            color: '#aab7c4'
          },
      }
  }

  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(validateInput()){

      setState({ ...state, loading: true})
        if (!stripe || !elements) {
        return;
      };
      
      let intent = await getIntent()
      const result = await stripe.confirmCardPayment(intent.client_secret, {
        payment_method:{
          card: elements.getElement(CardElement),
          billing_details: {
            name: state.name
          }
        }
      }) 

      if (result.error) {
        console.log('[error]', result.error);
        setPaymentError(result.error.message);
        setState({...state, loading: false})
      } else {
        console.log(result)
        setState({...state, loading: false})
        confirmPayment(result.paymentIntent.id, intent.order_id)
      }
    } else {
      return
    }
};
  


    return(<>
        <form className="card_media" onSubmit={handleSubmit}>
            <div className={`stripe_card ${paymentError && 'error'}`}>
                <CardElement options={{style: {base: style.base}}}/>
            </div>
            <div className="red_font">{paymentError}</div>
            <button className="pay_button">{state.language == 1 ? "Pay" : "Pagar"}</button>
        </form>
                
            <div className={`div-fade ${!paymentRequest && 'hidden'}`}>
              <hr/>
              <button className={`mobile_pay_button`} onClick={() => handleMobilePayClick()}>
                      <FaCcApplePay/> Apple Pay / <FcGoogle/> oogle Pay
              </button>
            </div>
    </>)
}

export default StripeElement