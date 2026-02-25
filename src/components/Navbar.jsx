import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu, Bell, Search, Flame } from 'lucide-react'
import { user } from '../data/mockData'
import './Navbar.css'

const pageTitles = {
  '/home': 'Dashboard',
  '/classes': 'Fitness Classes',
  '/workouts': 'My Workouts',
  '/nutrition': 'Nutrition',
  '/progress': 'Progress',
  '/profile': 'Profile',
}

function Navbar({ onMenuClick }) {
  const location = useLocation()
  const [searchOpen, setSearchOpen] = useState(false)
  const title = pageTitles[location.pathname] || 'FitPulse'
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="menu-btn" onClick={onMenuClick}>
          <Menu size={22} />
        </button>
        <div>
          <h1 className="navbar-title">{title}</h1>
          <p className="navbar-date">{today}</p>
        </div>
      </div>

      <div className="navbar-right">
        <div className="streak-badge">
          <Flame size={14} fill="#FF4500" color="#FF4500" />
          <span>{user.streak} day streak</span>
        </div>

        <button className="icon-btn" onClick={() => setSearchOpen(!searchOpen)}>
          <Search size={18} />
        </button>

        <button className="icon-btn notification-btn">
          <Bell size={18} />
          <span className="notif-dot" />
        </button>

        <div className="user-avatar">
          {user.avatar}
        </div>
      </div>

      {searchOpen && (
        <div className="search-bar">
          <Search size={16} />
          <input placeholder="Search classes, workouts, trainers..." autoFocus onBlur={() => setSearchOpen(false)} />
        </div>
      )}
    </header>
  )
}

export default Navbar
