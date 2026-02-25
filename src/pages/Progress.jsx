import React, { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend
} from 'recharts'
import { TrendingUp, Award, Calendar, Zap } from 'lucide-react'
import { weeklyProgress, monthlyProgress, workoutHistory, challenges, achievements } from '../data/mockData'
import './Progress.css'

const bodyMeasurements = [
  { label: "Weight", value: "72.5 kg", change: "-1.2 kg", color: "#FF4500", trend: "down" },
  { label: "Body Fat", value: "16.8%", change: "-0.8%", color: "#e94560", trend: "down" },
  { label: "Muscle Mass", value: "58.3 kg", change: "+0.5 kg", color: "#48bb78", trend: "up" },
  { label: "BMI", value: "22.4", change: "-0.3", color: "#4299e1", trend: "down" },
]

const performanceData = [
  { month: 'Oct', pushups: 30, squats: 50, plank: 45 },
  { month: 'Nov', pushups: 38, squats: 60, plank: 55 },
  { month: 'Dec', pushups: 42, squats: 65, plank: 60 },
  { month: 'Jan', pushups: 50, squats: 75, plank: 75 },
  { month: 'Feb', pushups: 55, squats: 85, plank: 90 },
]

const CustomBarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#1a1a2e', border: '1px solid #2d3748',
        borderRadius: 8, padding: '8px 12px'
      }}>
        <p style={{ color: '#a0aec0', fontSize: 12, marginBottom: 4 }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.fill, fontSize: 13, fontWeight: 600 }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

function Progress() {
  const [period, setPeriod] = useState('week')
  const chartData = period === 'week' ? weeklyProgress : monthlyProgress

  const totalWorkoutsWeek = weeklyProgress.filter(d => d.workouts > 0).length
  const totalCalWeek = weeklyProgress.reduce((s, d) => s + d.calories, 0)
  const avgSteps = Math.round(weeklyProgress.reduce((s, d) => s + d.steps, 0) / weeklyProgress.length)

  return (
    <div className="progress-page page-container">
      <div className="progress-header">
        <h2 className="section-title">Progress Tracker</h2>
        <div className="period-toggle">
          <button className={period === 'week' ? 'period-active' : ''} onClick={() => setPeriod('week')}>Week</button>
          <button className={period === 'month' ? 'period-active' : ''} onClick={() => setPeriod('month')}>Month</button>
        </div>
      </div>

      {/* Key Stats */}
      <div className="progress-stats">
        <div className="progress-stat">
          <Calendar size={20} color="#FF4500" />
          <div>
            <p className="ps-value">{totalWorkoutsWeek}</p>
            <p className="ps-label">Workouts this week</p>
          </div>
        </div>
        <div className="progress-stat">
          <Zap size={20} color="#ed8936" />
          <div>
            <p className="ps-value">{totalCalWeek.toLocaleString()}</p>
            <p className="ps-label">kcal burned</p>
          </div>
        </div>
        <div className="progress-stat">
          <TrendingUp size={20} color="#48bb78" />
          <div>
            <p className="ps-value">{avgSteps.toLocaleString()}</p>
            <p className="ps-label">Avg daily steps</p>
          </div>
        </div>
      </div>

      {/* Calorie Burn Chart */}
      <div className="card chart-section">
        <div className="card-header">
          <h3 className="card-title">Calorie Burn</h3>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
            <XAxis dataKey={period === 'week' ? 'day' : 'week'} stroke="#718096" tick={{ fontSize: 12 }} />
            <YAxis stroke="#718096" tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomBarTooltip />} />
            <Bar dataKey="calories" fill="#FF4500" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Body Measurements */}
      <div className="section">
        <h2 className="section-title">Body Measurements</h2>
        <div className="measurements-grid">
          {bodyMeasurements.map((m, i) => (
            <div key={i} className="measurement-card">
              <div className="measure-label">{m.label}</div>
              <div className="measure-value" style={{ color: m.color }}>{m.value}</div>
              <div className={`measure-change ${m.trend === 'down' ? 'change-good' : 'change-gain'}`}>
                {m.trend === 'down' ? '↓' : '↑'} {m.change}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Chart */}
      <div className="card chart-section">
        <div className="card-header">
          <h3 className="card-title">Performance Trends</h3>
          <p className="card-subtitle">Reps / seconds over time</p>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={performanceData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
            <XAxis dataKey="month" stroke="#718096" tick={{ fontSize: 12 }} />
            <YAxis stroke="#718096" tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomBarTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: '#a0aec0' }} />
            <Line type="monotone" dataKey="pushups" stroke="#FF4500" strokeWidth={2} dot={{ fill: '#FF4500', r: 4 }} />
            <Line type="monotone" dataKey="squats" stroke="#4299e1" strokeWidth={2} dot={{ fill: '#4299e1', r: 4 }} />
            <Line type="monotone" dataKey="plank" stroke="#48bb78" strokeWidth={2} dot={{ fill: '#48bb78', r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Achievements */}
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">
            <Award size={22} style={{ display: 'inline', marginRight: 8, color: '#ed8936' }} />
            Achievements
          </h2>
          <span className="achievements-count">
            {achievements.filter(a => a.earned).length}/{achievements.length} earned
          </span>
        </div>
        <div className="achievements-grid">
          {achievements.map(ach => (
            <div key={ach.id} className={`achievement-card ${!ach.earned ? 'achievement-locked' : ''}`}>
              <span className="achievement-icon">{ach.icon}</span>
              <p className="achievement-name">{ach.name}</p>
              {ach.earned ? (
                <p className="achievement-date">{ach.date}</p>
              ) : (
                <p className="achievement-locked-label">Locked</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Active Challenges */}
      <div className="section">
        <h2 className="section-title">Active Challenges</h2>
        <div className="challenges-detail">
          {challenges.map(challenge => (
            <div key={challenge.id} className="challenge-detail-card">
              <div className="challenge-detail-top">
                <div className="chal-icon" style={{ background: `${challenge.color}22` }}>
                  {challenge.icon}
                </div>
                <div className="chal-info">
                  <h4>{challenge.name}</h4>
                  <p>{challenge.participants.toLocaleString()} participants</p>
                </div>
                <div className="chal-progress-text">
                  <span style={{ color: challenge.color }}>{challenge.currentDay}</span>
                  <span className="chal-total">/{challenge.days} days</span>
                </div>
              </div>
              <div className="chal-bar">
                <div
                  className="chal-fill"
                  style={{
                    width: `${(challenge.currentDay / challenge.days) * 100}%`,
                    background: challenge.color
                  }}
                />
              </div>
              <div className="chal-days-row">
                {Array.from({ length: Math.min(challenge.days, 30) }).map((_, i) => (
                  <div
                    key={i}
                    className="chal-day-dot"
                    style={{
                      background: i < challenge.currentDay ? challenge.color : '#2d3748'
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Progress
