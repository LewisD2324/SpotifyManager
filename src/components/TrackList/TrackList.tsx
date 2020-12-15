import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import React from 'react';
import { FixedSizeList } from 'react-window';
import AudioControl from '../AudioControl/AudioControl';

interface TrackListProps {
    tracks: any;
    addtoplaylist?(e: React.MouseEvent<HTMLElement, MouseEvent>): void;
    removefromplaylist?(e: React.MouseEvent<HTMLElement, MouseEvent>): void;
    showPlaylistTrackControls: boolean;
    album_image?: any;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginLeft: "10px",
            // width: "100%",
            // maxWidth: 1000,
            // backgroundColor: theme.palette.background.paper,
          //  marginRight: '180px',
        },
        // audiocontrols: {
        //   width: "100%",
        //   maxWidth: 600,
        // },
    })
);

const TrackList = (props: TrackListProps) => {
    const classes = useStyles();

    const Row = ({ index, style }: any) => {
        // let image: string = "";
        // if (props.tracks[index].images.length < 1) {
        //   let  image = "No image";
        // } else {
        //  let image = props.tracks[index].images[0].url;
        // }
        return (
            <div style={style} data-testid="tracklist-item" id={props.tracks[index].id}>
                <ListItem role={undefined} dense button key={props.tracks[index].id}>
                    {props.album_image ? (
                        <ListItemIcon>
                            <img src={props.album_image.images[2].url}></img>
                        </ListItemIcon>
                    ) : (
                        <ListItemIcon>
                            <img src={props.tracks[index].album.images[2].url}></img>
                        </ListItemIcon>
                    )}
                    <ListItemText primary={props.tracks[index].name} secondary={props.tracks[index].artists[0].name} />
                    <AudioControl preview_url={props.tracks[index].preview_url} id={props.tracks[index].id} />
                    {/* <ListItemSecondaryAction> */}
                    {props.showPlaylistTrackControls ? (
                        <div onClick={props.removefromplaylist} id={props.tracks[index].uri}>
                            <RemoveCircleIcon />
                        </div>
                    ) : (
                        <div onClick={props.addtoplaylist} id={props.tracks[index].uri}>
                            <AddCircleIcon />
                        </div>
                    )}
                    {/* </ListItemSecondaryAction> */}
                </ListItem>
            </div>
        );
    };

    return (
        <div>
            <FixedSizeList
                className={classes.root}
                height={605}
                width={580}
                itemSize={80}
                itemCount={props.tracks.length}
            >
                {Row}
            </FixedSizeList>
        </div>
    );
};

export default TrackList;
