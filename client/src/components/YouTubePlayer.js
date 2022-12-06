import React from 'react';
import YouTube from 'react-youtube';
import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box'
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function YouTubePlayer() {
    const { store } = useContext(GlobalStoreContext);
    const [ytPlayer, setPlayer] = useState(); 
    let playlist = [];
    if (store.currentList)
        playlist=store.getCurrentList();
    
    let currentSong = 0;
    const playerOptions = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    function loadAndPlayCurrentSong(player) {
        if (store.currentList && playlist.length!=0) {
            let song = playlist[currentSong].youTubeId;
            player.loadVideoById(song);
            player.playVideo();
        }
    }

    function incSong() {
        if (store.currentList && playlist.length!=0) {
            currentSong++;
            currentSong = currentSong % playlist.length;
        }
    }

    function decSong() {
        if (store.currentList && playlist.length!=0 && currentSong != 0) {
            currentSong--;
            currentSong = currentSong % playlist.length;
        }
    }

    function incSongButton() {
        if (store.currentList && playlist.length!=0) {
            currentSong++;
            currentSong = currentSong % playlist.length;
        }
        loadAndPlayCurrentSong(ytPlayer);
    }

    function decSongButton() {
        if (store.currentList && playlist.length!=0 && currentSong != 0) {
            currentSong--;
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
    if (store.currentList && playlist.length!=0) {
        return (
            <Box textAlign="center">
                <YouTube
                videoId={playlist[currentSong].youTubeId}
                opts={playerOptions}
                onReady={onPlayerReady}
                onStateChange={onPlayerStateChange} />
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
            );
        
    }
    return (
        <Box textAlign="center">
            {/* <YouTube
                opts={playerOptions}
                onReady={onPlayerReady}
                onStateChange={onPlayerStateChange} /> */}
            <IconButton>
                <SkipPreviousIcon />
            </IconButton>
            <IconButton>
                <StopIcon />
            </IconButton>
            <IconButton>
                <PlayArrowIcon />
            </IconButton>
            <IconButton>
                <SkipNextIcon />
            </IconButton>
        </Box>
    );
}