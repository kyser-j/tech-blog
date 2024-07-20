import Image from 'next/image';
import Link from 'next/link';

interface Props {
  imageName: string;
  previewContent: string;
  slug: string;
  title: string;
}

const BlogPreview = async ({ imageName, previewContent, slug, title }: Props) => {
  return (
    <Link href={slug}>
      <div className='hover:rounded flex items-center gap-8 px-20 py-10 border-b border-b-stone-300 hover:shadow'>
        <Image alt='image' src={`/images/${imageName}`} width={200} height={200} />
        <div>
          <h2 className='text-lg font-semibold'>{title}</h2>
          <p>{previewContent}</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogPreview;
