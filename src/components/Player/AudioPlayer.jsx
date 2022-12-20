import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faCirclePause, faShuffle, faRepeat, faForward, faBackward } from "@fortawesome/free-solid-svg-icons";
import "./AudioPlayer.css";



const AudioPlayer = () => {
    const audioTagRef = useRef();
    const audioPlayRef = useRef();
    const audioPauseRef = useRef();
    const audioName = useRef();
    const audioAuthor = useRef();
    const audioCurrentTimeRef = useRef();

    const musicPath = "./../../../music/"
    const playList = [
        {
            name: "@ My Worst",
            author: "blackbear",
            path: musicPath + "blackbear-@_My_Worst.mp3"
        }, 
        {
            name: "You Right",
            author: "Doja Cat, The Weeknd",
            path: musicPath + "Doja_Cat,_The_Weeknd-You_Right.mp3"
        },
        {
            name: "VTMS",
            author: "SoFaygo",
            path: musicPath + "SoFaygo-VTMS.mp3"
        },
        {
            name: "Close the Door",
            author: "Weston Estate",
            path: musicPath + "Weston_Estate-Close_the_Door.mp3"
        },
        {
            name: "Saturday Nights",
            author: "Weston Estate",
            path: musicPath + "Weston_Estate-Saturday_Nights.mp3"
        },
    ];

    const [playerState, setNewState] = useState({
        isPlaying: false,
        duration: 0,
        currentTime: 0,
        track: playList[0]
    });


    // Обработчики событий

    const onChangeAudioCurrentTime = event => {
        audioTagRef.current.currentTime = event.target.value;
    };

    const onClickPlayAudio = () => {
        audioPlayRef.current.style.display = "none";
        audioPauseRef.current.style.display = "block";

        audioTagRef.current.play();
    };

    const onPauseAudio = () => {
        audioPauseRef.current.style.display = "none";
        audioPlayRef.current.style.display = "block";

        audioTagRef.current.pause();
    };


    // Двусвязная синхронизация UI и playerState

    const syncAudioName = () => {
        audioName.current.innerText = playerState.track.name;
    };

    const syncAudioAuthor = () => {
        audioAuthor.current.innerText = playerState.track.author;
    }

    const syncCurrentTime = () => {
        const currentMin = Math.floor(playerState.currentTime / 60).toString().padStart(2, 0);
        const currentSec = Math.floor(playerState.currentTime % 60).toString().padStart(2, 0);
        const durationMin = Math.floor(playerState.duration / 60).toString().padStart(2, 0);
        const durationSec = Math.floor(playerState.duration % 60).toString().padStart(2, 0);

        audioCurrentTimeRef.current.innerText = `${currentMin}:${currentSec}/${durationMin}:${durationSec}`;
    };

    const syncPlayerStateOnCanPlayThrough = event => {
        const newState = {...playerState};

        newState.isPlaying = !event.target.paused;
        newState.duration = Math.floor(event.target.duration);
        newState.currentTime = Math.floor(event.target.currentTime);

        setNewState(newState);
    };

    const syncAudioDuration = event => {
        const newState = {...playerState};

        newState.currentTime = Math.floor(event.target.currentTime);

        setNewState(newState);
    };

    useEffect(() => {
        syncAudioName();
        syncAudioAuthor();
        syncCurrentTime();
    }, [playerState]);


    // Рендеринг

    return (
        <div className="audio-player">
            <div className="player">
                <audio
                    ref={audioTagRef}
                    src={playerState.track.path}
                    onCanPlayThrough={syncPlayerStateOnCanPlayThrough}
                    onTimeUpdate={syncAudioDuration}
                    style={{display: "none"}}
                ></audio>
                <div className="track-info">
                    <h2 ref={audioName} className="track-name">Track Name</h2>
                    <h4 ref={audioAuthor} className="track-author">Track Author</h4>
                    <h5 ref={audioCurrentTimeRef} className="track-current-time">00:00/00:00</h5>
                </div>
                <div className="track-controls">
                    <input
                        mix="0"
                        max={playerState.duration}
                        value={playerState.currentTime}
                        onChange={onChangeAudioCurrentTime}
                        type="range"
                        className="track-duration"/>
                    <div className="track-controls-btns">
                        <FontAwesomeIcon className="icon track-backward" icon={faBackward}/>
                        <FontAwesomeIcon ref={audioPlayRef} className="icon track-play" onClick={onClickPlayAudio} icon={faCirclePlay}/>
                        <FontAwesomeIcon ref={audioPauseRef} className="icon track-pause" onClick={onPauseAudio} icon={faCirclePause}/>
                        <FontAwesomeIcon className="icon track-forward" icon={faForward}/>
                    </div>
                    <div className="audio-player-btns">
                        <FontAwesomeIcon className="icon track-shufle" icon={faShuffle}/>
                        <FontAwesomeIcon className="icon track-repeat" icon={faRepeat}/>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default AudioPlayer;
