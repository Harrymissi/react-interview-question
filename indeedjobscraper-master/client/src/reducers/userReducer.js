import {GET_POSTS_BY_KEYWORD, GET_ERROR, GET_POSTS, SAVE_JOB, EDIT_JOB, GET_JOB_BY_ID, UNSAVE_JOB, DELETE_JOB} from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_ERROR:
            return {...state, error: action.payload};
        case GET_POSTS_BY_KEYWORD:
            return {...state, jobs: action.payload, size: action.payload.size};
        case GET_POSTS:
            return {...state, jobs: action.payload.jobs, size: action.payload.size};
        case SAVE_JOB:
            return {...state, savedJob: action.payload};
        case UNSAVE_JOB:
            return {...state, unSavedJob: action.payload};
        case EDIT_JOB:
            return {...state, editedJob: action.payload};
        case GET_JOB_BY_ID:
            return {...state, currentJob: action.payload};
        case DELETE_JOB:
            return {...state, deleteJob: action.payload};
        default:
            return state;
    }
}