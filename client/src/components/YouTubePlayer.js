import React, { useEffect } from 'react';
import YouTube from 'react-youtube';
import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box'
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function YouTubePlayer() {
    const { store } = useContext(GlobalStoreContext);
    const [ytPlayer, setPlayer] = useState();
    const [songIndex, setSongIndex] = useState(0);
    const [prevList, setPrevList] = useState(null);
    let playlist = [];
    if (store.playerList){
        playlist=store.getPlayerList();
        // if (!prevList) {
        //     setPrevList(playlist);
        // }
    }
    
    let currentSong = 0;
    const playerOptions = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };
    let currentSongTitle="";
    let currentSongArtist="";
    
    if (store.playerList != null) {
        
        // if (prevList != store.playerList) {
        //     setSongIndex(0);
        //     setPrevList((prevPrevList)=>{return playlist});
        //     if (store.playerList.songs.length > 0) {
        //         currentSongArtist=store.playerList.songs[0].artist;
        //         currentSongTitle=store.playerList.songs[0].title;
        //     }
        // }
        // else {
        //     if (store.playerList.songs.length > 0) {
        //         currentSongArtist=store.playerList.songs[songIndex].artist;
        //         currentSongTitle=store.playerList.songs[songIndex].title;
        //     }
        // }
        if (store.playerList.songs.length > 0) {
            if ((store.playerList != prevList)) {
                setSongIndex((prevIndex)=>{return 0});
                setPrevList((prevPrevList)=>{return store.playerList});
            }
            currentSongArtist=store.playerList.songs[songIndex].artist;
            currentSongTitle=store.playerList.songs[songIndex].title;
        }
    }


    function loadAndPlayCurrentSong(player) {
        if (store.playerList && playlist.length!=0) {
            let song = playlist[songIndex].youTubeId;
            player.loadVideoById(song);
            player.playVideo();
        }
    }

    function incSong() {
        if (store.playerList && playlist.length!=0) {
            currentSong++;
            currentSong = currentSong % playlist.length;
        }
    }

    function decSong() {
        if (store.playerList && playlist.length!=0 && currentSong != 0) {
            currentSong--;
            currentSong = currentSong % playlist.length;
        }
    }

    function incSongButton() {
        if (store.playerList && playlist.length!=0 && songIndex < playlist.length-1) {
            currentSong++;
            setSongIndex((prevIndex) => {return prevIndex+1});
            currentSong = currentSong % playlist.length;
        }
        loadAndPlayCurrentSong(ytPlayer);
    }

    function decSongButton() {
        if (store.playerList && playlist.length!=0 && songIndex != 0) {
            currentSong--;
            setSongIndex((prevIndex) => {return prevIndex-1});
            currentSong = currentSong % playlist.length;
        }
        loadAndPlayCurrentSong(ytPlayer);
    }

    function pauseSong() {
        ytPlayer.pauseVideo();
    }

    function playSong() {
        ytPlayer.playVideo();
    }

    function onPlayerReady(event) {
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
        setPlayer(event.target);
    }
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
            player.playVideo();
        }
    }
    if (store.playerList && playlist.length!=0) {
        return (
            <Box>
                <Box textAlign="center">
                    <YouTube
                    videoId={playlist[songIndex].youTubeId}
                    opts={playerOptions}
                    onReady={onPlayerReady}
                    onStateChange={onPlayerStateChange} />
                    <Typography variant='h3'>Now Playing: </Typography>
                </Box>
                <Box>
                    <Typography sx={{fontSize:32}} variant='h2'>Playlist: {store.playerList.name} </Typography>
                    <Typography sx={{fontSize:32}} variant='h2'>Song #: {songIndex} </Typography>
                    <Typography sx={{fontSize:32}} variant='h2'>Title: {currentSongTitle} </Typography>
                    <Typography sx={{fontSize:32}} variant='h2'>Artist: {currentSongArtist} </Typography>
                </Box>
                <Box textAlign="center">
                    <IconButton onClick={decSongButton}>
                        <SkipPreviousIcon />
                    </IconButton>
                    <IconButton onClick={pauseSong}>
                        <StopIcon />
                    </IconButton>
                    <IconButton onClick={playSong}>
                        <PlayArrowIcon />
                    </IconButton>
                    <IconButton onClick={incSongButton}>
                        <SkipNextIcon />
                    </IconButton>
                </Box>
            </Box>
            );
        
    }
    return (
        <Box textAlign="center">
            {/* <YouTube
                opts={playerOptions}
                onReady={onPlayerReady}
                onStateChange={onPlayerStateChange} /> */}
            <IconButton disabled>
                <SkipPreviousIcon />
            </IconButton>
            <IconButton disabled>
                <StopIcon />
            </IconButton>
            <IconButton disabled>
                <PlayArrowIcon />
            </IconButton>
            <IconButton disabled>
                <SkipNextIcon />
            </IconButton>
        </Box>
    );
}