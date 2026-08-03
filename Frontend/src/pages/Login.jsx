import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { loginUser as loginApi } from "../api/authApi";
import { isUserLoggedIn, loginUser as persistLogin } from "../utils/auth";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isUserLoggedIn()) {
      navigate("/profile", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        [formData.identifier.includes("@") ? "email" : "cnic"]: formData.identifier.trim(),
        password: formData.password,
      };

      const response = await loginApi(payload);

      if (!response?.success) {
        throw new Error(response?.message || "Invalid email or password.");
      }

      persistLogin(response.token, response.user);
      navigate("/profile", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to log in right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0A] text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-400/10 blur-[140px]" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0b]/75 shadow-[0_30px_100px_rgba(0,0,0,0.4)] backdrop-blur-2xl lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="relative h-64 p-4 lg:h-auto">
            <div className="relative h-full overflow-hidden rounded-[1.5rem]">
              <img
                src="/images/Hunza.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-black/80" />

              <div className="absolute left-6 top-6 text-lg font-semibold uppercase tracking-[0.35em] text-white">
                WILDVISTA
              </div>

              <a
                href="/"
                className="absolute right-6 top-6 flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-white backdrop-blur-md transition hover:bg-white/20"
              >
                Back to website <span>→</span>
              </a>

              <div className="absolute bottom-8 left-6 right-6">
                <p className="mb-4 text-xl font-medium leading-snug text-white sm:text-2xl">
                  Every Journey Begins,
                  <br />
                  With a Single Step
                </p>
                <div className="flex gap-1.5">
                  <span className="h-1.5 w-6 rounded-full bg-white/30" />
                  <span className="h-1.5 w-6 rounded-full bg-white/30" />
                  <span className="h-1.5 w-6 rounded-full bg-emerald-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12">
            <div className="mb-8">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-emerald-400">
                Member Access
              </p>
              <h1 className="text-3xl font-semibold text-white">Welcome Back</h1>
              <p className="mt-2 text-sm text-gray-400">
                Don't have an account?{' '}
                <a href="/signup" className="text-emerald-400 transition hover:text-emerald-300">
                  Sign up
                </a>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                placeholder="Email or CNIC number"
                required
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-gray-500 transition focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 pr-11 text-sm text-white placeholder-gray-500 transition focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-white"
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>

              {error ? <p className="text-sm text-rose-300">{error}</p> : null}

              <div className="flex items-center justify-between pt-1 text-sm">
                <label className="flex cursor-pointer items-center gap-2 text-gray-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded accent-emerald-500"
                  />
                  Remember me
                </label>
                <a href="/forgot-password" className="text-emerald-400 transition hover:text-emerald-300">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full rounded-2xl bg-emerald-500 px-4 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Signing in..." : "Log in"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}