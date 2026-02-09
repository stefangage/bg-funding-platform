import Link from 'next/link';
import { ArrowRight, Building2, Wallet, FileText, ExternalLink } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">BG</span>
            </div>
            <span className="font-bold text-gray-900">BG Funding</span>
          </div>
          <Link href="/dashboard" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 border border-cyan-200 rounded-full text-cyan-700 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            8+ active funding programs
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
            Find EU Funding for{' '}
            <span className="text-orange-500">Bulgarian Businesses</span>
          </h1>

          <p className="text-xl text-gray-600 mb-14 max-w-2xl mx-auto leading-relaxed">
            Match your company with eligible programs, track deadlines, and apply — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/dashboard" className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-10 py-4 rounded-xl font-semibold transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
              Start Free
              <ArrowRight size={20} />
            </Link>
            <a
              href="https://eumis2020.government.bg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-cyan-600 text-lg font-medium flex items-center gap-2 transition-colors"
            >
              ИСУН 2020
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-100"></div>

      {/* Features - Stacked blocks */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-20">
            How It Works
          </h2>

          <div className="space-y-8">
            {/* Block 1 */}
            <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 size={28} className="text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">1. Add Your Company</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Enter your company details — industry, size, and activities. We calculate eligibility for each funding program automatically.
                  </p>
                </div>
              </div>
            </div>

            {/* Block 2 */}
            <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Wallet size={28} className="text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">2. Get Matched Programs</h3>
                  <p className="text-gray-600 leading-relaxed">
                    See funding opportunities ranked by match score. Each program includes amounts, deadlines, and a direct link to ИСУН 2020.
                  </p>
                </div>
              </div>
            </div>

            {/* Block 3 */}
            <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText size={28} className="text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">3. Apply with Guidance</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Follow a step-by-step task list with document requirements. Submit your complete application package via the official portal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-100"></div>

      {/* CTA Section - Light background instead of dark blue */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-orange-50 to-cyan-50 rounded-3xl p-16 border border-orange-100 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Find Funding?
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto">
              Join Bulgarian businesses using our platform to discover and apply for EU funding.
            </p>
            <Link href="/dashboard" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-lg px-10 py-4 rounded-xl font-semibold transition-colors">
              Get Started Free
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-gray-100">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">BG</span>
            </div>
            <span className="font-medium text-gray-700">BG Funding Platform</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://eumis2020.government.bg" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-600 transition-colors">
              ИСУН 2020
            </a>
            <a href="https://eufunds.bg" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-600 transition-colors">
              euFunds.bg
            </a>
          </div>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  );
}
