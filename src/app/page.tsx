import BlogPreview from '@/components/blogs/blog-preview';
import BlogService from '@/services/blog-service';
import Link from 'next/link';

const HomePage = () => {
  const blogSlugs = BlogService.getBlogSlugs();

  return (
    <>
      {blogSlugs.map((slug) => (
        <Link href={slug} key={slug}>
          <BlogPreview blogSlug={slug} />
        </Link>
      ))}
    </>
  );
};

export default HomePage;
