import React, { useState, useEffect } from 'react';

interface Portfolio {
  id: number;
  project_name: string;
  client_name: string;
  description: string;
}

const Portfolio: React.FC = () => {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch('http://localhost:8000/portfolio/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const parsedPortfolio: Portfolio[] = data.map((item: any) => ({
          id: item[0], 
          project_name: item[1], 
          client_name: item[2], 
          description: item[3] 
        }));
        setPortfolio(parsedPortfolio);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      }
    };

    fetchPortfolio();
  }, []);

  return (
    <div className='container mx-auto px-4 py-8 h-screen'>
      <h2 className="text-2xl font-bold mb-4 border-b-2">Portfolio</h2>
      <ul>
        {portfolio.map(project => (
          <div key={project.id} className="mb-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-bold">{project.project_name}</h3>
              <p className="mt-2">{project.client_name}</p>
              <p className="mt-2">{project.description}</p>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Portfolio;
