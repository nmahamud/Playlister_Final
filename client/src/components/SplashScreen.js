import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';

export default function SplashScreen() {
    return (
        <div id="splash-screen">
            <img src={'playlister.png'} />
            <Box sx= {{fontSize:42}} >Welcome to My Playlister</Box>
            <Box sx= {{fontSize:30}} >This is an application that allows you to create playlists via YouTube.</Box>
            <Box sx= {{fontSize:30}} >Input YouTube videos into this application to show lists of songs.</Box>
            <Box sx={{m:0,p:0}}> 
                <Button href="/login/" variant='contained'>Login</Button>
                <Button href="/register/" variant='contained'>Create New Account</Button>
            </Box>
            <Box>
                <Button variant='contained'>Guest</Button>
            </Box>
            <Box sx = {{fontSize:20, m:10 }}>Made By Nazif Mahamud</Box>
        </div>

    )
}