import React from 'react';
import { useResumeBuilder } from '../ResumeBuilder';

export default function PersonalInformation() {
  const { contactData, setContactData } = useResumeBuilder();

  return (
    <div >
     
      <form className="space-y-4">
        {/* Row 1: First, Middle & Last Name */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="firstName" className="block text-sm font-semibold mb-1">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              value={contactData.firstName}
              onChange={(e) => setContactData({ ...contactData, firstName: e.target.value })}
              className="input"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="middleName" className="block text-sm font-semibold mb-1">
              Middle Name <span className="text-gray-500">(Optional)</span>
            </label>
            <input
              id="middleName"
              type="text"
              placeholder="Middle Name"
              value={contactData.middleName}
              onChange={(e) => setContactData({ ...contactData, middleName: e.target.value })}
              className="input"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="lastName" className="block text-sm font-semibold mb-1">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Last Name"
              value={contactData.lastName}
              onChange={(e) => setContactData({ ...contactData, lastName: e.target.value })}
              className="input"
            />
          </div>
        </div>
        {/* Job Title */}
        <div className="relative">
          <label htmlFor="jobTitle" className="block text-sm font-semibold mb-1">
            Desired Job Title <span className="text-gray-500">(Optional)</span>
          </label>
          <input
            id="jobTitle"
            type="text"
            placeholder="Desired Job Title"
            value={contactData.jobTitle}
            onChange={(e) => setContactData({ ...contactData, jobTitle: e.target.value })}
            className="input"
          />
          <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-help">
            ❓
          </span>
        </div>
        {/* Phone & Email */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className='w-full'>
            <label htmlFor="phone" className="block text-sm font-semibold mb-1">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Phone"
              value={contactData.phone}
              onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
              className="input"
            />
          </div>
          <div className='w-full'>
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={contactData.email}
              onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
              className="input"
            />
          </div>
        </div>
        {/* Country & City */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="country" className="block text-sm font-semibold mb-1">
              Country
            </label>
            <select
              id="country"
              value={contactData.country}
              onChange={(e) => setContactData({ ...contactData, country: e.target.value })}
              className="input"
            >
              <option value="">Select Country</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Ghana">Ghana</option>
              <option value="Kenya">Kenya</option>
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="city" className="block text-sm font-semibold mb-1">
              City
            </label>
            <input
              id="city"
              type="text"
              placeholder="City"
              value={contactData.city}
              onChange={(e) => setContactData({ ...contactData, city: e.target.value })}
              className="input"
            />
          </div>
        </div>
        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-semibold mb-1">
            Address
          </label>
          <textarea
            id="address"
            placeholder="Address"
            value={contactData.address}
            onChange={(e) => setContactData({ ...contactData, address: e.target.value })}
            className="input"
          />
        </div>
        {/* LinkedIn */}
        <div>
          <label htmlFor="linkedin" className="block text-sm font-semibold mb-1">
            LinkedIn Profile URL
          </label>
          <input
            id="linkedin"
            type="url"
            placeholder="LinkedIn Profile URL"
            value={contactData.linkedin}
            onChange={(e) => setContactData({ ...contactData, linkedin: e.target.value })}
            className="input"
          />
        </div>
        {/* Website */}
        <div>
          <label htmlFor="website" className="block text-sm font-semibold mb-1">
            Personal Website <span className="text-gray-500">(optional)</span>
          </label>
          <input
            id="website"
            type="url"
            placeholder="Personal Website"
            value={contactData.website}
            onChange={(e) => setContactData({ ...contactData, website: e.target.value })}
            className="input"
          />
        </div>
      </form>
    </div>
  );
}