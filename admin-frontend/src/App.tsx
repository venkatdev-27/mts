import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout, { ProtectedRoute } from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Registrations from './pages/Registrations';
import Projects from './pages/Projects';
import Support from './pages/Support';
import Login from './pages/Login';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="/" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                    <Route index element={<Dashboard />} />
                    <Route path="courses" element={<Courses />} />
                    <Route path="registrations" element={<Registrations />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="support" element={<Support />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
