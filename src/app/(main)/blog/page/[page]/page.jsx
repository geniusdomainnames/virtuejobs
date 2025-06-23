import React from 'react';
import { getBlogs } from '@/lib/getBlogPosts';
import BlogListItem from '@/app/(main)/components/BlogListItem';
import Head from 'next/head';
import BlogNav from '@/app/(main)/components/BlogNav';


export const metadata = {
  title: 'Virtue Jobs - Career and Job Blog',
  description: 'Explore our collection of career advice, job search tips, and industry insights. Stay updated with the latest trends in employment and professional development.',
  keywords: 'career advice, job search tips, professional development, career blog, job hunting, career growth, employment tips',
  openGraph: {
    title: 'Virtue Jobs - Career and Job Blog',
    description: 'Discover valuable insights and tips for your career journey. Expert advice on job searching, career development, and professional growth.',
    url: 'https://virtuejobs.com/blog',
    type: 'website',
    siteName: 'Virtue Jobs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtue Jobs - Career and Job Blog',
    description: 'Your source for career advice and job search tips. Stay informed with the latest in professional development.',
    creator: '@virtuejobs',
  },
  alternates: {
    canonical: 'https://virtuejobs.com/blog',
  },
};

export default async function Page({ params }) {
  const page = parseInt(params.page) || 1;
  const result = await getBlogs(page);
  const blogposts = result.data;

  console.log("FRONT END RESULT", blogposts);

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
              '@type': 'Blog',
              name: metadata.title,
              description: metadata.description,
              url: metadata.openGraph.url,
              publisher: {
                '@type': 'Organization',
                name: 'Virtue Jobs',
                url: 'https://virtuejobs.com'
              }
            }),
          }}
        />
      </Head>

      <section className="p-4">
        <div className="flex flex-col gap-3 pb-20">
          <div className="flex flex-col lg:w-[70%] lg:gap-6 gap-3 min-h-screen mt-4 lg:mt-6  mx-auto">
            {blogposts.map((blogpost, index) => (
              <BlogListItem key={index} blogpost={blogpost} />
            ))}
          </div> 

          <BlogNav page={page}/>
        </div>
      </section>
    </>
  );
}
