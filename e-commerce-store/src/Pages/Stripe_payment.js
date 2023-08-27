import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import StripeCheckoutForm from "./StripeCheckoutForm";
import classes from "./Stripe.module.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51NjgcGSHr6F8DFBRilwJFc4SR2JjRSJKL8rC9r26ty1OZgPBoVQfSJfQAy2FqYd131cHaSANcfJ9qQcDXTO7eV5i00C8zjICKN"
);

export default function StripePayment() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector((state) => state.order.currentOrder);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:8080/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount: currentOrder.totalAmount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [currentOrder]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className={classes.stripe}>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <StripeCheckoutForm />
        </Elements>
      )}
    </div>
  );
}
