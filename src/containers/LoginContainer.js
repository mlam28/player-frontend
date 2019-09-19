import React from 'react'
import {Button} from 'semantic-ui-react'

export default class LoginContainer extends React.Component {

    render(){
        return(
            <div>
                <Button as='a' href='http://localhost:3000/login'>Login with Spotify</Button>
            </div>
        )
    }
}