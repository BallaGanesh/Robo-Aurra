import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineRocket } from "react-icons/md";
import { HiOutlineSparkles } from "react-icons/hi2";
import { AiOutlineStar } from "react-icons/ai";

const Landing = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      id: 1,
      icon: <MdOutlineRocket className="w-8 h-8" />,
      title: "Lightning Fast",
      description:
        "Experience blazing fast performance with our optimized platform",
    },
    {
      id: 2,
      icon: <HiOutlineSparkles className="w-8 h-8" />,
      title: "Smart Connect",
      description:
        "Connect with like-minded people and build meaningful relationships",
    },
    {
      id: 3,
      icon: <AiOutlineStar className="w-8 h-8" />,
      title: "Rich Features",
      description: "Explore a world of features designed for modern creators",
    },
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "50K+", label: "Posts Daily" },
    { number: "100K+", label: "Connections" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* NAVIGATION BAR */}
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
              <img src="/Only logo-aurra.png" alt="AURRA Logo" />
            </div>
            <span className="text-2xl font-bold gradient-text hidden lg:inline bg-linear-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              AURRA
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-6 py-2 rounded-full text-foreground font-semibold hover:bg-gray-100 transition-all duration-300"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 rounded-full bg-linear-to-r from-cyan-400 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO BANNER SECTION */}
      <div className="relative min-h-[90vh] overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-linear-to-br from-cyan-400/10 via-purple-600/10 to-purple-600/10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 px-4 md:px-8 py-12 md:py-20">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="text-sm font-semibold bg-linear-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome to AURRA
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="text-center mb-8 space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-linear-to-r from-cyan-400 via-purple-600 to-cyan-4
                00 bg-clip-text text-transparent">
                  Connect, Create &
                </span>
                <br />
                <span className="bg-linear-to-r from-purple-600 via-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  Collaborate
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Join a vibrant community where ideas flourish, connections
                deepen, and creativity knows no bounds. Share your thoughts,
                discover inspiring stories, and build meaningful relationships.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <Link
                to="/register"
                className="px-8 py-4 rounded-full bg-linear-to-r from-cyan-400 to-purple-600 text-white font-semibold hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                Get Started
                <FaArrowRight size={18} />
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 rounded-full border-2 border-gray-300 text-foreground font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Sign In
                <FaArrowRight size={18} />
              </Link>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 mb-20 py-8 border-y border-gray-200">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl md:text-4xl font-bold bg-linear-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                    {stat.number}
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Hero Image/Illustration */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              <div className="aspect-video bg-linear-to-br from-cyan-400/20 via-purple-500/20 to-cyan-400/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-linear-to-r from-cyan-400 to-purple-600 mx-auto mb-4 flex items-center justify-center">
                    <img
                      src="/Only logo-aurra.png"
                      alt="AURRA"
                      className="w-12 h-12"
                    />
                  </div>
                  <p className="text-lg font-semibold text-foreground">
                    Your Social Hub Awaits
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Experience the future of social connection
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="py-20 md:py-28 px-4 md:px-8 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why Choose{" "}
              <span className="bg-linear-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                AURRA
              </span>
              ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover what makes AURRA the perfect platform for your social
              needs
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.id}
                onMouseEnter={() => setHoveredCard(feature.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`p-8 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  hoveredCard === feature.id
                    ? "border-cyan-400 bg-cyan-400/5 shadow-2xl shadow-cyan-400/20 transform -translate-y-2"
                    : "border-gray-200 bg-white hover:border-cyan-300"
                }`}
              >
                <div className="w-12 h-12 rounded-lg bg-linear-to-r from-cyan-400/20 to-purple-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="py-20 md:py-28 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-3xl bg-linear-to-r from-cyan-400/10 via-purple-600/10 to-cyan-400/10 border border-cyan-400/20 p-12 md:p-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Join the Community?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start connecting, sharing, and growing with thousands of users on
              AURRA today.
            </p>
            <Link
              to="/register"
              className="inline-block px-10 py-4 rounded-full bg-linear-to-r from-cyan-400 to-purple-600 text-white font-semibold hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
            >
              Create Account Now
            </Link>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Landing;
