import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faCirclePause, faShuffle, faRepeat, faForward, faBackward } from "@fortawesome/free-solid-svg-icons";
import "./AudioPlayer.css";



const AudioPlayer = () => {
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
            path: musicPath + "Weston_Estate-Saturday_Nights.mp"
        },
    ];

    const audioTagRef = useRef();
    const audioDurationRef = useRef();
    const audioPlayRef = useRef();
    const audioPauseRef = useRef();
    const [audioPlayerState, setNewState] = useState({
        isPlaying: false,
        duration: 0,
        currentTime: 0,
        track: playList[0]
    });

    const playAudio = () => {
        audioPlayRef.current.style.display = "none";
        audioPauseRef.current.style.display = "block";

        audioTagRef.current.play();
    };

    const pauseAudio = () => {
        audioPauseRef.current.style.display = "none";
        audioPlayRef.current.style.display = "block";

        audioTagRef.current.pause();
    }

    return (
        <div className="audio-player">
            <div className="player">
                <audio
                    ref={audioTagRef}
                    src={audioPlayerState.track.path}
                    style={{display: "none"}}
                ></audio>
                <div className="track-info">
                    <h2 className="track-name">Track Name</h2>
                    <h4 className="track-author">Track Author</h4>
                </div>
                <div className="track-controls">
                    <input ref={audioDurationRef} type="range" className="track-duration"/>
                    <div className="track-controls-btns">
                        <FontAwesomeIcon className="icon track-backward" icon={faBackward}/>
                        <FontAwesomeIcon ref={audioPlayRef} className="icon track-play" onClick={playAudio} icon={faCirclePlay}/>
                        <FontAwesomeIcon ref={audioPauseRef} className="icon track-pause" onClick={pauseAudio} icon={faCirclePause}/>
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
