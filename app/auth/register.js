"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      window.location.href = "/auth/login"; // Redirect after successful registration
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Register</h1>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-green-600 text-white p-2 rounded">Register</button>
        </form>
      </div>
    </section>
  );
}
