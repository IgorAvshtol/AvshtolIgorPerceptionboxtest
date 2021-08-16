import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import {NavLink, Route, Switch} from 'react-router-dom';
import {ProfileUser} from './Profile/ProfileUser';
import {AppBar, Button, IconButton, makeStyles, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import UsersPage from './Users/UsersPage';
import s from './Main.module.css';

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
                    <Typography variant="h6" className={classes.title}>
                        <NavLink className={s.link} to="/users">MEET THE HEROES!</NavLink>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Switch>
                <Route path='/profile/:userName?' render={() => <ProfileUser persons={appState}/>}/>
                <Route path='/users' component={UsersPage}/>
            </Switch>
        </div>
    )
        ;
}

export default App;
