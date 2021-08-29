// Note: All auth action functions are defined here...!

import {
    SIGN_UP_USER,
    LOG_IN_USER,
    LOG_OUT_USER
}
    from "../constant/action-types";
import swal from 'sweetalert';

/***** Note: SignUp function *****/
const signUpUser = (user) => {
    return (dispatch) => {
        // console.log(user);
        dispatch({
            type: SIGN_UP_USER,
            payload: user
        });
    }
}

/***** Note: Login function *****/
const logInUser = (user) => {
    return (dispatch) => {
        // console.log(user);
        dispatch({
            type: LOG_IN_USER,
            payload: user
        });
    }
}

/***** Note: logout function *****/
const logOutUser = () => {
    return (dispatch) => {
        dispatch({
            type: LOG_OUT_USER
        });
        swal({
            title: "Good Bye!",
            text: "You have logged out sucessfully!",
            icon: "success",
            button: "Bye!",
        });
    }
}

export {
    signUpUser,
    logInUser,
    logOutUser
};