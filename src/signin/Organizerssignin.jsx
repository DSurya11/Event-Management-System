import { useState } from "react";
import "./loginsignin.css";

function Organizerssignin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/organizer/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            localStorage.setItem("token", data.token);
            setMessage("Login successful!");
        } catch (error) {
            setMessage(error.message || "Login failed");
        }
    };

    return (
        <div className="loginsignin body1">
            <div className="loginsignininfo">
                <h2 className="loginsigninh2 head-text">WELCOME TO PLANOVA</h2>
                <p>"Your seamless event planning platform"</p>
            </div>

            <div className="loginsignininput">
                <div className="wrapper">
                    <div className="title"><span>Organizers Sign-in</span></div>

                    <form onSubmit={handleLogin}>
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

                        <div className="pass"><a href="#">Forgot password?</a></div>

                        <div className="row button">
                            <input type="submit" value="Login" />
                        </div>

                        <div className="signin-link">Not a member? <a href="#">Signup now</a></div>
                    </form>

                    {message && <p className="message">{message}</p>}
                </div>
            </div>
        </div>
    );
}

export default Organizerssignin;
