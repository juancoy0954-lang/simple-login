import { useState } from "react";
import styles from "../styles/loginStyles.js";
import { validate, authenticate } from "../utils/auth.js";
import { MAX_ATTEMPTS } from "../data/users.js";
import Dashboard from "./Dashboard.jsx";

export default function LoginForm() {
  const [form, setForm]           = useState({ email: "", password: "" });
  const [errors, setErrors]       = useState({});
  const [showPass, setShowPass]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [attempts, setAttempts]   = useState(0);
  const [locked, setLocked]       = useState(false);
  const [loggedIn, setLoggedIn]   = useState(null); 
  const [serverErr, setServerErr] = useState("");

  const isDisabled = locked || loading;
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerErr("");
  }

  async function handleSubmit() {
    const validationErrors = validate(form.email, form.password);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setServerErr("");
    await new Promise((r) => setTimeout(r, 900));

    const result = authenticate(form.email, form.password);
    setLoading(false);

    if (result.success) {
      setAttempts(0);
      setLoggedIn(result.user);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= MAX_ATTEMPTS) {
        setLocked(true);
        setServerErr(`Akun dikunci setelah ${MAX_ATTEMPTS}x percobaan gagal.`);
      } else {
        setServerErr(`${result.message} Sisa percobaan: ${MAX_ATTEMPTS - newAttempts}.`);
      }
    }
  }

  function handleLogout() {
    setLoggedIn(null);
    setForm({ email: "", password: "" });
    setAttempts(0);
    setLocked(false);
    setErrors({});
    setServerErr("");
  }

  if (loggedIn) {
    return <Dashboard user={loggedIn} onLogout={handleLogout} />;
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Masuk</h1>
        <p style={styles.subtitle}>Gunakan akun demo di bawah form</p>

        {serverErr && <div style={styles.alertError}>{serverErr}</div>}

        <div style={styles.field}>
          <label style={styles.label}>Email</label>
          <input
            style={{ ...styles.input, ...(errors.email ? styles.inputErr : {}) }}
            type="email"
            name="email"
            placeholder="nama@gmail.com"
            value={form.email}
            onChange={handleChange}
            disabled={isDisabled}
            autoComplete="email"
          />
          {errors.email && <span style={styles.errMsg}>{errors.email}</span>}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Password</label>
          <div style={styles.passWrap}>
            <input
              style={{ ...styles.input, ...styles.passInput, ...(errors.password ? styles.inputErr : {}) }}
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              disabled={isDisabled}
              autoComplete="current-password"
            />
            <button
              style={styles.eyeBtn}
              onClick={() => setShowPass((v) => !v)}
              disabled={isDisabled}
              aria-label="Toggle password"
            >
              {showPass ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.password && <span style={styles.errMsg}>{errors.password}</span>}
        </div>

        <button
          style={{ ...styles.btnSubmit, opacity: isDisabled ? 0.6 : 1 }}
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          {loading ? "Memverifikasi…" : locked ? "Akun Dikunci 🔒" : "Masuk"}
        </button>

        <div style={styles.hint}>
          <strong>Akun Demo</strong><br />
          admin@gmail.com / Admin123<br />
          user@gmail.com / User123
        </div>
      </div>
    </div>
  );
}
