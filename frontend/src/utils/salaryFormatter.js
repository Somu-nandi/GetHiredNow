// Utility function to format salary from rupees to LPA format
export const formatSalary = (salary) => {
    if (!salary) return "Not specified";

    // Convert salary from rupees to lakhs
    const salaryInLakhs = salary / 100000;

    // Always show as whole numbers for LPA format
    return `${Math.round(salaryInLakhs)}LPA`;
};

// Alternative format for displaying salary in different contexts
export const formatSalaryDetailed = (salary) => {
    if (!salary) return "Not specified";

    const salaryInLakhs = salary / 100000;

    // For detailed view, show one decimal place if needed
    if (salaryInLakhs % 1 === 0) {
        return `₹${Math.round(salaryInLakhs)} Lakhs per annum`;
    } else {
        return `₹${salaryInLakhs.toFixed(1)} Lakhs per annum`;
    }
};

// Function to check if salary falls within a range
export const isSalaryInRange = (salary, range) => {
    if (!salary || !range) return false;

    const salaryInLakhs = salary / 100000;

    switch (range) {
        case "5-8LPA":
            return salaryInLakhs >= 5 && salaryInLakhs <= 8;
        case "8-12LPA":
            return salaryInLakhs >= 8 && salaryInLakhs <= 12;
        case "12-18LPA":
            return salaryInLakhs >= 12 && salaryInLakhs <= 18;
        case "18LPA+":
            return salaryInLakhs >= 18;
        default:
            return false;
    }
};
