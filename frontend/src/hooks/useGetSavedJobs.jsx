import { setSavedJobs } from '@/redux/jobSlice'
import { SAVED_JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetSavedJobs = (shouldFetch = true) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!shouldFetch) return;

        const fetchSavedJobs = async () => {
            try {
                const res = await axios.get(`${SAVED_JOB_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSavedJobs(res.data.savedJobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSavedJobs();
    }, [dispatch, shouldFetch])
}

export default useGetSavedJobs
