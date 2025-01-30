import './Home.css';
function Home() {
    return (
        <div className="home">
            <h1 className="home-heading">College Events made easy!</h1>
            <p>"Explore a variety of college events and easily register to participate in the ones that excite you the most!"</p>
            <div className="event-cardholder">
                <div className="content">
                    <div className="contentimg"><img src="https://static.vecteezy.com/system/resources/thumbnails/024/669/489/small_2x/mountain-countryside-landscape-at-sunset-dramatic-sky-over-a-distant-valley-green-fields-and-trees-on-hill-beautiful-natural-landscapes-of-the-carpathians-generative-ai-variation-5-photo.jpeg" alt="" /></div>

                    <h2 className="contenth1">Shedule</h2>


                    <div className="contenttext">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis magnam laborum hic maxime officiis esse delectus </div>
                    <a href="abc.com" className='contenta'>To the page <svg className='asvg' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="lightseagreen"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" /></svg></a>
                </div>
                <div className="content">
                    <div className="contentimg"><img src="https://static.vecteezy.com/system/resources/thumbnails/024/669/489/small_2x/mountain-countryside-landscape-at-sunset-dramatic-sky-over-a-distant-valley-green-fields-and-trees-on-hill-beautiful-natural-landscapes-of-the-carpathians-generative-ai-variation-5-photo.jpeg" alt="" /></div>

                    <h2 className="contenth1">Shedule</h2>


                    <div className="contenttext">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis magnam laborum hic maxime officiis esse delectus </div>
                    <a href="abc.com" className='contenta'>To the page <svg className='asvg' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="lightseagreen"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" /></svg></a>
                </div>
                <div className="content">
                    <div className="contentimg"><img src="https://static.vecteezy.com/system/resources/thumbnails/024/669/489/small_2x/mountain-countryside-landscape-at-sunset-dramatic-sky-over-a-distant-valley-green-fields-and-trees-on-hill-beautiful-natural-landscapes-of-the-carpathians-generative-ai-variation-5-photo.jpeg" alt="" /></div>

                    <h2 className="contenth1">Shedule</h2>


                    <div className="contenttext">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis magnam laborum hic maxime officiis esse delectus </div>
                    <a href="abc.com" className='contenta'>To the page <svg className='asvg' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="lightseagreen"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" /></svg></a>
                </div>
                <div className="content">
                    <div className="contentimg"><img src="https://static.vecteezy.com/system/resources/thumbnails/024/669/489/small_2x/mountain-countryside-landscape-at-sunset-dramatic-sky-over-a-distant-valley-green-fields-and-trees-on-hill-beautiful-natural-landscapes-of-the-carpathians-generative-ai-variation-5-photo.jpeg" alt="" /></div>

                    <h2 className="contenth1">Shedule</h2>

                    <div className="contenttext">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis magnam laborum hic maxime officiis esse delectus </div>
                    <a href="abc.com" className='contenta'>To the page <svg className='asvg' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="lightseagreen"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" /></svg></a>
                </div>
            </div>
            <button className='cta-button'>Browse Events</button>
            <hr style={{color: "lightseagreen",width:"10%"}} />
            <hr style={{color: "lightseagreen",width:"6%", marginBottom:"60px"}} />
            <h1></h1>
            <div className='quick-signup'>
                <h2>Sign up for your favorite college events in just a few clicks!</h2>
                <p>No more tedious forms or long processes—registering for events has never been this simple. Just browse, choose your event, and hit the register button to secure your spot instantly. Stay focused on enjoying the events you love while we handle the rest!</p>
                <input type="text" placeholder="Enter your email!"/>
                <button type='submit'>Sign Up</button>
            </div>
        </div>
    )
}
export default Home;
