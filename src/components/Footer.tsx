import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-primary py-16 px-8">
      <div className="max-w-[100rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <h3 className="font-heading text-2xl text-primary-foreground mb-4">
              MEDTRACK<span className="text-accentcyan">+</span>
            </h3>
            <p className="font-paragraph text-sm text-primary-foreground opacity-70">
              Real-time hospital resource tracking for optimized emergency response and patient care delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg text-primary-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="font-paragraph text-sm text-primary-foreground opacity-70 hover:text-accentcyan transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="font-paragraph text-sm text-primary-foreground opacity-70 hover:text-accentcyan transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <a
                  href="/#about"
                  className="font-paragraph text-sm text-primary-foreground opacity-70 hover:text-accentcyan transition-colors"
                >
                  About System
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading text-lg text-primary-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <span className="font-paragraph text-sm text-primary-foreground opacity-70">
                  Patient Beds
                </span>
              </li>
              <li>
                <span className="font-paragraph text-sm text-primary-foreground opacity-70">
                  Medical Equipment
                </span>
              </li>
              <li>
                <span className="font-paragraph text-sm text-primary-foreground opacity-70">
                  Operating Rooms
                </span>
              </li>
              <li>
                <span className="font-paragraph text-sm text-primary-foreground opacity-70">
                  Emergency Resources
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-heading text-lg text-primary-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="w-4 h-4 text-accentcyan mr-3 mt-1 flex-shrink-0" />
                <span className="font-paragraph text-sm text-primary-foreground opacity-70">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-start">
                <Mail className="w-4 h-4 text-accentcyan mr-3 mt-1 flex-shrink-0" />
                <span className="font-paragraph text-sm text-primary-foreground opacity-70">
                  support@medtrack.health
                </span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 text-accentcyan mr-3 mt-1 flex-shrink-0" />
                <span className="font-paragraph text-sm text-primary-foreground opacity-70">
                  Medical Center, Healthcare District
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground border-opacity-10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-paragraph text-sm text-primary-foreground opacity-50">
              © 2026 MedTrack+. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <span className="font-paragraph text-sm text-primary-foreground opacity-50 hover:text-accentcyan transition-colors cursor-pointer">
                Privacy Policy
              </span>
              <span className="font-paragraph text-sm text-primary-foreground opacity-50 hover:text-accentcyan transition-colors cursor-pointer">
                Terms of Service
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
