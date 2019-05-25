import React from 'react'
import classNames from 'classnames';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

export default function Launchitem({ launch: {flight_number, mission_name, launch_date_local, launch_success}}) {
    
    return (
        <div>
            <div>
                <h4>Mission: <span className={classNames({
                    'text-success': launch_success,
                    'text-danger': !launch_success
                })}>{mission_name}</span> </h4>
                <p>Date: <Moment fromat='yyyy-mm-dd hh:mm'>{launch_date_local}</Moment></p>
                
            </div>
            <div>
                <Link to={`/launch/${flight_number}`} >Launch Details</Link>
            </div>
        </div>
    )
}
