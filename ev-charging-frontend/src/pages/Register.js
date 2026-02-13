
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { registerUser } from "../api/userApi";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CUSTOMER");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // ✅ Role mapping EXACTLY as per DB
    const roleIdMap = {
      ADMIN: 1,     // (not exposed in UI)
      OWNER: 2,
      CUSTOMER: 3
    };

    const payload = {
      name: name.trim(),
      email: email.trim(),
      password,
      roleId: roleIdMap[role],  // 🔥 camelCase here
      status: "ACTIVE"
    };


    try {
      await registerUser(payload);
      setSuccess("Registration successful. Please login.");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      console.error("Registration error:", err);

      setError(
        err?.response?.data?.message ||
        "Registration failed. Email already exists."
      );
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">

      <Navbar />

      <div className="container flex-grow-1 d-flex align-items-center">
        <div className="row w-100 justify-content-center">

          {/* LEFT INFO */}
          <div className="col-md-6 d-none d-md-flex align-items-center">
            <div>
              <h1 className="fw-bold text-primary">
                Join EV Charge Network
              </h1>
              <p className="text-muted fs-5">
                Register and become part of the smart EV charging ecosystem.
              </p>
              <ul className="list-unstyled mt-3">
                <li>✔ Book chargers instantly</li>
                <li>✔ Manage stations as owner</li>
                <li>✔ Secure & verified platform</li>
              </ul>
            </div>
          </div>

          {/* REGISTER FORM */}
          <div className="col-md-5">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4">

                <h3 className="text-center fw-bold mb-3">
                  Create Account
                </h3>

                {error && (
                  <p className="text-danger text-center">{error}</p>
                )}

                {success && (
                  <p className="text-success text-center">{success}</p>
                )}

                <form onSubmit={handleRegister}>

                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
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
                      placeholder="Create password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Register As</label>
                    <select
                      className="form-select"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="CUSTOMER">Customer</option>
                      <option value="OWNER">Station Owner</option>
                    </select>
                  </div>

                 

                  <button type="submit" className="btn btn-primary w-100">
                    Register
                  </button>

                </form>

                <div className="text-center mt-3">
                  <small>
                    Already have an account?{" "}
                    <a href="/login" className="text-decoration-none">
                      Login
                    </a>
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

export default Register;
