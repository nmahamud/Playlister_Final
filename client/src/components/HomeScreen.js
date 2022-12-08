import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import NavigationBar from './NavigationBar'
import WorkspaceScreen from './WorkspaceScreen'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Box from '@mui/material/Box'
import YouTubePlayer from './YouTubePlayer'
import YouTubeWrapper from './YouTubeWrapper'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function isPublished(playList) {
        return playList.published != "Nope";
    }

    function groupSearch(playlist) {
        return playlist.name.startsWith(store.searchInput);
    }

    function userSearch(playlist) {
        return playlist.userName.startsWith(store.searchInput);
    }

    let listCard = "";
    if (store) {
        if (store.viewList=="Home") {
            let pubList = store.idNamePairs;
            switch (store.sortNum) {
                case (2): {
                    pubList.sort(function(a,b) {
                        return a.name.localeCompare(b.name);
                    });
                    break;
                }
                case (0): {
                    pubList.sort((a,b) => (a.createdAt < b.createdAt) ? -1 : 1);
                    break;
                }
                case (1): {
                    pubList.sort((a,b) => (a.updatedAt < b.updatedAt) ? 1 : -1);
                    break;
                }
            }
            listCard = 
                <List sx={{width: '100%', bgcolor: 'background.paper', mb:"20px" }}>
                {
                    pubList.map((pair) => (
                        <ListCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                        />
                    ))
                    
                }
                </List>;
        }
        else {
            if (store.searchInput != "") {
                let pubList = store.idNamePairs.filter(isPublished);
                if (store.viewList == "Group") {
                    pubList = pubList.filter(groupSearch);
                }
                else {
                    pubList = pubList.filter(userSearch);
                }
                switch (store.sortNum) {
                    case (2): {
                        pubList.sort(function(a,b) {
                            return a.name.localeCompare(b.name);
                        });
                        break;
                    }
                    case (3): {
                        pubList.sort((a,b) => (a.likes.length < b.likes.length) ? 1 : -1);
                        break;
                    }
                    case (4): {
                        pubList.sort((a,b) => (a.dislikes.length < b.dislikes.length) ? 1 : -1);
                        break;
                    }
                    case (5): {
                        pubList.sort((a,b) => (a.listens < b.listens) ? 1 : -1);
                        break;
                    }
                    case (6): {
                        pubList.sort((a,b) => (new Date(a.published) < new Date(b.published)) ? 1 : -1);
                        break;
                    }
                }
                // pubList.map((pair) => (console.log(pair)))
                listCard = 
                    <List sx={{width: '100%', bgcolor: 'background.paper', mb:"20px" }}>
                    {
                        pubList.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                        
                    }
                    </List>;
            }
        }
    }
    return (
        <div id="playlist-selector">
            {/* <div id="list-selector-heading"> */}
            {/* <Fab sx={{transform:"translate(-20%, 0%)"}}
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
                Your Playlists */}
            <Box>
                <NavigationBar></NavigationBar>
            </Box>
            {/* </div> */}
            <Box className='split left'>
                <Box sx={{bgcolor:"background.paper"}} id="list-selector-list">
                    {
                        listCard
                    }
                    <MUIDeleteModal />
                </Box>
            </Box>
            <Box className='split right' sx={{height:'85%'}}>
                    <YouTubeWrapper />
            </Box>
        </div>)
}

export default HomeScreen;