import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen bg-base-200 flex">

      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        
        <div className="relative z-10 flex flex-col justify-center items-center p-12 ml-52 text-primary-content">
          <div className="w-24 h-24 rounded-full bg-base-content/10 flex items-center justify-center mb-6">
            <MessageSquare className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Welcome back!</h2>
          <p className="text-xl text-primary-content/80 text-center max-w-md">
            Sign in to continue your conversations and catch up with your messages.
          </p>
          

          <div className="absolute bottom-10 left-10 w-20 h-20 rounded-full bg-base-content/5"></div>
          <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-base-content/5"></div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md">
  
          <div className="lg:hidden text-center mb-10">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-primary-content" />
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-base-content/60 mt-2">Access your account and messages</p>
          </div>


          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>


            <button 
              type="submit" 
              className="btn btn-primary w-full" 
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary font-medium">
                Create new account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;