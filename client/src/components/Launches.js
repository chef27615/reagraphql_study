import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import MissionKey from './MissionKey';
import Launchitem from './Launchitem';

const LAUNCHES_QUERY = gql`
    query LaunchesQuery {
        launches {
            flight_number
            mission_name
            launch_date_local
            launch_success
        }
    }
`

class Launches extends Component {
    render() {
        return (
            <>
               <h1>Launches</h1>
               <MissionKey />
               <Query query={LAUNCHES_QUERY}>
                {
                    ({ loading, error, data})=> {
                        if(loading){
                           return <h4>loading...</h4>; 
                        } else if(error) {console.log(error);}
                        
                        return <div>
                            {
                                data.launches.map(launch=>(
                                    <Launchitem key={launch.flight_number} launch={launch} />
                                ))
                            }
                        </div>
                    }
                }   
                </Query>     
            </>
        )
    }
}

export default Launches
