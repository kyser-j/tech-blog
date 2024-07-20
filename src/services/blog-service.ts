import { EnsureMessageDeliveryInDistributedSystemSlug } from '@/blog-content/ensure-message-delivery-event-driven-system/ensure-message-delivery-event-driven-system';
import BlogContent from '@/models/blog.content';
import { promises as fs } from 'fs';

const getBlogBySlug = async (slug: string) => {
  const content = await fs.readFile(process.cwd() + `/src/blog-content/${slug}/content.md`, 'utf8');
  const headerImage = await fs.readFile(process.cwd() + `/src/blog-content/${slug}/image.txt`, 'utf8');
  const title = await fs.readFile(process.cwd() + `/src/blog-content/${slug}/title.md`, 'utf8');

  const blogContent: BlogContent = {
    title,
    content,
    headerImage,
  };

  return blogContent;
};

const getBlogSlugs = () => {
  return [EnsureMessageDeliveryInDistributedSystemSlug];
};

const BlogService = {
  getBlogBySlug,
  getBlogSlugs,
};

export default BlogService;
