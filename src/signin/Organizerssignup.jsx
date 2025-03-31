import './loginsignup.css';

function Organizerssignup() {
    return (
        <div className='loginsignup'>
            <div className='loginsignupinfo'>
                <h2 className='loginsignuph2 head-text'>WELCOME TO PLANOVA</h2>
                <p>"Your seamless event planning platform"</p>
            </div>
            <div className='loginsignupinput'>
                <div className="wrapper">
                    <div className="title"><span>Organizers Signup</span></div>
                    <form action="#">
                        <div className="row">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Name" required />
                        </div>
                        <div className="row">
                            <i className="fas fa-envelope"></i>
                            <input type="text" placeholder="Email or Phone" required />
                        </div>
                        <div className="row">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" required />
                        </div>
                        <div className="pass"><a href="#">Forgot password?</a></div>
                        <div className="row button">
                            <input type="submit" value="Login" />
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Organizerssignup;
