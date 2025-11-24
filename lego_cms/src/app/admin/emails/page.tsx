'use client';

import { useState, useEffect } from 'react';
import { Spinner, Button } from 'react-bootstrap';

interface User {
    _id: string;
    email: string;
    username: string;
    createdAt: string;
}

export default function EmailsPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/users');
                const data = await res.json();
                setUsers(data);
            } catch (error) {
                console.error("Gagal mengambil data email:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmails();
    }, []);

    const handleSendMail = (email: string) => {
        window.location.href = `mailto:${email}`;
    };

    if (loading) return <div className="p-5 text-center"><Spinner animation="border" /></div>;

    return (
        <div className="container-fluid py-4">
            <h2 className="mb-4">Registered Emails</h2>
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Username</th>
                                    <th>Email Address</th>
                                    <th>Join Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user._id}>
                                        <td>{index + 1}</td>
                                        <td className="fw-semibold">{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {user.createdAt 
                                                ? new Date(user.createdAt).toLocaleDateString('id-ID', {
                                                    day: 'numeric', month: 'long', year: 'numeric'
                                                  })
                                                : '-'
                                            }
                                        </td>
                                        <td>
                                            <Button 
                                                variant="outline-primary" 
                                                size="sm"
                                                onClick={() => handleSendMail(user.email)}
                                            >
                                                <i className="bi bi-envelope-paper me-2"></i> Send Mail
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {users.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="text-center text-muted py-4">
                                            No registered emails found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}