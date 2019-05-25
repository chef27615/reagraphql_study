import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const LAUNCH_QUERY = gql`
    query LaunchQuery($flight_number: Int!){
        launch(flight_number: $flight_number){
            flight_number
            mission_name
            launch_success
            launch_year
            launch_date_local
            rocket {
                rocket_id
                rocket_name
                rocket_type
            }

        }
    }
`

export class Launch extends Component {
    render() {
        let { flight_number } = this.props.match.params;
        flight_number = parseInt(flight_number);
        return (
            <div>
                <div><h1>Launch</h1></div>
                <Query query={LAUNCH_QUERY} variables={{flight_number}}>
                    {
                        ({ loading, error, data}) => {
                            if(loading){return <h4>loading...</h4>}else if(error){
                                console.log(error)
                            }else{
                                const {flight_number,
                                    mission_name,
                                    launch_success,
                                    launch_year,
                                    launch_date_local,
                                    rocket :{
                                        rocket_id,
                                        rocket_name,
                                        rocket_type
                                    } 
                                } = data.launch;
                                return(
                                  <div>
                                    <h1>Mission: {mission_name}</h1>
                                    <h4>Mission details</h4>
                                    <ul>
                                        <li>flight_number: {flight_number}</li>
                                        <li>launch_year: {launch_year}</li>
                                        <li>launch_date_local: {launch_date_local}</li>
                                        <li>launch_success: {launch_success ? 'yes' : 'no'}</li>
                                    </ul>
                                    <h4>Rocket Details</h4>
                                    <ul>
                                        <li>Rocket ID: {rocket_id}</li>
                                        <li>Rocket name: {rocket_name}</li>
                                        <li>Rocket type: {rocket_type}</li>
                                    </ul>
                                    <hr/>
                                    <Link to="/">Back</Link> 
                                </div>
                                )
                            }
                        }
                    }
                </Query>
            </div>
        )
    }
}

export default Launch
