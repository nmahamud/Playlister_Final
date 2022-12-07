import React from 'react';
import YouTube from 'react-youtube';
import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import TabPanel from '@mui/lab/TabPanel';
import YouTubePlayer from './YouTubePlayer';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import YouTubeComments from './YouTubeComments';


export default function YouTubeWrapper() {
    const { store } = useContext(GlobalStoreContext);
    const [value, setValue] = React.useState(false);

    const handlePlayer = (event) => {
        setValue(false);
    };

    const handleComments = (event) => {
        setValue(true);
    };
    if (!value) {
        return(
            <Box overflow="auto" sx={{ width: '100%'}}>
                <Box>
                    <Button variant="contained" onClick={handlePlayer}>
                        Player
                    </Button>
                    <Button variant="contained" onClick={handleComments}>
                        Comments
                    </Button>
                </Box>
                <Box>
                    <YouTubePlayer />
                </Box>
                <Box sx={{display:'none'}}><YouTubeComments /></Box>
            </Box>
        );
    }
    else {
        return(
            <Box overflow="auto" sx={{ width: '100%' }}>
                <Button variant="contained" onClick={handlePlayer}>
                    Player
                </Button>
                <Button variant="contained" onClick={handleComments}>
                    Comments
                </Button>
                <Box sx={{display:'none'}}>
                    <YouTubePlayer />
                </Box>
                <Box sx={{height:'80%'}}>
                    <YouTubeComments />
                </Box>
            </Box>
        );
    }
}