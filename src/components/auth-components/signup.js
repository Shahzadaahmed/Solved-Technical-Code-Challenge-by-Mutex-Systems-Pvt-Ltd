// Note: SignUp component...!

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from "sweetalert";
import {
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
    FormControlLabel,
    Checkbox,
    makeStyles,
    Avatar
} from '@material-ui/core';
import { signUpUser } from "../../store/action/auth-actions";
import "./style.css";

// Note: Handeling Material UI styling here...!
const useStyle = makeStyles((theme) => ({
    Paper: {
        width: '520px',
        [theme.breakpoints.down('sm')]: {
            width: "auto"
        },
        color: '#f6f6f6',
        borderRadius: '17px',
        padding: '2em',
        backgroundColor: "transparent"
    },

    Heading: {
        fontSize: '1.3em',
        fontFamily: 'sans-serif',
        color: `#212943`,
    },

    large: {
        width: theme.spacing(9),
        height: theme.spacing(9),
    },

    Link: { textDecoration: 'none' },

    Button: {
        borderRadius: '20px',
        padding: '13px',
        backgroundColor: `#212943`,
        color: '#fff',
        '&:hover': {
            backgroundColor: '#1976D2',
        },
    },
}));

const SignUp = () => {

    // Note: To access Material UI css...!
    const classes = useStyle();

    // Note: Handeling states here...!
    const [profileImage, setProfileImage] = useState(null);
    const [formData, setformData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [validationHelper, setValidationHelper] = useState({
        nameHelper: '',
        emailHelper: '',
        passwordHelper: '',
    });
    const [checkedState, setCheckedState] = useState(false);

    const { name, email, password } = formData;
    const { nameHelper, emailHelper, passwordHelper } = validationHelper;

    // Note: Handling redux here...!
    const dispatch = useDispatch();

    // Note: Function to handle checkbox...!
    const handleCheckBox = (event) => {
        setCheckedState(event.target.checked);
    }

    // Note: Function to handle form...!
    const onChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };

    // Note: Function to handle profile image...!
    const onChangeImage = async (event) => {
        // console.log(event.target.files[0]);

        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            // console.log(img);

            let imageType = img.type;
            // console.log(imageType);

            // Note: Valid extensions for image...!
            let validFileExtensions = ["image/jpg", "image/jpeg", "image/png"];
            let validImage = false;

            for (let i = 0; i < validFileExtensions.length; i++) {
                // console.log(validFileExtensions[i]);

                if (imageType === validFileExtensions[i]) {
                    // console.log('Image extension matched!');
                    validImage = true;
                }
            }

            if (validImage) {
                let path = URL.createObjectURL(img); // Note: Image URL recieved...!
                // console.log(path);
                setProfileImage(path);
            }

            else {
                console.log("Invalid image extension");
                swal({
                    title: "Error! Invalid Image Extension!",
                    text: "Only JPG , JPEG and PNG extensions will be accepted!",
                    icon: "error",
                    button: "Try again!",
                });
            }
        }
    }

    // Note: Function to submit form data...!
    const onSubmit = () => {

        let validEmailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (profileImage != null) {
            if (!name) {
                validationHelper.nameHelper = "Name is Required";

                setValidationHelper({
                    ...validationHelper
                });

                hideErrWarning();
            }

            else if (!email.match(validEmailFormat)) {
                validationHelper.emailHelper = "Email is Required or Inavlid Email Format";

                setValidationHelper({
                    ...validationHelper
                });

                hideErrWarning();
            }

            else if (password.length < 6) {
                validationHelper.passwordHelper = "Password is Required or Password length should be greater than six";

                setValidationHelper({
                    ...validationHelper
                });

                hideErrWarning();
            }

            else {
                formData.userProfileImage = profileImage;
                // console.log(formData);
                dispatch(signUpUser(formData));
                clearAll();
            }
        }

        else {
            swal({
                title: "Error! Profile image is required!",
                text: "You need to set profile image first!",
                icon: "error",
                button: "Try again!",
            });
        }
    };

    // Note: Function to hide error...!
    const hideErrWarning = () => {
        setTimeout(() => {
            setValidationHelper({
                nameHelper: '',
                emailHelper: '',
                passwordHelper: ''
            });
        }, 3000);
    }

    // Note: Function to clear all input fields...!
    const clearAll = () => {
        setformData({
            name: '',
            email: '',
            password: '',
        });
        setValidationHelper({
            nameHelper: '',
            emailHelper: '',
            passwordHelper: '',
        });
        setProfileImage(null);
        setCheckedState(false);
    }

    /***** Note: UI *****/
    return (
        <div id="custom-body">
            <Grid item container style={{ display: "flex", justifyContent: "center" }}>
                <Grid item container component={Paper} elevation={3} className={classes.Paper} justify='center' alignItems='center'>

                    <Grid item container justify='center' className={classes.Heading}>
                        <Typography variant='h4'> Sign Up </Typography>
                    </Grid>

                    <Grid item container justify='center' style={{ marginTop: '1em' }}>
                        <Avatar alt="Profile Image" src={(profileImage != null) ? (profileImage) : (null)} className={classes.large} />
                    </Grid>

                    <Grid item container direction='row' justify='center' alignItems='center' style={{ marginTop: '1.5em' }}>
                        <Grid item container justify='center'>
                            <TextField
                                id='name'
                                variant='outlined'
                                placeholder='Name'
                                name='name'
                                fullWidth
                                size='small'
                                inputProps={{
                                    style: {
                                        padding: 13,
                                        fontSize: '1.1rem',
                                        borderColor: "none",
                                        color: "white"
                                    },
                                }}
                                value={name || ""}
                                error={nameHelper.length !== 0}
                                helperText={nameHelper}
                                onChange={onChange}
                            />
                        </Grid>

                        <Grid item container justify='center' style={{ marginTop: '2em' }}>
                            <TextField
                                id='email'
                                variant='outlined'
                                placeholder='Email'
                                name='email'
                                fullWidth
                                size='small'
                                inputProps={{
                                    style: {
                                        padding: 13,
                                        fontSize: '1.1rem',
                                        borderColor: "none",
                                        color: "white"
                                    },
                                }}
                                value={email || ""}
                                error={emailHelper.length !== 0}
                                helperText={emailHelper}
                                onChange={onChange}
                            />
                        </Grid>

                        <Grid item container justify='center' style={{ marginTop: '2em' }}>
                            <TextField
                                type='password'
                                id='outlined-basic'
                                variant='outlined'
                                fullWidth
                                placeholder='Password'
                                size='small'
                                inputProps={{
                                    style: {
                                        padding: 13,
                                        fontSize: '1.1rem',
                                        color: "white"
                                    },
                                }}
                                name='password'
                                value={password || ""}
                                error={passwordHelper.length !== 0}
                                helperText={passwordHelper}
                                onChange={onChange}
                            />
                        </Grid>

                        <Grid item container justify='center' style={{ marginTop: '1em' }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkedState}
                                        onChange={handleCheckBox}
                                        name="checkedState"
                                        color="primary"
                                    />}
                                label="I accept all terms and conditions"
                            />
                        </Grid>

                        <Grid item container justify='center' style={{ marginTop: '1em' }}>
                            <Button
                                fullWidth
                                variant='contained'
                                component="label"
                                className={classes.Button}
                            >
                                Upload Profile Image
                                <input
                                    type="file"
                                    hidden
                                    onChange={onChangeImage}
                                />
                            </Button>
                        </Grid>

                        <Grid item container justify='center' style={{ marginTop: '1em' }}>
                            <Button disabled={(checkedState) ? (false) : (true)} onClick={onSubmit} fullWidth variant='contained' className={classes.Button}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid item container justify='center' style={{ marginTop: '1.5em' }}>
                        <Link to='/login' className={classes.Link}>
                            <Typography style={{ fontSize: 14 }}>
                                Already have an account ? <span style={{ color: 'white' }}> Login </span>
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default SignUp;