const BlogTitle = ({ title }: { title: string }) => {
  return (
    <div className='flex justify-center mb-12'>
      <h1 className='text-3xl font-bold'>{title}</h1>
    </div>
  );
};

export default BlogTitle;
