const LoadingStudy = () => {
  return (
    <section className=' h-[calc(100vh-var(--header-height))]'>
      <div className='mt-4 mb-6 h-10 max-w-[250px] skeleton'></div>
      <div className='h-full max-w-[800px] w-full mx-auto lg:mt-10 flex flex-col gap-6'>
        <div className='skeleton h-[200px] lg:h-[150px] w-full rounded-2xl'></div>
        <div className='skeleton h-[200px] lg:h-[150px] w-full rounded-2xl'></div>
        <div className='skeleton h-[200px] lg:h-[150px] w-full rounded-2xl'></div>
        <div className='skeleton h-[200px] lg:h-[150px] w-full rounded-2xl'></div>
      </div>
    </section>
  );
};

export default LoadingStudy;
