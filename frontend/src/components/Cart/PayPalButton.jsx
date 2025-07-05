import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AfhoO_b59EC4y3F4XEJFA4G9I2OmOwQKery1t6XwvkCeM9V9Y8LnCxuaaVOuy16ALNPQO0aGihBcW8Wy",
        currency: "USD",
        intent: "capture",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: parseFloat(amount).toFixed(2),
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          console.log("Payment approved, data:", data);
          return actions.order.capture().then(onSuccess);
        }}
        onError={(err) => {
          console.error("PayPal Error:", err);
          onError(err);
          alert("Payment failed. Please try again.");
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
