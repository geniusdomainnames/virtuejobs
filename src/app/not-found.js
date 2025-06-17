import React from "react";
import Link from "next/link";
import { FaHome, FaFileAlt, FaBlog, FaInfoCircle, FaEnvelope, FaSearch, FaChartLine } from "react-icons/fa";
import { MdWork, MdSchool } from "react-icons/md";
import { RiUserSearchFill } from "react-icons/ri";

export default function NotFound() {
  const links = [
    { 
      path: "/", 
      label: "Browse Jobs", 
      icon: <MdWork className="text-3xl" />,
      description: "Explore thousands of career opportunities",
      color: "from-emerald-500 to-emerald-600"
    },
    { 
      path: "/resume-builder", 
      label: "Resume Builder", 
      icon: <FaFileAlt className="text-3xl" />,
      description: "Create a standout resume in minutes",
      color: "from-green-500 to-green-600"
    },
    { 
      path: "/blog", 
      label: "Career Journey Guides", 
      icon: <FaChartLine className="text-3xl" />,
      description: "Grow your career with expert tips",
      color: "from-lime-500 to-lime-600"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-green-700 to-emerald-600 p-12 text-center overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full"></div>
          
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-5 rounded-full backdrop-blur-sm">
                <FaSearch className="text-6xl text-white animate-pulse" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Career Path Not Found</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              The opportunity you're searching for isn't here, but your perfect job might be just around the corner.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Continue Your Career Journey</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              While this path didn't lead where you expected, we've got plenty of resources to help you navigate your professional future.
            </p>
          </div>

          {/* Career Resources Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {links.map((link, index) => (
              <Link 
                href={link.path} 
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${link.color} opacity-90`}></div>
                <div className="relative z-10 p-8 h-full flex flex-col items-center text-center text-white">
                  <div className="mb-5 group-hover:scale-110 transition-transform">
                    {link.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-white/90 transition-colors">
                    {link.label}
                  </h3>
                  <p className="text-white/80 group-hover:text-white transition-colors">
                    {link.description}
                  </p>
                  <div className="mt-6 px-6 py-2 bg-white/20 rounded-full text-sm font-medium group-hover:bg-white/30 transition-colors">
                    Explore Now
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Navigation */}
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between bg-green-50 rounded-xl p-8">
            <div className="flex-1 max-w-md w-full">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Quick Navigation</h3>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/" className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:bg-green-100 transition-colors border border-green-200">
                  <FaHome className="text-emerald-600" />
                  <span>Home</span>
                </Link>
                <Link href="/blog" className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:bg-green-100 transition-colors border border-green-200">
                  <FaBlog className="text-green-600" />
                  <span>Blog</span>
                </Link>
                <Link href="/about" className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:bg-green-100 transition-colors border border-green-200">
                  <FaInfoCircle className="text-lime-600" />
                  <span>About</span>
                </Link>
                <Link href="/contact" className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:bg-green-100 transition-colors border border-green-200">
                  <FaEnvelope className="text-teal-600" />
                  <span>Contact</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
