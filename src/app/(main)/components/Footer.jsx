import { HiOutlineMail } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { GlobalVariables } from "../../../utils/GlobalVariables";
import Logo from "./Logo";

export default function Footer() {
  //let navlinks = ['About Us', 'Our Team', 'Partners', 'For Candidates', 'For Employers'];
  let navlinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact Us', href: '/contact' }
  ];
  return (
    <footer className="bg-black border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Job Section */}
          <div className="space-y-4">
            {/* <div className="flex items-center gap-3">
              <Image
                src="/svgs/logo.svg"
                alt="site-logo"
                width={30}
                height={40}
                priority
              />
              <p className="text-xl font-bold text-green-200">Jobville</p>
            </div> */}
            <Logo/>

            <p className="text-green-300 text-sm leading-relaxed">
             Discover a wide range of job opportunities from top employers across various industries—carefully curated to align with your skills, interests, and career aspirations. Find the role that moves you forward.
            </p>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-200">Company</h3>
            <ul className="space-y-2">
              {navlinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-green-300 hover:text-green-600 text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Job Categories */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-200">Job Categories</h3>
            <div className="flex flex-wrap gap-2">
              {GlobalVariables.jobTypes.map((category) => (
                <span key={category} className="px-3 py-1 bg-blue-100 text-green-800 rounded-full text-xs">
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-200">Newsletter</h3>
            <p className="text-green-300 text-sm">
              Get weekly updates on the latest job openings and expert career tips to help you grow and succeed.

            </p>
            <form className="flex flex-col w-full gap-2">
              <div className="relative flex-1">
                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="pl-10 pr-4 py-2 w-full rounded-lg border border-green-50 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>
              <button className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t mt-8 pt-8 text-center md:flex md:items-center md:justify-between">
          <p className="text-green-800 text-sm">
            © Copyright Job Portal 2024. Designed by Figma guru
          </p>
          <div className="mt-4 md:mt-0 flex gap-4 justify-center">
            <Link href="/privacy" className="text-green-800 hover:text-green-600 text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-green-800 hover:text-green-600 text-sm">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}