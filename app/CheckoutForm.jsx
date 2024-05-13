import React, { useState, useEffect } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ clientSecret, onSubmit }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!stripe || !elements) { // check loading
            return;
        }
        
        setIsLoading(true);
        try {
            const {error, paymentIntent} = await stripe.confirmPayment({
                elements,
                redirect: 'if_required'
            });
            
            if (error) {
                if (error.type == "card_error" || error.type == "validation_error") {
                    setMessage(error.message);
                } else {
                    setMessage("An unexpected error occurred. Please try again later.");
                }
            } else {
                switch (paymentIntent.status) {
                    case 'succeeded':
                        onSubmit();
                        setMessage('Payment succeeded!');
                        break;
                    case 'processing':
                        setMessage('Payment processing...');
                        break;
                    case 'requires_payment_method': 
                        setMessage('Please enter a payment method');
                        break;
                    default:
                        setMessage('Payment failed');
                        break;
                }
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            setMessage('An error occurred while processing your payment. Please try again.');
        }
    
        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs"
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="flex flex-col mt-5 rounded-xl">
          <PaymentElement id="payment-element" options={paymentElementOptions} />

            <button disabled={isLoading || !stripe || !elements} id="submit">
                <div id="button-text">
                {isLoading ? <div className="spinner" id="spinner">
                </div> : 
                <div className="text-2xl font-bold m-5 text-gray-700 hover:text-neutral-400">Pay now</div>}
                </div>
            </button>
          {message && <div id="payment-message" className="mx-auto text-red-600">{message}</div>}
        </form>
      );
    }

export default CheckoutForm;
