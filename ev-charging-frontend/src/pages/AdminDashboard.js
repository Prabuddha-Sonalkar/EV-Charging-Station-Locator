// import React, { useEffect, useState, useCallback } from "react";
// import {
//   getPendingStations,
//   getAllStations,
//   approveStation,
//   rejectStation
// } from "../api/adminApi";

// function AdminDashboard() {
//   const [stations, setStations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [viewMode, setViewMode] = useState("PENDING"); // "PENDING" or "ALL"

//   const loadStations = useCallback(async () => {
//     setLoading(true);
//     try {
//       const data =
//         viewMode === "PENDING" ? await getPendingStations() : await getAllStations();
//       setStations(data);
//     } catch (err) {
//       console.error("Error loading stations", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [viewMode]);

//   useEffect(() => {
//     loadStations();
//   }, [loadStations]);

//   const handleApprove = async (id) => {
//     await approveStation(id);
//     loadStations();
//   };

//   const handleReject = async (id) => {
//     await rejectStation(id);
//     loadStations();
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="fw-bold mb-3">Admin Charging Stations</h2>

//       {/* Toggle Buttons */}
//       <div className="mb-3">
//         <button
//           className={`btn me-2 ${viewMode === "PENDING" ? "btn-primary" : "btn-outline-primary"}`}
//           onClick={() => setViewMode("PENDING")}
//         >
//           Pending Stations
//         </button>
//         <button
//           className={`btn ${viewMode === "ALL" ? "btn-primary" : "btn-outline-primary"}`}
//           onClick={() => setViewMode("ALL")}
//         >
//           All Stations
//         </button>
//       </div>

//       {loading ? (
//         <p>Loading...</p>
//       ) : stations.length === 0 ? (
//         <p className="text-muted">No stations found</p>
//       ) : (
//         <table className="table table-bordered">
//           <thead className="table-dark">
//             <tr>
//               <th>Station Name</th>
//               <th>Address</th>
//               <th>City</th>
//               <th>Owner Id</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {stations.map((s, i) => (
//               <tr key={i}>
//                 <td>{s.stationName}</td>
//                 <td>{s.address}</td>
//                 <td>{s.city}</td>
//                 <td>{s.ownerId}</td>
//                 <td>
//                   <span
//                     className={`badge ${
//                       s.approvalStatus === "PENDING"
//                         ? "bg-warning text-dark"
//                         : s.approvalStatus === "APPROVED"
//                         ? "bg-success"
//                         : "bg-danger"
//                     }`}
//                   >
//                     {s.approvalStatus}
//                   </span>
//                 </td>
//                 <td>
//                   {s.approvalStatus === "PENDING" ? (
//                     <>
//                       <button
//                         className="btn btn-success btn-sm me-2"
//                         onClick={() => handleApprove(s.stationId)}
//                       >
//                         Approve
//                       </button>
//                       <button
//                         className="btn btn-danger btn-sm"
//                         onClick={() => handleReject(s.stationId)}
//                       >
//                         Reject
//                       </button>
//                     </>
//                   ) : (
//                     <span className="text-muted">—</span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default AdminDashboard;

import React, { useEffect, useState, useCallback } from "react";
import {
  getPendingStations,
  getAllStations,
  approveStation,
  rejectStation
} from "../api/adminApi";

function AdminDashboard() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("PENDING"); // "PENDING" or "ALL"

  // Load stations based on view mode
  const loadStations = useCallback(async () => {
    setLoading(true);
    try {
      const data =
        viewMode === "PENDING" ? await getPendingStations() : await getAllStations();
      setStations(data);
    } catch (err) {
      console.error("Error loading stations", err);
    } finally {
      setLoading(false);
    }
  }, [viewMode]);

  useEffect(() => {
    loadStations();
  }, [loadStations]);

  // Approve station
  const handleApprove = async (id) => {
    await approveStation(id);
    loadStations();
  };

  // Reject station
  const handleReject = async (id) => {
    await rejectStation(id);
    loadStations();
  };

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4">Admin Charging Stations</h2>

      {/* Toggle buttons */}
      <div className="mb-4">
        <button
          className={`btn me-2 ${viewMode === "PENDING" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setViewMode("PENDING")}
        >
          Pending Stations
        </button>
        <button
          className={`btn ${viewMode === "ALL" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setViewMode("ALL")}
        >
          All Stations
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : stations.length === 0 ? (
        <p className="text-muted">No stations found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Owner ID</th>
                <th>Station Name</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stations.map((s) => (
                <tr key={s.stationId}>
                  <td>{s.stationId}</td>
                  <td>{s.ownerId}</td>
                  <td>{s.stationName}</td>
                  <td>{s.address}</td>
                  <td>{s.city}</td>
                  <td>{s.state}</td>
                  <td>{s.latitude}</td>
                  <td>{s.longitude}</td>
                  <td>
                    <span
                      className={`badge ${
                        s.approvalStatus === "PENDING"
                          ? "bg-warning text-dark"
                          : s.approvalStatus === "APPROVED"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {s.approvalStatus}
                    </span>
                  </td>
                  <td>{new Date(s.createdAt).toLocaleString()}</td>
                  <td>
                    {s.approvalStatus === "PENDING" ? (
                      <>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleApprove(s.stationId)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleReject(s.stationId)}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
