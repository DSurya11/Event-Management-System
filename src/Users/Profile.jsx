import React from 'react';
import './Profile.css';
function Profile() {
    return (
        <div className='profile_page'>

            <div className='profile_boxM1'>
                <div className='profile_logo'>
                    <img src=".\public\profile_pic2.jpg" alt="" />
                    <p>Hey Middle_Name</p>
                    <p className='Designation'>Student</p>
                    <button>LogOut</button>
                </div>
            </div>
            <div className='profile_boxM2'>
                <div className='profile_box2'>
                    <div className='profile_box2_name'><span>Name: </span>Your Name</div>
                    <div className='profile_box2_email'><span>E-mail: </span>Your email address</div>
                    <div className='profile_box2_date'><span>Joined on: </span>date_joined</div>
                </div>
                <div className='profile_box3'>
                    <p>Previous attended events</p>
                    <div className='Prev_attended_events'>
                        <div className='Prev_event_1'>Event1</div>
                        <div className='Prev_event_1'>Evnet2</div>
                        <div className='Prev_event_1'>Event3</div>
                        <div className='Prev_event_1'>Event4</div>
                        <div className='Prev_event_1'>Event4</div>
                        <div className='Prev_event_1'>Event4</div>
                        <div className='Prev_event_1'>Event4</div>
                        <div className='Prev_event_1'>Event4</div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Profile;