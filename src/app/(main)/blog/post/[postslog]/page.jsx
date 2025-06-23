import { getBlogPostBySlog } from '@/lib/getBlogPostBySlog';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Rowdies } from 'next/font/google';
import { MdOutlineDateRange } from 'react-icons/md';
import { LuNotebookPen } from 'react-icons/lu';
import BlogCommentForm from '@/app/(main)/components/BlogCommentForm';
import { FaUser } from 'react-icons/fa';

// Load font
const rowdies = Rowdies({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

export default async function Page({ params }) {
  const { postslog } = params;
  const blog_post_response = await getBlogPostBySlog(postslog);
  const blogpost = blog_post_response?.data?.[0];
  const blog_comments = blogpost?.blog_comments || [];

  return (
    <section>
      <div className="lg:w-[50%] mx-auto p-6 bg-white rounded-lg w-full">
        <article>
          <header className="mb-9">
            <h1 className={`${rowdies.className} text-4xl lg:text-6xl font-extrabold mb-4 text-green-950`}>
              {blogpost.title}
            </h1>

            <div className="flex gap-4 lg:flex-row flex-col items-center justify-between">
              <div className="w-full flex gap-3">
                <div className="bg-amber-200 text-xs flex items-center justify-center gap-2 lg:max-w-[280px] w-full text-grey-200 text-center border border-green-100 shadow-md py-2 px-3 rounded-3xl">
                  <LuNotebookPen />
                  {process.env.DEFAULT_WRITER}
                </div>
                <div className="bg-purple-100 text-xs flex items-center justify-center gap-2 lg:max-w-[280px] w-full text-grey-200 text-center border border-green-100 shadow-md py-2 px-3 rounded-3xl">
                  <MdOutlineDateRange />
                  {blogpost.created_at === blogpost.updated_at
                    ? new Date(blogpost.created_at).toDateString()
                    : new Date(blogpost.updated_at).toDateString()}
                </div>
              </div>

              <p className="bg-green-100 text-xs lg:max-w-[250px] w-full text-grey-200 text-center border border-green-100 shadow-md py-2 px-3 rounded-3xl">
                {blogpost.category}
              </p>
            </div>
          </header>

          <div className="blog-post">
            <ReactMarkdown>{blogpost.matter_content}</ReactMarkdown>
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
            <BlogCommentForm post_id={blogpost.post_id} />
          </section>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-600">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blogpost.tags.map((tag) => (
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
