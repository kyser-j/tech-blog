import { BlogContentPreviewResolver } from '@/blog-content/utils/blog-content-resolver';
import BlogService from '@/services/blog-service';

const HomePage = () => {
  const blogSlugs = BlogService.getBlogSlugs();

  return (
    <div className='flex flex-col'>
      {blogSlugs.map((slug) => (
        <BlogContentPreviewResolver slug={slug} key={slug} />
      ))}
    </div>
  );
};

export default HomePage;
