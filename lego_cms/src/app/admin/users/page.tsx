'use client';

import { useState, useEffect } from 'react';
import { Spinner, Badge, Button } from 'react-bootstrap';

interface User {
    _id: string;
    username: string;
    email: string;
    role: 'user' | 'admin';
    isActive: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${API_URL}/users`);
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRoleChange = async (id: string, newRole: 'user' | 'admin') => {
        if(!confirm(`Are you sure you want to make this user ${newRole}?`)) return;
        try {
            await fetch(`${API_URL}/users/${id}/role`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: newRole })
            });
            fetchUsers();
        } catch(err) { alert('Failed to update role'); }
    };

    const handleStatusChange = async (id: string, newStatus: boolean) => {
        const action = newStatus ? "Activate" : "Ban";
        if(!confirm(`Are you sure you want to ${action} this user?`)) return;
        try {
            await fetch(`${API_URL}/users/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isActive: newStatus })
            });
            fetchUsers();
        } catch(err) { alert('Failed to update status'); }
    };

    const handleDelete = async (id: string) => {
        if(!confirm('Are you sure? This action cannot be undone.')) return;
        try {
            await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
            fetchUsers();
        } catch(err) { alert('Failed to delete user'); }
    };

    if (loading) return <div className="text-center p-5"><Spinner animation="border"/></div>;

    return (
        <div className="container-fluid py-4">
            <h2 className="mb-4">User Management</h2>
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th className="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="fw-semibold">{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Badge bg={user.role === 'admin' ? 'warning' : 'secondary'} text={user.role === 'admin' ? 'dark' : 'white'}>
                                            {user.role.toUpperCase()}
                                        </Badge>
                                    </td>
                                    <td>
                                        <Badge bg={user.isActive ? 'success' : 'danger'}>
                                            {user.isActive ? 'Active' : 'Banned'}
                                        </Badge>
                                    </td>
                                    <td className="text-end">
                                        {}
                                        {user.role === 'user' ? (
                                            <Button size="sm" variant="outline-success" className="me-1" title="Make Admin" onClick={() => handleRoleChange(user._id, 'admin')}>
                                                <i className="bi bi-shield-lock"></i> Admin
                                            </Button>
                                        ) : (
                                            <Button size="sm" variant="outline-secondary" className="me-1" title="Demote to User" onClick={() => handleRoleChange(user._id, 'user')}>
                                                <i className="bi bi-person"></i> User
                                            </Button>
                                        )}

                                        {}
                                        {user.isActive ? (
                                            <Button size="sm" variant="warning" className="me-1" title="Ban User" onClick={() => handleStatusChange(user._id, false)}>
                                                <i className="bi bi-slash-circle"></i> Ban
                                            </Button>
                                        ) : (
                                            <Button size="sm" variant="success" className="me-1" title="Activate User" onClick={() => handleStatusChange(user._id, true)}>
                                                <i className="bi bi-check-circle"></i> Active
                                            </Button>
                                        )}

                                        {}
                                        <Button size="sm" variant="danger" title="Delete User" onClick={() => handleDelete(user._id)}>
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    );
}