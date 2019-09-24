import React from 'react'
import {NavLink} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import { Menu, Icon} from 'semantic-ui-react'

class NavBar extends React.Component{

    render(){
        return(
            <Menu inverted pointing vertical id='nav-bar'>
            <NavLink to='/home'><Menu.Item
              name='home'
            //   active={activeItem === 'home'}
              onClick={this.handleItemClick}
            /></NavLink>
            <NavLink to='/browse'><Menu.Item
              name='Browse'
            //   active={activeItem === 'messages'}
              onClick={this.handleItemClick}
            /></NavLink>
            <Menu.Item id='menu-playlists-container'>
              <Menu.Header>Shared Playlists</Menu.Header>
                <Menu.Menu>
                    <Menu.Item
                      className='my-menu-item'
                      name='New Playlist'
                      content={<p>New Playlist<Icon name='add' color='yellow'></Icon></p>}
                    />
                </Menu.Menu>
              </Menu.Item>
          </Menu>
        )
    }
}

export default withRouter(NavBar)