import React from "react";
import { FaUsers, FaHandshake, FaBullseye, FaLightbulb, FaGlobe, FaBalanceScale, FaUserTie, FaChartLine } from "react-icons/fa";
import { MdWork, MdGppGood } from "react-icons/md";

const AboutUs = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">About VirtueJobs</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            <span className="font-semibold text-green-600">VirtueJobs</span> helps job seekers find opportunities around their location for free. We offer a comprehensive career blog and a free AI-powered resume builder to empower your job search.
          </p>
        </div>

        {/* Core Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-green-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-green-600 mb-4">
              <FaUsers size={40} className="inline-block" />
            </div>
            <h3 className="text-xl font-semibold text-green-700 mb-3">Who We Are</h3>
            <p className="text-gray-600">
              A free job aggregation platform dedicated to connecting job seekers with local opportunities and providing valuable career resources.
            </p>
          </div>

          <div className="bg-green-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-green-600 mb-4">
              <MdWork size={40} className="inline-block" />
            </div>
            <h3 className="text-xl font-semibold text-green-700 mb-3">What We Do</h3>
            <p className="text-gray-600">
              We gather job listings from various sources and present them in one place, making your job search easier and more efficient.
            </p>
          </div>

          <div className="bg-green-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-green-600 mb-4">
              <MdGppGood size={40} className="inline-block" />
            </div>
            <h3 className="text-xl font-semibold text-green-700 mb-3">Why VirtueJobs?</h3>
            <p className="text-gray-600">
              Free access to local job opportunities, a rich career blog, and an AI resume builder - all designed to help you succeed in your job search.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-green-50 to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-gray-700 mb-4">
              <FaBullseye size={36} className="inline-block" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To make job searching accessible to everyone by providing free, localized job listings and powerful career tools.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-gray-700 mb-4">
              <FaLightbulb size={36} className="inline-block" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Vision</h3>
            <p className="text-gray-600">
              A world where everyone can easily find job opportunities near them and access the resources needed to land their dream job.
            </p>
          </div>
        </div>

        {/* Principles & People */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-gray-50 to-green-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-gray-700 mb-4">
              <FaBalanceScale size={36} className="inline-block" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Principles</h3>
            <p className="text-gray-600">
              Free access, local focus, and comprehensive career support - these values drive everything we do at VirtueJobs.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-green-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-gray-700 mb-4">
              <FaUserTie size={36} className="inline-block" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Our People</h3>
            <p className="text-gray-600">
              Our community consists of job seekers who benefit from our free services and employers who find quality candidates through our platform.
            </p>
          </div>
        </div>

        {/* Objectives */}
        <div className="bg-gradient-to-r from-green-100 to-green-50 p-8 rounded-xl shadow-md mb-12">
          <div className="flex items-center mb-6">
            <FaChartLine size={32} className="text-green-700 mr-4" />
            <h3 className="text-2xl font-semibold text-green-800">Our Objectives</h3>
          </div>
          
          <div className="space-y-6">
            <p className="text-gray-700">
              We believe everyone deserves free access to job opportunities and career-building resources.
            </p>

            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="flex items-start mb-3">
                <FaHandshake size={24} className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">For Job Seekers:</h4>
                  <p className="text-gray-700">
                    We provide free access to local job listings, a comprehensive career blog, and an AI-powered resume builder to help you stand out.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="flex items-start mb-3">
                <FaGlobe size={24} className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">For Employers:</h4>
                  <p className="text-gray-700">
                    We connect you with qualified local candidates and provide tools to help you find the right talent for your organization.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700">
              <span className="font-semibold text-green-600">VirtueJobs</span> is committed to making job searching simpler, more localized, and completely free.
            </p>
          </div>
        </div>

        <div className="text-center bg-gray-50 p-8 rounded-xl">
          <p className="text-gray-700 text-lg">
            Start your job search today with free access to local opportunities, expert career advice, and our powerful AI resume builder.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;