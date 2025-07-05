import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import { useSelector } from 'react-redux'
import useGetSavedJobs from '@/hooks/useGetSavedJobs'
import Job from './Job'
import { ArrowLeft, Bookmark } from 'lucide-react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const SavedJobs = () => {
    useGetSavedJobs(true); // Always fetch saved jobs on this page
    const { savedJobs } = useSelector(store => store.job);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 px-4'>
                {/* Header Section */}
                <div className='flex items-center gap-4 mb-8'>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                    <div>
                        <h1 className='text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3'>
                            <Bookmark className="h-8 w-8 text-purple-600" />
                            Saved Jobs
                        </h1>
                        <p className='text-gray-600 dark:text-gray-400 mt-2'>Jobs you've saved for later</p>
                    </div>
                </div>

                {/* Stats Section */}
                <div className='mb-8'>
                    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>Total Saved Jobs</p>
                                <p className='text-2xl font-bold text-gray-900 dark:text-white'>{savedJobs.length}</p>
                            </div>
                            <Bookmark className="h-8 w-8 text-purple-600" />
                        </div>
                    </div>
                </div>

                {/* Saved Jobs Grid */}
                {savedJobs.length <= 0 ? (
                    <div className='text-center py-16'>
                        <Bookmark className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>No Saved Jobs Yet</h3>
                        <p className='text-gray-600 dark:text-gray-400 mb-6'>Start saving jobs you're interested in to view them here!</p>
                        <Button onClick={() => navigate('/jobs')} className="bg-purple-600 hover:bg-purple-700">
                            Browse Jobs
                        </Button>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {savedJobs.map((savedJob) => (
                            <Job key={savedJob._id} job={savedJob.job} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SavedJobs
