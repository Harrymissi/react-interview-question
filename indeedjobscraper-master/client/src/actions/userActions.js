import axios from 'axios';
import {GET_POSTS_BY_KEYWORD, GET_ERROR, GET_POSTS, SAVE_JOB, EDIT_JOB, GET_JOB_BY_ID, UNSAVE_JOB, DELETE_JOB} from './types';

export const getPostByKeyword = (keyword) => {
    const request = axios.get(`/api/job/${keyword}`)
        .then(response => {
            return {
                jobs: response.data,
                size: response.data.length
            }
        })
        .catch(err => {
            return {
                type: GET_ERROR,
                payload: err
            }
        });

    return {
        type: GET_POSTS_BY_KEYWORD,
        payload: request
    }
};

export function getJobPosting(skip, limit, filters, previousState = []) {
    const data = {
        limit,
        skip,
        filters
    };

    const request = axios.post('/api/job', data)
        .then(response => {

            let newState = [
                ...previousState,
                ...response.data.jobs
            ];

            return {
                size: response.data.size,
                jobs: newState
            };
        });

    return {
        type: GET_POSTS,
        payload: request
    }
}

export function saveJobs(jobId) {
    const request = axios.post(`/api/job/save_post/${jobId}`, {isSaved: true})
        .then(response => response.data);

    return {
        type: SAVE_JOB,
        payload: request
    }
}

export function unSaveJobs(jobId) {
    const request = axios.post(`/api/job/save_post/${jobId}`, {isSaved: false})
        .then(response => response.data);

    return {
        type: UNSAVE_JOB,
        payload: request
    }
}

export function editJob(jobId, jobData) {
    const request = axios.post(`/api/job/edit_post/${jobId}`, jobData)
        .then(response => response.data);

    return {
        type: EDIT_JOB,
        payload: request
    }
}

export function findJobById(jobId) {
    const request = axios.get(`/api/job/current_job/${jobId}`)
        .then(response => response.data);

    return {
        type: GET_JOB_BY_ID,
        payload: request
    }
}

export function deleteJob(jobId) {
    const request = axios.post(`/api/job/delete_post/${jobId}`)
        .then(response => response.data);

    return {
        type: DELETE_JOB,
        payload: request
    }
}