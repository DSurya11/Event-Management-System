import './Navbar.css'
import { Outlet, Link } from "react-router-dom";

function Navbar(){
    return(
        <div className="navbar">
            <h2 className='title'>Planova</h2>
            <div className='nb-button'>
                <Link to="/"><button className='btn'>Home</button></Link>
                <Link to="/browse"><button className='btn'>Browse</button></Link>
                <Link to="/organizers"><button className='btn'>Organizers</button></Link>
                
            </div>
            <svg className='chaticon' width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10.4606 1.25H13.5394C15.1427 1.24999 16.3997 1.24999 17.4039 1.34547C18.4274 1.44279 19.2655 1.64457 20.0044 2.09732C20.7781 2.57144 21.4286 3.22194 21.9027 3.99563C22.3554 4.73445 22.5572 5.57256 22.6545 6.59611C22.75 7.60029 22.75 8.85725 22.75 10.4606V11.5278C22.75 12.6691 22.75 13.564 22.7007 14.2868C22.6505 15.0223 22.5468 15.6344 22.3123 16.2004C21.7287 17.6093 20.6093 18.7287 19.2004 19.3123C18.3955 19.6457 17.4786 19.7197 16.2233 19.7413C15.7842 19.7489 15.5061 19.7545 15.2941 19.7779C15.096 19.7999 15.0192 19.832 14.9742 19.8582C14.9268 19.8857 14.8622 19.936 14.7501 20.0898C14.6287 20.2564 14.4916 20.4865 14.2742 20.8539L13.7321 21.7697C12.9585 23.0767 11.0415 23.0767 10.2679 21.7697L9.72579 20.8539C9.50835 20.4865 9.37122 20.2564 9.24985 20.0898C9.13772 19.936 9.07313 19.8857 9.02572 19.8582C8.98078 19.832 8.90399 19.7999 8.70588 19.7779C8.49387 19.7545 8.21575 19.7489 7.77666 19.7413C6.52138 19.7197 5.60454 19.6457 4.79957 19.3123C3.39066 18.7287 2.27128 17.6093 1.68769 16.2004C1.45323 15.6344 1.3495 15.0223 1.29932 14.2868C1.24999 13.564 1.25 12.6691 1.25 11.5278L1.25 10.4606C1.24999 8.85726 1.24999 7.60029 1.34547 6.59611C1.44279 5.57256 1.64457 4.73445 2.09732 3.99563C2.57144 3.22194 3.22194 2.57144 3.99563 2.09732C4.73445 1.64457 5.57256 1.44279 6.59611 1.34547C7.60029 1.24999 8.85726 1.24999 10.4606 1.25ZM6.73809 2.83873C5.82434 2.92561 5.24291 3.09223 4.77938 3.37628C4.20752 3.72672 3.72672 4.20752 3.37628 4.77938C3.09223 5.24291 2.92561 5.82434 2.83873 6.73809C2.75079 7.663 2.75 8.84876 2.75 10.5V11.5C2.75 12.6751 2.75041 13.5189 2.79584 14.1847C2.84081 14.8438 2.92737 15.2736 3.07351 15.6264C3.50486 16.6678 4.33223 17.4951 5.3736 17.9265C5.88923 18.1401 6.54706 18.2199 7.8025 18.2416L7.83432 18.2421C8.23232 18.249 8.58109 18.2549 8.87097 18.287C9.18246 18.3215 9.4871 18.3912 9.77986 18.5615C10.0702 18.7304 10.2795 18.9559 10.4621 19.2063C10.6307 19.4378 10.804 19.7306 11.0004 20.0623L11.5587 21.0057C11.7515 21.3313 12.2485 21.3313 12.4412 21.0057L12.9996 20.0623C13.1959 19.7306 13.3692 19.4378 13.5379 19.2063C13.7204 18.9559 13.9298 18.7304 14.2201 18.5615C14.5129 18.3912 14.8175 18.3215 15.129 18.287C15.4189 18.2549 15.7676 18.249 16.1656 18.2421L16.1975 18.2416C17.4529 18.2199 18.1108 18.1401 18.6264 17.9265C19.6678 17.4951 20.4951 16.6678 20.9265 15.6264C21.0726 15.2736 21.1592 14.8438 21.2042 14.1847C21.2496 13.5189 21.25 12.6751 21.25 11.5V10.5C21.25 8.84876 21.2492 7.663 21.1613 6.73809C21.0744 5.82434 20.9078 5.24291 20.6237 4.77938C20.2733 4.20752 19.7925 3.72672 19.2206 3.37628C18.7571 3.09223 18.1757 2.92561 17.2619 2.83873C16.337 2.75079 15.1512 2.75 13.5 2.75H10.5C8.84876 2.75 7.663 2.75079 6.73809 2.83873ZM7.25 9C7.25 8.58579 7.58579 8.25 8 8.25H16C16.4142 8.25 16.75 8.58579 16.75 9C16.75 9.41421 16.4142 9.75 16 9.75H8C7.58579 9.75 7.25 9.41421 7.25 9ZM7.25 12.5C7.25 12.0858 7.58579 11.75 8 11.75H13.5C13.9142 11.75 14.25 12.0858 14.25 12.5C14.25 12.9142 13.9142 13.25 13.5 13.25H8C7.58579 13.25 7.25 12.9142 7.25 12.5Z" fill="#1C274C"></path> </g></svg>
            
            <Link to="/profile">
                <svg className="profilesvg" xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="black">
                    <path d="M226-262q59-42.33 121.33-65.5 62.34-23.17 132.67-23.17 70.33 0 133 23.17T734.67-262q41-49.67 59.83-103.67T813.33-480q0-141-96.16-237.17Q621-813.33 480-813.33t-237.17 96.16Q146.67-621 146.67-480q0 60.33 19.16 114.33Q185-311.67 226-262Zm253.88-184.67q-58.21 0-98.05-39.95Q342-526.58 342-584.79t39.96-98.04q39.95-39.84 98.16-39.84 58.21 0 98.05 39.96Q618-642.75 618-584.54t-39.96 98.04q-39.95 39.83-98.16 39.83ZM480.31-80q-82.64 0-155.64-31.5-73-31.5-127.34-85.83Q143-251.67 111.5-324.51T80-480.18q0-82.82 31.5-155.49 31.5-72.66 85.83-127Q251.67-817 324.51-848.5T480.18-880q82.82 0 155.49 31.5 72.66 31.5 127 85.83Q817-708.33 848.5-635.65 880-562.96 880-480.31q0 82.64-31.5 155.64-31.5 73-85.83 127.34Q708.33-143 635.65-111.5 562.96-80 480.31-80Zm-.31-66.67q54.33 0 105-15.83t97.67-52.17q-47-33.66-98-51.5Q533.67-284 480-284t-104.67 17.83q-51 17.84-98 51.5 47 36.34 97.67 52.17 50.67 15.83 105 15.83Zm0-366.66q31.33 0 51.33-20t20-51.34q0-31.33-20-51.33T480-656q-31.33 0-51.33 20t-20 51.33q0 31.34 20 51.34 20 20 51.33 20Zm0-71.34Zm0 369.34Z"/>
                </svg> 
            </Link>
            
            <Outlet />
        </div>
    )
}

export default Navbar; 
