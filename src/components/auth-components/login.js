// Note: Login component...!

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { logInUser } from "../../store/action/auth-actions";
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
        marginTop: '1em',
        fontSize: '1.3em',
        fontFamily: 'sans-serif',
        color: `#212943`,
    },

    Link: {
        textDecoration: 'none'
    },

    linkText: {
        fontSize: 14
    },

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

const Login = () => {

    // Note: To access Material UI...!
    const classes = useStyle();

    // Note: Handeling states here...!
    const [formData, setformData] = useState({
        email: '',
        password: '',
    });

    const [validationHelper, setValidationHelper] = useState({
        emailHelper: '',
        passwordHelper: '',
    });

    const { email, password } = formData;
    const { emailHelper, passwordHelper } = validationHelper;

    // Note: Handling redux here...!
    const dispatch = useDispatch();

    // Note: Function to handle form...!
    const onChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };

    // Note: Function to submit form data...!
    const onSubmit = () => {

        let validEmailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!email.match(validEmailFormat)) {
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
            // console.log(formData);
            dispatch(logInUser(formData));
            clearAll();
        }
    };

    // Note: Function to hide error...!
    const hideErrWarning = () => {
        setTimeout(() => {
            setValidationHelper({
                emailHelper: '',
                passwordHelper: ''
            });
        }, 3000);
    }

    // Note: Function to clear all input fields...!
    const clearAll = () => {
        setformData({
            email: '',
            password: '',
        });
        setValidationHelper({
            emailHelper: '',
            passwordHelper: '',
        });
    }

    /***** Note: UI *****/
    return (
        <div id="custom-body">
            <Grid item container style={{ display: "flex", justifyContent: "center" }}>
                <Grid item container component={Paper} elevation={3} className={classes.Paper} justify='center' alignItems='center'>
                    <Grid item container justify='center' className={classes.Heading}>
                        <Typography variant='h4'> Log In </Typography>
                    </Grid>

                    <Grid item container direction='row' justify='center' alignItems='center' style={{ marginTop: '2em' }}>
                        <Grid item container justify='center'>
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

                        <Grid item container justify='center' style={{ marginTop: '2em' }}>
                            <Button onClick={onSubmit} fullWidth variant='contained' className={classes.Button}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid item container justify='space-between' style={{ marginTop: '2em' }}>
                        <Link to='/signup' className={classes.Link}>
                            <Typography className={classes.linkText}>
                                Don't have an account ? <span style={{ color: 'white' }}> Register</span>
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Login;