import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';

const useStyles = makeStyles({
    root: {
        // minWidth: 275,
        // minHeight: '480px',
        backgroundColor: "purple",
        marginRight: '70px',
        boxShadow: "0 4px 8px 0 grey, 0 6px 20px 0 grey"
    },
    slider: {
        color:"#5a025a",
        "& .MuiSlider-markLabel": {
            color:"black"
        }
        
    },
    cardContentRoot: {
        borderStyle: "solid",
        borderWidth: "medium",
        margin: "15px",
        borderColor: "black",
        width: "300px",
        backgroundColor: "white",

    }
});

interface TrackControlProps {
    onBPMChange: any;
}

const TrackControls = ({ onBPMChange }: TrackControlProps) => {
    const classes = useStyles();

    const [value, setValue] = useState<number[]>([0, 220]);

    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const marks = [
        {
            value: 0,
            label: '0',
        },
        {
            value: 220,
            label: '220',
        },
    ];

    return (
        <Card className={classes.root}>
            {/* <Typography>Track Controls</Typography> */}
            <CardContent className = {classes.cardContentRoot}>
                {/* <div className={classes.slider}> */}
                    <Typography id="range-slider" gutterBottom>
                        BPM range
                    </Typography>
                    <Slider
                        className = {classes.slider}
                        value={value}
                        onChange={handleChange}
                        onChangeCommitted={onBPMChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        marks={marks}
                        max={220}
                    />
                     <Typography id="range-slider" gutterBottom>
                        Something
                    </Typography>
                    <Slider
                        className = {classes.slider}
                        value={value}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        marks={marks}
                        max={220}
                    />
                     <Typography id="range-slider" gutterBottom>
                     Something Else
                    </Typography>
                    <Slider
                        className = {classes.slider}
                        value={value}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        marks={marks}
                        max={220}
                    />
                {/* </div> */}
            <button>Reset</button>

            </CardContent>
            {/* <CardActions></CardActions> */}
        </Card>
    );
};

export default React.memo(TrackControls);
