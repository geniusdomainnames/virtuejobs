import toast from "react-hot-toast";
export default function ProjectsForm({ 
    formData, 
    handleChange, 
    handleActivityChange, 
    addActivity, 
    removeActivity, 
    handleSubmit, 
    onBack,
    isEditing
}) {
    const handleDateChange = (e) => {
        const { name, value } = e.target;
        
        // Update the form data
        handleChange(e);
        
        // Validate dates after update
        if (name === 'project_start_date' && formData.project_end_date && value > formData.project_end_date) {
            // If start date is after end date, reset end date
            handleChange({
                target: {
                    name: 'project_end_date',
                    value: value
                }
            });
        } else if (name === 'project_end_date' && formData.project_start_date && value < formData.project_start_date) {
            // If end date is before start date, reset start date
            handleChange({
                target: {
                    name: 'project_start_date',
                    value: value
                }
            });
        }
    };

    const getMinEndDate = () => {
        return formData.project_start_date || '';
    };

    const getMaxStartDate = () => {
        return formData.project_end_date || '';
    };

    return (
        <div >
           
            <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
                <div>
                    <label className="block text-sm font-semibold mb-1">Project Name</label>
                    <input
                        type="text"
                        name="project_name"
                        placeholder="Project Name"
                        value={formData.project_name}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Project Summary</label>
                    <textarea
                        name="project_summary"
                        placeholder="Brief summary of the project (2-3 sentences)"
                        value={formData.project_summary || ''}
                        onChange={handleChange}
                        className="input min-h-[100px]"
                        rows={3}
                    />
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-semibold mb-1">Start Date</label>
                        <input
                            type="date"
                            name="project_start_date"
                            value={formData.project_start_date}
                            onChange={handleDateChange}
                            max={getMaxStartDate()}
                            className="input"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-semibold mb-1">End Date</label>
                        <input
                            type="date"
                            name="project_end_date"
                            value={formData.project_end_date}
                            onChange={handleDateChange}
                            min={getMinEndDate()}
                            className="input"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-semibold mb-1">Activities</label>
                    {formData.activities.map((activity, index) => (
                        <div key={index} className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Describe an activity or responsibility"
                                value={activity}
                                onChange={(e) => handleActivityChange(index, e.target.value)}
                                className="input flex-1"
                            />
                            {formData.activities.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeActivity(index)}
                                    className="px-3 text-red-600 hover:text-red-900"
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addActivity}
                        className="mt-2 text-sm text-green-600 hover:text-green-900"
                    >
                        + Add Activity
                    </button>
                </div>
                <div className="flex justify-between pt-4 gap-4">
                    <button
                        type="button"
                        onClick={onBack}
                        className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-md font-semibold hover:bg-gray-50 transition"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition"
                        disabled={
                            (formData.project_start_date && formData.project_end_date && formData.project_start_date > formData.project_end_date) ||
                            (formData.project_end_date && formData.project_start_date && formData.project_end_date < formData.project_start_date)
                        }
                    >
                        {isEditing ? 'Update' : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    );
};