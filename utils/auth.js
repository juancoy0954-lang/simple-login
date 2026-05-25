import { MOCK_USERS } from "../data/users.js";

export function validate(email, password) {
  const errors = {};
  if (!email) errors.email = "Email wajib diisi.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Format email tidak valid.";
  if (!password) errors.password = "Password wajib diisi.";
  else if (password.length < 6)
    errors.password = "Password minimal 6 karakter.";
  return errors;
}

export function authenticate(email, password) {
  const user = MOCK_USERS.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.password === password
  );
  if (!user) return { success: false, message: "Email atau password salah." };

  const { password: _, ...safeUser } = user;
  return { success: true, user: safeUser };
}

