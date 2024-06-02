import BlogService from '@/services/blog-service';
import ReactMarkdown from 'react-markdown';

interface Props {
  blogSlug: string;
}

const BlogPreview = async ({ blogSlug }: Props) => {
  const blogContent = await BlogService.getBlogBySlug(blogSlug);

  return (
    <div className='flex flex-col items-center border-b border-b-slate-200 py-8'>
      <div className='hover:shadow p-10 rounded'>
        <ReactMarkdown>{blogContent.title}</ReactMarkdown>
        <ReactMarkdown>{blogContent.contentPreview}</ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogPreview;
