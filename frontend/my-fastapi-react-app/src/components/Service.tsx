import React, { useState, useEffect } from 'react';

interface Service {
  id: number;
  name: string;
  description: string;
}

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:8000/services/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Map the data to Service interface directly
        const parsedServices: Service[] = data.map((item: any) => ({
          id: item[0],
          name: item[1],
          description: item[2]
        }));
        setServices(parsedServices);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 h-screen">
      <h2 className="text-2xl font-bold mb-4 border-b-2">Services</h2>
      <ul>
        {services.map(service => (
          <li key={service.id} className="mb-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-bold">{service.name}</h3>
              <p className="mt-2">{service.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Services;
