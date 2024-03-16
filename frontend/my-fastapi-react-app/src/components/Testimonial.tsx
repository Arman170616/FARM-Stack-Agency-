import React, { useState, useEffect } from 'react';

const defaultAvatarUrl = 'https://www.gravatar.com/avatar/000?d=mp';

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('http://localhost:8000/testimonials/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTestimonials(data);
        console.log(data);
      } catch (error) {
        setError('Error fetching testimonials: ' + error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="h-screen py-12 md:py-24 lg:py-32">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Customer Testimonials</h2>
          <p className="mx-auto max-w-3xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            See what our customers are saying about their experience with our platform.
          </p>
        </div>
        <div className="grid w-full grid-cols-1 items-center justify-center gap-6 lg:grid-cols-3 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <img
                  src={testimonial.avatar || defaultAvatarUrl}
                  alt={testimonial.client_name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-bold">{testimonial[1]}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{testimonial[2]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
