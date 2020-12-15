import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from '@reach/router';
import React from 'react';
import styled from 'styled-components';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            // flexGrow: 1,
            color: 'white',
        },
      
    })
);

const NavBar = () => {
    const classes = useStyles();

    return (
        <NavRoot data-testid={'nav-bar'}>
            {/* <nav> */}
            <Typography variant="h6" className={classes.title}>
                Spotify Manager
            </Typography>
            <NavContainer>
            <Button color="inherit">
                <NavLink
                    to="/Landing" 
                >
                    Home
                </NavLink>
            </Button>
            <Button color="inherit">
                <NavLink to="/Playlist">
                    My Playlists
                </NavLink>
            </Button>
            </NavContainer>
        </NavRoot>
    );
};

export default NavBar;

const NavRoot = styled.div`
    display: flex;
    background-image: linear-gradient(-45deg, purple, #53025359);
    justify-content: space-between;
    align-content: center;
    padding: 30px 5% 190px;
    width: 100%;
    width: -moz-available;          /* WebKit-based browsers will ignore this. */
    width: -webkit-fill-available;  /* Mozilla-based browsers will ignore this. */
    width: stretch;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
 transition: all 0.3s ease 0s;
  &:hover {
      color:red;
  };
`;

const NavContainer = styled.div`
display: inline-block;
    padding: 0px 20px;
`;
