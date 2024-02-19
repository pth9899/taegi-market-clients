import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";

export default class Paypal extends React.Component {
  render() {
    return (
      <PayPalButton
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                currency_code: "USD",
                value: "0.01",
                  },
                  client_id : {
                    client_id : "AdMRJglyiIGDVLcU_WGx4pHZlt4Yq9D9UgFkowVK_21iEEaT-Ph2GKa0_ALC0ewqf1QOQDPmTLr16KKZ"
                  }
            }]
          });
        }}
        onApprove={(data, actions) => {
          // Capture the funds from the transaction
          return actions.order.capture().then(function(details) {
            return fetch("/payment", {
              method: "post",
              body: JSON.stringify({
                orderID: data.orderID
              })
            });
          });
        }}
      />
    );
  }
}