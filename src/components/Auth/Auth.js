import React, { useEffect, useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import { useDispatch } from "react-redux";
import decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { googleSignIn, signIn, signUp } from "../../actions/auth";
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
const Auth = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSignUp, setSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isSignUp) {

            dispatch(signUp(formData, navigate));
        }
        else {
            dispatch(signIn(formData, navigate));
        }
    }
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const switchMode = () => {
        setSignUp(!isSignUp);
    }


    const handleGoogleResponse = (res) => {
        try {
            const user = decode(res?.credential);
            if (user) {
                const userData = {
                    firstName: user.given_name,
                    lastName: user.family_name,
                    email: user.email,
                    password: null,
                    picture: user.picture
                }
                dispatch(googleSignIn(userData, navigate));
            }
        }
        catch (error) {

        }

    }
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse
        });
        google.accounts.id.renderButton(
            document.getElementById('GoogleSignIn'), {
        }
        );
        google.accounts.id.prompt();

    });
    return (

        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>

                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp ? (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            ) : null
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignUp ? <Input name="confirmPassword" label="Confirm Password" type="password" handleChange={handleChange} /> : null}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>


                    <Button id='GoogleSignIn' fullWidth variant="contained" className={classes.googleButton}>

                    </Button>


                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? "Existing User? Sign In" : "New User ? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>

    )
}

export default Auth;