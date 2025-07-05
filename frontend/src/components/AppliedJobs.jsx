import React from 'react'
import Navbar from './shared/Navbar'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Briefcase, Calendar, Building2 } from 'lucide-react'

const AppliedJobs = () => {
    useGetAppliedJobs();
    const { allAppliedJobs } = useSelector(store => store.job);
    const navigate = useNavigate();

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'accepted':
                return 'bg-green-500 hover:bg-green-600';
            case 'rejected':
                return 'bg-red-500 hover:bg-red-600';
            case 'pending':
                return 'bg-yellow-500 hover:bg-yellow-600';
            default:
                return 'bg-gray-500 hover:bg-gray-600';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 px-4'>
                {/* Header Section */}
                <div className='flex items-center gap-4 mb-8'>
                    <Button
                        variant="outline"
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                    <div>
                        <h1 className='text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3'>
                            <Briefcase className="h-8 w-8 text-purple-600" />
                            My Applied Jobs
                        </h1>
                        <p className='text-gray-600 dark:text-gray-400 mt-2'>Track the status of your job applications</p>
                    </div>
                </div>

                {/* Stats Section */}
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
                    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>Total Applied</p>
                                <p className='text-2xl font-bold text-gray-900 dark:text-white'>{allAppliedJobs.length}</p>
                            </div>
                            <Briefcase className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>
                    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>Pending</p>
                                <p className='text-2xl font-bold text-yellow-600'>
                                    {allAppliedJobs.filter(job => job.status === 'pending').length}
                                </p>
                            </div>
                            <Calendar className="h-8 w-8 text-yellow-600" />
                        </div>
                    </div>
                    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>Accepted</p>
                                <p className='text-2xl font-bold text-green-600'>
                                    {allAppliedJobs.filter(job => job.status === 'accepted').length}
                                </p>
                            </div>
                            <Building2 className="h-8 w-8 text-green-600" />
                        </div>
                    </div>
                    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>Rejected</p>
                                <p className='text-2xl font-bold text-red-600'>
                                    {allAppliedJobs.filter(job => job.status === 'rejected').length}
                                </p>
                            </div>
                            <Building2 className="h-8 w-8 text-red-600" />
                        </div>
                    </div>
                </div>

                {/* Applied Jobs Table */}
                <div className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm'>
                    {allAppliedJobs.length <= 0 ? (
                        <div className='text-center py-16'>
                            <Briefcase className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>No Applications Yet</h3>
                            <p className='text-gray-600 dark:text-gray-400 mb-6'>You haven't applied to any jobs yet. Start exploring opportunities!</p>
                            <Button onClick={() => navigate('/jobs')} className="bg-purple-600 hover:bg-purple-700">
                                Browse Jobs
                            </Button>
                        </div>
                    ) : (
                        <Table>
                            <TableCaption className="text-lg font-medium py-4 text-gray-700 dark:text-gray-300">
                                A complete list of your job applications
                            </TableCaption>
                            <TableHeader>
                                <TableRow className="bg-gray-50 dark:bg-gray-700">
                                    <TableHead className="font-semibold text-gray-900 dark:text-white">Applied Date</TableHead>
                                    <TableHead className="font-semibold text-gray-900 dark:text-white">Job Role</TableHead>
                                    <TableHead className="font-semibold text-gray-900 dark:text-white">Company</TableHead>
                                    <TableHead className="font-semibold text-gray-900 dark:text-white">Location</TableHead>
                                    <TableHead className="font-semibold text-right text-gray-900 dark:text-white">Status</TableHead>
                                    <TableHead className="font-semibold text-right text-gray-900 dark:text-white">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {allAppliedJobs.map((appliedJob) => (
                                    <TableRow key={appliedJob._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <TableCell className="font-medium text-gray-900 dark:text-white">
                                            {formatDate(appliedJob?.createdAt)}
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{appliedJob.job?.title}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {appliedJob.job?.jobType} • {appliedJob.job?.experienceLevel}+ years
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                                                <Building2 className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                                                {appliedJob.job?.company?.name}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-gray-600 dark:text-gray-400">
                                            {appliedJob.job?.location}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Badge className={`${getStatusColor(appliedJob?.status)} text-white`}>
                                                {appliedJob.status?.toUpperCase()}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={() => navigate(`/description/${appliedJob.job?._id}`)}
                                            >
                                                View Job
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AppliedJobs
