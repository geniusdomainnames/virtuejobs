'use client';
import React from 'react';

import { FiPhone, FiMail, FiClock, FiMapPin } from 'react-icons/fi'; // Feather icons

export default function ContactPage({company_mail, company_phone}) {
 

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side: Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl md:text-5xl font-bold mb-6">
           Empowering Your Career Journey Starts Here
          </h1>
          <p className="text-gray-600 mb-10">
           Discover opportunities that align with your goals. Whether you're just starting out or aiming to take the next big step, we’re here to connect you with the right roles and resources to help you thrive professionally.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
            <div className="flex items-start gap-4">
              <span className="text-2xl text-green-700">
                <FiPhone />
              </span>
              <div>
                <div className="font-bold">Call for inquiry</div>
                <div className="text-gray-700">+257 388-6895</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl text-green-700">
                <FiMail />
              </span>
              <div>
                <div className="font-bold">Send us email</div>
                <div className="text-gray-700">{company_mail}</div>
              </div>
            </div>
            {/* <div className="flex items-start gap-4">
              <span className="text-2xl text-green-700">
                <FiClock />
              </span>
              <div>
                <div className="font-bold">Opening hours</div>
                <div className="text-gray-700">Mon - Fri: 10AM - 10PM</div>
              </div>
            </div> */}
            {/* <div className="flex items-start gap-4">
              <span className="text-2xl text-green-700">
                <FiMapPin />
              </span>
              <div>
                <div className="font-bold">Office</div>
                <div className="text-gray-700">19 North Road Piscataway, NY 08854</div>
              </div>
            </div> */}
          </div>
        </div>
        {/* Right Side: Form */}
        <div className="bg-green-50 rounded-2xl p-8 flex flex-col justify-center shadow">
          <h2 className="text-2xl font-bold text-center mb-2">Contact Info</h2>
          <p className="text-center text-gray-600 mb-6">Nibh dis faucibus proin lacus tristique</p>
          <form className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1">First Name</label>
                <input type="text" placeholder="Your name" className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1">Last Name</label>
                <input type="text" placeholder="Your last name" className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Email Address</label>
              <input type="email" placeholder="Your E-mail address" className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Message</label>
              <textarea placeholder="Your message..." rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200 resize-none" />
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
