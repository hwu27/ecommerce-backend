import CheckoutForm from "./CheckoutForm";
import ShippingForm from "./ShippingForm";
import { Elements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51PBUzu2MFE1H91nBxwt8Tnu1uds0Hz0DWs7MxAzO2VlYGTOzhN3c88EZtqs1bDoH7DyKEIbujWAcPltQCbEB0zEr00sQHyZDlb")

export default function PaymentPage() {

    const [clientSecret, setClientSecret] = useState(null);
    const [isCheckoutFormSubmitted, setIsCheckoutFormSubmitted] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [orderID, setOrderID] = useState(null);


    const handleCheckoutFormSubmit = () => {
        setIsCheckoutFormSubmitted(true);
    }

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    useEffect(() => {
        fetch("http://localhost:8000/app/create-payment/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body: JSON.stringify({
              'items': [{ name: "stickers"}] // in the future, add cart instead of hardcoding
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            setClientSecret(data.clientSecret);
            setOrderID(data.order);
            setTotalAmount(data.total);
        })
        .catch((error) => {
            console.error("Error creating payment intent:", error);
        });
    }, []);

    const appearance = {
      theme: "stripe",
    };
  
    const options = {
      clientSecret,
      appearance,
    };

    return (
        <>
            {clientSecret && <Elements options={options} stripe={stripePromise}>
                <section>
                    <div className="flex justify-center">
                        <span className="w-3/12 mr-5"><ShippingForm submitted={[isCheckoutFormSubmitted, orderID, totalAmount]}/></span>
                        <span className="w-3/12"><CheckoutForm clientSecret={clientSecret} onSubmit={handleCheckoutFormSubmit}/></span>
                        <span className="w-2/12 flex flex-col border ml-5 p-12 shadow-sm items-center">
                            <div className="text-2xl font-bold">
                                Total: {totalAmount}
                            </div>
                            <div>
                                Order ID: {orderID}
                            </div>
                            <div className="mt-24 font-bold">Thank you for your order!</div>
                        </span>
                    </div>
                </section>
            </Elements>}
        </>
    );
}