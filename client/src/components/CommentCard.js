import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

function CommentCard(props) {
    const { store } = useContext(GlobalStoreContext);
    // const [ draggedTo, setDraggedTo ] = useState(0);
    const { comment, user, index } = props;


    let cardClass = "list-card comment-card";
    return (
        <div
            id={'comment-' + index + '-card'}
            className={cardClass}
        >
            <Typography sx={{fontSize:36}} variant="h3">{user}</Typography>
            <Typography variant='body1'>{comment}</Typography>
        </div>
    );
}

export default CommentCard;