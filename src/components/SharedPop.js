import React from 'react'
import styled from 'styled-components'
import { Button, Popup, Icon} from 'semantic-ui-react'



const StyledPop = styled.div`
 padding: 10px;
`

class SharedPop extends React.Component{



    render(){
        return(
            <Popup pinned={true} trigger={<Button><Icon name='hand spock'></Icon></Button>} flowing on='click'>
            <Popup.Content>
      <StyledPop>
            <div><a href={this.props.artisturi}>Go to Spotify Artist <Icon name='chevron right'></Icon></a></div>
      </StyledPop>
            </Popup.Content>
      
      </Popup>
        )
    }
}

export default SharedPop