import React from 'react'
import {NavLink} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

class NavBar extends React.Component{

    render(){
        return(
            <Menu pointing secondary vertical id='nav-bar'>
            <Menu.Item
              name='home'
            //   active={activeItem === 'home'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='messages'
            //   active={activeItem === 'messages'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='friends'
            //   active={activeItem === 'friends'}
              onClick={this.handleItemClick}
            />
          </Menu>
        )
    }
}

export default NavBar