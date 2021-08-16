import React, {useEffect, useState} from "react";
import s from "./Profile.module.css"
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../Redux/store";
import {setPhoto} from "../Redux/profileReducer";

type PersonsType = {
    persons: Array<ProfileDataType>
}

type ProfileDataType = {
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
    userName: string
    name: string
}

type VehiclesType = {
    name: string,
    model: string
}


export const ProfileUser = (props: PersonsType) => {

    let params = useParams<{ userName: string }>();
    let person = props.persons.find(p => p.name === params.userName)

    const initialStateForLikeButton = () => {
        let currentLikeAsString = localStorage.getItem('changeLike')
        if (currentLikeAsString) {
            let newCurrentLike = JSON.parse(currentLikeAsString)
            return newCurrentLike
        }
    }

    const initialStateForFollowButton = () => {
        let currentAsString = localStorage.getItem('follow')
        if (currentAsString) {
            let newCurrent = JSON.parse(currentAsString)
            return newCurrent
        }
    }

    const dispatch = useDispatch()

    const [like, setLike] = useState(initialStateForLikeButton);
    const [follow, setFollow] = useState(initialStateForFollowButton);


    useEffect(() => {
            localStorage.setItem('changeLike', JSON.stringify(like))
        }, [like]
    )

    useEffect(() => {
            localStorage.setItem('follow', JSON.stringify(follow))
        }, [follow]
    )

    const addLike = () => {
        setLike(!like)
        localStorage.setItem('changeLike', JSON.stringify(like))
    }

    const userPhoto = useSelector<AppStateType, string>(state => state.profile.userPhoto)

    const [ava, setAva] = useState(userPhoto);

    useEffect(() => {
            setAva(userPhoto)
        }, [userPhoto]
    )

    const changePhoto = (e: any) => {
        const file = e.target.files[0];
        const preview = URL.createObjectURL(file);
        dispatch(setPhoto(preview))
    }


    const addFriend = () => {
        setFollow(!follow)
        localStorage.setItem('follow', JSON.stringify(follow))
    }

    const changeOfFollow = () => {
        let followAsString = localStorage.getItem('follow')
        if (followAsString) {
            let newFollowTarget = JSON.parse(followAsString)
            setFollow(newFollowTarget)
        }
    }

    return (
        <div className={s.profile}>
            <img className={s.userFoto} src={ava}/>
            <button className={s.button} onClick={addLike}>Like: {like}
                {like ?
                    <img className={s.like}
                         src="https://www.clipartmax.com/png/middle/349-3495331_jewlr-instagram-like-icon-png.png"/>
                    : null}
            </button>
            <button className={s.button} onClick={addFriend}
                    onChange={changeOfFollow}>{follow ? "follow" : "unfollow"}</button>
            <input type={"file"} accept={".jpg, .jpeg, .png"} onChange={changePhoto}/>

            <ul>
                <li><b>Height</b> : {person && person.height}</li>
                <li><b>Mass</b> : {person && person.mass}</li>
                <li><b>Hair_color</b> : {person && person.hair_color}</li>
                <li><b>Skin_color</b> : {person && person.skin_color}</li>
                <li><b>Eye_color</b> : {person && person.eye_color}</li>
                <li><b>Birth_year</b> : {person && person.birth_year}</li>
                <li><b>Gender</b> : {person && person.gender}</li>
                <li><b>Homeworld</b> : {person && person.homeworld}</li>
                <li><b>Vehicles</b> : {person && person.vehicles}</li>
                <li><b>Films</b> : {person && person.films}</li>
            </ul>
        </div>
    )
}

