import React from 'react'
import ResumeBuilder from './ResumeBuilder'
import { Rowdies } from 'next/font/google'
import Head from 'next/head'

// Google Font setup
const rowdies = Rowdies({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
})

// Metadata for SEO and social sharing
export const metadata = {
  title: 'Virtue Jobs - Free AI Resume Builder',
  description:
    'Build your dream resume instantly with our free AI-powered resume builder. Designed for professionals, students, and career switchers. Create, customize, and download with ease.',
  keywords:
    'resume builder,AI Resume Builder, Resume Maker, Create Resume, Professional Resume, Online CV Builder, Job Application Tool',
  openGraph: {
    title: 'Virtue Jobs - Free AI Resume Builder',
    description:
      'Generate a job-winning resume with our intelligent AI resume builder. Fast, easy, and completely free to use.',
    url: 'https://virtuejobs.com/resume-builder',
    type: 'website',
    siteName: 'Virtue Jobs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtue Jobs - Free AI Resume Builder',
    description:
      'Create your professional resume with AI in just minutes. Free, fast, and customizable.',
    creator: '@virtuejobs',
  },
  alternates: {
    canonical: 'https://virtuejobs.com/resume-builder',
  },
}

export default function Page() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <link rel="canonical" href={metadata.alternates.canonical} />

        {/* Open Graph */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />

        {/* Twitter Card */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:creator" content={metadata.twitter.creator} />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: metadata.title,
              description: metadata.description,
              url: metadata.openGraph.url,
            }),
          }}
        />
      </Head>

      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto p-1 lg:p-0">
          <section className="text-center mb-10 py-8">
            <h1
              className={`${rowdies.className} lg:text-7xl text-4xl font-extrabold text-gray-900 sm:text-5xl leading-tight`}
            >
              Build Your Dream Resume with AI
            </h1>
            <p className="mt-4 lg:text-xl text-base text-gray-600 px-4 max-w-2xl mx-auto leading-relaxed">
              Instantly generate a job-winning resume using our intelligent, AI-powered resume builder.
              Designed for professionals, students, and career changers — create, customize, and download
              your resume in minutes.
            </p>
          </section>

          <section aria-label="Resume Builder Section">
            <ResumeBuilder />
          </section>
        </div>
      </main>
    </>
  )
}
