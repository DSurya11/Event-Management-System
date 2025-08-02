import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BrowseOrg.css';

function BrowseOrg() {
    const { org_id } = useParams();

    const [org, setOrg] = useState(null);
    const [upcoming, setUpcoming] = useState([]);
    const [previous, setPrevious] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/organiser/${org_id}`)
            .then(res => {
                if (!res.ok) throw new Error(`status ${res.status}`);
                return res.json();
            })
            .then(data => {
                setOrg(data.organiser);
                setUpcoming(data.ongoingEvents);
                setPrevious(data.previousEvents);
            })
            .catch(err => console.error('❌ fetch failed:', err));
    }, [org_id]);

    if (!org) return <div>Loading...</div>;

    return (
        <div className='browse_org'>
            <div className='browse_org_header'>
                <h1>{org.name}</h1>
            </div>
            <div className='browse_org_info'>
                {org.Description || 'No description available.'}
            </div>

            <div className='browse_org_events'>

                {/* Upcoming Events */}
                <div className='browse_org_upcoming'>
                    <div id='browse_org_upcoming_header'>
                        <h2>Upcoming Events</h2>
                    </div>
                    <div className='org_upcoming'>
                        {upcoming.length > 0 ? upcoming.map((e, i) => {
                            const imgPath = e.cover_image?.replace(/\\/g, '/');
                            return (
                                <div className='event_upcoming' key={e.event_id || i}>
                                    <img src={`/${imgPath}`} alt={e.title} />
                                    <h3>{e.title}</h3>
                                </div>
                            );
                        }) : <p>No upcoming events.</p>}
                    </div>
                </div>

                {/* Previous Events */}
                <div className='browse_org_prev'>
                    <div id='browse_org_prev_header'>
                        <h2>Previous Events</h2>
                    </div>
                    <div className='org_prev'>
                        {previous.length > 0 ? previous.map((e, i) => {
                            const imgPath = e.cover_image?.replace(/\\/g, '/');
                            return (
                                <div className='event_prev' key={e.event_id || i}>
                                    <img src={`/${imgPath}`} alt={e.title} />
                                    <h3>{e.title}</h3>
                                </div>
                            );
                        }) : <p>No previous events.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BrowseOrg;
