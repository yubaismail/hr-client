"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

export default function LoginPage() {
  const router = useRouter();
  
  // User credentials
  const validUser = {
    email: "AlignHR123@gmail.com",
    password: "AlignHR12345@",
  };
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  
  // Enhanced registration form state
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regName, setRegName] = useState("");
  const [regCompany, setRegCompany] = useState("");
  const [regRole, setRegRole] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regTerms, setRegTerms] = useState(false);
  const [regMarketing, setRegMarketing] = useState(false);
  
  // Password strength validation
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState("");
  
  // Validate password strength
  useEffect(() => {
    if (!regPassword) {
      setPasswordStrength(0);
      setPasswordFeedback("");
      return;
    }
    
    let strength = 0;
    let feedback = [];
    
    // Length check
    if (regPassword.length >= 8) {
      strength += 1;
    } else {
      feedback.push("Use at least 8 characters");
    }
    
    // Character variety checks
    if (/[A-Z]/.test(regPassword)) strength += 1;
    else feedback.push("Add uppercase letters");
    
    if (/[a-z]/.test(regPassword)) strength += 1;
    else feedback.push("Add lowercase letters");
    
    if (/[0-9]/.test(regPassword)) strength += 1;
    else feedback.push("Add numbers");
    
    if (/[^A-Za-z0-9]/.test(regPassword)) strength += 1;
    else feedback.push("Add special characters");
    
    setPasswordStrength(strength);
    setPasswordFeedback(feedback.join(", "));
  }, [regPassword]);
  
  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
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
        expires: 1,
        secure: true,
        sameSite: 'strict'
      });
      
      router.push("/");
      router.refresh();
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
      if (resetEmail.toLowerCase() === validUser.email.toLowerCase()) {
        setSuccessMessage(`Password recovery instructions sent to ${resetEmail}.`);
      } else {
        setSuccessMessage(`If an account exists for ${resetEmail}, we've sent password reset instructions.`);
      }
      
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
    if (!regTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      setIsLoading(false);
      return;
    }
    
    // Validate password match
    if (regPassword !== regConfirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }
    
    // Check password strength
    if (passwordStrength < 3) {
      setError("Please create a stronger password: " + passwordFeedback);
      setIsLoading(false);
      return;
    }
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Success - would normally create account here
    setSuccessMessage("Your account has been created successfully! You can now log in.");
    setIsLoading(false);
    
    // Return to login form after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
      setIsRegisterMode(false);
      setEmail(regEmail); // Pre-fill email for convenience
    }, 3000);
  };
  
  const renderLoginForm = () => (
    <form onSubmit={handleLogin} className="space-y-6">
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="you@example.com"
            required
          />
        </div>
      </div>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="••••••••"
            required
          />
        </div>
      </div>
      
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
        type="submit"
        disabled={isLoading}
        className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
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
      
      <div className="flex flex-col space-y-4 text-center mt-4">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <button 
            type="button"
            onClick={() => {
              setIsRegisterMode(true);
              setIsResetMode(false);
            }}
            className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            Create account
          </button>
        </p>
        
        <button
          type="button"
          onClick={() => {
            setIsResetMode(true);
            setIsRegisterMode(false);
            setResetEmail(email);
          }}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium"
        >
          Forgot your password?
        </button>
      </div>
    </form>
  );
  
  const renderResetForm = () => (
    <form onSubmit={handleForgotPassword} className="space-y-6">
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="reset-email">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <input
            id="reset-email"
            type="email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="you@example.com"
            required
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Enter the email address associated with your account, and we'll send you instructions to reset your password.
        </p>
      </div>
      
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => setIsResetMode(false)}
          className="w-1/2 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
        >
          Back to Login
        </button>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-1/2 flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
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
          <label className="block text-gray-700 font-medium mb-2" htmlFor="reg-name">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              id="reg-name"
              type="text"
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="John Doe"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="reg-email">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <input
              id="reg-email"
              type="email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="reg-company">
            Company Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 3H7v2h2V8zm2-3h2v2h-2V5zm2 3h-2v2h2V8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              id="reg-company"
              type="text"
              value={regCompany}
              onChange={(e) => setRegCompany(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Acme Inc."
            />
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="reg-role">
            Job Title
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
            </div>
            <input
              id="reg-role"
              type="text"
              value={regRole}
              onChange={(e) => setRegRole(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="HR Manager"
            />
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="reg-phone">
          Phone Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </div>
          <input
            id="reg-phone"
            type="tel"
            value={regPhone}
            onChange={(e) => setRegPhone(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="(123) 456-7890"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="reg-password">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            id="reg-password"
            type="password"
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="••••••••"
            required
            minLength={8}
          />
        </div>
        
        {/* Password strength indicator */}
        {regPassword && (
          <div className="mt-2">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getPasswordStrengthColor()}`} 
                style={{ width: `${(passwordStrength / 5) * 100}%` }}
              ></div>
            </div>
            <p className="mt-1 text-xs text-gray-500 flex justify-between">
              <span>Password strength: {passwordStrength <= 1 ? "Weak" : passwordStrength <= 3 ? "Medium" : "Strong"}</span>
              {passwordFeedback && <span>{passwordFeedback}</span>}
            </p>
          </div>
        )}
      </div>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="reg-confirm-password">
          Confirm Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            id="reg-confirm-password"
            type="password"
            value={regConfirmPassword}
            onChange={(e) => setRegConfirmPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="••••••••"
            required
          />
        </div>
        {regConfirmPassword && regPassword !== regConfirmPassword && (
          <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
        )}
      </div>
      
      <div className="space-y-3 mt-4">
        <div className="flex items-start">
          <input
            id="reg-terms"
            name="reg-terms"
            type="checkbox"
            checked={regTerms}
            onChange={(e) => setRegTerms(e.target.checked)}
            className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="reg-terms" className="ml-2 block text-sm text-gray-700">
            I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> <span className="text-red-500">*</span>
          </label>
        </div>
        
        <div className="flex items-start">
          <input
            id="reg-marketing"
            name="reg-marketing"
            type="checkbox"
            checked={regMarketing}
            onChange={(e) => setRegMarketing(e.target.checked)}
            className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="reg-marketing" className="ml-2 block text-sm text-gray-700">
            I'd like to receive updates about products, features, and promotional offers from AlignHR
          </label>
        </div>
      </div>
      
      <div className="flex space-x-4 mt-6">
        <button
          type="button"
          onClick={() => setIsRegisterMode(false)}
          className="w-1/3 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
        >
          Back to Login
        </button>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-2/3 flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
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
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              {isResetMode ? "Reset Your Password" : isRegisterMode ? "Create Your Account" : "Sign in to AlignHR"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isResetMode 
                ? "Enter your email to receive password reset instructions" 
                : isRegisterMode 
                  ? "Fill in your details to create your account" 
                  : "The HR platform that aligns with your business needs"}
            </p>
          </div>
          
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
          
          <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
            {isResetMode 
              ? renderResetForm() 
              : isRegisterMode 
                ? renderRegisterForm() 
                : renderLoginForm()}
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-blue-600">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-900 opacity-90"></div>
          <div className="flex flex-col justify-center h-full px-10 relative z-10">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-6">Welcome to AlignHR</h1>
              <p className="text-xl mb-8">Your complete HR solution for managing teams and businesses efficiently.</p>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl mb-10">
                <blockquote className="italic text-lg">
                  "AlignHR has transformed how we manage our team. It's the perfect platform for modern HR operations."
                </blockquote>
                <div className="mt-4 font-medium text-blue-200">
                  Jane Smith, HR Director at TechCorp
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}