"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await signIn("credentials", {
        redirect: false,
        username: username,
        password: password,
        callbackUrl,
      });

      setLoading(false);

      console.log(res);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError("nombre de usuario o contraseña incorrectos");
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {error && <p>{error}</p>}
      <div>
        <label>Usuario</label>
        <br />
        <input
          required
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nombre de usuario"
        />
      </div>
      <br />
      <div>
        <label>Contraseña</label>
        <br />
        <input
          required
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
      </div>
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "verificando..." : "Ingresar"}
      </button>
    </form>
  );
}
