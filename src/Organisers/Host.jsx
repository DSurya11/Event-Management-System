import './Host.css'

function Host() {
    return(
        <div className="host Main">
            <div className="sections">
                <h3>Add Details</h3>
                <h3>Add Pictures</h3>
                <h3>Confirm</h3>
            </div>
            <div className="host-form">
                <h2 className='head-text'>Enter the Details: </h2>
                <table>
                <tr>
                        <td>
                            Event Title:
                        </td>
                        <td>
                            <input type="text" name="event_name" placeholder="Name of the event"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Description:
                        </td>
                        <td>
                            <textarea name="event_description" placeholder='Describe your event'/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Date:
                        </td>
                        <td>
                            <input type="date" name="event_date" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Time:
                        </td>
                        <td>
                            <input type="time" name="event_time" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Venue:
                        </td>
                        <td>
                            <input type="text" name="event_venue" placeholder="Location"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Capacity:
                        </td>
                        <td>
                            <input type="text" name="event_capacity" placeholder="An estimate of capacity"/>
                        </td>
                    </tr>
                </table>

            </div>
        </div>
    )
}
export default Host;