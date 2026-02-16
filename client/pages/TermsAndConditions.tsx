import React, { useEffect } from 'react';
import { ArrowLeft, ShieldCheck, FileText, AlertCircle, Users, GraduationCap, XCircle, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsAndConditions: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const terms = [
        {
            icon: DollarSign,
            title: "Non-Refundable Policy",
            description: "All fees paid for courses, training programs, and academic projects are strictly non-refundable. Once a payment is processed, no requests for refunds will be entertained under any circumstances."
        },
        {
            icon: Users,
            title: "Non-Transferable Registration",
            description: "Registrations are personal to the individual who enrolled. Course seats or project allocations cannot be transferred, exchanged, or sold to another person."
        },
        {
            icon: GraduationCap,
            title: "Certification Requirements",
            description: "Certificates of completion are not guaranteed upon enrollment. They are awarded only after the successful completion of all required assessments, assignments, and minimum attendance criteria."
        },
        {
            icon: FileText,
            title: "Curriculum Updates",
            description: "MTS reserves the right to update, modify, or replace course content and project specifications at any time to ensure they remain relevant to current industry standards."
        },
        {
            icon: ShieldCheck,
            title: "Intellectual Property",
            description: "All training materials, project source codes, and documentation provided are for personal educational use only. Commercial resale or unauthorized distribution is strictly prohibited."
        },
        {
            icon: AlertCircle,
            title: "Code of Conduct",
            description: "We maintain a professional learning environment. Any form of harassment, misconduct, or disruption may result in immediate termination of training without a refund."
        },
        {
            icon: XCircle,
            title: "Project Support Limitations",
            description: "Support for academic projects is provided for the duration of the agreed term. Extended support or modifications beyond the initial scope may incur additional charges."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto">
                {/* Back Link */}
                <Link to="/register" className="inline-flex items-center text-slate-600 hover:text-primary-600 transition-colors mb-8 group">
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Registration
                </Link>

                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-full mb-6 text-primary-600">
                        <FileText className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Terms and Conditions</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Please read these terms carefully before enrolling. By registering for any course or project at Maruthi Tech Solutions (MTS), you agree to be bound by the following policies.
                    </p>
                </div>

                {/* Terms List */}
                <div className="space-y-6">
                    {terms.map((term, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sm:p-8 hover:shadow-md transition-shadow duration-300 flex flex-col sm:flex-row gap-6">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700">
                                    <term.icon className="w-6 h-6" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{term.title}</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {term.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Note */}
                <div className="mt-12 text-center text-slate-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Maruthi Tech Solutions. All rights reserved.</p>
                    <p className="mt-2">For any queries regarding these terms, please contact our support team.</p>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
