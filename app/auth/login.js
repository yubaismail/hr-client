"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Login</h1>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
        </form>
      </div>
    </section>
  );
}
