import React from "react";

const Footer = () => {
  return (
    <div
      className="main-footer"
      style={{
        color: "white",
        backgroundColor: "red",
        position: "relative",
        bottom: 0,
        width: "100%",
        paddingTop: "3em",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>Spotify Manager INC</h4>
            <ul className="list-unstyled">
              <li>0000-000-000</li>
              <li>United Kingdown</li>
            </ul>
          </div>
          <div className="col">
            <h4>Stuff</h4>
            <ul className="list-unstyled">
              <li>Other Stuff</li>
            </ul>
          </div>
          <div className="col">
            <h4>Stuff again</h4>
            <ul className="list-unstyled">
              <li>Other Stuff again</li>
            </ul>
          </div>
        </div>
        <div className="row">
          <hr />
          <p className="col-sm">
            &copy;{new Date().getFullYear()}Spotify Manager INC | All rights
            reserved | Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
