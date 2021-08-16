import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import {NavLink, Route, Switch} from "react-router-dom";
import {ProfileUser} from "./ProfileUser";
import {AppBar, Button, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import Users from "./Users";
import s from "./Main.module.css";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


function App() {

    const [appState, setAppState] = useState([]);
    useEffect(() => {
        const apiUrl = 'https://swapi.dev/api/people/';
        axios.get(apiUrl).then((resp) => {
            const allPersons = resp.data.results;
            setAppState(allPersons);
        });
    }, [setAppState]);

    const classes = useStyles();
    return (
        <div className={s.main}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        News
                    </Typography>
                    <NavLink to="/users">Users</NavLink>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Switch>
                <Route path='/profile/:userName?' render={() => <ProfileUser persons={appState}/>}/>
                <Route path='/users' component={Users}/>
            </Switch>
        </div>
    )
        ;
}

export default App;
