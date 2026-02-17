import { Link } from 'react-router-dom';
import { CheckCircle, Zap, Shield, Users, ArrowRight } from 'lucide-react';
import PencilPaperIcon from '../components/PencilPaperIcon';

const Landing = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Lightning Fast',
      description: 'Built with React and modern technologies for blazing fast performance',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure & Safe',
      description: 'JWT authentication with encrypted passwords keeps your data protected',
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Task Management',
      description: 'Create, organize, and track your tasks with ease and efficiency',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'User Friendly',
      description: 'Intuitive interface designed for the best user experience',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="text-center">
            <div className="inline-block mb-8 animate-float">
              <div className="p-4 glass-effect rounded-2xl border border-white/20 shadow-2xl">
                <PencilPaperIcon size={64} />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
              Task Management
              <br />
              Made Simple
            </h1>
            
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Organize your work and life with our beautiful, fast, and secure task management platform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="btn-gradient px-8 py-4 rounded-lg text-white font-semibold text-lg flex items-center justify-center gap-2 group"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="glass-effect px-8 py-4 rounded-lg text-white font-semibold text-lg border border-white/20 hover:bg-white/10 transition-all"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gradient-text mb-4">
            Why Choose Us?
          </h2>
          <p className="text-slate-400 text-lg">
            Everything you need to manage your tasks efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-effect rounded-xl p-6 border border-white/10 card-hover group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="glass-effect rounded-2xl p-12 text-center border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already managing their tasks more efficiently
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 btn-gradient px-8 py-4 rounded-lg text-white font-semibold text-lg"
            >
              Create Your Free Account
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400">
          <p>© 2024 Task Manager. Built with React, Node.js, and MongoDB.</p>
          <p className="text-sm mt-2">Secure • Fast • Beautiful</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;