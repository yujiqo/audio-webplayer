import * as uuid from "uuid";
import "./TrackList.css";



const TrackList = ({playList, currentTrack, playDefinedTrack}) => {
    const onClickPlayClickedTrack = event => {
        playDefinedTrack(event.currentTarget.dataset.track);
    };

    const getTrackListItemClasses = (track) => {
        if (track.name === currentTrack.name && track.author === currentTrack.author) {
            return "current-track-list-item track-list-item";
        }

        return "track-list-item";
    };

    const renderPlayList = () => {
        return [...playList].map((track, index) => {
            return (
                <div
                    key={uuid.v4()}
                    className={getTrackListItemClasses(track)}
                    onClick={onClickPlayClickedTrack}
                    data-track={index}>
                    <h4 className="track-list-item-name">
                        {track.author} - {track.name}
                    </h4>
                </div>
            );
        });
    };

    return (
        <div>
            <div className="track-list">
                {renderPlayList()}
            </div>
            <h5 className="track-list-tip">
                hover between dash lines to open tracklist
            </h5>
        </div>
    );
};


export default TrackList;
