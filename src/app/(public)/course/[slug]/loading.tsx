const LoadingCourseDetail = () => {
  return (
    <section className='grid lg:grid-cols-[2fr,1fr] lg:px-[30px] gap-12 h-full'>
      <div className='flex flex-col lg:gap-[50px] gap-[25px] lg:mt-5 order-2 lg:order-none'>
        <div>
          <div className='h-10 w-full skeleton mb-4 '></div>
          <div className='h-5 w-full skeleton'></div>
        </div>
        <div>
          <div className='h-7 max-w-[200px] skeleton'></div>
          <div className='mt-3 grid md:grid-cols-2 grid-cols-1 gap-6'>
            <div className='h-4 w-full skeleton'></div>
            <div className='h-4 w-full skeleton'></div>
            <div className='h-4 w-full skeleton'></div>
            <div className='h-4 w-full skeleton'></div>
          </div>
        </div>
        <div>
          <div className='h-7 max-w-[200px] skeleton'></div>
          <div className='mt-3 flex flex-col gap-1'>
            <div className='h-8 w-full skeleton'></div>
            <div className='h-8 w-full skeleton'></div>
            <div className='h-8 w-full skeleton'></div>
            <div className='h-8 w-full skeleton'></div>
          </div>
        </div>
        <div>
          <div className='h-7 max-w-[200px] skeleton'></div>
          <div className='mt-3 flex flex-col gap-1'>
            <div className='h-4 w-full skeleton'></div>
            <div className='h-4 w-full skeleton'></div>
            <div className='h-4 w-full skeleton'></div>
            <div className='h-4 w-full skeleton'></div>
          </div>
        </div>
      </div>
      <div className='lg:mt-3 shrink-0 order-1 lg:order-none'>
        <div className='h-[240px] mb-5 w-full skeleton'></div>
        <div className='h-10 mb-4 w-full skeleton'></div>
        <div className='h-7 mb-6 w-[200px] mx-auto skeleton'></div>
        <div>
          <div className='h-4 mb-2 w-full skeleton'></div>
          <div className='h-4 w-full skeleton'></div>
        </div>
      </div>
    </section>
  );
};

export default LoadingCourseDetail;
