export async function generateMetadata(blog_post_response) {
   
    const blogpost = blog_post_response.data[0]
  
    return {
      title: blogpost.title,
      description: blogpost.excerpt || blogpost.matter_content.slice(0, 150),
      openGraph: {
        title: blogpost.title,
        description: blogpost.excerpt || blogpost.matter_content.slice(0, 150),
        type: 'article',
        url: `https://yourdomain.com/blog/${params.post_slog}`,
        
      },
      twitter: {
        card: 'summary_large_image',
        title: blogpost.title,
        description: blogpost.excerpt || blogpost.matter_content.slice(0, 150),
       
      },
    }
  }