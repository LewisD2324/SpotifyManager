import React, { useState, useRef } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import { Box, Divider, Paper, GridListTile, GridListTileBar, GridList } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import AudioControl from '../AudioControl/AudioControl';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { FixedSizeList } from 'react-window';
import AddCircleIcon from '@material-ui/icons/AddCircle';

interface AlbumsProps {
    albums: any;
    onClick: any;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            height: '600px',
            marginLeft: '40px',
        },
        gridList: {
            width: '210px',
        },
        gridListTile: {
            transition: 'ease 0.4s all',
            '&:hover': {
                background: '#f00',
                cursor: 'pointer',
            },
        },
        title: {
            color: theme.palette.primary.light,
            textAlign: 'center',
        },
        titleBar: {
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        },
    })
);

const Albums = (props: AlbumsProps) => {
    const classes = useStyles();

    const renderalbums = () => {
        return props.albums.map((items: any) => {
            let image = '';
            if (items.images.length < 1) {
                image = 'No image';
            } else {
                image = items.images[0].url;
            }
            return (
                <GridListTile
                    onClick={props.onClick}
                    id={items.id}
                    className={classes.gridListTile}
                    key={items.id}
                    data-testid="album-item"
                >
                    <img src={image} alt={items.name} />
                    <GridListTileBar
                        title={items.name}
                        classes={{
                            root: classes.titleBar,
                            title: classes.title,
                        }}
                    />
                </GridListTile>
            );
        });
    };

    return (
        <div>
            <Paper className={classes.root}>
                <GridList cols={1} className={classes.gridList}>
                    {renderalbums()}
                </GridList>
            </Paper>
        </div>
    );
};

export default Albums;
