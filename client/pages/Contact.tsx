import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { contactAPI } from '../services/api';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus(null);

    try {
      await contactAPI.sendMessage(formData);
      setSubmitStatus('success');
      toast.success('Thank you for your message! \nWe will get back to you soon.', {
        duration: 2000,
        position: 'top-center'
      });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
      toast.error('Sorry, there was an error sending your message. \nPlease try again.', {
        duration: 2000,
        position: 'top-center'
      });
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Get in Touch</h1>
          <p className="mt-4 text-xl text-gray-500">
            Have questions about a project? Want to enroll? Contact us today!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 bg-white shadow-lg rounded-2xl p-8 h-fit">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-primary-600 mt-1" />
                <div className="ml-4">
                  <h4 className="text-base font-medium text-gray-900">Our Office</h4>
                  <p className="mt-1 text-gray-500">
                    Gandhi nagar,vijayawada,520012<br />
                    <br />
                    andhra pradesh, India
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-primary-600" />
                <div className="ml-4">
                  <h4 className="text-base font-medium text-gray-900">Phone</h4>
                  <p className="mt-1 text-gray-500">+91 6309616945</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-primary-600" />
                <div className="ml-4">
                  <h4 className="text-base font-medium text-gray-900">Email</h4>
                  <p className="mt-1 text-gray-500">info.maruthitechsolutions.com</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <h4 className="text-base font-medium text-gray-900 mb-4">Office Hours</h4>
              <p className="text-gray-500 text-sm">
                Monday - Saturday: 9:00 AM - 6:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white shadow-lg rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2 md:col-span-1">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-3"
                  placeholder="John Doe"
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-3"
                  placeholder="+91 9876543210"
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-3"
                  placeholder="john@example.com"
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                <select
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-3 bg-white"
                >
                  <option value="" disabled>Select a topic</option>
                  <option value="Project Enquiry">Project Enquiry</option>
                  <option value="Course Training">Course Training</option>
                  <option value="IEEE Project">IEEE Project</option>
                  <option value="General Query">General Query</option>
                </select>
              </div>
              <div className="col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-3"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <div className="col-span-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                  {!isLoading && <Send className="ml-2 h-5 w-5" />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;