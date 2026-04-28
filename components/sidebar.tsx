'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  Shield,
  Zap,
  Menu,
  X,
  Droplets,
  Bot,
  Link2,
  Chrome,
  AreaChart,
} from 'lucide-react';

const menuItems = [
  { icon: BarChart3, label: 'Dashboard', href: '/' },
  { icon: Droplets, label: 'Watermark', href: '/watermark' },
  { icon: Bot, label: 'Bot Hunter', href: '/bot-hunter' },
  { icon: Link2, label: 'Blockchain', href: '/blockchain' },
  { icon: Chrome, label: 'Browser Shield', href: '/browser-shield' },
  { icon: AreaChart, label: 'Analytics', href: '/analytics' },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed left-0 top-0 h-screen transition-all duration-300 ${
        isOpen ? 'w-72' : 'w-20'
      } bg-gradient-to-b from-slate-900 via-slate-950 to-black border-r border-slate-800/50 flex flex-col z-50`}
    >
      {/* Header */}
      <motion.div layout className="p-6 border-b border-slate-800/30 flex items-center justify-between">
        <motion.div layout className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.1 }} className="p-2 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-xl">
            <Shield size={24} className="text-white" />
          </motion.div>
          {isOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <h1 className="text-lg font-bold gradient-text">MediaDNA</h1>
              <p className="text-xs text-slate-400">Asset Protection</p>
            </motion.div>
          )}
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 hover:bg-slate-800/50 rounded-lg transition-colors text-slate-400 hover:text-slate-200"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </motion.div>

      {/* Navigation */}
      <motion.nav layout className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;

          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600/80 to-pink-600/80 shadow-lg shadow-indigo-500/20'
                      : 'hover:bg-slate-800/50'
                  }`}
                >
                  <Icon
                    size={20}
                    className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'}
                  />
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className={`text-sm font-medium ${isActive ? 'text-white' : 'text-slate-300'}`}
                    >
                      {item.label}
                    </motion.span>
                  )}
                  {isActive && isOpen && (
                    <motion.div layoutId="activeIndicator" className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </motion.nav>

      {/* Footer */}
      <motion.div layout className="p-4 border-t border-slate-800/30">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full p-3 rounded-lg bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30"
        >
          <Zap size={16} />
          {isOpen && 'Upgrade'}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
