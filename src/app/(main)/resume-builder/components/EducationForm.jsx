import toast from "react-hot-toast";
import { countryData } from "@/utils/CountryData";

export default function EducationForm({ 
    formData, 
    handleChange, 
    handleSubmit, 
    onBack,
    isEditing 
}) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

    const validateAndSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.hideGraduationDate) {
            if (formData.graduationYear && formData.graduationYear < formData.entryYear) {
                toast.error("Graduation year cannot be earlier than entry year.");
                return;
            }
        }

        if (!formData.schoolName || !formData.schoolLocation || !formData.degree || 
            !formData.fieldOfStudy || !formData.entryYear) {
            toast.error("Please fill in all required fields.");
            return;
        }

        handleSubmit(e);
    };

    return (
        <div className="">
           
            <form className="space-y-4" onSubmit={validateAndSubmit}>
                <div>
                    <label className="block text-sm font-semibold mb-1">School Name</label>
                    <input
                        type="text"
                        name="schoolName"
                        placeholder="School Name"
                        value={formData.schoolName}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">School Location</label>
                    <input
                        type="text"
                        name="schoolLocation"
                        placeholder="School Location"
                        value={formData.schoolLocation}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Degree or Program</label>
                    <input
                        type="text"
                        name="degree"
                        placeholder="Degree or Program"
                        value={formData.degree}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Field of Study</label>
                    <input
                        type="text"
                        name="fieldOfStudy"
                        placeholder="Field of Study"
                        value={formData.fieldOfStudy}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-semibold mb-1">Entry Year</label>
                        <select
                            name="entryYear"
                            value={formData.entryYear}
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
                    <div className="flex-1">
                        <label className="block text-sm font-semibold mb-1">Graduation Year</label>
                        <select
                            name="graduationYear"
                            value={formData.graduationYear}
                            onChange={handleChange}
                            disabled={formData.hideGraduationDate}
                            className={`input ${formData.hideGraduationDate ? 'bg-gray-100 text-gray-400' : ''}`}
                        >
                            <option value="">Select Year</option>
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="hideGraduationDate"
                        id="hideGraduationDate"
                        checked={formData.hideGraduationDate}
                        onChange={handleChange}
                        className="input"
                    />
                    <label htmlFor="hideGraduationDate" className="ml-2 block text-sm text-gray-700">
                        Remove graduation date from resume
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
}