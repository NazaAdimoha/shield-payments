"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Globe, Zap, Lock, ArrowRight, CircleDollarSign } from 'lucide-react';
import { ShinyButton } from '@/components/ui/fancy-button';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardHover = {
  hover: { 
    y: -10,
    scale: 1.02,
    transition: { type: "spring", stiffness: 300 }
  }
};

const floating = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-brand-25 to-brand-100">
      {/* Hero Section */}
      <header className="relative px-4 py-24 overflow-hidden md:py-32">
        <motion.div 
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-grid-brand-500/[0.05] bg-[size:64px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90" />
        </motion.div>
        
        <motion.div 
          className="max-w-6xl mx-auto text-center"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <motion.div
            variants={fadeIn}
            className="inline-flex items-center mb-4 space-x-2 px-4 py-2 rounded-full bg-brand-100 border border-brand-200"
          >
            <CircleDollarSign className="w-5 h-5 text-brand-600" />
            <span className="text-brand-700 font-medium">Future of Financial Infrastructure</span>
            <ArrowRight className="w-4 h-4 text-brand-600" />
          </motion.div>
          
          <motion.h1 
            className="mb-6 text-5xl font-bold text-gray-900 md:text-7xl font-heading"
            variants={fadeIn}
          >
            Secure Payments
            <motion.span 
              className="block mt-4 bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              style={{
                backgroundSize: '200% 200%',
                backgroundImage: 'linear-gradient(45deg, #4f46e5, #8B5CF6, #4f46e5)'
              }}
            >
              Built for Scale
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="max-w-2xl mx-auto mb-12 text-lg text-gray-600 md:text-xl"
            variants={fadeIn}
          >
            Powering the next generation of financial services with enterprise-grade security, 
            real-time settlements, and global payment capabilities.
          </motion.p>
          
          <motion.div 
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            variants={fadeIn}
          >
            <ShinyButton href="/sign-in" className="py-4 px-8 bg-gradient-to-r from-brand-600 to-brand-500">
              Start Building Now
            </ShinyButton>
            <ShinyButton href="/sign-up" className="py-4 px-8 border-2 border-brand-500 bg-transparent text-brand-600">
              Contact Sales
            </ShinyButton>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-24 max-w-6xl mx-auto"
          variants={fadeIn}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="relative rounded-2xl bg-gradient-to-br from-brand-600 to-brand-400 p-1 shadow-2xl">
            <div className="rounded-xl bg-white overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-brand-50 to-white" />
              <motion.div 
                className="absolute -top-8 right-8"
                variants={floating}
              >
                <div className="p-4 bg-white rounded-xl shadow-2xl">
                  <Zap className="w-12 h-12 text-brand-600" />
                </div>
              </motion.div>
              <motion.div 
                className="absolute -bottom-8 left-8"
                variants={floating}
                animate={{ 
                  y: [0, -15, 0],
                  transition: { delay: 0.5, ...floating.animate.transition }
                }}
              >
                <div className="p-4 bg-white rounded-xl shadow-2xl">
                  <Lock className="w-12 h-12 text-brand-600" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Features Section */}
      <motion.section 
        className="px-4 py-24 bg-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="mb-16 text-4xl font-bold text-center text-gray-900 md:text-5xl font-heading"
            variants={fadeIn}
          >
            Enterprise-Grade Payment Infrastructure
          </motion.h2>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: <Shield className="w-12 h-12 text-brand-600" />,
                title: "Military-Grade Security",
                description: "End-to-end encryption and PCI DSS compliance ensuring your transactions are always protected."
              },
              {
                icon: <Globe className="w-12 h-12 text-brand-600" />,
                title: "Global Reach",
                description: "Process payments in 150+ currencies with local acquiring networks for higher success rates."
              },
              {
                icon: <Zap className="w-12 h-12 text-brand-600" />,
                title: "Real-Time Processing",
                description: "99.99% uptime with sub-second transaction processing powered by distributed systems."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                whileHover="hover"
                className="group relative p-8 transition-all duration-300 bg-white rounded-xl border-2 border-brand-50 hover:border-brand-100"
              >
                <motion.div 
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-50 to-white opacity-0 group-hover:opacity-100 transition-opacity"
                  variants={{
                    hover: { opacity: 1 }
                  }}
                />
                <div className="relative">
                  <motion.div 
                    className="flex justify-center mb-6"
                    whileHover={{ scale: 1.1 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="mb-4 text-2xl font-semibold text-center text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-center text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="px-4 py-24 text-white bg-brand-950"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={stagger}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3">
            {[
              { number: "$500B+", label: "Processed Annually" },
              { number: "150+", label: "Countries Supported" },
              { number: "99.99%", label: "System Uptime" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="relative p-8 overflow-hidden rounded-xl group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-600/30 to-brand-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="mb-4 text-5xl font-bold text-brand-400">{stat.number}</div>
                  <div className="text-xl text-brand-200">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="px-4 py-24 bg-gradient-to-br from-brand-950 to-brand-900"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={stagger}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="mb-6 text-4xl font-bold text-white md:text-5xl font-heading"
            variants={fadeIn}
          >
            Ready to Revolutionize Your Payments?
          </motion.h2>
          <motion.p 
            className="mb-12 text-lg text-brand-200"
            variants={fadeIn}
          >
            Join thousands of businesses scaling their financial infrastructure with ShieldPay
          </motion.p>
          <motion.div 
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            variants={fadeIn}
          >
            <ShinyButton href="/sign-up" className="py-4 px-8 bg-white text-brand-600 hover:bg-gray-100">
              Get Started Free
            </ShinyButton>
            <ShinyButton href="/demo" className="py-4 px-8 border-2 border-white bg-transparent text-white hover:bg-white/10">
              Schedule Demo
            </ShinyButton>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="px-4 py-12 text-brand-200 bg-brand-950">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">© 2025 ShieldPay Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;