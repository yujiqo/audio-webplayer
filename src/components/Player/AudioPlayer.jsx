import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faCirclePause, faShuffle, faRepeat, faForward, faBackward } from "@fortawesome/free-solid-svg-icons";
import "./AudioPlayer.css";



const AudioPlayer = () => {
    return (
        <div className="audio-player">
            <div className="track-info">
                <h2 className="track-name">Track Name</h2>
                <h4 className="track-author">Track Author</h4>
            </div>
            <div className="track-controls">
                <input type="range" className="track-duration"/>
                <div className="track-controls-btns">
                    <FontAwesomeIcon className="icon track-backward" icon={faBackward}/>
                    <FontAwesomeIcon className="icon track-play" icon={faCirclePlay}/>
                    <FontAwesomeIcon className="icon track-pause" icon={faCirclePause}/>
                    <FontAwesomeIcon className="icon track-forward" icon={faForward}/>
                </div>
                <div className="audio-player-btns">
                    <FontAwesomeIcon className="icon track-shufle" icon={faShuffle}/>
                    <FontAwesomeIcon className="icon track-repeat" icon={faRepeat}/>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
