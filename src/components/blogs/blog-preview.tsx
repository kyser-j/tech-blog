import BlogService from '@/services/blog-service';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

interface Props {
  blogSlug: string;
}

const BlogPreview = async ({ blogSlug }: Props) => {
  const blogContent = await BlogService.getBlogBySlug(blogSlug);

  return (
    <Link href={blogSlug}>
      <div className='hover:rounded flex items-center gap-8 px-20 py-10 border-b border-b-stone-300 hover:shadow'>
        <Image alt='image' src={`/images/${blogContent.headerImage}`} width={200} height={200} />
        <ReactMarkdown>{blogContent.title}</ReactMarkdown>
      </div>
    </Link>
  );
};

export default BlogPreview;
