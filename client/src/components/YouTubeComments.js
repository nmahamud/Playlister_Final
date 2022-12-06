import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import List from '@mui/material/List';
import ListCard from './ListCard.js';
import CommentCard from './CommentCard';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function YouTubeComments() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    let comments="";
    if (store.currentList) {
        comments=store.currentList.comments;
    }
    let user="";
    if (auth.user) {
        user=auth.user.userName;
    }
    let list=<div>No List Selected!</div>
    if (user != "") {
        if (comments.length != 0) {
        list = 
        <div>
            <List 
                id="playlist-cards" 
                sx={{ width: '100%', bgcolor: 'background.paper', height:'%5' }}
            >
                {
                    comments.map((el, index) => (
                        <CommentCard
                            comment={el.comment}
                            user={el.user}
                            index={index}
                        />
                    ))
                }
            </List>
            <Box textAlign='center'>
                <TextField fullWidth label='Comment here!'></TextField>
            </Box>
        </div>
        }
        else {
            list=<div>No Comments yet!</div>
        }
    
    }
    return (
        <Box id ='song-cards-container' sx = {{overflowY:'auto', maxHeight: 250}}>
            {list}
        </Box>
    );
}