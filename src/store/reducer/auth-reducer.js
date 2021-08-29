// Note: All auth cases are defined here OR AuthReducer...!

import {
    SIGN_UP_USER,
    LOG_IN_USER,
    LOG_OUT_USER
}
    from "../constant/action-types";
import swal from 'sweetalert';

const INIT_STATE = {
    usersArr: [],
    authenticatedUser: null
}

const authReducer = (state = INIT_STATE, action) => {

    // Note: Function to check duplicate user...!
    const checkDuplicateUser = (email) => {
        let duplicateFlag = false;
        let allUsersClone = state.usersArr.slice(0);

        for (let i = 0; i < allUsersClone.length; i++) {
            // console.log(allUsersClone[i].email);

            if (email === allUsersClone[i].email) {
                duplicateFlag = true;
            }
        }

        return duplicateFlag;
    }

    switch (action.type) {

        /********** USER SIGN_UP CASE **********/
        case SIGN_UP_USER:
            let duplicateUser = checkDuplicateUser(action.payload.email);
            // console.log(duplicateUser);
            let usersClone = state.usersArr.slice(0);

            if (duplicateUser) {
                swal({
                    title: "Error! ⚠️",
                    text: "The email you entered is already registered by another account. Please use another email address!",
                    icon: "warning",
                    button: "Try Again",
                });
            }

            else {
                usersClone.push(action.payload);
                console.log(usersClone);
                swal({
                    title: "Registered Successfully!",
                    text: "You have signed up sucessfully!",
                    icon: "success",
                    button: "Ok!",
                });
            }

            return {
                ...state,
                usersArr: usersClone
            }

        /********** USER LOG_IN CASE **********/
        case LOG_IN_USER:
            // console.log(action.payload);
            let userListClone = state.usersArr.slice(0);
            let userEmail = action.payload.email;
            let userPassword = action.payload.password;
            let message;
            let userFlag = false;
            let targetUser;

            for (let i = 0; i < userListClone.length; i++) {
                let usersList = userListClone[i];

                if ((userEmail === usersList.email) && (userPassword === usersList.password)) {
                    targetUser = userListClone[i];
                    message = "Authorized User!";
                    userFlag = true;
                    break;
                }

                else if ((userEmail === usersList.email) && (userPassword != usersList.password)) {
                    message = "Email is correct, But Password is Incorrect!";
                    userFlag = false;
                    break;
                }

                else if ((userEmail != usersList.email) && (userPassword != usersList.password)) {
                    message = "User does not exist!";
                    userFlag = false;
                }
            }

            // console.log(message);
            // console.log(userFlag);

            if (userFlag) {
                swal({
                    title: "Logged In Successfully!",
                    text: "You have logged in sucessfully!",
                    icon: "success",
                    button: "Ok!",
                });

                return {
                    ...state,
                    authenticatedUser: targetUser
                }
            }

            else {
                swal({
                    title: "Something Went Wrong!",
                    text: `${message}`,
                    icon: "error",
                    button: "Try Again!",
                });
            }

        /********** USER LOG_OUT CASE **********/
        case LOG_OUT_USER:
            return {
                ...state,
                authenticatedUser: null
            }

        default:
            return state;
    }
}

export default authReducer;