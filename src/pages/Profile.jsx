import React, { useState } from 'react'
import { Edit2, Settings, Bell, Shield, LogOut, ChevronRight, Camera, Star, Zap } from 'lucide-react'
import { user, achievements, workoutHistory } from '../data/mockData'
import './Profile.css'

const menuItems = [
  { icon: Bell, label: 'Notifications', desc: 'Class reminders & updates', color: '#ed8936' },
  { icon: Shield, label: 'Privacy & Security', desc: 'Manage your data', color: '#4299e1' },
  { icon: Settings, label: 'App Settings', desc: 'Theme, units, language', color: '#9f7aea' },
  { icon: Star, label: 'Rate FitPulse', desc: 'Share your feedback', color: '#48bb78' },
]

const fitnessGoals = [
  { label: "Weekly Workouts", value: user.goals.weeklyWorkouts, unit: "sessions", current: user.stats.weeklyWorkouts, color: "#FF4500" },
  { label: "Daily Calories Goal", value: user.goals.dailyCalories, unit: "kcal", current: 1831, color: "#e94560" },
  { label: "Daily Steps", value: user.goals.dailySteps, unit: "steps", current: user.stats.steps, color: "#4299e1" },
  { label: "Water Intake", value: user.goals.waterIntake, unit: "liters", current: user.stats.waterIntake, color: "#9f7aea" },
]

function GoalBar({ goal }) {
  const pct = Math.min((goal.current / goal.value) * 100, 100)
  return (
    <div className="goal-bar-item">
      <div className="goal-bar-header">
        <span className="goal-label">{goal.label}</span>
        <span className="goal-value" style={{ color: goal.color }}>
          {goal.current} / {goal.value} {goal.unit}
        </span>
      </div>
      <div className="goal-progress">
        <div className="goal-fill" style={{ width: `${pct}%`, background: goal.color }} />
      </div>
    </div>
  )
}

function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const earnedAchievements = achievements.filter(a => a.earned)
  const totalCalories = workoutHistory.reduce((s, w) => s + w.calories, 0)

  return (
    <div className="profile-page page-container">
      {/* Profile Hero */}
      <div className="profile-hero">
        <div className="profile-avatar-wrap">
          <div className="profile-avatar">{user.avatar}</div>
          <button className="camera-btn">
            <Camera size={14} />
          </button>
        </div>
        <div className="profile-info">
          <div className="profile-name-row">
            <h2 className="profile-name">{user.name}</h2>
            <button className="edit-profile-btn" onClick={() => setIsEditing(!isEditing)}>
              <Edit2 size={14} /> Edit Profile
            </button>
          </div>
          <p className="profile-email">{user.email}</p>
          <div className="profile-badges">
            <span className="level-badge-pill">
              <Zap size={12} fill="#FF4500" color="#FF4500" />
              {user.level}
            </span>
            <span className="join-badge">Member since {user.joinDate}</span>
          </div>
        </div>
      </div>

      {/* Profile Stats */}
      <div className="profile-stats-grid">
        <div className="profile-stat-card">
          <span className="psc-value gradient-text">{user.streak}</span>
          <span className="psc-label">Day Streak</span>
        </div>
        <div className="profile-stat-card">
          <span className="psc-value gradient-text">{user.totalWorkouts}</span>
          <span className="psc-label">Total Workouts</span>
        </div>
        <div className="profile-stat-card">
          <span className="psc-value gradient-text">{earnedAchievements.length}</span>
          <span className="psc-label">Achievements</span>
        </div>
        <div className="profile-stat-card">
          <span className="psc-value gradient-text">{(totalCalories / 1000).toFixed(1)}k</span>
          <span className="psc-label">kcal Burned</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        {['overview', 'goals', 'achievements'].map(tab => (
          <button
            key={tab}
            className={`ptab-btn ${activeTab === tab ? 'ptab-active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="profile-overview">
          {/* Personal Details */}
          <div className="card detail-card">
            <h3 className="card-title">Personal Details</h3>
            <div className="detail-grid">
              {[
                { label: "Age", value: "24 years" },
                { label: "Height", value: "175 cm" },
                { label: "Weight", value: "72.5 kg" },
                { label: "Blood Type", value: "O+" },
                { label: "Fitness Level", value: "Intermediate" },
                { label: "Primary Goal", value: "Weight Loss" },
              ].map((d, i) => (
                <div key={i} className="detail-item">
                  <span className="detail-label">{d.label}</span>
                  <span className="detail-value">{d.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Settings Menu */}
          <div className="card settings-card">
            <h3 className="card-title">Settings</h3>
            <div className="settings-list">
              {menuItems.map((item, i) => (
                <button key={i} className="settings-item">
                  <div className="settings-icon" style={{ background: `${item.color}22`, color: item.color }}>
                    <item.icon size={18} />
                  </div>
                  <div className="settings-text">
                    <span className="settings-label">{item.label}</span>
                    <span className="settings-desc">{item.desc}</span>
                  </div>
                  <ChevronRight size={16} color="#718096" />
                </button>
              ))}
              <button className="settings-item logout-item">
                <div className="settings-icon" style={{ background: 'rgba(233,69,96,0.15)', color: '#e94560' }}>
                  <LogOut size={18} />
                </div>
                <div className="settings-text">
                  <span className="settings-label logout-label">Sign Out</span>
                </div>
                <ChevronRight size={16} color="#718096" />
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'goals' && (
        <div className="card goals-card">
          <h3 className="card-title">My Fitness Goals</h3>
          <p className="goals-subtitle">Track your daily and weekly targets</p>
          <div className="goals-list">
            {fitnessGoals.map((goal, i) => (
              <GoalBar key={i} goal={goal} />
            ))}
          </div>
          <button className="btn-primary edit-goals-btn">
            <Edit2 size={14} /> Edit Goals
          </button>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="achievements-section">
          <div className="achievements-summary">
            <span className="ach-count">{earnedAchievements.length} of {achievements.length}</span>
            <span className="ach-label"> achievements unlocked</span>
          </div>
          <div className="profile-achievements-grid">
            {achievements.map(ach => (
              <div key={ach.id} className={`profile-achievement ${!ach.earned ? 'profile-ach-locked' : ''}`}>
                <span className="profile-ach-icon">{ach.icon}</span>
                <p className="profile-ach-name">{ach.name}</p>
                {ach.earned ? (
                  <p className="profile-ach-date">{ach.date}</p>
                ) : (
                  <p className="profile-ach-locked">Locked</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
