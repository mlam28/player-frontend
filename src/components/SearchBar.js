import React from 'react'
import {Input} from 'semantic-ui-react'

class SearchBar extends React.Component{

    render(){
        return(
            <div>
                 <Input loading icon='user' placeholder='Search...' />
            </div>
        )
    }
}

export default SearchBar