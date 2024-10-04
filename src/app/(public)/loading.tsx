const LoadingHome = () => {
  return (
    <section className=' h-[calc(100vh-var(--header-height))]'>
      <div className='mt-4 mb-6 h-10 max-w-[250px] skeleton'></div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6 lg:px-[30px] h-full'>
        <div className='mt-4 mb-6 lg:h-[290px] h-[350px] w-full skeleton rounded-2xl'></div>
        <div className='mt-4 mb-6 lg:h-[290px] h-[350px] w-full skeleton rounded-2xl'></div>
        <div className='mt-4 mb-6 lg:h-[290px] h-[350px] w-full skeleton rounded-2xl'></div>
        <div className='mt-4 mb-6 lg:h-[290px] h-[350px] w-full skeleton rounded-2xl'></div>
        <div className='mt-4 mb-6 lg:h-[290px] h-[350px] w-full skeleton rounded-2xl'></div>
        <div className='mt-4 mb-6 lg:h-[290px] h-[350px] w-full skeleton rounded-2xl'></div>
        <div className='mt-4 mb-6 lg:h-[290px] h-[350px] w-full skeleton rounded-2xl'></div>
        <div className='mt-4 mb-6 lg:h-[290px] h-[350px] w-full skeleton rounded-2xl'></div>
      </div>
    </section>
  );
};

export default LoadingHome;
