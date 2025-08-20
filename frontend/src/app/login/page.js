"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:4000/login", { email, password });
      const { role } = res.data;

      if (role === "admin") router.push("/admin");
      else if (role === "teacher") router.push("/teacher");
      else router.push("/student");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"100vh" }}>
      <h1>Login</h1>
      <input style={{ margin:"5px", padding:"5px" }} placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <input style={{ margin:"5px", padding:"5px" }} placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <button style={{ margin:"5px", padding:"5px" }} onClick={handleLogin}>Login</button>
    </div>
  );
}
