import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from 'axios';
import UserData from './UserData';


function UsersPage() {

    const [appState, setAppState] = useState([]);
    useEffect(() => {
        const apiUrl = 'https://swapi.dev/api/people/';
        axios.get(apiUrl).then((resp) => {
            const allPersons = resp.data.results;
            setAppState(allPersons);
            console.log(allPersons)
        });
    }, [setAppState]);


    return (
        <div>
            <UserData users={appState}/>
        </div>
    )
}

export default UsersPage;