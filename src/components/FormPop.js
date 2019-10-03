import React from 'react'
import { Button, Popup, Icon, Menu} from 'semantic-ui-react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {addSong} from '../redux/userActions'


const StyledPop = styled.div`
 padding: 10px;
`

const NestedPop = styled.div`
`

const hi = (e, x) => {
      console.log("hi")
      debugger
}

class FormPop extends React.Component {

      constructor(){
            super()
            this.state={
                  isOpen: null
            }
      }

      handleOpen = () => {
            this.setState({
                  isOpen: true
            })
      }

      handleClose = () => {
            this.setState({
                  isOpen: false
            })
      }

      render(){
            return(
            <Popup pinned={true} open={this.state.isOpen} trigger={<div onClick={this.handleOpen}><Icon name='angle right'></Icon></div>} flowing on='click'>
                  <Popup.Content>
            <StyledPop>
                  <Popup
                  pinned={true}
                  onClose={this.handleClose}
                  flowing on='click'
                  trigger={<div >Add to Playlist <Icon name='chevron right'></Icon></div>}
                  position='top center'
                  size='large'
                  inverted
                  onClose={this.handleClose}
                  >  
                  <Popup.Content >
                        <Menu inverted vertical>
                        {this.props.sharedPlaylists.map(x => <Menu.Item className='playlist-list' onClick={(e) => {this.props.addSong(e, this.props.song, x.id); this.handleClose()}}>{x.name}</Menu.Item>)}
                        </Menu>
                  </Popup.Content>
                  </Popup> 
            </StyledPop>
            <StyledPop>
                  <div><a href={this.props.artisturi}>Go to Spotify Artist <Icon name='chevron right'></Icon></a></div>
            </StyledPop>
                  </Popup.Content>
            
            </Popup>
  )

}

}

  const mapStateToProps = (store) => {
        return{
              sharedPlaylists: store.sharedPlaylists
        }
  }

  const mapDispatchToProps = (dispatch) => {
      return {
        addSong: (e, song, id) => dispatch(addSong(e, song, id))    
      }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(FormPop)

 