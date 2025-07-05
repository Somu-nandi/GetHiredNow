import React from 'react'
import { Label } from './ui/label'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Chennai", "Kolkata", "Gurgaon", "Noida"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Analyst", "DevOps Engineer", "UI/UX Designer"]
    },
    {
        fitlerType: "Salary",
        array: ["5-8LPA", "8-12LPA", "12-18LPA", "18LPA+"]
    },
]

const FilterCard = ({ onFilterChange, selectedFilters, onClearFilters }) => {
    const handleCheckboxChange = (filterType, item, isChecked) => {
        if (onFilterChange) {
            onFilterChange(filterType, item, isChecked);
        }
    };

    const hasActiveFilters = selectedFilters && Object.values(selectedFilters).some(arr => arr.length > 0);

    return (
        <div className='w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-md'>
            <div className='flex justify-between items-center'>
                <h1 className='font-bold text-lg text-gray-900 dark:text-white'>Filter Jobs</h1>
                {hasActiveFilters && (
                    <button
                        onClick={onClearFilters}
                        className='text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline'
                    >
                        Clear All
                    </button>
                )}
            </div>
            <hr className='mt-3 border-gray-200 dark:border-gray-600' />
            <div className='space-y-4 mt-4'>
                {
                    fitlerData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg mb-2 text-gray-900 dark:text-white'>{data.fitlerType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const filterType = data.fitlerType.toLowerCase();
                                    const itemId = `${filterType}-${idx}`;
                                    const isChecked = selectedFilters?.[filterType]?.includes(item) || false;

                                    return (
                                        <div key={itemId} className='flex items-center space-x-2 my-2'>
                                            <input
                                                type="checkbox"
                                                id={itemId}
                                                checked={isChecked}
                                                onChange={(e) => handleCheckboxChange(filterType, item, e.target.checked)}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
                                            />
                                            <Label htmlFor={itemId} className="cursor-pointer text-sm text-gray-700 dark:text-gray-300">{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default FilterCard