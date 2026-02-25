import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Home, Dumbbell, Calendar, Apple, TrendingUp, User, X, Zap
} from 'lucide-react'
import './Sidebar.css'

const navItems = [
  { path: '/home', icon: Home, label: 'Dashboard' },
  { path: '/classes', icon: Calendar, label: 'Classes' },
  { path: '/workouts', icon: Dumbbell, label: 'Workouts' },
  { path: '/nutrition', icon: Apple, label: 'Nutrition' },
  { path: '/progress', icon: TrendingUp, label: 'Progress' },
  { path: '/profile', icon: User, label: 'Profile' },
]

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              <Zap size={20} fill="white" />
            </div>
            <span className="logo-text">FitPulse</span>
          </div>
          <button className="sidebar-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(({ path, icon: Icon, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'nav-item-active' : ''}`
              }
              onClick={onClose}
            >
              <Icon size={20} />
              <span>{label}</span>
              {path === '/classes' && (
                <span className="nav-badge">Live</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-promo">
          <div className="promo-icon">🏆</div>
          <div className="promo-text">
            <p className="promo-title">Go Premium</p>
            <p className="promo-desc">Unlock unlimited classes & personal training</p>
          </div>
          <button className="promo-btn">Upgrade</button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
