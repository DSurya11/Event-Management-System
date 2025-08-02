import './Admin_Org.css'
import { useEffect, useState } from 'react'
import AdminNavbar from '../Components/AdminNavbar'

function Admin_Org() {
    const [orgs, setOrgs] = useState([])
    const [expanded, setExpanded] = useState(null)
    const [orgEvents, setOrgEvents] = useState({})
    const [disabledOrgs, setDisabledOrgs] = useState(new Set())

    useEffect(() => {
        fetch('http://localhost:3000/admin/organizers')
            .then(res => {
                if (!res.ok) throw new Error('failed to fetch organizers')
                return res.json()
            })
            .then(data => setOrgs(Array.isArray(data) ? data : []))
            .catch(err => {
                console.error('error fetching organizers:', err)
                setOrgs([])
            })
    }, [])

    const formatDate = (rawDate) => {
        const d = new Date(rawDate)
        return d.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
    }

    const toggleEvents = async (orgId) => {
        if (expanded === orgId) {
            setExpanded(null)
            return
        }

        if (!orgEvents[orgId]) {
            try {
                const res = await fetch(`http://localhost:3000/admin/organizer-events/${orgId}`)
                if (!res.ok) throw new Error('failed to fetch events')
                const data = await res.json()
                setOrgEvents(prev => ({ ...prev, [orgId]: data }))
            } catch (err) {
                console.error('error fetching organizer events:', err)
                setOrgEvents(prev => ({ ...prev, [orgId]: [] }))
            }
        }

        setExpanded(orgId)
    }

    const disableOrg = (orgId) => {
        setDisabledOrgs(prev => new Set(prev).add(orgId))
        alert(`Organizer ${orgId} marked as disabled (frontend only).`)
    }

    return (
        <div className='admin Main'>
            <AdminNavbar />
            <div className='events_tobeapproved'>
                <div className='events_approval_header'>
                    <h2>Organiser's Information</h2>
                </div>
                <hr />
                <div className='event_cards'>
                    <div className='event_card_headers'>
                        <div className='event_card1_name'>Name</div>
                        <div className='event_card1_Orgname'>Email</div>
                        <div className='event_card1_date'>Events Conducted</div>
                        <div className='event_card1_btn'></div>
                    </div>

                    {orgs.map(org => (
                        <div key={org.organiser_id}>
                            <div className='event_card1'>
                                <div className='event_card1_name'>{org.name}</div>
                                <div className='event_card1_Orgname'>{org.username}</div>
                                <div className='event_card1_date'>{orgEvents[org.organiser_id]?.length || 0}</div>
                                
                                <button
                                    className='event_btns_rem'
                                    onClick={() => toggleEvents(org.organiser_id)}
                                >
                                    {expanded === org.organiser_id ? 'Hide' : 'Show'}
                                </button>
                                <button
                                    className='event_btns_rem'
                                    style={{ marginLeft: '8px', backgroundColor: '#aaa' }}
                                    onClick={() => disableOrg(org.organiser_id)}
                                >
                                    Disable
                                </button>
                            </div>

                            {expanded === org.organiser_id && (
                                <div className='user_events_list'>
                                    {orgEvents[org.organiser_id]?.length > 0 ? (
                                        orgEvents[org.organiser_id].map(ev => (
                                            <div key={`${org.organiser_id}-${ev.event_id}`} className='event_detail'>
                                                <div>{ev.event_name}</div>
                                                <div>{new Date(ev.event_date).toLocaleDateString('en-GB')}</div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className='no_events'>No events found.</div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Admin_Org
