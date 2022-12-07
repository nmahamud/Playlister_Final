import { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { Accordion, AccordionDetails, AccordionSummary, List, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SongCard from './SongCard';
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import AddSongCard from './AddSongCard';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { textAlign } from '@mui/system';
import EditToolbar from './EditToolbar';
import { Button } from '@mui/material';
import AuthContext from '../auth';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const [expand, setExpand] = useState(false);
    const { idNamePair, selected } = props;
    const [ publish, setPublish ] = useState(store.currentList != null);
    
    let thisList = false;

    let modalJSX = ""
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    function handleLoadChange(list) {
        let bool = store.isCurrentListThis(list)
        setExpand(bool);
    }

    useEffect(() => {
        console.log(store.currentList);
    })

    function handleLoadList(event, id, list) {
        if (event.detail==2) {
            console.log("double clicked");
            handleToggleEdit(event);
        }
        else {
            console.log("handleLoadList for " + id);
            if (!event.target.disabled) {
                let _id = event.target.id;
                if (_id.indexOf('list-card-text-') >= 0)
                    _id = ("" + _id).substring("list-card-text-".length);

                console.log("load " + event.target.id);

                // CHANGE THE CURRENT LIST
                if (!store.isCurrentListThis(list)) {
                    setExpand(false);
                    store.closeCurrentList();
                }
                // store.setCurrentList(list);
                store.setPlayerList(list);
            }
        }
    }

    function handleOpenList(event, id, list) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            if (!expand) {
                store.closeCurrentList();
                store.setCurrentList(list);
                setExpand(true);
                // event.stopPropagation();
            }
            else {
                // if (store.isCurrentListThis(list)) {
                    store.closeCurrentList();
                    setExpand(false);
                // }
                // else {
                //     store.closeCurrentList();
                //     setExpand(true);
                // }
            }
            event.stopPropagation();
        }
    }

    function handleCloseList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.closeCurrentList();
            setExpand(false);
        }
    }

    function handleDuplicate(event) {
        console.log("Duping the list " + idNamePair._id);
        if (!event.target.disabled) {
            store.duplicateList();
        }
    }

    function handlePublish(event) {
        // setPublish(true);
        store.currentList.published=new Date().toDateString();
        store.updateCurrentList();
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(idNamePair._id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    let cardElement = "";
//     if (store.currentList) {
//     if (store.currentList != idNamePair) {
//         cardElement = 
//         <div>
//             <ListItem
//                     id={idNamePair._id}
//                     key={idNamePair._id}
//                     sx={{borderRadius:"25px", p: "10px", bgcolor: '#8000F00F', marginTop: '15px', display: 'flex', p: 1 }}
//                     style={{transform:"translate(1%,0%)", width: '98%', fontSize: '48pt' }}
//                     button
//                     onClick={(event) => {
//                         handleLoadList(event, idNamePair._id, idNamePair)
//                     }}
//                     >
//                     <Box sx={{ p:1, fontSize: 30 }}>
//                             {idNamePair.name}
//                         <Box sx={{ fontSize: 20 }}>
//                             By {idNamePair.userName}
//                         </Box>
//                     </Box>
//                     <Box sx={{ p: 1 }}>
//                         <IconButton onClick={handleToggleEdit} aria-label='edit'>
//                             <ThumbUpIcon style={{fontSize:'48pt'}} />
//                         </IconButton>
//                     </Box>
//                     <Box sx={{ p: 1 }}>
//                         <IconButton>
//                             <ThumbDownIcon style={{fontSize:'48pt'}} />
//                         </IconButton>
//                     </Box>
//                     <Box sx={{ p: 1 }}>
//                         <IconButton onClick={handleToggleEdit} aria-label='edit'>
//                             <EditIcon style={{fontSize:'48pt'}} />
//                         </IconButton>
//                     </Box>
//                     <Box sx={{ p: 1 }}>
//                         <IconButton onClick={(event) => {
//                                 handleDeleteList(event, idNamePair._id)
//                                }} aria-label='delete'>
//                             <DeleteIcon style={{fontSize:'48pt'}} />
//                         </IconButton>
//                     </Box>
//                     <Box sx={{ p: 1, textAlign:"right"}}>
//                         <IconButton onClick={(event) => {
//                                 handleOpenList(event, idNamePair._id, idNamePair)
//                                }} aria-label='delete'>
//                             <KeyboardDoubleArrowDownIcon style={{fontSize:'48pt'}} />
//                         </IconButton>
//                     </Box>
//             </ListItem>
//         </div>
//     }
//     else {
//         if (!expand) {
//             cardElement = 
//         <div>
//             <ListItem
//                     id={idNamePair._id}
//                     key={idNamePair._id}
//                     sx={{borderRadius:"25px", p: "10px", bgcolor: '#8000F00F', marginTop: '15px', display: 'flex', p: 1 }}
//                     style={{transform:"translate(1%,0%)", width: '98%', fontSize: '48pt' }}
//                     button
//                     onClick={(event) => {
//                         handleLoadList(event, idNamePair._id, idNamePair)
//                     }}
//                     >
//                     <Box sx={{ p:1, fontSize: 30 }}>
//                             {idNamePair.name}
//                         <Box sx={{ fontSize: 20 }}>
//                             By {idNamePair.userName}
//                         </Box>
//                     </Box>
//                     <Box sx={{ p: 1 }}>
//                         <IconButton onClick={handleToggleEdit} aria-label='edit'>
//                             <ThumbUpIcon style={{fontSize:'48pt'}} />
//                         </IconButton>
//                     </Box>
//                     <Box sx={{ p: 1 }}>
//                         <IconButton>
//                             <ThumbDownIcon style={{fontSize:'48pt'}} />
//                         </IconButton>
//                     </Box>
//                     <Box sx={{ p: 1 }}>
//                         <IconButton onClick={handleToggleEdit} aria-label='edit'>
//                             <EditIcon style={{fontSize:'48pt'}} />
//                         </IconButton>
//                     </Box>
//                     <Box sx={{ p: 1 }}>
//                         <IconButton onClick={(event) => {
//                                 handleDeleteList(event, idNamePair._id)
//                                }} aria-label='delete'>
//                             <DeleteIcon style={{fontSize:'48pt'}} />
//                         </IconButton>
//                     </Box>
//                     <Box sx={{ p: 1, textAlign:"right"}}>
//                         <IconButton onClick={(event) => { event.stopPropagation();
//                                 handleOpenList(event, idNamePair._id, idNamePair);
//                                }} aria-label='delete'>
//                             <KeyboardDoubleArrowDownIcon style={{fontSize:'48pt'}} />
//                         </IconButton>
//                     </Box>
//             </ListItem>
//         </div>
//         }
//         else {
//             cardElement = 
//         <div>
//             <ListItem
//                     id={idNamePair._id}
//                     key={idNamePair._id}
//                     sx={{borderRadius:"25px", p: "10px", bgcolor: '#8000F00F', marginTop: '15px', display: 'flex', p: 1 }}
//                     style={{transform:"translate(1%,0%)", width: '98%', fontSize: '48pt' }}
//                     button
//                     onClick={(event) => {
//                         handleLoadList(event, idNamePair._id, idNamePair)
//                     }}
//                     >
//                     <Box sx={{ p:1, fontSize: 30 }}>
//                             {idNamePair.name}
//                         <Box sx={{ fontSize: 20 }}>
//                             By {idNamePair.userName}
//                         </Box>
//                     </Box>
//                     <Box sx={{ p: 1 }}>
//                         <IconButton onClick={handleToggleEdit} aria-label='edit'>
//                             <ThumbUpIcon style={{fontSize:'48pt'}} />
//                         </IconButton>
//                     </Box>
//                     <Box sx={{ p: 1 }}>
//                         <IconButton>
//                             <ThumbDownIcon style={{fontSize:'48pt'}} />
//                         </IconButton>
//                     </Box>
//                     <Box sx={{ p: 1 }}>
//                         <IconButton onClick={handleToggleEdit} aria-label='edit'>
//                             <EditIcon style={{fontSize:'48pt'}} />
//                         </IconButton>
//                     </Box>
//                     <Box sx={{ p: 1 }}>
//                         <IconButton onClick={(event) => {
//                                 handleDeleteList(event, idNamePair._id)
//                                }} aria-label='delete'>
//                             <DeleteIcon style={{fontSize:'48pt'}} />
//                         </IconButton>
//                     </Box>
//                     <Box sx={{ p: 1, textAlign:"right"}}>
//                         <IconButton onClick={(event) => {
//                                 handleCloseList(event, idNamePair._id, idNamePair)
//                                }} aria-label='delete'>
//                             <KeyboardDoubleArrowUpIcon style={{fontSize:'48pt'}} />
//                         </IconButton>
//                     </Box>
//             </ListItem>
//             <Box id ='song-cards-container' sx = {{overflowY:'auto', maxHeight: 250}}>
//                 <List 
//                    id="playlist-cards" 
//                    sx={{ width: '100%', bgcolor: 'background.paper', height:'%5' }}
//                 >
//                    {
//                         idNamePair.songs.map((song, index) => (
//                             <SongCard
//                                 id={'playlist-song-' + (index)}
//                                 key={'playlist-song-' + (index)}
//                                 index={index}
//                                 song={song}
//                             />
//                         ))
//                     }
//                     <AddSongCard />
//                 </List>
//                 { modalJSX }
//             </Box>
//         </div>
//     }   
//         }
// }
// else {
//     cardElement = 
//         <div>
//             <ListItem
//                     id={idNamePair._id}
//                     key={idNamePair._id}
//                     sx={{borderRadius:"25px", p: "10px", bgcolor: '#8000F00F', marginTop: '15px', display: 'flex', p: 1 }}
//                     style={{transform:"translate(1%,0%)", width: '98%', fontSize: '48pt' }}
//                     button
//                     onClick={(event) => {
//                         handleLoadList(event, idNamePair._id, idNamePair)
//                     }}
//                     >
//                     <Box sx={{ p:1, fontSize: 30 }}>
//                             {idNamePair.name}
//                         <Box sx={{ fontSize: 20 }}>
//                             By {idNamePair.userName}
//                         </Box>
//                     </Box>
//                     <Box textAlight="right" sx={{ p: 1 }}>
//                         <IconButton onClick={handleToggleEdit} aria-label='edit'>
//                             <ThumbUpIcon style={{fontSize:'48pt'}} />
//                         </IconButton>
//                     {/* </Box> */}
//                     {/* <Box sx={{ p: 1 }}> */}
//                         <IconButton>
//                             <ThumbDownIcon style={{fontSize:'48pt'}} />
//                         </IconButton>
//                     {/* </Box>
//                     <Box sx={{ p: 1 }}> */}
//                         <IconButton onClick={handleToggleEdit} aria-label='edit'>
//                             <EditIcon style={{fontSize:'48pt'}} />
//                         </IconButton>
//                     {/* </Box>
//                     <Box sx={{ p: 1 }}> */}
//                         <IconButton onClick={(event) => {
//                                 handleDeleteList(event, idNamePair._id)
//                                }} aria-label='delete'>
//                             <DeleteIcon style={{fontSize:'48pt'}} />
//                         </IconButton>
//                     {/* </Box>
//                     <Box sx={{ p: 1, textAlign:"right"}}> */}
//                         <IconButton onClick={(event) => {
//                                 handleOpenList(event, idNamePair._id, idNamePair)
//                                }} aria-label='delete'>
//                             <KeyboardDoubleArrowDownIcon style={{fontSize:'48pt'}} />
//                         </IconButton>
//                     </Box>
//             </ListItem>
//         </div>
// }
        cardElement =
        <div>
            <Accordion expanded={store.isCurrentListThis(idNamePair) && expand} onChange={(e,expanded) => { if (expanded){
                    handleLoadList(e, idNamePair._id, idNamePair);}
            // else {
            //        handleCloseList(e, idNamePair._id)
            // }
        }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon onClick={(event)=>{handleOpenList(event, idNamePair._id, idNamePair)}}/>}
                    aria-controls={"itemcard"+idNamePair._id}
                    id={"itemcard"+idNamePair._id}
                    onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault()
                      }}
                >
                    <ListItem
                    id={idNamePair._id}
                    key={idNamePair._id}
                    sx={{borderRadius:"25px", p: "10px", bgcolor: '#8000F00F', marginTop: '15px', display: 'flex', p: 1, justifyContent:'space-between' }}
                    style={{transform:"translate(1%,0%)", width: '98%', fontSize: '48pt' }}
                    button
                    // onClick={(event) => {
                    //     handleLoadList(event, idNamePair._id)
                    // }}
                    >
                        <Box sx={{ p:1, fontSize: 30 }}>
                            {idNamePair.name}
                            <Box sx={{ fontSize: 20 }}>
                                By {idNamePair.userName}
                                <br />
                                {idNamePair.published != "Nope" ? idNamePair.published : null}
                            </Box>
                        </Box>
                        <Box sx={{ p: 1, display:'flex' }}>
                        {idNamePair.published != "Nope" ? <IconButton aria-label='edit'>
                                <ThumbUpIcon style={{fontSize:'48pt'}} />
                            </IconButton> : null}
                            {idNamePair.published != "Nope" ? <Typography variant='h3' sx={{ fontSize:70 }}>{idNamePair.likes.length}</Typography> : null}
                            {idNamePair.published != "Nope" ? <IconButton>
                                <ThumbDownIcon style={{fontSize:'48pt'}} />
                            </IconButton> : null}
                            {idNamePair.published != "Nope" ? <Typography variant='h3' sx={{ fontSize:70 }}>{idNamePair.dislikes.length}</Typography> : null}
                        </Box>
                    </ListItem>
                </AccordionSummary>
                <AccordionDetails>
                    <Box id ='song-cards-container' sx = {{overflowY:'auto', maxHeight: 250}}>
                        <List 
                            id="playlist-cards" 
                            sx={{ width: '100%', bgcolor: 'background.paper', height:'%5' }}
                        >
                            {
                                idNamePair.songs.map((song, index) => (
                                    <SongCard
                                        id={'playlist-song-' + (index)}
                                        key={'playlist-song-' + (index)}
                                        index={index}
                                        song={song}
                                    />
                                ))
                            }
                            {idNamePair.published != "Nope" ? null:<AddSongCard />}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', p:1, m:1, bgcolor: 'background.paper'}}>
                                {idNamePair.published != "Nope" ? null : <EditToolbar 
                                    handleToggleEdit={handleToggleEdit}
                                    handleDeleteList={handleDeleteList}
                                />}
                                <Box>
                                    {idNamePair.published != "Nope" ? null : <Button onClick={handlePublish} className='edit-right-button' variant="contained">
                                        Publish
                                    </Button> }
                                    {(idNamePair.published != "Nope") && (auth.user.userName != idNamePair.userName)? null : <Button className='edit-right-button' onClick={handleDeleteList} variant="contained">
                                        Delete
                                    </Button>}
                                    <Button onClick={handleDuplicate} className='edit-right-button' variant="contained">
                                        Duplicate
                                    </Button>
                                </Box>
                            </Box>
                        </List>
                        { modalJSX }
                    </Box>
                </AccordionDetails>
            </Accordion>
        </div>
         
    // }

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;