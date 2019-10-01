import React from 'react'
import PlaylistCard from '../components/PlaylistCard'


const BrowseCardContainer = (props) => {
  let {playlists} = props
    return(
        <div className='card-container browse-cards'>
            {playlists ? playlists.map(playlist => <PlaylistCard key={playlist.uri ? playlist.uri : playlist.id} playlist={playlist}/>) : 'No Playlists'}
        </div>
    )
}

export default BrowseCardContainer