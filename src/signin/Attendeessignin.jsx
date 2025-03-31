import './loginsignin.css';

function Attendeessignin() {
    return (
        <div className='loginsignin Main'>
            <div className='loginsignininfo'>
                <h2 className='loginsigninh2 head-text'>WELCOME TO PLANOVA</h2>
                <p>"Your seamless event planning platform"</p>
            </div>
            <div className='loginsignininput'>
                <div className="wrapper">
                    <div className="title"><span>Attendees Signin</span></div>
                    <form action="#">

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
                        <div className="signin-link">Not a member? <a href="#">Signin now</a></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Attendeessignin;
