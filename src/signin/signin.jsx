import './signin.css'

function Signin() {
    return (
        <div className='signin'>
            <div className='signininfo'>
                <h2 className='signinh2'>
                    Get Started Today

                </h2>
                <p>Be a part of an interactive and efficient platform designed to make event planning and participation effortless. Whether you’re an attendee or an organizer, our system ensures a smooth experience with seamless connectivity.</p>
            </div>
            <div className='usersignin'>

                <div className='attendees'><h3 className='usersignh3'>Attendees</h3>
                    <ul>
                        <li><strong>Explore a variety of events:</strong> Discover workshops, conferences, and meetups based on your interests.</li>
                        <li><strong>Easy registration process:</strong> Sign up quickly with a seamless online registration system.</li>
                        <li><strong>Receive event updates:</strong> Get timely notifications about schedule changes, speakers, and new opportunities.</li>


                    </ul>
                    <button class="signinbut">SignIn</button>




                </div>
                <div style={{
                    width: "2px",
                    height: "100%",
                    backgroundColor: "black",
                    margin: "0 10px"
                }}></div>
                <div className='organizers'><h3 className='usersignh3'>Organizers </h3>
                    <ul >
                        <li><strong>Register for events easily:</strong> Quick and simple online registration with confirmation emails.</li>
                        <li><strong>Receive event notifications:</strong> Stay updated with real-time alerts via email, SMS, or push notifications.</li>
                        <li><strong>Connect with organizers:</strong> Engage with event hosts via chat, discussion forums, or social media.</li>
                    </ul>
                    <button class="signinbut">SignIn</button>
                </div>
            </div>


        </div>
    )
}
export default Signin;