import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);
    return (
        <div>
            <Table>
                <TableCaption className="text-gray-700 dark:text-gray-300">A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-50 dark:bg-gray-700">
                        <TableHead className="text-gray-900 dark:text-white">Date</TableHead>
                        <TableHead className="text-gray-900 dark:text-white">Job Role</TableHead>
                        <TableHead className="text-gray-900 dark:text-white">Company</TableHead>
                        <TableHead className="text-right text-gray-900 dark:text-white">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? <span className="text-gray-600 dark:text-gray-400">You haven't applied any job yet.</span> : allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                <TableCell className="text-gray-900 dark:text-white">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell className="text-gray-900 dark:text-white">{appliedJob.job?.title}</TableCell>
                                <TableCell className="text-gray-900 dark:text-white">{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-right"><Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{appliedJob.status.toUpperCase()}</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable