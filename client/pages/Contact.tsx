import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { contactAPI, courseAPI, projectAPI } from '../services/api';
import { useLocation } from 'react-router-dom';
import { defaultUICourses, toUICourses } from '../lib/courseHelpers';

interface ProjectEnquiryState {
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  technologies: string[];
  estimatedTime: string;
}

const Contact: React.FC = () => {
  const location = useLocation();
  const projectEnquiry = (location.state as { projectEnquiry?: ProjectEnquiryState } | null)?.projectEnquiry;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [subjectOptions, setSubjectOptions] = useState<string[]>([]);

  useEffect(() => {
    const loadSubjectOptions = async () => {
      const fallbackCourses = defaultUICourses.map((course) => `Course: ${course.title}`);
      try {
        const [courseData, projectData] = await Promise.all([
          courseAPI.getAllCourses(),
          projectAPI.getAllProjects(),
        ]);

        const normalizedCourses = Array.isArray(courseData) ? toUICourses(courseData).map((course) => `Course: ${course.title}`) : [];
        const rawProjects = Array.isArray(projectData)
          ? projectData
          : Array.isArray(projectData?.projects)
            ? projectData.projects
            : [];
        const normalizedProjects = rawProjects
          .map((project: { title?: string }) => project?.title?.trim())
          .filter((title: string | undefined): title is string => Boolean(title))
          .map((title: string) => `Project: ${title}`);

        const options = [...normalizedCourses, ...normalizedProjects];
        setSubjectOptions(options.length > 0 ? options : fallbackCourses);
      } catch (error) {
        console.error('Error loading contact subject options:', error);
        setSubjectOptions(fallbackCourses);
      }
    };

    loadSubjectOptions();
  }, []);

  useEffect(() => {
    if (!projectEnquiry) return;
    setFormData((prev) => ({
      ...prev,
      subject: prev.subject || `Project: ${projectEnquiry.title}`,
      message:
        prev.message ||
        `Hi Team,\nI am interested in "${projectEnquiry.title}" (${projectEnquiry.category}).\nPlease share detailed plan, timeline, and pricing.\nEstimated timeline shown: ${projectEnquiry.estimatedTime}.`,
    }));
  }, [projectEnquiry]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await Promise.all([
        contactAPI.sendMessage(formData),
        new Promise((resolve) => setTimeout(resolve, 2200)),
      ]);
      toast.success('Message sent successfully.', {
        duration: 2500,
        position: 'top-center'
      });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Sorry, there was an error sending your message. \nPlease try again.', {
        duration: 2500,
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

        {projectEnquiry && (
          <div className="mb-10 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <img src={projectEnquiry.imageUrl} alt={projectEnquiry.title} className="w-full h-56 md:h-full object-cover" />
              <div className="md:col-span-2 p-6">
                <p className="text-xs font-bold uppercase tracking-wide text-primary-600 mb-2">Selected Project Enquiry</p>
                <h2 className="text-2xl font-extrabold text-slate-900">{projectEnquiry.title}</h2>
                <p className="mt-2 text-slate-600">{projectEnquiry.description}</p>
                <div className="mt-4">
                  <p className="text-sm font-semibold text-slate-700 mb-2">Tools / Technologies Used</p>
                  <div className="flex flex-wrap gap-2">
                    {projectEnquiry.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-sm font-bold text-slate-900">
                  Estimated Completion Time: <span className="text-primary-700">{projectEnquiry.estimatedTime}</span>
                </p>
              </div>
            </div>
          </div>
        )}

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
                  <option value="" disabled>Select a course or project</option>
                  {subjectOptions.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
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
                  {isLoading ? 'Sending... (2-3s)' : 'Send Message'}
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
