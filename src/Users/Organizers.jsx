import React from 'react';
import './Organizers.css';
function Organizers() {
    return (
        <div className='organizers_browse'>
            <h1>Organizers</h1>
            <div className='Sports'>
            <h2>Sports</h2>
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
            <div className='Technical'>
            <h2>Technical</h2>
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
            
           <div className='Acadamic'>
           <h2>Acadacmic</h2>
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
           <div className='Cultural'>
           <h2>Cultural</h2>
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


        </div>
    )
}
export default Organizers;