// Note: NavBar component...!

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    makeStyles,
    AppBar,
    Toolbar,
    IconButton,
    MenuItem,
    Menu,
    Avatar
}
    from '@material-ui/core';

// Note: Importing Material UI icons...!
import MoreIcon from '@material-ui/icons/MoreVert';
import { logOutUser } from "../../store/action/auth-actions";

// Note: Handeling Material UI styling here...!
const useStyles = makeStyles((theme) => ({
    navBar: {
        boxShadow: "none",
        backgroundColor: "blue",
        position: "fixed",
        zIndex: 1
    },

    grow: {
        flexGrow: 1,
    },

    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },

    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },

    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },

    linksText: {
        textDecoration: "none",
        color: "white",
        // paddingTop: theme.spacing(1.5),
        paddingRight: theme.spacing(3),
        '&:hover': {
            textDecoration: "underline",
            color: "lightblue"
        }
    },

    linksTextForSMDevices: {
        textAlign: "center",
        textDecoration: "none",
        color: "black",
        // paddingTop: theme.spacing(1.5),
        paddingRight: theme.spacing(3),
        '&:hover': {
            textDecoration: "underline",
            color: "lightblue"
        }
    },

    userName: {
        fontSize: 20,
        paddingLeft: theme.spacing(1)
    },

    logOutBtn: {
        backgroundColor: "transparent",
        borderColor: "none",
        borderWidth: 0,
        outline: 0,
        color: "white",
        fontSize: 16,
        cursor: "pointer",
        '&:hover': {
            textDecoration: "underline",
            color: "lightblue"
        }
    }
}));

const NavBar = () => {

    // Note: To access Material UI css...!
    const classes = useStyles();

    // Note: Handeling redux here...!
    const dispatch = useDispatch();

    // Note: Fetching logged in user from redux...!
    let getUser = useSelector(({ users }) => { return users.authenticatedUser });
    console.log(getUser);

    // Note: Handeling states here...!
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const mobileMenuId = 'primary-search-account-menu-mobile';

    // Note: Log out function...!
    const logOut = () => {
        dispatch(logOutUser());
    }

    // Note: Navbar for mobile or small devices...!
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            <MenuItem style={{ display: "flex", justifyContent: "center", paddingRight: 0 }}>
                <Link
                    to="/"
                    className={classes.linksTextForSMDevices}
                >
                    HOME
                </Link>
            </MenuItem>

            {
                (!getUser)
                    ?
                    (
                        <>
                            <MenuItem style={{ display: "flex", justifyContent: "center", paddingRight: 0 }}>
                                <Link
                                    to="signup"
                                    className={classes.linksTextForSMDevices}
                                >
                                    SIGN UP
                                </Link>
                            </MenuItem>

                            <MenuItem style={{ display: "flex", justifyContent: "center", paddingRight: 0 }}>
                                <Link
                                    to="login"
                                    className={classes.linksTextForSMDevices}
                                >
                                    LOG IN
                                </Link>
                            </MenuItem>
                        </>
                    )
                    :
                    (
                        <MenuItem style={{ display: "flex", justifyContent: "center", paddingRight: 0 }}>
                            <span className={classes.linksTextForSMDevices} >
                                <button style={{
                                    backgroundColor: "transparent",
                                    borderColor: "none",
                                    borderWidth: 0,
                                    outline: 0,
                                    color: "black",
                                    fontSize: 16,
                                    cursor: "pointer",
                                }}
                                    onClick={logOut}
                                >
                                    LOG OUT
                                </button>
                            </span>
                        </MenuItem>
                    )
            }
        </Menu>
    );

    return (
        <React.Fragment>
            <div className={classes.mainContainer}>
                {/* Note: Navigation bar start */}
                <div>
                    <AppBar position="static" className={classes.navBar}>
                        <Toolbar>
                            <Avatar alt="Profile Image" src={(getUser) ? (getUser.userProfileImage) : (null)} className={classes.large} />
                            <span className={classes.userName}>
                                {(getUser) ? (getUser.name) : ('No User')}
                            </span>

                            <div className={classes.grow} />

                            <div className={classes.sectionDesktop}>
                                <Link
                                    to="/"
                                    className={classes.linksText}
                                >
                                    HOME
                                </Link>

                                {
                                    (!getUser)
                                        ?
                                        (
                                            <>
                                                <Link
                                                    to="signup"
                                                    className={classes.linksText}
                                                >
                                                    SIGN UP
                                                </Link>

                                                <Link
                                                    to="login"
                                                    className={classes.linksText}
                                                >
                                                    LOG IN
                                                </Link>
                                            </>
                                        )
                                        :
                                        (
                                            <span className={classes.linksText} >
                                                <button className={classes.logOutBtn} onClick={logOut}>
                                                    LOG OUT
                                                </button>
                                            </span>
                                        )
                                }
                            </div>

                            <div className={classes.sectionMobile}>
                                <IconButton
                                    aria-label="show more"
                                    aria-controls={mobileMenuId}
                                    aria-haspopup="true"
                                    onClick={handleMobileMenuOpen}
                                    color="inherit"
                                >
                                    <MoreIcon />
                                </IconButton>
                            </div>
                        </Toolbar>
                    </AppBar>
                    {renderMobileMenu}
                </div>
                {/* Note: Navigation bar end */}
            </div>
        </React.Fragment>
    );
}

export default NavBar;