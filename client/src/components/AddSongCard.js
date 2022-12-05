import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';

function AddSongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { song, index } = props;

    
    function handleAddSong(event) {
        
    }

    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
        >
            {index + 1}.
            <Button
                sx={{transform:"translate(-5%, -5%)", width:"5px", height:"30px"}}
                variant="contained"
                onClick={handleAddSong}>{"\u2715"}</Button>
        </div>
    );
}

export default AddSongCard;