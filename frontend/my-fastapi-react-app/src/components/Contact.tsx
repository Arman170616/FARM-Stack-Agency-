import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you can handle form submission, for example, sending data to a server
    console.log(formData);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-400" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-400" />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block mb-2">Message:</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-400" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
      </form>
    </div>
  );
}

export default Contact;
