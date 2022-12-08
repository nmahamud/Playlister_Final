import { useContext } from 'react'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import Box from '@mui/material/Box';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/



function Statusbar() {

    function clickHandler() {
        store.tryAcessingOtherAccountPlaylist();
    }

    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    function handleCreateNewList() {
        store.createNewList();
    }
    console.log("logged in: " +  auth.loggedIn);
    let text ="";
    // if (auth.loggedIn && store.currentList){
    //     text = store.currentList.name;
    // return (
    //     <div id="playlister-statusbar">
    //         {text}
    //     </div>
    // );
    // }
    if (store) {
        if (store.viewList == "Home") {
            text = 
            <Box textAlign='center' id="playlister-statusbar">
                <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
                >
                    <AddIcon />
                </Fab>
                Your Lists
            </Box>;
        }
    }

    return text;
}
/*<input type="button" 
onClick={clickHandler} 
value='clickyclicky' />*/
// sx={{transform:"translate(1150%, 10%)"}}

export default Statusbar;