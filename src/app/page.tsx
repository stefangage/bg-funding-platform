import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  Wallet,
  FileText,
  CheckCircle2,
  Shield,
  Zap,
  Globe,
  ExternalLink
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-bold">BG</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-900">BG Funding Platform</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="btn btn-secondary hidden sm:flex">
              Sign In
            </Link>
            <Link href="/dashboard" className="btn btn-primary">
              Get Started
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Tracking 8+ active funding programs
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 max-w-4xl mx-auto leading-tight">
            Discover & Apply for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800"> Bulgarian EU Funding </span>
            Programs
          </h1>

          <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
            Automatically match your company with eligible funding programs, generate applications, and track deadlines — all from one platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link href="/dashboard" className="btn btn-primary text-lg px-8 py-4">
              Start Free
              <ArrowRight size={20} />
            </Link>
            <a
              href="https://eufunds.bg"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary text-lg px-8 py-4"
            >
              <Globe size={20} />
              View Official Sources
            </a>
          </div>

          {/* Official Sources Badge */}
          <div className="mt-10 flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Shield size={16} className="text-green-600" />
              Data from official sources:
            </div>
            <a href="https://eumis2020.government.bg" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1">
              ИСУН 2020 <ExternalLink size={12} />
            </a>
            <a href="https://eufunds.bg" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1">
              euFunds.bg <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Everything You Need to Secure Funding
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              From discovery to application submission, we streamline the entire funding process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card text-center">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Building2 size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Company Profiles
              </h3>
              <p className="text-gray-600">
                Add multiple companies with detailed profiles. We automatically calculate your eligibility for each program.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card text-center">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <Wallet size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Smart Matching
              </h3>
              <p className="text-gray-600">
                Our algorithm matches your companies with the best funding opportunities based on industry, size, and activities.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card text-center">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <FileText size={32} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Application Automation
              </h3>
              <p className="text-gray-600">
                Generate task lists, compile documents, and prepare complete application packages in Bulgarian.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'Add Company', desc: 'Enter your company details and documents' },
              { step: 2, title: 'Get Matches', desc: 'See funding programs you qualify for' },
              { step: 3, title: 'Start Application', desc: 'Follow guided task list with deadlines' },
              { step: 4, title: 'Submit', desc: 'Compile documents and submit via ИСУН' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 mx-auto bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-center text-white">
            <Zap size={48} className="mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl font-bold mb-4">
              Start Finding Funding Today
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Join Bulgarian businesses already using our platform to discover and apply for EU funding programs.
            </p>
            <Link href="/dashboard" className="btn bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4">
              Get Started Free
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BG</span>
              </div>
              <span className="text-gray-600">BG Funding Platform</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="https://eumis2020.government.bg" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                ИСУН 2020
              </a>
              <a href="https://eufunds.bg" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                euFunds.bg
              </a>
              <span>© 2026 All rights reserved</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
