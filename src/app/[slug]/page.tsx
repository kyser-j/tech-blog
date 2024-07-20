import { BlogContentResolver } from '@/blog-content/utils/blog-content-resolver';
import BlogService from '@/services/blog-service';

export async function generateStaticParams() {
  const blogSlugs = BlogService.getBlogSlugs();

  return blogSlugs.map((slug) => ({ slug }));
}

const BlogPage = async ({ params: { slug } }: { params: { slug: string } }) => {
  return (
    <main className='max-w-6xl mx-auto mt-12'>
      <BlogContentResolver slug={slug} />
    </main>
  );
};

export default BlogPage;
