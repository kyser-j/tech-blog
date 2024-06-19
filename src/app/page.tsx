import BlogPreview from '@/components/blogs/blog-preview';
import BlogService from '@/services/blog-service';

const HomePage = () => {
  const blogSlugs = BlogService.getBlogSlugs();

  return (
    <div className='flex flex-col'>
      {blogSlugs.map((slug) => (
        <BlogPreview blogSlug={slug} key={slug} />
      ))}
    </div>
  );
};

export default HomePage;
