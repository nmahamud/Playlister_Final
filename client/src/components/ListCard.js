import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { Accordion, AccordionDetails, AccordionSummary, List } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SongCard from './SongCard';
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'


/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const [expand, setExpand] = useState(false);
    const { idNamePair, selected } = props;

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    const handleLoadChange = async (list) => {
        setExpand(store.isCurrentListThis(list));
    }

    function handleLoadList(event, id, list) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);
            console.log(list);
            console.log(expand);
            // CHANGE THE CURRENT LIST
            // async function internalChange(id, list) {
            //     store.setCurrentList(id);
            //     console.log(store.currentList);
            //     handleLoadChange(list);
            // }
            // internalChange(id, list);
            store.setCurrentList(list);
            handleLoadChange(list);
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
        }
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

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
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
        let cardElement =
        <div>
            <Accordion expanded={store.isCurrentListThis(idNamePair)} onChange={(e,expanded) => { if (expanded){
                    handleLoadList(e, idNamePair._id, idNamePair);}
            else {
                   handleCloseList(e, idNamePair._id)
            }
        }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
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
                    sx={{borderRadius:"25px", p: "10px", bgcolor: '#8000F00F', marginTop: '15px', display: 'flex', p: 1 }}
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
                            </Box>
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={handleToggleEdit} aria-label='edit'>
                                <ThumbUpIcon style={{fontSize:'48pt'}} />
                            </IconButton>
                        </Box>

                        <Box sx={{ p: 1 }}>
                            <IconButton>
                                <ThumbDownIcon style={{fontSize:'48pt'}} />
                            </IconButton>
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={handleToggleEdit} aria-label='edit'>
                                <EditIcon style={{fontSize:'48pt'}} />
                            </IconButton>
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {
                                    handleDeleteList(event, idNamePair._id)
                                }} aria-label='delete'>
                                <DeleteIcon style={{fontSize:'48pt'}} />
                            </IconButton>
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