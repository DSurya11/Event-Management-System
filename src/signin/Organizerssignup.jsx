import { useState } from "react";
import "./loginsignup.css";

function Organizerssignup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/organizer/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            setMessage("Signup successful! Redirecting to login...");

            // Redirect to login after 2 seconds
            setTimeout(() => {
                window.location.href = "/organizer/signin";
            }, 2000);
        } catch (error) {
            setMessage(error.message || "Signup failed");
        }
    };

    return (
        <div className="loginsignup body1">
            <div className="loginsignupinfo">
                <h2 className="loginsignuph2 head-text">WELCOME TO PLANOVA</h2>
                <p>"Your seamless event planning platform"</p>
            </div>

            <div className="loginsignupinput">
                <div className="wrapper">
                    <div className="title"><span>Organizers Signup</span></div>

                    <form onSubmit={handleSignup}>
                        <div className="row">
                            <i className="fas fa-user"></i>
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="row">
                            <i className="fas fa-envelope"></i>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="row">
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="row button">
                            <input type="submit" value="Signup" />
                        </div>
                    </form>

                    {message && <p className="message">{message}</p>}
                </div>
            </div>
        </div>
    );
}

export default Organizerssignup;
