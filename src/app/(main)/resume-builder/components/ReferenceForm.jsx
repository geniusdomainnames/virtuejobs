export default function ReferenceForm({ 
    formData, 
    handleChange, 
    handleSubmit, 
    onBack,
    isEditing
}) {
    return (
        <div >
            <h2 className="text-2xl font-bold text-center mb-2">Reference</h2>
            <p className="text-center text-gray-600 mb-6">Add a reference contact</p>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-semibold mb-1">Referee Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Referee Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Position</label>
                    <input
                        type="text"
                        name="position"
                        placeholder="Position"
                        value={formData.position}
                        onChange={handleChange}
                        className="input"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Organization</label>
                    <input
                        type="text"
                        name="organization"
                        placeholder="Organization"
                        value={formData.organization}
                        onChange={handleChange}
                        className="input"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Address</label>
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        className="input"
                    />
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-semibold mb-1">Contact Type</label>
                        <select
                            name="contactType"
                            value={formData.contactType}
                            onChange={handleChange}
                            className="input"
                        >
                            <option value="email">Email</option>
                            <option value="phone">Phone</option>
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-semibold mb-1">Contact</label>
                        <input
                            type={formData.contactType === 'email' ? 'email' : 'tel'}
                            name="contact"
                            placeholder={formData.contactType === 'email' ? 'Email address' : 'Phone number'}
                            value={formData.contact}
                            onChange={handleChange}
                            className="input"
                            required
                        />
                    </div>
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
                    >
                        {isEditing ? 'Update' : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    );
}
