import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import List from '@mui/material/List';
import CommentCard from './CommentCard';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function YouTubeComments() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [value, setValue] = useState("");
    const handleChange = e => {
        console.log(`Text: ${e.target.value}`);
        setValue(e.target.value);
    };
    function handleKeyPress(e) {
        if (e.code === "Enter") {
            let newCommentText = e.target.value; //get the new comment
            let newComment = {user: user, comment: newCommentText};
            setValue("");
            if (newCommentText != "")
                store.playerList.comments.push(newComment);
            store.updatePlayerList();
        };
    }

    let comments="";
    if (store.playerList) {
        comments=store.playerList.comments;
    }
    let user="";
    if (auth.user) {
        user=auth.user.userName;
    }
    let list=<div>No List Selected!</div>
    // if (user != "") {
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
                <TextField disabled={user==""} value={value} onKeyPress={handleKeyPress} onChange={handleChange} fullWidth label='Comment here!'></TextField>
            </Box>
        </div>
        }
        else {
            list=<div>No Comments yet!</div>
        }
    
    // }
    return (
        <Box id ='song-cards-container' sx = {{overflowY:'auto', maxHeight:800}}>
            {list}
        </Box>
    );
}