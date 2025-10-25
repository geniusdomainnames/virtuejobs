import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';


const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

const WorkExperienceForm = ({ formData, handleChange, handleSubmit, onBack, isEditing }) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const mod = await import('@/utils/CountryData');
                const names = (mod.countryData || []).map(c => c.name).sort();
                if (mounted) setCountries(names);
            } catch (e) {
                if (mounted) setCountries([]);
            }
        })();
        return () => { mounted = false; };
    }, []);
    const validateAndSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.jobTitle || !formData.company || !formData.country || 
            !formData.state || !formData.city || !formData.startMonth || !formData.startYear) {
            toast.error("Please fill in all required fields.");
            return;
        }

        // Validate end date if not currently working
        if (!formData.currentlyWorking && (!formData.endMonth || !formData.endYear)) {
            toast.error("Please provide an end date or check 'I currently work here'.");
            return;
        }

        // Validate date ranges
        if (!formData.currentlyWorking) {
            const startDate = new Date(formData.startYear, formData.startMonth - 1);
            const endDate = new Date(formData.endYear, formData.endMonth - 1);
            
            if (endDate < startDate) {
                toast.error("End date cannot be before start date.");
                return;
            }
        }

        handleSubmit(e);
    };

    return (
        <div >
           
            <form className="space-y-4" onSubmit={validateAndSubmit}>
                <div>
                    <label className="block text-sm font-semibold mb-1">Job Title</label>
                    <input
                        type="text"
                        name="jobTitle"
                        placeholder="Job Title"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Company or Organization Name</label>
                    <input
                        type="text"
                        name="company"
                        placeholder="Company or Organization Name"
                        value={formData.company}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-semibold mb-1">Country</label>
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="input"
                            required
                        >
                            <option value="">Select Country</option>
                            {countries.map((country) => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-semibold mb-1">State/Province</label>
                        <input
                            type="text"
                            name="state"
                            placeholder="State or Province"
                            value={formData.state}
                            onChange={handleChange}
                            className="input"
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-semibold mb-1">City</label>
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                            className="input"
                            required
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-semibold mb-1">Start Month</label>
                        <select
                            name="startMonth"
                            value={formData.startMonth}
                            onChange={handleChange}
                            className="input"
                            required
                        >
                            <option value="">Select Month</option>
                            {months.map((month, index) => (
                                <option key={month} value={index + 1}>{month}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-semibold mb-1">Start Year</label>
                        <select
                            name="startYear"
                            value={formData.startYear}
                            onChange={handleChange}
                            className="input"
                            required
                        >
                            <option value="">Select Year</option>
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {!formData.currentlyWorking && (
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-semibold mb-1">End Month</label>
                            <select
                                name="endMonth"
                                value={formData.endMonth}
                                onChange={handleChange}
                                className="input"
                                required={!formData.currentlyWorking}
                            >
                                <option value="">Select Month</option>
                                {months.map((month, index) => (
                                    <option key={month} value={index + 1}>{month}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-semibold mb-1">End Year</label>
                            <select
                                name="endYear"
                                value={formData.endYear}
                                onChange={handleChange}
                                className="input"
                                required={!formData.currentlyWorking}
                            >
                                <option value="">Select Year</option>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="currentlyWorking"
                        id="currentlyWorking"
                        checked={formData.currentlyWorking}
                        onChange={handleChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="currentlyWorking" className="ml-2 block text-sm text-gray-700">
                        I currently work here
                    </label>
                </div>
                <div className="flex justify-between pt-4 gap-4">
                    <button
                        type="button"
                        onClick={onBack}
                        className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-md font-semibold hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition"
                    >
                        {isEditing ? 'Update' : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default WorkExperienceForm;