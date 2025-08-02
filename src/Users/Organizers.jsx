import React, { useEffect, useState } from 'react';
import './Organizers.css';

function Organizers() {
    const [organizers, setOrganizers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/organizers')
            .then(res => {

                console.log(res);
                if (!res.ok) {
                    throw new Error(`Server responded with status ${res.status}`);
                }

                return res.json(); // This will throw if content is not valid JSON
            })
            .then(data => {
                console.log("Fetched organizers data:", data);
                setOrganizers(data);
            })
            .catch(err => {
                console.error("❌ Error fetching organizers:", err);
            });
    }, []);

    return (
        <div className='organizers_browse'>
            <h2>Organizers</h2>
            <div className='Org'>
                {organizers.map((org, index) => (
                    <div className='Event' key={index}>
                        <img src={org.logo.replace(/\\/g, '/')} alt={org.name} />
                        <h3>{org.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Organizers;
