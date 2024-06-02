import BlogService from '@/services/blog-service';
import ReactMarkdown from 'react-markdown';

export async function generateStaticParams() {
  const blogSlugs = BlogService.getBlogSlugs();

  return blogSlugs.map((slug) => ({ slug }));
}

const BlogPage = async ({ params: { slug } }: { params: { slug: string } }) => {
  const blogContent = await BlogService.getBlogBySlug(slug);

  return (
    <main>
      <ReactMarkdown>{blogContent.title}</ReactMarkdown>
      <ReactMarkdown>{blogContent.content}</ReactMarkdown>
    </main>
  );
};

export default BlogPage;
