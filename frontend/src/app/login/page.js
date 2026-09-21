'use client';

import { useState } from 'react';
import Link from 'next/link';
import { authAPI } from '@/utils/api';


export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authAPI.login(formData);
      
      if (data.success) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data));
        window.location.href = '/';
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block">
            <img src="/examineiq-logo-clean.png" alt="ExamineIQ" className="h-10 mx-auto mb-4" />
          </Link>
          <p className="text-text-secondary font-body text-base">Welcome back! Please login to your account.</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-card-lg border border-border shadow-[0_2px_12px_rgba(23,40,74,0.08)] p-8">
          <h2 className="text-2xl font-bold font-heading text-navy mb-6">Login</h2>

          {error && (
            <div className="bg-error/5 border border-error/20 text-error px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium font-body text-navy mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-border rounded-lg font-body text-navy focus:ring-2 focus:ring-cyan focus:border-cyan outline-none transition bg-white hover:border-cyan/50"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium font-body text-navy mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-border rounded-lg font-body text-navy focus:ring-2 focus:ring-cyan focus:border-cyan outline-none transition bg-white hover:border-cyan/50"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-cyan focus:ring-cyan border-border rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm font-body text-text-secondary">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium font-body text-cyan hover:text-cyan/80 transition">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green text-white py-3 rounded-full font-semibold font-body text-[15px] hover:bg-green-dark hover:shadow-[0_5px_16px_rgba(95,174,106,0.3)] hover:-translate-y-0.5 active:bg-green-darker active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm font-body text-text-secondary">
              Don't have an account?{' '}
              <Link href="/signup" className="font-medium text-cyan hover:text-cyan/80 transition">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm font-body text-text-secondary hover:text-navy transition inline-flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:-translate-x-1">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
