import './Navbar.css'
function Navbar(){
    return(
        <div className="navbar">
        <h2 className='title'>Planova</h2>
        <div className='nb-button'>
            <button className='btn'>Home</button>
            <button className='btn'>Home</button>
            <button className='btn'>Home</button>
            <button className='btn'>Home</button>  
            
        </div>
        <img className='profilepic'src="./profile.png" alt="" /> 
    </div>
    )
}
export default Navbar;