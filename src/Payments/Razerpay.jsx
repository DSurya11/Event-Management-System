import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './Razerpay.css';

function Razerpay() {
    const location = useLocation();
    const { eventId, amount, customFields } = location.state || {};

    const [formData, setFormData] = useState({});
    const [orderId, setOrderId] = useState("");

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => console.log("Razorpay SDK Loaded");
        document.body.appendChild(script);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const createOrder = async () => {
        if (!customFields.every(field => formData[field.name])) {
            alert("Please fill all required fields.");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount }) // Amount in paise
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
            key: "rzp_test_x4UltRWpwOAf5h",
            amount: amount,
            currency: "INR",
            name: "Planova",
            description: "Event Registration",
            order_id: orderId,
            handler: async (response) => {
                alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);

                // Submit registration data to your backend
                await fetch("http://localhost:3000/register", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "x-user-id": localStorage.getItem("userId")  // assuming you stored user ID on login
                    },
                    body: JSON.stringify({
                      event_id: eventId,
                      form_data: formData,
                      razorpay_payment_id: response.razorpay_payment_id
                    })
                  });
                  
            },
            prefill: {
                name: formData["Name"] || "",
                email: formData["Email"] || "",
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className="paymentmain">
            <h2>Event Registration</h2>

            <form className="form">
                {customFields && customFields.map((field, index) => (
                    <div key={index} className="form-field">
                        <label>{field.name}:</label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name] || ""}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                ))}
            </form>

            <button onClick={createOrder} className="generatebutton">
                Continue To Pay ₹{amount / 100}
            </button>
        </div>
    );
}

export default Razerpay;
