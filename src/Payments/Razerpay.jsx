import { useState, useEffect } from "react";
import './Razerpay.css'
function Razerpay() {
    const [orderId, setOrderId] = useState("");

    useEffect(() => {
        // Load Razorpay script dynamically
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => console.log("Razorpay SDK Loaded");
        document.body.appendChild(script);
    }, []);

    const createOrder = async () => {
        try {
            const res = await fetch("http://localhost:3000/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: 500 }) // ₹5
            });
            const data = await res.json();
            setOrderId(data.id);
            openRazorpay(data.id);
        } catch (err) {
            console.error("Error creating order:", err);
        }
    };

    const openRazorpay = (orderId) => {
        if (!window.Razorpay) {
            alert("Razorpay SDK failed to load. Try again.");
            return;
        }

        const options = {
            key: "rzp_test_x4UltRWpwOAf5h", // Replace with your Razorpay test key
            amount: 500,
            currency: "INR",
            name: "Test Store",
            description: "Payment for order",
            order_id: orderId,
            handler: function (response) {
                alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
            },
            prefill: {
                name: "Test User",
                email: "test@example.com",
                contact: "9876543210"
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className="paymentmain">
            <h2>Razorpay Test Payment</h2>
            <button onClick={createOrder} className="generatebutton">Continue To Pay</button>
        </div>
    );
}

export default Razerpay;
