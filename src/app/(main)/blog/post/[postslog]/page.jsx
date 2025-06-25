import { getBlogPostBySlog } from '@/lib/getBlogPostBySlog';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Rowdies } from 'next/font/google';
import { MdOutlineDateRange } from 'react-icons/md';
import { LuNotebookPen } from 'react-icons/lu';
import BlogCommentForm from '@/app/(main)/components/BlogCommentForm';
import { FaUser } from 'react-icons/fa';

const rowdies = Rowdies({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

// ✅ SEO Metadata
export async function generateMetadata({ params }) {
  const { postslog } = params;
  const blog_post_response = await getBlogPostBySlog(postslog);
  const blogpost = blog_post_response?.data?.[0];

  const title = blogpost?.title || 'Blog Post';
  const description =
    blogpost?.excerpt ||
    blogpost?.matter_content?.slice(0, 160).replace(/[#_*`]/g, '');
  const image = blogpost?.featured_image || `https://${process.env.DOMAIN_NAME}.com/default-image.png`;
  const url = `https://${process.env.DOMAIN_NAME}/blog/post/${postslog}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: blogpost?.created_at,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}

// ✅ Page Component
export default async function Page({ params }) {
  const { postslog } = params;
  const blog_post_response = await getBlogPostBySlog(postslog);
  const blogpost = blog_post_response?.data?.[0];
  const blog_comments = blogpost?.blog_comments || [];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blogpost?.title,
    "author": {
      "@type": "Person",
      "name": process.env.DEFAULT_WRITER,
    },
    "datePublished": blogpost?.created_at,
    "dateModified": blogpost?.updated_at,
    "articleBody": blogpost?.matter_content,
    "publisher": {
      "@type": "Organization",
      "name": `${process.env.WEBSITE_NAME}`,
      "logo": {
        "@type": "ImageObject",
        "url": `https://${process.env.DOMAIN_NAME}/logo.png`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://${process.env.DOMAIN_NAME}/blog/post/${postslog}`,
    },
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="lg:w-[50%] mx-auto p-6 bg-white rounded-lg w-full">
        <article>
          <header className="mb-9">
            <h1 className={`${rowdies.className} text-4xl lg:text-6xl font-extrabold mb-4 text-green-950`}>
              {blogpost?.title}
            </h1>

            <div className="flex gap-4 lg:flex-row flex-col items-center justify-between">
              <div className="w-full flex gap-3">
                <div className="bg-amber-200 text-xs flex items-center justify-center gap-2 lg:max-w-[280px] w-full border border-green-100 shadow-md py-2 px-3 rounded-3xl">
                  <LuNotebookPen />
                  {process.env.DEFAULT_WRITER}
                </div>
                <div className="bg-purple-100 text-xs flex items-center justify-center gap-2 lg:max-w-[280px] w-full border border-green-100 shadow-md py-2 px-3 rounded-3xl">
                  <MdOutlineDateRange />
                  {blogpost?.created_at === blogpost?.updated_at
                    ? new Date(blogpost?.created_at).toDateString()
                    : new Date(blogpost?.updated_at).toDateString()}
                </div>
              </div>

              <p className="bg-green-100 text-xs lg:max-w-[250px] w-full text-center border border-green-100 shadow-md py-2 px-3 rounded-3xl">
                {blogpost?.category}
              </p>
            </div>
          </header>

          <div className="blog-post prose">
            <ReactMarkdown>{blogpost?.matter_content}</ReactMarkdown>
          </div>

          <section className="mb-8 mt-4 w-full space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Comments ({blog_comments.length})
            </h2>
            <div className="flex gap-2.5 flex-col">
              {blog_comments.map((comment, index) => (
                <div className="ml-2" key={index}>
                  <div className="text-green-700 flex gap-1.5 items-center">
                    <FaUser />
                    {comment.name}
                  </div>
                  <p className="ml-4">{comment.comment}</p>
                </div>
              ))}
            </div>
            <BlogCommentForm post_id={blogpost?.post_id} />
          </section>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-600">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blogpost?.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-green-800 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
