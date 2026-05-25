# 🔐 Login Module

Modul autentikasi berbasis React dengan validasi form, proteksi brute-force, dan tampilan dashboard pasca-login.

---

## 📁 Struktur File

```
login/
├── components/
│   ├── LoginForm.jsx      # UI form login + state management
│   └── Dashboard.jsx      # Halaman setelah login berhasil
├── utils/
│   └── auth.js            # Fungsi validate() dan authenticate()
├── styles/
│   └── loginStyles.js     # Semua style terpusat
└── data/
    └── users.js           # Mock data user & konstanta
```

---

## 🚀 Cara Penggunaan

### 1. Install dependensi

```bash
npm install
```

### 2. Import komponen ke `App.jsx`

```jsx
import LoginForm from "./login/components/LoginForm";

export default function App() {
  return <LoginForm />;
}
```

### 3. Jalankan aplikasi

```bash
npm run dev
```

---

## 🧩 Penjelasan Tiap File

### `components/LoginForm.jsx`
Komponen utama yang mengelola:
- State form (`email`, `password`)
- State UI (`loading`, `showPass`, `locked`)
- Handler `handleChange`, `handleSubmit`, `handleLogout`
- Render bersyarat: tampilkan `Dashboard` jika sudah login

### `components/Dashboard.jsx`
Komponen tampilan setelah login berhasil. Menerima props:
| Prop | Tipe | Keterangan |
|------|------|------------|
| `user` | `object` | Data user (tanpa password) |
| `onLogout` | `function` | Callback untuk keluar |

### `utils/auth.js`
Berisi dua fungsi utama:

**`validate(email, password)`**
- Memvalidasi format email dan panjang password
- Mengembalikan objek `errors` (kosong jika valid)

**`authenticate(email, password)`**
- Mencocokkan kredensial dengan data user
- Mengembalikan `{ success, user }` atau `{ success, message }`
- Password **tidak ikut disimpan** (dibuang via destructuring)

### `styles/loginStyles.js`
Objek style terpusat yang dipakai oleh semua komponen. Ekspor default.

### `data/users.js`
Mock database user dan konstanta global:
- `MOCK_USERS` — array data user
- `MAX_ATTEMPTS` — batas maksimal percobaan login (default: `3`)

---

## 🔒 Fitur Keamanan

| Fitur | Keterangan |
|-------|------------|
| Validasi form | Cek format email & panjang password sebelum request |
| Brute-force protection | Akun dikunci setelah `MAX_ATTEMPTS` kali gagal |
| Password tidak disimpan | Destructuring membuang field `password` dari state |
| Show/hide password | Toggle visibilitas password di input field |
| Disable saat loading | Tombol & input dinonaktifkan saat proses berlangsung |

---

## 👤 Akun Demo

| Email | Password | Role |
|-------|----------|------|
| admin@example.com | Admin123! | admin |
| user@example.com | User123! | user |

---

## 🔧 Konfigurasi

Ubah konstanta di `data/users.js` sesuai kebutuhan:

```js
export const MAX_ATTEMPTS = 3; // Batas percobaan login
```

Untuk integrasi dengan API nyata, ganti isi fungsi `authenticate()` di `utils/auth.js`:

```js
export async function authenticate(email, password) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json(); // { success, user } atau { success, message }
}
```

---

## 🛠 Teknologi

- **React** — UI & state management
- **JavaScript (ES6+)** — logika autentikasi & validasi
- **Inline Styles** — styling terpusat via objek JS

---

## 📄 Lisensi

MIT License — bebas digunakan dan dimodifikasi.
