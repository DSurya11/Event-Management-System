import { useState, useEffect } from "react";
import "./Razerpay.css";

function App() {
    const [amount] = useState(1); // Fixed amount
    const [qrCode, setQrCode] = useState("");
    const [orderId, setOrderId] = useState("");
    const [paymentStatus, setPaymentStatus] = useState(null);

    // Generate QR Code on component mount
    useEffect(() => {
        const generateQrCode = async () => {
            try {
                const response = await fetch("http://localhost:3000/payment/qr", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ amount }),
                });

                const data = await response.json();
                setQrCode(data.qrCodeUrl);
                setOrderId(data.orderId);
            } catch (error) {
                console.error("QR Code Error:", error);
            }
        };

        generateQrCode(); // Call function when component mounts
    }, []);

    const checkPaymentStatus = async () => {
        try {
            const response = await fetch("http://localhost:3000/payment/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId }),
            });

            const data = await response.json();
            setPaymentStatus(data.success ? "Payment Successful ✅" : "Payment Pending ⏳");
        } catch (error) {
            console.error("Payment Verification Error:", error);
        }
    };

    return (
        <div className="paymentmain">
            <h2>Amount to be Paid: ₹{amount}</h2>

            {qrCode && (
                <>
                    <h3>Scan QR to Pay</h3>
                    <img src={qrCode} alt="UPI QR Code" style={{ width: "200px", margin: "20px" }} />
                    <br />
                    <button onClick={checkPaymentStatus}
                        style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px" }}>
                        Check Payment Status
                    </button>
                </>
            )}

            {paymentStatus && <h3 style={{ color: paymentStatus.includes("Successful") ? "green" : "orange" }}>{paymentStatus}</h3>}
        </div>
    );
}

export default App;
