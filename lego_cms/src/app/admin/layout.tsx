'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavbarAdmin from "@/component/navbar_admin";
import SideBarAdmin from "@/component/sidebar_admin";
import { useAuth } from '@/app/(main)/contexts/AuthContext';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUserSecret } from '@fortawesome/free-solid-svg-icons';

// Import Speakeasy/QR Logic tidak diperlukan di frontend sini, kita panggil API verify

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, isLoading, isAdminUnlocked, unlockAdmin } = useAuth();
    const router = useRouter();
    
    // State untuk Lock Screen
    const [token, setToken] = useState('');
    const [msg, setMsg] = useState('');
    const [verifying, setVerifying] = useState(false);

    // 1. CEK OTORISASI DASAR (Role)
    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                router.push('/login'); // Belum login -> tendang ke login
            } else if (user.role !== 'admin') {
                router.push('/'); // Bukan admin -> tendang ke home
            }
        }
    }, [user, isLoading, router]);

    // 2. FUNGSI VERIFIKASI 2FA (Dipanggil di Lock Screen)
    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setVerifying(true);
        setMsg('');

        try {
            const res = await fetch('http://localhost:5000/api/verify-2fa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user?.id, token })
            });

            const data = await res.json();

            if (res.ok && data.isValid) {
                unlockAdmin(); // BUKA GERBANG!
            } else {
                setMsg('Invalid Token / Code Salah');
            }
        } catch (error) {
            setMsg('Error connection');
        } finally {
            setVerifying(false);
        }
    };
    if (isLoading) {
        return (
            <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
                <Spinner animation="border" />
            </div>
        );
    }
    if (!user || user.role !== 'admin') {
        return null; 
    }
    if (!isAdminUnlocked) {
        return (
            <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
                <Card className="shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: '400px', width: '100%' }}>
                    <Card.Body className="text-center">
                        <div className="mb-4 text-warning">
                            <FontAwesomeIcon icon={faUserSecret} size="3x" />
                        </div>
                        <h3 className="fw-bold mb-2">Admin Locked</h3>
                        <p className="text-muted small mb-4">
                            For security, please enter your 2FA code to access the dashboard directly.
                        </p>

                        {msg && <Alert variant="danger" className="py-2 small">{msg}</Alert>}

                        <Form onSubmit={handleVerify}>
                            <Form.Group className="mb-4">
                                <Form.Control 
                                    type="text" 
                                    placeholder="000000" 
                                    className="text-center fs-2 fw-bold letter-spacing-2"
                                    maxLength={6}
                                    value={token}
                                    onChange={(e) => setToken(e.target.value.replace(/[^0-9]/g, ''))}
                                    autoFocus
                                    style={{ letterSpacing: '0.5rem' }}
                                />
                            </Form.Group>
                            <Button 
                                variant="dark" 
                                type="submit" 
                                className="w-100 py-2 fw-bold"
                                disabled={token.length < 6 || verifying}
                            >
                                {verifying ? <Spinner size="sm" animation="border"/> : 'Unlock Dashboard'}
                            </Button>
                        </Form>
                        
                        <div className="mt-4 pt-3 border-top">
                            <Button variant="link" className="text-muted text-decoration-none" onClick={() => router.push('/')}>
                                ← Back to Home
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }
    return (
        <>
            <NavbarAdmin/>
            <SideBarAdmin>
                {children}
            </SideBarAdmin>   
        </> 
    );
}