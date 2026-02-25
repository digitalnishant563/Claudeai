import React from 'react'
import { Link } from 'react-router-dom'
import {
  Flame, Zap, Target, Droplets, TrendingUp,
  ChevronRight, Clock, Users, Star
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { user, weeklyProgress, classes, challenges } from '../data/mockData'
import './Home.css'

const StatCard = ({ icon, label, value, unit, color, progress, total }) => (
  <div className="stat-card">
    <div className="stat-icon" style={{ background: `${color}22`, color }}>
      {icon}
    </div>
    <div className="stat-info">
      <p className="stat-label">{label}</p>
      <p className="stat-value">
        {value} <span className="stat-unit">{unit}</span>
      </p>
    </div>
    {progress !== undefined && (
      <div className="stat-progress-wrap">
        <div className="stat-progress-bar">
          <div
            className="stat-progress-fill"
            style={{
              width: `${Math.min((progress / total) * 100, 100)}%`,
              background: color
            }}
          />
        </div>
        <p className="stat-goal">{Math.round((progress / total) * 100)}% of goal</p>
      </div>
    )}
  </div>
)

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{label}</p>
        <p className="tooltip-value">{payload[0].value} cal</p>
      </div>
    )
  }
  return null
}

function Home() {
  const upcomingClasses = classes.filter(c => c.isBooked).slice(0, 2)
  const liveClasses = classes.filter(c => c.isLive).slice(0, 3)
  const totalCaloriesWeek = weeklyProgress.reduce((sum, d) => sum + d.calories, 0)
  const daysWorked = weeklyProgress.filter(d => d.workouts > 0).length

  return (
    <div className="home-page page-container">
      {/* Welcome Banner */}
      <div className="welcome-banner animate-slideUp">
        <div className="welcome-content">
          <h2 className="welcome-title">
            Good morning, {user.name.split(' ')[0]}! 👋
          </h2>
          <p className="welcome-subtitle">
            You've worked out <strong>{daysWorked} days</strong> this week. Keep pushing!
          </p>
          <div className="welcome-actions">
            <Link to="/classes" className="btn-primary">
              <Zap size={16} /> Book a Class
            </Link>
            <Link to="/workouts" className="btn-secondary">
              Start Workout
            </Link>
          </div>
        </div>
        <div className="welcome-stats">
          <div className="streak-circle">
            <Flame size={28} fill="#FF4500" color="#FF4500" />
            <span className="streak-number">{user.streak}</span>
            <span className="streak-label">Day Streak</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          icon={<Flame size={20} />}
          label="Calories Burned"
          value={user.stats.caloriesBurned}
          unit="kcal"
          color="#FF4500"
          progress={user.stats.caloriesBurned}
          total={1800}
        />
        <StatCard
          icon={<Target size={20} />}
          label="Weekly Workouts"
          value={user.stats.weeklyWorkouts}
          unit={`/ ${user.goals.weeklyWorkouts}`}
          color="#48bb78"
          progress={user.stats.weeklyWorkouts}
          total={user.goals.weeklyWorkouts}
        />
        <StatCard
          icon={<TrendingUp size={20} />}
          label="Steps Today"
          value={user.stats.steps.toLocaleString()}
          unit="steps"
          color="#4299e1"
          progress={user.stats.steps}
          total={user.goals.dailySteps}
        />
        <StatCard
          icon={<Droplets size={20} />}
          label="Water Intake"
          value={user.stats.waterIntake}
          unit="L"
          color="#9f7aea"
          progress={user.stats.waterIntake}
          total={user.goals.waterIntake}
        />
      </div>

      <div className="home-grid">
        {/* Weekly Activity Chart */}
        <div className="card chart-card">
          <div className="card-header">
            <h3 className="card-title">Weekly Activity</h3>
            <span className="card-total">{totalCaloriesWeek.toLocaleString()} kcal total</span>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={weeklyProgress} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="calorieGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF4500" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FF4500" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                <XAxis dataKey="day" stroke="#718096" tick={{ fontSize: 12 }} />
                <YAxis stroke="#718096" tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="calories"
                  stroke="#FF4500"
                  strokeWidth={2}
                  fill="url(#calorieGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Challenges */}
        <div className="card challenges-card">
          <div className="card-header">
            <h3 className="card-title">Active Challenges</h3>
            <Link to="/progress" className="card-link">View all <ChevronRight size={14} /></Link>
          </div>
          <div className="challenges-list">
            {challenges.map(challenge => (
              <div key={challenge.id} className="challenge-item">
                <div className="challenge-icon" style={{ background: `${challenge.color}22` }}>
                  {challenge.icon}
                </div>
                <div className="challenge-info">
                  <p className="challenge-name">{challenge.name}</p>
                  <p className="challenge-sub">
                    Day {challenge.currentDay}/{challenge.days} · {challenge.participants.toLocaleString()} joined
                  </p>
                  <div className="challenge-bar">
                    <div
                      className="challenge-fill"
                      style={{
                        width: `${(challenge.currentDay / challenge.days) * 100}%`,
                        background: challenge.color
                      }}
                    />
                  </div>
                </div>
                <span className="challenge-pct">
                  {Math.round((challenge.currentDay / challenge.days) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Classes */}
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Live Now 🔴</h2>
          <Link to="/classes" className="see-all">See all <ChevronRight size={16} /></Link>
        </div>
        <div className="live-classes-grid">
          {liveClasses.map(cls => (
            <div key={cls.id} className="live-class-card" style={{ borderColor: `${cls.bgColor}44` }}>
              <div className="live-class-emoji" style={{ background: `${cls.bgColor}22` }}>
                {cls.image}
              </div>
              <div className="live-class-info">
                <div className="live-class-top">
                  <span className="badge badge-live">● LIVE</span>
                </div>
                <h4 className="live-class-name">{cls.name}</h4>
                <p className="live-class-trainer">{cls.trainer}</p>
                <div className="live-class-meta">
                  <span><Clock size={12} /> {cls.duration} min</span>
                  <span><Users size={12} /> {cls.slots} spots left</span>
                  <span><Star size={12} fill="#ed8936" color="#ed8936" /> {cls.rating}</span>
                </div>
              </div>
              <button className="join-btn" style={{ background: cls.bgColor }}>Join</button>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Booked Classes */}
      {upcomingClasses.length > 0 && (
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Today's Schedule</h2>
          </div>
          <div className="booked-classes">
            {upcomingClasses.map(cls => (
              <div key={cls.id} className="booked-class-item">
                <div className="booked-emoji">{cls.image}</div>
                <div className="booked-info">
                  <h4>{cls.name}</h4>
                  <p>{cls.trainer} · {cls.time}</p>
                </div>
                <div className="booked-meta">
                  <span className="badge badge-new">Booked</span>
                  <span className="booked-cal">{cls.calories} kcal</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
