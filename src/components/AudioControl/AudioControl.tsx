import React, { useRef, useState } from 'react';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
export interface AudioControlProps {
    preview_url: string;
    id: string;
}

const AudioControl = ({ preview_url, id }: AudioControlProps) => {
    const [isPlaying, setisPlaying] = useState(false);

    const handleAudioButton = (preview_url: string) => {
        if (!isPlaying && preview_url !== null) {
            setisPlaying(true);
            player.current.play();
        } else if (isPlaying && preview_url !== null) {
            setisPlaying(false);
            player.current.pause();
        } else {
            null;
        }
    };
    const player = useRef<any>(null);

    return (
        <div>
            {/* TODO - FIX issue of preview_url being null, disable the button or something */}
            <div onClick={() => handleAudioButton(preview_url)}>
                {isPlaying ? (
                    <PauseCircleFilledIcon />
                ) : preview_url === null ? (
                    <PlayCircleOutlineIcon />
                ) : (
                    <PlayCircleFilledIcon />
                )}
            </div>
            <audio key={id} id={id} ref={player}>
                <source src={preview_url} type="audio/mpeg" />
                Your browser does not support HTML5 Audio
            </audio>
        </div>
    );
};

export default AudioControl;
