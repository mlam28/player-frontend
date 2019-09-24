import React from 'react'
import PlaylistCard from '../components/PlaylistCard'


const CardContainer = (props) => {
  let {playlists} = props
    return(
        <div className='card-container'>
            {playlists ? playlists.map(playlist => <PlaylistCard key={playlist.uri} playlist={playlist}/>) : 'No Playlists'}
        </div>
    )
}

export default CardContainer