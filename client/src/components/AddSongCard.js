import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/material';

function AddSongCard(props) {
    const { store } = useContext(GlobalStoreContext);

    
    function handleAddSong(event) {
        store.addNewSong();
    }

    let cardClass = "list-card unselected-list-card";
    return (
        <Box
            id='add-song-card'
            className={cardClass}
            textAlign='center'
        >
            <Button
                sx={{transform:"translate(-5%, -5%)", width:"5px", height:"30px"}}
                variant="contained"
                onClick={handleAddSong}><AddIcon /></Button>
        </Box>
    );
}

export default AddSongCard;