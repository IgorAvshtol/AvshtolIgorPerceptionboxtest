import {NavLink} from 'react-router-dom';
import userFoto from '../assets/users.png';
import s from './UserData.module.css';
import React from 'react';


export type UsersStateType = {
    users: Array<UsersType>,
}

type UsersType = {
    name: string,
    height: string,
    mass: string,
    hair_color: string,
    skin_color: string,
    eye_color: string,
    birth_year: string,
    gender: string,
    homeworld: string
    vehicles: VehiclesType
    films: string
}

type VehiclesType = {
    name: string,
    model: string
}


function UserData(props: UsersStateType) {

    const persons = props.users

    if (!persons || persons.length === 0) return <p>Loading...</p>

    return (
        <div className={s.userData}>
            {persons.map(u => <div>
                <span className={s.avatarBlock}>
                    <div className={s.avatar}>
                        <NavLink to={'/profile/' + u.name}>
                            <img src={userFoto}/>
                        </NavLink>
                    </div>
                    <span className={s.name}>
                        {u.name}
                    </span>
                    </span>
                </div>
            )
            }
        </div>
    )
}

export default UserData