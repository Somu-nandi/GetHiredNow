import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion'
import { isSalaryInRange } from '@/utils/salaryFormatter';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [selectedFilters, setSelectedFilters] = useState({
        location: [],
        industry: [],
        salary: []
    });

    useEffect(() => {
        let filteredJobs = allJobs;

        // Apply text search filter
        if (searchedQuery) {
            filteredJobs = filteredJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            });
        }

        // Apply location filter
        if (selectedFilters.location.length > 0) {
            filteredJobs = filteredJobs.filter((job) => {
                return selectedFilters.location.some(location =>
                    job.location.toLowerCase().includes(location.toLowerCase())
                );
            });
        }

        // Apply industry filter (based on job title/requirements)
        if (selectedFilters.industry.length > 0) {
            filteredJobs = filteredJobs.filter((job) => {
                return selectedFilters.industry.some(industry => {
                    const industryLower = industry.toLowerCase();
                    return job.title.toLowerCase().includes(industryLower) ||
                           job.requirements.some(req => req.toLowerCase().includes(industryLower));
                });
            });
        }

        // Apply salary filter
        if (selectedFilters.salary.length > 0) {
            filteredJobs = filteredJobs.filter((job) => {
                return selectedFilters.salary.some(salaryRange =>
                    isSalaryInRange(job.salary, salaryRange)
                );
            });
        }

        setFilterJobs(filteredJobs);
    }, [allJobs, searchedQuery, selectedFilters]);

    const handleFilterChange = (filterType, value, isChecked) => {
        setSelectedFilters(prev => {
            const newFilters = { ...prev };
            if (isChecked) {
                newFilters[filterType] = [...newFilters[filterType], value];
            } else {
                newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
            }
            return newFilters;
        });
    };

    const handleClearFilters = () => {
        setSelectedFilters({
            location: [],
            industry: [],
            salary: []
        });
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard
                            onFilterChange={handleFilterChange}
                            selectedFilters={selectedFilters}
                            onClearFilters={handleClearFilters}
                        />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span className="text-gray-600 dark:text-gray-400">Job not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>


        </div>
    )
}

export default Jobs