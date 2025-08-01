import React from 'react';
import './BrowseOrg.css';
function BrowseOrg() {
    return (
        <div className='browse_org'>
            <div className='browse_org_header'><h1>Organizer_name</h1></div>
            <div className='browse_org_info'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum sint, ducimus ab possimus corrupti reiciendis cumque? Laudantium incidunt veritatis possimus maiores nulla, molestiae fugit quam optio quibusdam aliquid, ipsa tenetur!
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis ducimus esse excepturi ratione ipsam, dolores, magnam nostrum asperiores, culpa odio nobis fuga harum. Omnis quasi quam debitis illum rem iusto!
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. In pariatur inventore facilis animi eveniet beatae maiores sed fugit labore obcaecati deleniti eligendi modi nostrum quos molestias commodi est, porro dolorem!
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas id saepe veritatis, quam totam, sunt hic distinctio accusantium recusandae qui odio quae, impedit corrupti ullam tempora commodi accusamus! Voluptates, corrupti.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus nostrum molestiae corrupti culpa ratione, porro consequatur perferendis amet laudantium vel provident facilis. Dignissimos ipsam libero pariatur consequuntur illum nostrum atque.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla beatae deserunt necessitatibus. Illo quaerat maiores ipsum voluptatibus, non ab enim eaque iste, velit, autem officia quam quasi aut totam eveniet.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste mollitia quisquam reiciendis sapiente veniam rem similique, perferendis accusantium modi, impedit quasi cupiditate assumenda voluptatibus esse. Impedit facilis pariatur tenetur veniam!
            </div>
            <div className='browse_org_events'>
                <div className='browse_org_upcoming'>
                    <div id='browse_org_upcoming_header'><h2>Upcoming_event</h2>
                    </div>
                    <div className='org_upcoming'>
                        <div className='event_upcoming'>
                            <img src=".\white.jpeg" alt="" />
                            <h3>Club_Name</h3>
                        </div>
                        <div className='event_upcoming'>
                            <img src=".\white.jpeg" alt="" />
                            <h3>Club_Name</h3>
                        </div>
                    </div>
                </div>
                <div className='browse_org_prev'>
                    <div id='browse_org_prev_header'><h2>Previous_events</h2>
                    </div>
                    <div className='org_prev'>
                        <div className='event_prev'>
                            <img src=".\white.jpeg" alt="" />
                            <h3>Club_Name</h3>
                        </div>
                        <div className='event_prev'>
                            <img src=".\white.jpeg" alt="" />
                            <h3>Club_Name</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BrowseOrg;