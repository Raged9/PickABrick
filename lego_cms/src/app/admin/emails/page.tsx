export default function EmailsPage() {
    // Mock Data
    const emails = [
        { id: 1, email: "user1@example.com", date: "2024-10-01" },
        { id: 2, email: "lego.fan@gmail.com", date: "2024-10-02" },
        { id: 3, email: "admin@brick.id", date: "2024-10-05" },
    ];

    return (
        <div className="container-fluid">
            <h2 className="mb-4">Registered Emails</h2>
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Email Address</th>
                                    <th>Join Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {emails.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.email}</td>
                                        <td>{item.date}</td>
                                        <td>
                                            <button className="btn btn-sm btn-outline-primary">
                                                <i className="bi bi-envelope-paper"></i> Send Mail
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}