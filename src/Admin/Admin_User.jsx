import './Admin_User.css';
import AdminNavbar from '../Components/AdminNavbar';
function Admin_User() {
    return (
        <div className='admin Main'>
            <div className='events_tobeapproved'>
                <div className='events_approval_header'><h2>User Information</h2></div>
                <hr />
                <div className='event_cards'>
                <div className='event_card_headers'>
                        <div className='event_card1_name'>Name</div>
                        <div className='event_card1_Orgname'>Email</div>
                        <div className='event_card1_date'>Number of events attended</div>
                        <div className='event_card1_datej'>Date of joining</div>
                    </div>
                    <div className='event_card1'>
                        <div className='event_card1_name'>User</div>
                        <div className='event_card1_Orgname'>Email</div>
                        <div className='event_card1_date'>No of events</div>
                        <div className='event_card1_datej'>Date</div>
                        <button className='event_btns_rem'>Remove</button>
                    </div>
                    <div className='event_card1'>
                    <div className='event_card1_name'>User</div>
                        <div className='event_card1_Orgname'>Email</div>
                        <div className='event_card1_date'>No of events</div>
                        <div className='event_card1_datej'>Date</div>
                        <button className='event_btns_rem'>Remove</button>
                    </div>
                    <div className='event_card1'>
                    <div className='event_card1_name'>User</div>
                        <div className='event_card1_Orgname'>Email</div>
                        <div className='event_card1_date'>No of events</div>
                        <div className='event_card1_datej'>Date</div>
                        <button className='event_btns_rem'>Remove</button>
                    </div>
                    <div className='event_card1'>
                    <div className='event_card1_name'>User</div>
                        <div className='event_card1_Orgname'>Email</div>
                        <div className='event_card1_date'>No of events</div>
                        <div className='event_card1_datej'>Date</div>
                        <button className='event_btns_rem'>Remove</button>
                    </div>
                    <div className='event_card1'>
                    <div className='event_card1_name'>User</div>
                        <div className='event_card1_Orgname'>Email</div>
                        <div className='event_card1_date'>No of events</div>
                        <div className='event_card1_datej'>Date</div>
                        <button className='event_btns_rem'>Remove</button>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Admin_User;