import React from 'react'
import {Button, Icon} from 'semantic-ui-react'
import styled from 'styled-components'

const LogIn = styled.div`
    position: absolute
    left: 43%;
    top: 42%;
    background: rgba(0,0,0,.87);

    width: 300px;
    color: white;
    border-radius: 5px;
    box-shadow: 5px 5px 20px #888888;
`
export default class LoginContainer extends React.Component {

    render(){
        return(
            <div id='login-background'>
           <LogIn> 
                <div id='button-wrapper'>
                    <h1 id='welcome'>Welcome to yfitops</h1>
                    <div>
                        <Button as='a' color='green' href='http://localhost:3000/login'>Login with Spotify <Icon name='spotify'></Icon></Button>
                    </div>
                </div>
        </LogIn>
        </div>
        )
    }
}