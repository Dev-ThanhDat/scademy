const LoadingLesson = () => {
  return (
    <section className=' h-full grid lg:grid-cols-[2fr,1fr] gap-5'>
      <div className='flex flex-col gap-5'>
        <div className='aspect-video skeleton'></div>
        <div className='h-10 skeleton'></div>
        <div className='flex items-center gap-3'>
          <div className='size-10 rounded-md skeleton'></div>
          <div className='size-10 rounded-md skeleton'></div>
        </div>
        <div className='h-5 skeleton'></div>
      </div>
      <div className='flex flex-col gap-3'>
        <div className='skeleton w-full h-10 rounded-lg'></div>
        <div className='skeleton w-full h-10 rounded-lg'></div>
        <div className='skeleton w-full h-10 rounded-lg'></div>
      </div>
    </section>
  );
};

export default LoadingLesson;
