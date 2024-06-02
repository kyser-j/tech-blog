import BlogContent from '@/models/blog.content';
import { promises as fs } from 'fs';

const getBlogBySlug = async (slug: string) => {
  const content = await fs.readFile(process.cwd() + `/src/blog-content/${slug}/content.txt`, 'utf8');
  const preview = await fs.readFile(process.cwd() + `/src/blog-content/${slug}/preview.txt`, 'utf8');
  const title = await fs.readFile(process.cwd() + `/src/blog-content/${slug}/title.txt`, 'utf8');

  const blogContent: BlogContent = {
    title,
    content,
    contentPreview: preview,
  };

  return blogContent;
};

const getBlogSlugs = () => {
  return ['about-the-blog'];
};

const BlogService = {
  getBlogBySlug,
  getBlogSlugs,
};

export default BlogService;
