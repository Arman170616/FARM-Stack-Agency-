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
          id: item[0], // item[0] is the first column in the database table [id, project_name, client_name, description
          project_name: item[1], // item[1] is the second column in the database table [id, project_name, client_name, description
          client_name: item[2], // item[2] is the third column in the database table [id, project_name, client_name, description
          description: item[3] // item[3] is the fourth column in the database table [id, project_name, client_name, description
        }));
        setPortfolio(parsedPortfolio);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      }
    };

    fetchPortfolio();
  }, []);

  return (
    <div className='container mx-auto px-4 py-8'>
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
