import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="home Main">
            <div className='home-head'>
                <h1 className="home-heading head-text">College Events made easy!</h1>
                <p>"Explore a variety of college events and easily register to participate in the ones that excite you the most!"</p>
            </div>
            <h1 className='sidehead subhead-text'>Discover Events</h1>
            <div className='discover-cards'>
                <div>
                    <h2 className='subhead-text'>1. Fests</h2>
                    <p>Join exciting festivals with music, dance, and cultural performances.</p>
                </div>
                <div>
                    <h2 className='subhead-text'>2. Workshops</h2>
                    <p>Enhance your skills with informative workshops and seminars.</p>
                </div>
                <div>
                    <h2 className='subhead-text'>3. Sports</h2>
                    <p>Compete or cheer in thrilling sports events and tournaments.</p>
                </div>
            </div>
            <div className="event-cardholder">
                {[...Array(4)].map((_, index) => (
                    <div className="content" key={index}>
                        <div className="contentimg">
                            <img src="https://static.vecteezy.com/system/resources/thumbnails/024/669/489/small_2x/mountain-countryside-landscape-at-sunset-dramatic-sky-over-a-distant-valley-green-fields-and-trees-on-hill-beautiful-natural-landscapes-of-the-carpathians-generative-ai-variation-5-photo.jpeg" alt="" />
                        </div>
                        <h2 className="contenth1">Schedule</h2>
                        <div className="contenttext">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis magnam laborum hic maxime officiis esse delectus </div>
                        <Link to="/register" className='contenta' >
                            To the page 
                            <svg className='asvg' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="lightseagreen">
                                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
                            </svg>
                        </Link>
                    </div>
                ))}
            </div>
            <Link to="/browse"><button className='cta-button'>Browse all Events</button></Link>
            <hr style={{ color: "lightseagreen", width: "10%" }} />
            <hr style={{ color: "lightseagreen", width: "6%", marginBottom: "60px" }} />
            <h1></h1>
        </div>
    )
}

export default Home;
