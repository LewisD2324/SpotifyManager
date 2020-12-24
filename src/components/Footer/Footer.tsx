import React from 'react';
import styled from 'styled-components';

const Footer = () => {
    return (
        <FooterRoot
            className="main-footer"
        >
                <FooterRow1 className="row">

                    <div className="col">
                        <List className="list-unstyled">
                        <h4>Spotify Manager INC</h4>
                            <li>0000-000-000</li>
                            <li>United Kingdown</li>
                        </List>
                    </div>
                    <div className="col">
                        <List className="list-unstyled" >
                        <h4>Stuff</h4>
                            <li>Other Stuff</li>
                        </List>
                    </div>
                    <div className="col">
                        <List className="list-unstyled">
                        <h4>Stuff again</h4>
                            <li>Other Stuff again</li>
                        </List>
                    </div>
                </FooterRow1>
                <hr />
                <FooterRow2 className="row">
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} Spotify Manager INC | All rights reserved | Terms Of Service |
                        Privacy
                    </p>
                </FooterRow2>
        </FooterRoot>
    );
};

export default Footer;

const FooterRoot = styled.div`
 color: white;
//background-color: black;
background-image: linear-gradient(-45deg,purple,rgb(83 2 83 / 35%));
position: relative;
bottom: 0;
width: 100%;
width: -moz-available;          /* WebKit-based browsers will ignore this. */
width: -webkit-fill-available;  /* Mozilla-based browsers will ignore this. */
width: stretch;
padding-top: 3em;
top: 150px;

`;
const List = styled.ul`
list-style-type: none ;
`;

const FooterRow1 = styled.div`
display: flex;
align-items: baseline;
justify-content: space-evenly;
`;

const FooterRow2 = styled.div`
display: flex;
justify-content: center;

`;