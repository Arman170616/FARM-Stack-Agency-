import React, { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  client_name: string;
  testimonial: string;
}

const Testimonial: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/testimonials/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setTestimonials(data))
      .catch(error => {
        console.error('Error fetching testimonials:', error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 h-screen">
      <h2>Testimonials</h2>
      <ul>
        {testimonials.map(testimonial => (
          <li key={testimonial.id}>
            <strong>{testimonial.client_name}</strong>: {testimonial.testimonial}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Testimonial;
