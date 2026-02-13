// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { getAllUsers } from "../api/userApi";

// function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginAs, setLoginAs] = useState("CUSTOMER");
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     const roleIdMap = {
//       ADMIN: 1,
//       OWNER: 2,
//       CUSTOMER: 3,
//     };

//     try {
//       const response = await getAllUsers();

//       const user = response.data.find(
//         (u) =>
//           u.email === email.trim() &&
//           u.password === password &&
//           u.roleId === roleIdMap[loginAs]
//       );

//       if (!user) {
//         setError("Invalid email, password, or role");
//         return;
//       }

//       // ✅ EXISTING (DO NOT TOUCH)
//       localStorage.setItem("loggedInUser", JSON.stringify(user));

//       // ✅ NEW (FOR OWNER / DASHBOARD FLOW)
//       sessionStorage.setItem("loggedUser", JSON.stringify(user));

//       // ✅ ROLE-BASED NAVIGATION (UNCHANGED)
//       if (loginAs === "ADMIN") {
//         navigate("/admin");
//       } else if (loginAs === "OWNER") {
//         navigate("/owner");
//       } else {
//         navigate("/customer");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("Backend error. Please try again.");
//     }
//   };

//   return (
//     <div className="d-flex flex-column min-vh-100 bg-light">
//       <Navbar />

//       <div className="container flex-grow-1 d-flex align-items-center">
//         <div className="row w-100 justify-content-center">

//           <div className="col-md-6 d-none d-md-flex align-items-center">
//             <div>
//               <h1 className="fw-bold text-success">Find • Book • Charge</h1>
//               <p className="text-muted fs-5">
//                 Locate EV charging stations and book chargers instantly.
//               </p>
//               <ul className="list-unstyled mt-3">
//                 <li>✔ Live charger availability</li>
//                 <li>✔ Secure OTP-based charging</li>
//                 <li>✔ Verified charging stations</li>
//               </ul>
//             </div>
//           </div>

//           <div className="col-md-5">
//             <div className="card shadow-lg border-0 rounded-4">
//               <div className="card-body p-4">

//                 <h3 className="text-center fw-bold mb-3">
//                   Login to EV Charge
//                 </h3>

//                 {error && (
//                   <p className="text-danger text-center">{error}</p>
//                 )}

//                 <form onSubmit={handleLogin}>

//                   <div className="mb-3">
//                     <label className="form-label">Email</label>
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

//                   <div className="mb-3">
//                     <label className="form-label">Login As</label>
//                     <select
//                       className="form-select"
//                       value={loginAs}
//                       onChange={(e) => setLoginAs(e.target.value)}
//                     >
//                       <option value="CUSTOMER">Customer</option>
//                       <option value="OWNER">Station Owner</option>
//                       <option value="ADMIN">Admin</option>
//                     </select>
//                   </div>

//                   <button type="submit" className="btn btn-success w-100">
//                     Login
//                   </button>

//                 </form>

//                 <div className="text-center mt-3">
//                   <small>
//                     New user?{" "}
//                     <a href="/register" className="text-decoration-none">
//                       Register here
//                     </a>
//                   </small>
//                 </div>

//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default Login;


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getAllUsers } from "../api/userApi";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginAs, setLoginAs] = useState("CUSTOMER");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const roleIdMap = {
      OWNER: 2,
      CUSTOMER: 3,
    };

    try {
      const response = await getAllUsers();

      const user = response.data.find(
        (u) =>
          u.email.trim().toLowerCase() === email.trim().toLowerCase() &&
          u.password === password &&
          u.roleId === roleIdMap[loginAs] &&
          u.status === "ACTIVE"
      );

      if (!user) {
        setError("Invalid email, password, or role");
        setLoading(false);
        return;
      }

      // 🔥 CRITICAL FIX — CLEAR OLD SESSION
      localStorage.clear();
      sessionStorage.clear();

      // 🔥 USE ONE SOURCE OF TRUTH
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      if (loginAs === "OWNER") {
        navigate("/owner");
      } else {
        navigate("/customer");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Backend error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar />

      <div className="container flex-grow-1 d-flex align-items-center">
        <div className="row w-100 justify-content-center">

          <div className="col-md-6 d-none d-md-flex align-items-center">
            <div>
              <h1 className="fw-bold text-success">Find • Book • Charge</h1>
              <p className="text-muted fs-5">
                Locate EV charging stations and book chargers instantly.
              </p>
              <ul className="list-unstyled mt-3">
                <li>✔ Live charger availability</li>
                <li>✔ Secure OTP-based charging</li>
                <li>✔ Verified charging stations</li>
              </ul>
            </div>
          </div>

          <div className="col-md-5">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4">

                <h3 className="text-center fw-bold mb-3">User Login</h3>

                {error && <p className="text-danger text-center">{error}</p>}

                <form onSubmit={handleLogin}>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
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

                  <div className="mb-3">
                    <label className="form-label">Login As</label>
                    <select
                      className="form-select"
                      value={loginAs}
                      onChange={(e) => setLoginAs(e.target.value)}
                    >
                      <option value="CUSTOMER">Customer</option>
                      <option value="OWNER">Station Owner</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-success w-100" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                  </button>

                </form>

                <div className="text-center mt-3">
                  <Link
                    to="/admin-login"
                    className="text-decoration-none fw-semibold text-danger"
                  >
                    🔐 Login as Admin
                  </Link>
                </div>

                <div className="text-center mt-2">
                  <small>
                    New user?{" "}
                    <Link to="/register" className="text-decoration-none">
                      Register here
                    </Link>
                  </small>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
