"use client"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { useState } from 'react';

// Registrasi komponen Chart.js
ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend
);

export default function TrendsPage() {
    const [timeFilter, setTimeFilter] = useState("Monthly");

    // Dummy Data untuk Grafik
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    
    const productData = {
        labels,
        datasets: [{
            label: 'Total Products',
            data: [12, 19, 3, 5, 2, 3],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }],
    };

    const userData = {
        labels,
        datasets: [{
            label: 'New Users',
            data: [50, 100, 150, 200, 300, 450],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }],
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Dashboard Trends</h2>
                <select className="form-select w-auto" value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
                    <option value="Daily">Harian</option>
                    <option value="Monthly">Bulanan</option>
                    <option value="Yearly">Tahunan</option>
                </select>
            </div>

            {/* Row 1: Products & Users */}
            <div className="row g-4 mb-4">
                <div className="col-md-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-header bg-white fw-bold">
                            <i className="bi bi-box-seam me-2 text-warning"></i> Product Growth
                        </div>
                        <div className="card-body">
                            <Line options={{ responsive: true }} data={productData} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-header bg-white fw-bold">
                            <i className="bi bi-people me-2 text-primary"></i> User Registration
                        </div>
                        <div className="card-body">
                            <Line options={{ responsive: true }} data={userData} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Row 2: Favorites */}
            <div className="row">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-header bg-white fw-bold">
                            <i className="bi bi-heart-fill me-2 text-danger"></i> Most Favorited Items
                        </div>
                        <div className="card-body">
                            <Bar 
                                options={{ responsive: true }} 
                                data={{
                                    labels: ['LEGO Star Wars', 'Gundam RX-78', 'Hot Wheels', 'Funko Pop', 'Tamiya'],
                                    datasets: [{
                                        label: 'Favorites Count',
                                        data: [65, 59, 80, 81, 56],
                                        backgroundColor: 'rgba(255, 206, 86, 0.6)', // Yellowish
                                    }]
                                }} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}