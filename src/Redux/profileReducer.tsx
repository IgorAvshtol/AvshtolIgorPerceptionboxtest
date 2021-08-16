import {Dispatch} from 'redux';


let initialState = {
    userPhoto: 'https://www.freeiconspng.com/thumbs/star-wars-png/star-wars-photo-18.png',
    follow: false
}

type ProfileType = {
    userPhoto: string
    follow: boolean
}

const profileReducer = (state: ProfileType = initialState, action: ProfileReducersActionsTypes): ProfileType => {
    switch (action.type) {
        case "SET-PHOTO-SUCCESS": {
            return {
                ...state,
                userPhoto: action.photo
            }
        }
        case "FOLLOW":
            return {
                ...state,
                follow: !action.follow
            }
        default:
            return state
    }
}

const SET_PHOTO_SUCCESS = "SET-PHOTO-SUCCESS"
const FOLLOW = "FOLLOW"

export type ProfileReducersActionsTypes = ReturnType<typeof setPhotoSuccessAC> | ReturnType<typeof setFollowAC>

export const setPhotoSuccessAC = (photo: any) => {
    return {
        type: SET_PHOTO_SUCCESS,
        photo
    } as const
}

export const setFollowAC = (follow: boolean) => {
    return {
        type: FOLLOW,
        follow
    } as const
}

export const setPhoto = (photo: any) => (dispatch: Dispatch) => {
    dispatch(setPhotoSuccessAC(photo))

}

export const setFollow = (follow: any) => (dispatch: Dispatch) => {
    dispatch(setFollowAC(follow))
}


export default profileReducer