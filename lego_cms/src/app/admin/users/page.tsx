export default function UsersPage() {
    return (
        <div className="container-fluid">
            <h2 className="mb-4">User Management</h2>
            <div className="card shadow-sm">
                <div className="card-body">
                    <table className="table table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th className="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Dummy User 1 */}
                            <tr>
                                <td>Budi Santoso</td>
                                <td><span className="badge bg-secondary">Member</span></td>
                                <td><span className="badge bg-success">Active</span></td>
                                <td className="text-end">
                                    <button className="btn btn-sm btn-success me-1" title="Make Admin"><i className="bi bi-shield-lock"></i></button>
                                    <button className="btn btn-sm btn-warning me-1" title="Ban User"><i className="bi bi-slash-circle"></i></button>
                                    <button className="btn btn-sm btn-danger" title="Delete User"><i className="bi bi-trash"></i></button>
                                </td>
                            </tr>
                            {/* Dummy User 2 */}
                            <tr>
                                <td>Siti Aminah</td>
                                <td><span className="badge bg-warning text-dark">Admin</span></td>
                                <td><span className="badge bg-success">Active</span></td>
                                <td className="text-end">
                                    <button className="btn btn-sm btn-outline-secondary me-1" disabled><i className="bi bi-shield-check"></i></button>
                                    <button className="btn btn-sm btn-warning me-1"><i className="bi bi-slash-circle"></i></button>
                                    <button className="btn btn-sm btn-danger"><i className="bi bi-trash"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}