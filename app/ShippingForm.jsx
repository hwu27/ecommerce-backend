import React, { useEffect, useState } from 'react';
import {AddressElement} from '@stripe/react-stripe-js';

const handleAddressChange = (address, orderID, totalAmount) => {
  fetch ('http://localhost:8000/app/payments/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      order_id: orderID,
      total: totalAmount,
      line1: address.line1,
      line2: address.line2,
      city: address.city,
      country: address.country,
      postal_code: address.postal_code,
    })
  })
}

const ShippingForm = ({submitted}) => {
  const [address, setAddress] = useState(null);
  const [isCheckoutFormSubmitted, orderID, totalAmount] = submitted;
  useEffect(() => {
    if (isCheckoutFormSubmitted) {
      handleAddressChange(address, orderID, totalAmount);
      console.log('address: ', address)
    }
  }, [submitted]);

  return (
    <form>
      <AddressElement options={{mode: 'shipping'}} onChange={
        (event) => {
          if (event.complete) {
            setAddress(event.value.address);
          }
        }
      }
      />
    </form>
  );
};

export default ShippingForm;