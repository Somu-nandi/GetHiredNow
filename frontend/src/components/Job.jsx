import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { formatSalary } from '@/utils/salaryFormatter'
import { useDispatch, useSelector } from 'react-redux'
import { addSavedJob, removeSavedJob } from '@/redux/jobSlice'
import { SAVED_JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { toast } from 'sonner'

const Job = ({job}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { savedJobs, user } = useSelector(store => ({
        savedJobs: store.job.savedJobs,
        user: store.auth.user
    }));

    const [isSaved, setIsSaved] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }

    // Check if job is saved
    useEffect(() => {
        const jobIsSaved = savedJobs.some(savedJob => savedJob.job._id === job._id);
        setIsSaved(jobIsSaved);
    }, [savedJobs, job._id]);

    const handleSaveJob = async () => {
        if (!user) {
            toast.error("Please login to save jobs");
            return;
        }

        setIsLoading(true);
        try {
            if (isSaved) {
                // Unsave the job
                const res = await axios.delete(`${SAVED_JOB_API_END_POINT}/unsave/${job._id}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(removeSavedJob(job._id));
                    toast.success("Job removed from saved list");
                }
            } else {
                // Save the job
                const res = await axios.post(`${SAVED_JOB_API_END_POINT}/save/${job._id}`, {}, { withCredentials: true });
                if (res.data.success) {
                    dispatch(addSavedJob({ job, user: user._id }));
                    toast.success("Job saved successfully");
                }
            }
        } catch (error) {
            console.log(error);
            if (error.code === 'ERR_NETWORK') {
                toast.error("Network error. Please check if the server is running.");
            } else {
                toast.error(error.response?.data?.message || "Something went wrong");
            }
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <div className='p-5 rounded-md shadow-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500 dark:text-gray-400'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button
                    variant="outline"
                    className={`rounded-full ${isSaved ? 'bg-purple-100 dark:bg-purple-900 border-purple-300 dark:border-purple-700' : ''}`}
                    size="icon"
                    onClick={handleSaveJob}
                    disabled={isLoading}
                >
                    <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-purple-600 text-purple-600' : ''}`} />
                </Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg text-gray-900 dark:text-white'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2 text-gray-900 dark:text-white'>{job?.title}</h1>
                <p className='text-sm text-gray-600 dark:text-gray-300'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{formatSalary(job?.salary)}</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={()=> navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                <Button
                    className={`${isSaved ? 'bg-green-600 hover:bg-green-700' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}
                    onClick={handleSaveJob}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : isSaved ? 'Saved' : 'Save For Later'}
                </Button>
            </div>
        </div>
    )
}

export default Job