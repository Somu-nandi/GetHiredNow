import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminJobs:[],
        singleJob:null,
        searchJobByText:"",
        allAppliedJobs:[],
        searchedQuery:"",
        savedJobs:[],
    },
    reducers:{
        // actions
        setAllJobs:(state,action) => {
            state.allJobs = action.payload;
        },
        setSingleJob:(state,action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs:(state,action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText:(state,action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs:(state,action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        },
        setSavedJobs:(state,action) => {
            state.savedJobs = action.payload;
        },
        addSavedJob:(state,action) => {
            state.savedJobs.push(action.payload);
        },
        removeSavedJob:(state,action) => {
            state.savedJobs = state.savedJobs.filter(savedJob => savedJob.job._id !== action.payload);
        }
    }
});
export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery,
    setSavedJobs,
    addSavedJob,
    removeSavedJob
} = jobSlice.actions;
export default jobSlice.reducer;