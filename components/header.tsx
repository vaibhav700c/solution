'use client';

import { motion } from 'framer-motion';
import { Search, Bell, User, MoreVertical } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 right-0 left-72 h-20 bg-gradient-to-r from-slate-900/95 to-slate-950/95 border-b border-slate-800/50 backdrop-blur-xl z-40 flex items-center justify-between px-8"
    >
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1 max-w-sm"
      >
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search assets, threats..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all duration-200"
          />
        </div>
      </motion.div>

      {/* Right Actions */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-4 ml-8"
      >
        {/* Status Badge */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/20 to-pink-500/20 border border-indigo-500/30"
        >
          <motion.div className="w-2 h-2 rounded-full bg-indigo-400" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          <span className="text-xs font-medium text-indigo-300">Live</span>
        </motion.div>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-lg transition-all"
        >
          <Bell size={20} />
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"
          />
        </motion.button>

        {/* Settings */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-lg transition-all"
        >
          <MoreVertical size={20} />
        </motion.button>

        {/* User Avatar */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-800/50 rounded-lg transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
              MD
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-slate-200">Admin</p>
              <p className="text-xs text-slate-400">Online</p>
            </div>
          </motion.button>

          {/* Dropdown Menu */}
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800/50 rounded-lg shadow-xl"
            >
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-800/50 flex items-center gap-2 rounded-t-lg text-slate-200 transition-colors">
                <User size={16} />
                Profile
              </button>
              <div className="border-t border-slate-800/30" />
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-red-500/10 text-red-400 flex items-center gap-2 rounded-b-lg transition-colors">
                Logout
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.header>
  );
}
