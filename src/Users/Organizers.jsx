import React from 'react';
import './Organizers.css';
function Organizers() {
    return (
        <div className='organizers_browse'>
            <h1>Organizers</h1>
            <h2>Sports Club</h2>
            <div className='Org'>
                <div className='Event'>
                    <img src=".\public\white.jpeg" alt="" />
                    <h3>Club_Name</h3>
                </div>
                <div className='Event'>
                    <img src=".\public\white.jpeg" alt="" />
                    <h3>Club_Name</h3>
                </div>
            </div>
            <h2>Technical Club</h2>
            <div className='Org'>
                
                <div className='Event'>
                    <img src=".\public\white.jpeg" alt="" />
                    <h3>Club_Name</h3>
                </div>
                <div className='Event'>
                    <img src=".\public\white.jpeg" alt="" />
                    <h3>Club_Name</h3>
                </div>
            </div>
            <h2>Cultural Club</h2>
            <div className='Org'>
                
                <div className='Event'>
                    <img src=".\public\white.jpeg" alt="" />
                    <h3>Club_Name</h3>
                </div>
                <div className='Event'>
                    <img src=".\public\white.jpeg" alt="" />
                    <h3>Club_Name</h3>
                </div>
            </div>
        </div>
    )
}
export default Organizers;