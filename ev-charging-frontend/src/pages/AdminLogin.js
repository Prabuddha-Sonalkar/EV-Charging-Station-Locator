// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { adminLogin } from "../api/adminApi";

// function AdminLogin() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await adminLogin({ email, password });

//       // 🔑 Read token from backend response
//       // If backend returns plain string token:
//       let token = res.data;

//       // If backend returns JSON { token: "..." } 
//       if (res.data?.token) {
//         token = res.data.token;
//       }

//       if (!token) {
//         throw new Error("Token not received from server");
//       }

//       // ✅ Save token for admin API usage
//       localStorage.setItem("adminToken", token);

//       // ✅ Navigate to admin dashboard
//       navigate("/admin");
//     } catch (err) {
//       console.error("Admin login failed:", err);
//       setError("Invalid admin email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="d-flex flex-column min-vh-100 bg-light">
//       <Navbar />

//       <div className="container flex-grow-1 d-flex align-items-center">
//         <div className="row w-100 justify-content-center">

//           {/* LEFT INFO */}
//           <div className="col-md-6 d-none d-md-flex align-items-center">
//             <div>
//               <h1 className="fw-bold text-danger">Admin Control Panel</h1>
//               <p className="text-muted fs-5">
//                 Secure access for administrators only.
//               </p>
//               <ul className="list-unstyled mt-3">
//                 <li>✔ Approve / Reject stations</li>
//                 <li>✔ Manage system data</li>
//                 <li>✔ Monitor platform activity</li>
//               </ul>
//             </div>
//           </div>

//           {/* ADMIN LOGIN CARD */}
//           <div className="col-md-5">
//             <div className="card shadow-lg border-0 rounded-4">
//               <div className="card-body p-4">

//                 <h3 className="text-center fw-bold mb-3 text-danger">
//                   Admin Login
//                 </h3>

//                 {error && (
//                   <p className="text-danger text-center">{error}</p>
//                 )}

//                 <form onSubmit={handleLogin}>

//                   <div className="mb-3">
//                     <label className="form-label">Admin Email</label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label">Password</label>
//                     <input
//                       type="password"
//                       className="form-control"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     className="btn btn-danger w-100"
//                     disabled={loading}
//                   >
//                     {loading ? "Logging in..." : "Login as Admin"}
//                   </button>

//                 </form>

//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default AdminLogin;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { adminLogin } from "../api/adminApi";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await adminLogin({ email, password });

      if (!res.token) {
        setError("Invalid admin email or password");
        return;
      }

      localStorage.setItem("adminToken", res.token);
      navigate("/admin");
    } catch (err) {
      console.error(err.response?.data || err);
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar />

      <div className="container flex-grow-1 d-flex align-items-center">
        <div className="row w-100 justify-content-center">

          {/* Left Info */}
          <div className="col-md-6 d-none d-md-flex align-items-center">
            <div>
              <h1 className="fw-bold text-danger">Admin Control Panel</h1>
              <p className="text-muted fs-5">
                Secure access for administrators only.
              </p>
              <ul className="list-unstyled mt-3">
                <li>✔ Approve / Reject stations</li>
                <li>✔ Manage system data</li>
                <li>✔ Monitor platform activity</li>
              </ul>
            </div>
          </div>

          {/* Login Card */}
          <div className="col-md-5">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4">

                <h3 className="text-center fw-bold mb-3 text-danger">
                  Admin Login
                </h3>

                {error && (
                  <p className="text-danger text-center">{error}</p>
                )}

                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label className="form-label">Admin Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-danger w-100"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login as Admin"}
                  </button>
                </form>

              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AdminLogin;
