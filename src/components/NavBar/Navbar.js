import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Toolbar, Typography } from '@material-ui/core';
import useStyles from "./styles";
import ShareToAll from '../../images/ShareToAll.png';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/constants';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))?.result);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const isLoggedIn = JSON.parse(localStorage.getItem('profile'));
        setUser(isLoggedIn?.result);
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getItem()) {
                logOut();
            }
        }
    }, [location])
    const logOut = () => {
        dispatch({ type: LOGOUT });
        navigate("/Auth");
        setUser(null);
    }

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h4" align="center">ShareToAll</Typography>
                <img className={classes.image} src={ShareToAll} alt={"Share To All"} height="60" width="50" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.name} src={user.picture}>
                            {user.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6">{user.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logOut}>Log Out</Button>
                    </div>
                ) : <Button component={Link} to="/Auth" variant="contained" className={classes.logout} color="primary" >Sign In</Button>}
            </Toolbar>

        </AppBar>
    )
}

export default Navbar;