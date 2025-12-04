"use client"
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { useState, useEffect, useCallback } from 'react';
import { ApiError } from 'next/dist/server/api-utils';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend
);

export default function TrendsPage() {
    const now = new Date();
    
    const [selectedYear, setSelectedYear] = useState(now.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1); 
    
    const [stats, setStats] = useState({ totalStock: 0, totalUsers: 0, totalReviews: 0 });
    const [daysLabels, setDaysLabels] = useState<number[]>([]); 
    
    const [lineChartData, setLineChartData] = useState({
        users: [],
        products: []
    });
    const [favChartData, setFavChartData] = useState<{labels: string[], data: number[]}>({
        labels: [], data: []
    });

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const fetchStats = useCallback(async () => {
        try {
            const res = await fetch(`${API_URL}/stats?year=${selectedYear}&month=${selectedMonth}&t=${new Date().getTime()}`);
            const data = await res.json();
            
            setStats({
                totalStock: data.totalStock,
                totalUsers: data.totalUsers,
                totalReviews: data.totalReviews
            });

            if (data.meta && data.meta.daysInMonth) {
                const days = Array.from({length: data.meta.daysInMonth}, (_, i) => i + 1);
                setDaysLabels(days);
            }

            if(data.chartData) {
                setLineChartData({
                    users: data.chartData.users,
                    products: data.chartData.products
                });
            }

            if(data.favStats) {
                setFavChartData({
                    labels: data.favStats.labels,
                    data: data.favStats.data
                });
            }

        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    }, [selectedYear, selectedMonth]);

    useEffect(() => {
        fetchStats();
        const intervalId = setInterval(fetchStats, 5000); 
        return () => clearInterval(intervalId);
    }, [fetchStats]);

    const monthName = new Date(selectedYear, selectedMonth - 1).toLocaleString('default', { month: 'long' });

    const productDataConfig = {
        labels: daysLabels,
        datasets: [{
            label: `Products Added (${monthName} ${selectedYear})`,
            data: lineChartData.products,
            borderColor: 'rgb(255, 193, 7)',
            backgroundColor: 'rgba(255, 193, 7, 0.5)',
            tension: 0.4
        }],
    };

    const userDataConfig = {
        labels: daysLabels,
        datasets: [{
            label: `New Users (${monthName} ${selectedYear})`,
            data: lineChartData.users,
            borderColor: 'rgb(13, 110, 253)',
            backgroundColor: 'rgba(13, 110, 253, 0.5)',
            tension: 0.4
        }],
    };

    const favBarConfig = {
        labels: favChartData.labels.length > 0 ? favChartData.labels : ['No Data'],
        datasets: [{
            label: 'Favorites Count',
            data: favChartData.data.length > 0 ? favChartData.data : [0],
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
            borderRadius: 5,
        }]
    };

    const years = Array.from({length: 5}, (_, i) => now.getFullYear() - i);
    const months = [
        { val: 1, name: 'January' }, { val: 2, name: 'February' }, { val: 3, name: 'March' },
        { val: 4, name: 'April' }, { val: 5, name: 'May' }, { val: 6, name: 'June' },
        { val: 7, name: 'July' }, { val: 8, name: 'August' }, { val: 9, name: 'September' },
        { val: 10, name: 'October' }, { val: 11, name: 'November' }, { val: 12, name: 'December' }
    ];

    return (
        <div className="container-fluid py-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
                <div>
                    <h2>Dashboard Trends</h2>
                    <div className="text-muted small">
                        <i className="bi bi-broadcast me-1 text-danger"></i> 
                        Real-time Data: <strong>Daily</strong> ({monthName} {selectedYear})
                    </div>
                </div>
                
                <div className="d-flex align-items-center gap-2 bg-white p-2 rounded shadow-sm border">
                    <label className="fw-bold small text-muted mb-0">Period:</label>
                    
                    <select 
                        className="form-select form-select-sm w-auto border-0 bg-light fw-semibold" 
                        value={selectedMonth} 
                        onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    >
                        {months.map(m => (
                            <option key={m.val} value={m.val}>{m.name}</option>
                        ))}
                    </select>

                    <select 
                        className="form-select form-select-sm w-auto border-0 bg-light fw-semibold" 
                        value={selectedYear} 
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                    >
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row g-4 mb-4">
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 h-100" style={{ borderLeft: '5px solid #0d6efd' }}>
                        <div className="card-body">
                            <h6 className="text-muted fw-bold">TOTAL USERS</h6>
                            <h2 className="fw-bold mb-0">{stats.totalUsers.toLocaleString()}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 h-100" style={{ borderLeft: '5px solid #ffc107' }}>
                        <div className="card-body">
                            <h6 className="text-muted fw-bold">TOTAL STOCK</h6>
                            <h2 className="fw-bold mb-0">{stats.totalStock.toLocaleString()}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 h-100" style={{ borderLeft: '5px solid #dc3545' }}>
                        <div className="card-body">
                            <h6 className="text-muted fw-bold">TOTAL FAVORITES</h6>
                            <h2 className="fw-bold mb-0">{stats.totalReviews.toLocaleString()}</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4 mb-4">
                <div className="col-md-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-header bg-white fw-bold">
                            <i className="bi bi-box-seam me-2 text-warning"></i> Daily Product Growth
                        </div>
                        <div className="card-body">
                            <Line options={{ responsive: true }} data={productDataConfig} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-header bg-white fw-bold">
                            <i className="bi bi-people me-2 text-primary"></i> Daily User Registration
                        </div>
                        <div className="card-body">
                            <Line options={{ responsive: true }} data={userDataConfig} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-header bg-white fw-bold">
                            <i className="bi bi-heart-fill me-2 text-danger"></i> Most Favorited Categories (All Time)
                        </div>
                        <div className="card-body">
                            {favChartData.data.length > 0 ? (
                                <Bar options={{ responsive: true }} data={favBarConfig} />
                            ) : (
                                <div className="text-center py-5 text-muted">
                                    <p>No favorite data available.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}