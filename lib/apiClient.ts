// lib/apiClient.ts
import axios from "axios";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Supabase JWT on every request
apiClient.interceptors.request.use(
  async (config) => {
    const supabase = createClientComponentClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export { apiClient };
