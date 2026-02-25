import React, { useState } from 'react'
import { Clock, Users, Star, Flame, Filter, ChevronDown } from 'lucide-react'
import { classes, categories, trainers } from '../data/mockData'
import './Classes.css'

const intensityColors = {
  Low: '#48bb78',
  Medium: '#ed8936',
  High: '#e94560',
}

function ClassCard({ cls, onBook }) {
  return (
    <div className={`class-card ${cls.isBooked ? 'class-booked' : ''}`}>
      <div className="class-card-top" style={{ background: `linear-gradient(135deg, ${cls.bgColor}33, ${cls.bgColor}11)` }}>
        <div className="class-emoji-wrap">
          <span className="class-emoji">{cls.image}</span>
        </div>
        <div className="class-badges">
          {cls.isLive && <span className="badge badge-live">● LIVE</span>}
          {cls.isBooked && <span className="badge badge-new">✓ Booked</span>}
        </div>
        <div className="class-rating">
          <Star size={12} fill="#ed8936" color="#ed8936" />
          <span>{cls.rating}</span>
          <span className="rating-count">({cls.reviews})</span>
        </div>
      </div>

      <div className="class-card-body">
        <div className="class-category">{cls.category}</div>
        <h3 className="class-name">{cls.name}</h3>
        <p className="class-trainer">by {cls.trainer}</p>
        <p className="class-desc">{cls.description}</p>

        <div className="class-meta">
          <div className="meta-item">
            <Clock size={13} />
            <span>{cls.duration} min</span>
          </div>
          <div className="meta-item">
            <Flame size={13} />
            <span>{cls.calories} kcal</span>
          </div>
          <div className="meta-item">
            <Users size={13} />
            <span>{cls.slots}/{cls.totalSlots}</span>
          </div>
        </div>

        <div className="class-footer">
          <div>
            <div className="time-badge">{cls.time}</div>
            <div
              className="intensity-badge"
              style={{
                color: intensityColors[cls.intensity],
                background: `${intensityColors[cls.intensity]}22`
              }}
            >
              {cls.intensity} Intensity
            </div>
          </div>
          <button
            className={`book-btn ${cls.isBooked ? 'book-btn-booked' : ''}`}
            onClick={() => onBook(cls.id)}
            style={!cls.isBooked ? { background: cls.bgColor } : {}}
          >
            {cls.isBooked ? '✓ Booked' : cls.isLive ? 'Join Live' : 'Book Class'}
          </button>
        </div>

        {/* Slots progress */}
        <div className="slots-bar">
          <div
            className="slots-fill"
            style={{
              width: `${((cls.totalSlots - cls.slots) / cls.totalSlots) * 100}%`,
              background: cls.bgColor
            }}
          />
        </div>
        <p className="slots-text">
          {cls.slots === 0 ? 'Fully booked' : `${cls.slots} spots left`}
        </p>
      </div>
    </div>
  )
}

function TrainerCard({ trainer }) {
  return (
    <div className="trainer-card">
      <div className="trainer-avatar" style={{ background: `linear-gradient(135deg, ${trainer.color}, ${trainer.color}88)` }}>
        {trainer.image}
      </div>
      <div className="trainer-info">
        <h4 className="trainer-name">{trainer.name}</h4>
        <p className="trainer-spec">{trainer.specialty}</p>
        <div className="trainer-stats">
          <span><Star size={11} fill="#ed8936" color="#ed8936" /> {trainer.rating}</span>
          <span>{trainer.sessions.toLocaleString()} sessions</span>
        </div>
      </div>
      <button className="follow-btn">Follow</button>
    </div>
  )
}

function Classes() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('popular')
  const [classList, setClassList] = useState(classes)

  const filtered = classList.filter(c =>
    selectedCategory === 'All' || c.category === selectedCategory
  )

  const handleBook = (id) => {
    setClassList(prev => prev.map(c =>
      c.id === id ? { ...c, isBooked: !c.isBooked } : c
    ))
  }

  const liveCount = classList.filter(c => c.isLive).length

  return (
    <div className="classes-page page-container">
      {/* Header */}
      <div className="classes-header">
        <div>
          <h2 className="section-title">Fitness Classes</h2>
          <p className="classes-subtitle">
            <span className="live-indicator">●</span> {liveCount} classes live now
          </p>
        </div>
        <div className="filter-controls">
          <div className="sort-select">
            <Filter size={14} />
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="calories">Most Calories</option>
              <option value="duration">Shortest</option>
            </select>
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="category-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`cat-btn ${selectedCategory === cat ? 'cat-btn-active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Classes Grid */}
      <div className="classes-grid">
        {filtered.map(cls => (
          <ClassCard key={cls.id} cls={cls} onBook={handleBook} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <span>🤷</span>
          <p>No classes found in this category</p>
        </div>
      )}

      {/* Top Trainers */}
      <div className="section">
        <h2 className="section-title">Top Trainers</h2>
        <div className="trainers-grid">
          {trainers.map(trainer => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Classes
