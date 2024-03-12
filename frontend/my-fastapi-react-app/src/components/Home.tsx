import React from 'react';

const Home: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-orange-100">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              The future of frontend development
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-700">
              The only platform you need to build, deploy, and scale your web apps. Sign up to get notified when we
              launch.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default Home;
