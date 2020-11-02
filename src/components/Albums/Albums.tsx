import { GridList, GridListTile, GridListTileBar, Paper } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

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
