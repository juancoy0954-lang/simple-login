import styles from "../styles/loginStyles.js";

export default function Dashboard({ user, onLogout }) {
  return (
    <div style={styles.page}>
      <div style={{ ...styles.card, textAlign: "center" }}>
        <div style={styles.avatar}>{user.name[0]}</div>
        <h2 style={styles.welcomeTitle}>Selamat Datang</h2>
        <p style={styles.welcomeName}>{user.name}</p>
        <span
          style={{
            ...styles.badge,
            background: user.role === "admin" ? "#ef4444" : "#3b82f6",
          }}
        >
          {user.role.toUpperCase()}
        </span>
        <p style={styles.info}>
          ID: {user.id} &nbsp;|&nbsp; {user.email}
        </p>
        <button style={styles.btnLogout} onClick={onLogout}>
          Keluar
        </button>
      </div>
    </div>
  );
}

