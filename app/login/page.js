"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaUser, FaBuilding, FaBriefcase, FaPhone, FaCheck } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  
  // User credentials
  const validUser = {
    email: "AlignHR123@gmail.com",
    password: "AlignHR12345@",
  };
  
  // State management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Enhanced registration form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "HR Manager",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
    marketing: false
  });
  
  // Password strength validation
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: []
  });

  // Available roles for dropdown
  const roles = [
    "HR Manager",
    "HR Director",
    "HR Specialist",
    "Recruiter",
    "Payroll Administrator",
    "CEO/Founder",
    "Other"
  ];

  // Validate password strength
  useEffect(() => {
    if (!formData.password) {
      setPasswordStrength({ score: 0, feedback: [] });
      return;
    }
    
    let strength = 0;
    let feedback = [];
    
    // Length check
    if (formData.password.length >= 8) {
      strength += 1;
    } else {
      feedback.push("Use at least 8 characters");
    }
    
    // Character variety checks
    if (/[A-Z]/.test(formData.password)) strength += 1;
    else feedback.push("Add uppercase letters");
    
    if (/[a-z]/.test(formData.password)) strength += 1;
    else feedback.push("Add lowercase letters");
    
    if (/[0-9]/.test(formData.password)) strength += 1;
    else feedback.push("Add numbers");
    
    if (/[^A-Za-z0-9]/.test(formData.password)) strength += 1;
    else feedback.push("Add special characters");
    
    setPasswordStrength({ score: strength, feedback });
  }, [formData.password]);

  const getPasswordStrengthColor = () => {
    if (passwordStrength.score <= 1) return "bg-red-500";
    if (passwordStrength.score <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (email === validUser.email && password === validUser.password) {
      // Set authentication cookie
      Cookies.set('auth', 'true', { 
        expires: 7, // 1 week
        secure: true,
        sameSite: 'strict',
        path: '/'
      });
      
      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1000);
    } else {
      setError("Invalid email or password. Please try again.");
      setIsLoading(false);
    }
  };
  
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (resetEmail) {
      setSuccessMessage(`Password reset instructions sent to ${resetEmail}. Check your inbox.`);
      
      setIsLoading(false);
      
      // Return to login form after 5 seconds
      setTimeout(() => {
        setSuccessMessage("");
        setIsResetMode(false);
      }, 5000);
    } else {
      setError("Please enter your email address");
      setIsLoading(false);
    }
  };
  
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // Validate form
    if (!formData.terms) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      setIsLoading(false);
      return;
    }
    
    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }
    
    // Check password strength
    if (passwordStrength.score < 3) {
      setError("Please create a stronger password: " + passwordStrength.feedback.join(", "));
      setIsLoading(false);
      return;
    }
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Success - would normally create account here
    setSuccessMessage("Account created successfully! Redirecting to login...");
    setIsLoading(false);
    
    // Return to login form after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
      setIsRegisterMode(false);
      setEmail(formData.email); // Pre-fill email for convenience
      setFormData({
        name: "",
        email: "",
        company: "",
        role: "HR Manager",
        phone: "",
        password: "",
        confirmPassword: "",
        terms: false,
        marketing: false
      });
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const renderLoginForm = () => (
    <form onSubmit={handleLogin} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
          Email Address
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaEnvelope className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="your@company.com"
            required
            autoComplete="username"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
          Password
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaLock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-500" />
            ) : (
              <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
            )}
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
            Remember me
          </label>
        </div>
        
        <button
          type="button"
          onClick={() => {
            setIsResetMode(true);
            setIsRegisterMode(false);
            setResetEmail(email);
          }}
          className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
        >
          Forgot password?
        </button>
      </div>
      
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
            isLoading ? "opacity-80 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </div>
      
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <button 
            type="button"
            onClick={() => {
              setIsRegisterMode(true);
              setIsResetMode(false);
            }}
            className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            Get started
          </button>
        </p>
      </div>
    </form>
  );
  
  const renderResetForm = () => (
    <form onSubmit={handleForgotPassword} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="reset-email">
          Email Address
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaEnvelope className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="reset-email"
            type="email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="your@company.com"
            required
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          We'll send you a link to reset your password.
        </p>
      </div>
      
      <div className="flex space-x-3">
        <button
          type="button"
          onClick={() => setIsResetMode(false)}
          className="w-1/2 py-3 px-4 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Back to Login
        </button>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-1/2 flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
            isLoading ? "opacity-80 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : (
            "Send Reset Link"
          )}
        </button>
      </div>
    </form>
  );
  
  const renderRegisterForm = () => (
    <form onSubmit={handleRegister} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="reg-name">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="reg-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="John Doe"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="reg-email">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="reg-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="your@company.com"
              required
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="reg-company">
            Company Name
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaBuilding className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="reg-company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleInputChange}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Your Company Inc."
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="reg-role">
            Job Title
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaBriefcase className="h-5 w-5 text-gray-400" />
            </div>
            <select
              id="reg-role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="reg-phone">
          Phone Number
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaPhone className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="reg-phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="(123) 456-7890"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="reg-password">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="reg-password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="••••••••"
              required
              minLength={8}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-500" />
              ) : (
                <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
              )}
            </button>
          </div>
          
          {/* Password strength indicator */}
          {formData.password && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-500">
                  Password strength: 
                  <span className={`ml-1 ${
                    passwordStrength.score <= 1 ? 'text-red-500' : 
                    passwordStrength.score <= 3 ? 'text-yellow-500' : 'text-green-500'
                  }`}>
                    {passwordStrength.score <= 1 ? "Weak" : passwordStrength.score <= 3 ? "Medium" : "Strong"}
                  </span>
                </span>
                {passwordStrength.score === 5 && (
                  <span className="text-xs text-green-500 flex items-center">
                    <FaCheck className="mr-1" /> Strong
                  </span>
                )}
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`} 
                  style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                ></div>
              </div>
              {passwordStrength.feedback.length > 0 && (
                <p className="mt-1 text-xs text-gray-500">
                  {passwordStrength.feedback.join(", ")}
                </p>
              )}
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="reg-confirm-password">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="reg-confirm-password"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>
          {formData.confirmPassword && formData.password !== formData.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
          )}
        </div>
      </div>
      
      <div className="space-y-3 mt-4">
        <div className="flex items-start">
          <input
            id="reg-terms"
            name="terms"
            type="checkbox"
            checked={formData.terms}
            onChange={handleInputChange}
            className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="reg-terms" className="ml-2 block text-sm text-gray-700">
            I agree to the <a href="#" className="text-blue-600 hover:underline font-medium">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline font-medium">Privacy Policy</a> <span className="text-red-500">*</span>
          </label>
        </div>
        
        <div className="flex items-start">
          <input
            id="reg-marketing"
            name="marketing"
            type="checkbox"
            checked={formData.marketing}
            onChange={handleInputChange}
            className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="reg-marketing" className="ml-2 block text-sm text-gray-700">
            I'd like to receive updates about AlignHR products and services
          </label>
        </div>
      </div>
      
      <div className="flex space-x-3 mt-6">
        <button
          type="button"
          onClick={() => setIsRegisterMode(false)}
          className="w-1/3 py-3 px-4 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Back
        </button>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-2/3 flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
            isLoading ? "opacity-80 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </div>
    </form>
  );
  
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              {isResetMode ? "Reset Password" : isRegisterMode ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isResetMode 
                ? "Enter your email to receive reset instructions" 
                : isRegisterMode 
                  ? "Join thousands of HR professionals using AlignHR" 
                  : "Sign in to your AlignHR account"}
            </p>
          </div>
          
          {/* Alerts */}
          {error && (
            <div className="mb-4 p-4 rounded-md bg-red-50 border border-red-200">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {successMessage && (
            <div className="mb-4 p-4 rounded-md bg-green-50 border border-green-200">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{successMessage}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Form Container */}
          <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10 border border-gray-100">
            {isResetMode 
              ? renderResetForm() 
              : isRegisterMode 
                ? renderRegisterForm() 
                : renderLoginForm()}
          </div>
        </div>
      </div>
      
      {/* Right side - Hero */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-900">
          <div className="flex flex-col justify-center h-full px-20">
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-6">AlignHR Platform</h1>
              <p className="text-xl mb-8 max-w-lg">
                The complete HR solution for modern businesses. Streamline your HR processes and focus on what matters most - your people.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500">
                      <FaCheck className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-medium">Employee Management</p>
                    <p className="text-blue-200">Centralize all employee records and data</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500">
                      <FaCheck className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-medium">Payroll Processing</p>
                    <p className="text-blue-200">Automate and simplify your payroll</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500">
                      <FaCheck className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-medium">Performance Tracking</p>
                    <p className="text-blue-200">Monitor and improve employee performance</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <blockquote className="italic text-lg">
                  "AlignHR transformed our HR operations. We've reduced administrative work by 60% and improved employee satisfaction."
                </blockquote>
                <div className="mt-4 flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-400 flex items-center justify-center">
                      <span className="text-white font-medium">JD</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-blue-100">Jane Doe</p>
                    <p className="text-sm text-blue-200">HR Director, TechCorp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}