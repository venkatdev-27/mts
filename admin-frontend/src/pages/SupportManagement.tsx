import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Mail, Phone, User, MessageSquare, Calendar } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { contactAPI } from '../services/api';
import { ContactMessage } from '../types';

const SupportManagement: React.FC = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setIsLoading(true);
            const data = await contactAPI.getAllMessages();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
            toast.error('Failed to load messages');
        } finally {
            setIsLoading(false);
        }
    };

    const handleMarkAsRead = async (id: string) => {
        try {
            await contactAPI.markAsRead(id);
            fetchMessages();
        } catch (error) {
            console.error('Error marking as read:', error);
            toast.error('Failed to update message status');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        try {
            await contactAPI.deleteMessage(id);
            toast.success('Message deleted successfully!');
            setSelectedMessage(null);
            fetchMessages();
        } catch (error) {
            console.error('Error deleting message:', error);
            toast.error('Failed to delete message');
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden font-sans">
            {/* Left Sidebar - Messages List */}
            <div className="w-full md:w-1/3 lg:w-96 flex flex-col border-r border-slate-700 bg-slate-800/50 backdrop-blur-sm shadow-xl">
                {/* Sidebar Header */}
                <div className="p-6 border-b border-slate-700 z-10 bg-slate-800/80">
                    <div className="flex items-center justify-between mb-4">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="p-2 -ml-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-all duration-300 transform hover:scale-110"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                            Inbox
                        </h1>
                        <div className="w-8"></div> {/* Spacer for alignment */}
                    </div>

                </div>

                {/* Messages List Container */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                            <p className="text-xs text-slate-500">Syncing...</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-700/50">
                            {messages.map((message) => (
                                <button
                                    key={message._id}
                                    onClick={() => {
                                        setSelectedMessage(message);
                                        if (message.status === 'unread') handleMarkAsRead(message._id);
                                    }}
                                    className={`w-full text-left p-5 transition-all duration-200 group relative overflow-hidden
                                        ${selectedMessage?._id === message._id
                                            ? 'bg-blue-600/20 shadow-[inset_4px_0_0_0_#3b82f6]'
                                            : 'hover:bg-slate-700/30 border-l-4 border-transparent'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className={`font-semibold truncate pr-2 ${message.status === 'unread' ? 'text-white' : 'text-slate-300'}`}>
                                            {message.name}
                                        </h3>
                                        <span className="text-xs text-slate-500 whitespace-nowrap">
                                            {new Date(message.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>
                                    <p className={`text-sm truncate mb-1.5 ${message.status === 'unread' ? 'text-slate-200' : 'text-slate-400'}`}>
                                        {message.subject}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs text-slate-500 truncate max-w-[80%]">
                                            {message.email}
                                        </p>
                                        {message.status === 'unread' && (
                                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
                                        )}
                                    </div>
                                </button>
                            ))}
                            {messages.length === 0 && (
                                <div className="py-12 text-center text-slate-500 text-sm">No messages found</div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Right Pane - Message Details */}
            <div className="flex-1 flex flex-col bg-slate-900 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

                {selectedMessage ? (
                    <div className="flex-1 flex flex-col h-full relative z-10">
                        {/* Details Header */}
                        <div className="p-8 border-b border-slate-800 flex justify-between items-start backdrop-blur-sm bg-slate-900/50">
                            <div>
                                <h1 className="text-2xl font-bold text-white mb-2 leading-tight">
                                    {selectedMessage.subject}
                                </h1>
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${selectedMessage.status === 'read'
                                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                        : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                                        }`}>
                                        {selectedMessage.status === 'read' ? 'Read' : 'New'}
                                    </span>
                                    <span className="text-slate-500 text-sm flex items-center">
                                        <Calendar className="w-3.5 h-3.5 mr-1.5" />
                                        {formatDate(selectedMessage.createdAt)}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => handleDelete(selectedMessage._id)}
                                className="group flex items-center gap-2 px-4 py-2 rounded-lg text-red-400 hover:text-white hover:bg-red-500/10 border border-transparent hover:border-red-500/50 transition-all duration-300"
                            >
                                <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                <span className="font-medium">Delete</span>
                            </button>
                        </div>

                        {/* Details Content */}
                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            {/* Sender Info Card */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sender</span>
                                    </div>
                                    <p className="text-lg font-medium text-slate-100 pl-1">{selectedMessage.name}</p>
                                </div>

                                <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</span>
                                    </div>
                                    <p className="text-lg font-medium text-slate-100 pl-1 truncate" title={selectedMessage.email}>{selectedMessage.email}</p>
                                </div>

                                <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</span>
                                    </div>
                                    <p className="text-lg font-medium text-slate-100 pl-1">{selectedMessage.phone}</p>
                                </div>
                            </div>

                            {/* Message Body */}
                            <div className="bg-slate-800/30 rounded-3xl border border-slate-700/50 p-8 shadow-lg">
                                <div className="flex items-center gap-3 mb-6">
                                    <MessageSquare className="w-5 h-5 text-indigo-400" />
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Message Content</h3>
                                </div>
                                <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap">
                                    {selectedMessage.message}
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end gap-3">
                                <button
                                    onClick={() => setSelectedMessage(null)}
                                    className="px-6 py-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all font-medium"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-500 relative z-10">
                        <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                            <MessageSquare className="w-10 h-10 text-slate-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-300 mb-2">No Message Selected</h3>
                        <p className="text-slate-400">Choose a conversation from the left sidebar</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SupportManagement;
