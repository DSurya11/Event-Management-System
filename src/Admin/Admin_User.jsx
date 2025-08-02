import { useEffect, useState } from 'react';
import './Admin_User.css';
import AdminNavbar from '../Components/AdminNavbar';

function Admin_User() {
    const [users, setUsers] = useState([]);
    const [userEvents, setUserEvents] = useState({});
    const [openUserId, setOpenUserId] = useState(null);
    const [disabledUsers, setDisabledUsers] = useState(new Set());

    useEffect(() => {
        fetch('http://localhost:3000/admin/users')
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error('Error fetching users:', err));
    }, []);

    const toggleEvents = async (user_id) => {
        if (openUserId === user_id) {
            setOpenUserId(null);
            return;
        }
        if (!userEvents[user_id]) {
            try {
                const res = await fetch(`http://localhost:3000/admin/user-events?user_id=${user_id}`);
                const data = await res.json();
                setUserEvents(prev => ({ ...prev, [user_id]: data }));
            } catch (err) {
                console.error('Error fetching events:', err);
            }
        }
        setOpenUserId(user_id);
    };


    const disableUser = (user_id) => {
        setDisabledUsers(prev => new Set(prev).add(user_id));
        alert(`User ${user_id} marked as disabled (frontend only).`);
    };

    return (
        <div className='admin Main'>
            <AdminNavbar />
            <div className='events_tobeapproved'>
                <div className='events_approval_header'><h2>User Information</h2></div>
                <hr />
                <div className='event_cards'>
                    <div className='event_card_headers'>
                        <div className='event_card1_name'>Name</div>
                        <div className='event_card1_Orgname'>Email</div>
                        <div className='event_card1_date'>Events Attended</div>
                        <div className='event_card1_datej'>Date of Joining</div>
                        <div className='event_card1_btn'></div>
                    </div>

                    {users.map(user => (
                        <div key={user.user_id}>
                            <div className='event_card1'>
                                <div className='event_card1_name'>{user.name}</div>
                                <div className='event_card1_Orgname'>{user.email}</div>
                                <div className='event_card1_date'>{user.event_count}</div>
                                <div className='event_card1_datej'>
                                    {new Date(user.date_joined).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </div>
                                <button
                                    className='event_btns_rem'
                                    onClick={() => toggleEvents(user.user_id)}
                                >
                                    {openUserId === user.user_id ? 'Hide' : 'Show'}
                                </button>
                                <button
                                    className='event_btns_rem'
                                    style={{ marginLeft: '8px', backgroundColor: '#aaa' }}
                                    onClick={() => disableUser(user.user_id)}
                                >
                                    Disable
                                </button>
                            </div>

                            {openUserId === user.user_id && userEvents[user.user_id] && (
                                <div className='user_events_list'>
                                    {userEvents[user.user_id].length === 0 ? (
                                        <div className='no_events'>No events attended.</div>
                                    ) : (
                                        userEvents[user.user_id].map(event => (
                                            <div className='event_card1 event_detail' key={event.event_id}>
                                                <div className='event_card1_name'>{event.title}</div>
                                                
                                                <div className='event_card1_datej'>
                                                    {new Date(event.date).toLocaleDateString('en-GB')}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Admin_User;
