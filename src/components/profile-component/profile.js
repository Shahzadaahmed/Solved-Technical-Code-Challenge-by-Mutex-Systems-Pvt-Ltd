// Note: Profile component...!

import React from 'react';
import { useLocation } from 'react-router';
import { makeStyles } from '@material-ui/core';

// Note: Handeling Material UI styling here...!
const useStyles = makeStyles((theme) => ({
    header: {
        color: "white",
        paddingBottom: theme.spacing(3),
        textAlign: "center"
    },

    image: {
        height: "auto",
        width: '30%',
        objectFit: "contain",
        resize: "horizontal",
    }
}));

const Profile = () => {

    // Note: Recieving params using React Router V6 useLocation() hook...!
    const { state } = useLocation();
    console.log(state);

    // Note: TO acces material ui css...!
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className="container">
                <h1 className={classes.header}> Welcome to POD (Picture-On-Demand) Platform </h1>
                <img
                    alt="Profile"
                    src={state}
                    className={classes.image}
                />
            </div>
        </React.Fragment>
    );
}

export default Profile;