// Note: Home component...!

import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Slider from "react-slick";
import {
    makeStyles,
    useTheme,
    useMediaQuery
}
    from '@material-ui/core';
import swal from 'sweetalert';
import "./style.css";

// Note: Importing required images...!
import img1 from "../../assets/1.jpg";
import img2 from "../../assets/2.jpg";
import img3 from "../../assets/3.jpg";
import img4 from "../../assets/4.jpg";
import img5 from "../../assets/5.jpg";

// Note: Dummy images data...!
const data = [img1, img2, img3, img4, img5];

// Note: Handeling Material UI styling here...!
const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },

    header: {
        color: "white",
        paddingBottom: theme.spacing(5),
        textAlign: "center"
    },

    customSlider: {
        borderWidth: 5,
        borderColor: "white",
        borderStyle: "double",
        width: '50%',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(0.2)
    },

    imageContainer: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },

    images: {
        height: "auto",
        width: '100%',
        objectFit: "contain",
        resize: "horizontal",
        "&:hover": {
            cursor: "pointer"
        }
    }
}))

const Home = () => {

    // Note: To access material ui css...!
    const classes = useStyles();

    // Note: To control responsiveness...!
    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

    // Note: To handle navigation...!
    const navigate = useNavigate();

    // Note: Fetching logged in user from redux...!
    let getUser = useSelector(({ users }) => { return users.authenticatedUser });
    console.log(getUser);

    // Note: Slick slider configuration...!
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: (matchesMD || matchesSM || matchesXS) ? (1) : (3),
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true
    };

    // Note: Function to get specific image info...!
    const getInfo = (data, key) => {
        // console.log(data, key);

        if (getUser) {
            navigate('/profile', { state: data });
        }

        else {
            swal({
                title: "Unauthorized User!",
                text: `You need to login first for further proceed!`,
                icon: "error",
                button: "Try Again!",
            });
        }
    }

    return (
        <React.Fragment>
            {/* Note: Main container */}
            <div className={classes.root} id="container">

                {/* Header */}
                <h1 className={classes.header}>
                    Tchinical Code Challenge using React Stack Development
                </h1>

                {/* Slider */}
                <Slider {...settings} className={classes.customSlider}>
                    {
                        data.map((item, index) => {
                            return (
                                <div key={index} className={classes.imageContainer}>
                                    <img
                                        src={item}
                                        alt="Slider-Images"
                                        className={classes.images}
                                        onClick={() => { getInfo(item, index) }}
                                    />
                                </div>
                            );
                        })
                    }
                </Slider>
            </div>
        </React.Fragment>
    );
}

export default Home;