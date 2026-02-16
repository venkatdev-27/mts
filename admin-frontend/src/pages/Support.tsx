import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Mail, Phone, Trash2, CheckCircle, Clock } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface ContactMessage {
    _id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    status: 'unread' | 'read';
    createdAt: string;
}

const Support: React.FC = () => {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = async () => {
        try {
            const response = await api.get('/contact');
            setMessages(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching messages", error);
            toast.error("Failed to fetch messages");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const markAsRead = async (id: string) => {
        try {
            await api.patch(`/contact/${id}/read`);
            setMessages(messages.map(msg =>
                msg._id === id ? { ...msg, status: 'read' } : msg
            ));
            toast.success("Marked as read");
        } catch (error) {
            console.error("Error updating message", error);
            toast.error("Failed to update status");
        }
    };

    const deleteMessage = async (id: string) => {
        if (confirm("Are you sure you want to delete this message?")) {
            try {
                await api.delete(`/contact/${id}`);
                setMessages(messages.filter(msg => msg._id !== id));
                toast.success("Message deleted");
            } catch (error) {
                console.error("Error deleting message", error);
                toast.error("Failed to delete message");
            }
        }
    };

    return (
        <div>
            <Toaster position="top-right" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Support Messages</h1>
                    <p className="text-slate-500 mt-1">Manage inquiries from Contact Us form</p>
                </div>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-12 text-slate-500">Loading messages...</div>
                ) : messages.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 bg-white rounded-2xl border border-slate-200">
                        No messages found.
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div key={msg._id} className={`bg-white rounded-xl shadow-sm border ${msg.status === 'unread' ? 'border-teal-200 bg-teal-50/30' : 'border-slate-200'} p-6 transition-all hover:shadow-md`}>
                            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-lg font-bold text-slate-900">{msg.subject}</h3>
                                        {msg.status === 'unread' && (
                                            <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs font-bold rounded-full uppercase tracking-wide">New</span>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                        <span className="flex items-center gap-1.5">
                                            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs">
                                                {msg.name.charAt(0)}
                                            </div>
                                            {msg.name}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Mail className="w-4 h-4" /> {msg.email}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Phone className="w-4 h-4" /> {msg.phone}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4" /> {new Date(msg.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    {msg.status === 'unread' && (
                                        <button
                                            onClick={() => markAsRead(msg._id)}
                                            className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                                            title="Mark as Read"
                                        >
                                            <CheckCircle className="w-5 h-5" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteMessage(msg._id)}
                                        className="p-2 text-red-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors"
                                        title="Delete Message"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg text-slate-700 text-sm leading-relaxed border border-slate-100">
                                {msg.message}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Support;
