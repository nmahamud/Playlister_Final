import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'

import EditToolbar from './EditToolbar'

import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import MenuIcon from '@mui/icons-material/Menu';
import TextField from '@mui/material/TextField';

export default function AppBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        auth.logoutUser();
    }

    const handleHouseClick = () => {
        store.closeCurrentList();
    }

    const menuId = 'primary-search-account-menu';
    const loggedOutMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Link to='/login/'><MenuItem onClick={handleMenuClose}>Login</MenuItem></Link>
            <Link to='/register/'><MenuItem onClick={handleMenuClose}>Create New Account</MenuItem></Link>
        </Menu>
    );
    const loggedInMenu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>        

    let editToolbar = "";
    let menu = loggedOutMenu;
    if (auth.loggedIn) {
        menu = loggedInMenu;
        if (store.currentList) {
            editToolbar = <EditToolbar />;
        }
    }
    
    function getAccountMenu(loggedIn) {
        let userInitials = auth.getUserInitials();
        console.log("userInitials: " + userInitials);
        if (loggedIn) 
            return <div>{userInitials}</div>;
        else
            return <AccountCircle />;
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" sx={{backgroundColor:"orange"}}>
                <Toolbar>
                    <Box sx={{display:'flex', justifyContent:'space-between'}}>
                        <IconButton
                            size='large'
                            edge='start'>
                            <HomeIcon fontSize='large'/>
                        </IconButton>
                        <IconButton
                            size='large'
                            edge='start'>
                            <PeopleIcon fontSize='large'/>
                        </IconButton>
                        <IconButton
                            size='large'
                            edge='start'>
                            <PersonIcon fontSize='large'/>
                        </IconButton>
                    </Box>
                    <TextField label='Search' variant='outlined' />
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block', color: 'black' } }}
                    >
                        SORT BY
                    </Typography>
                    <Box sx={{display:'flex', justifyContent:'right'}}>
                        <IconButton
                            size='large'
                            edge='end'>
                            <MenuIcon fontSize='large'/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {
                menu
            }
        </Box>
    );
}