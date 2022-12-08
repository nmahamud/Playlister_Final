import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'

import EditToolbar from './EditToolbar'

import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import TextField from '@mui/material/TextField';

export default function AppBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [sort, setSort] = useState(2);
    const [cmenu, setMenu] = useState("Home");
    const [search, setSearch] = useState("");
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

    function handleSort(event) {
        store.changeSort(event.target.value);
        setSort((prevSort) => {return event.target.value})
    }

    function handleHomeMenu(event) {
        if (auth.user.userName != null) {
            store.changeView("Home");
            setMenu((prevMenu) => {return "Home"});
            store.loadIdNamePairs();
        }
    }

    function handleGroupMenu(event) {
        store.changeView("Group");
        setMenu((prevMenu) => {return "Group"});
        store.loadIdNamePairsPublic();
    }

    function handlePersonMenu(event) {
        store.changeView("Person");
        setMenu((prevMenu) => {return "Person"})
        store.loadIdNamePairsPublic();
    }

    function handleSearch(event) {
        setSearch((prevSearch) => {return event.target.value});
    }

    function handleKeyPress(e) {
        if (e.code === "Enter") {
            let newSearch = e.target.value;
            setSearch((prevSearch) => {return ""});
            if (newSearch != "")
                store.changeSearch(newSearch);
        }
    }
    

    return (
        <Box sx={{backgroundColor:"orange", display:'flex', justifyContent:'space-between'}}>
            <Box sx={{ml:2}}>
                <IconButton
                    onClick={handleHomeMenu}
                    size='large'
                    edge='start'
                    style={ cmenu == "Home" ? {color:'blueviolet'}: {}}
                >
                    <HomeIcon fontSize='large'/>
                </IconButton>
                <IconButton
                    onClick={handleGroupMenu}
                    size='large'
                    edge='start'
                    style={ cmenu == "Group" ? {color:'blueviolet'}: {}}
                >
                    <PeopleIcon fontSize='large'/>
                </IconButton>
                <IconButton
                    onClick={handlePersonMenu}
                    size='large'
                    edge='start'
                    style={ cmenu == "Person" ? {color:'blueviolet'}: {}}
                >
                    <PersonIcon fontSize='large'/>
                </IconButton>
            </Box>
            <TextField sx={{width:400}} label='Search' variant='outlined' value={search} onKeyPress={handleKeyPress} onChange={handleSearch} />
            <Box sx={{display:'flex'}}>
                <Typography sx={{fontSize:45}} variant='h2'>Sort By:</Typography>
                <TextField
                    sx={{mr:2, width:300}}
                    value={sort}
                    onChange={handleSort}
                    select
                >
                    {cmenu == "Home" ? <MenuItem value={0}>Creation Date (Old-New)</MenuItem> : null}
                    {cmenu == "Home" ? <MenuItem value={1}>Last Edit Date (New-Old)</MenuItem> : null}
                    <MenuItem value={2}>Name (A-Z)</MenuItem>
                    {cmenu == "Home" ? null : <MenuItem value={3}>Likes (High-Low)</MenuItem> }
                    {cmenu == "Home" ? null : <MenuItem value={4}>Dislikes (High-Low)</MenuItem> }
                    {cmenu == "Home" ? null : <MenuItem value={5}>Listens (High-Low)</MenuItem> }
                    {cmenu == "Home" ? null : <MenuItem value={6}>Published Date (New-Old)</MenuItem> }
                </TextField>
            </Box>
        </Box>
    );
}