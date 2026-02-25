import React, { useState } from 'react'
import { Play, CheckCircle, Plus, Timer, Flame, ChevronDown, ChevronUp } from 'lucide-react'
import { workoutHistory } from '../data/mockData'
import './Workouts.css'

const workoutPlans = [
  {
    id: 1,
    name: "Full Body Blast",
    duration: "45 min",
    calories: 420,
    level: "Intermediate",
    color: "#FF4500",
    icon: "💥",
    exercises: [
      { name: "Warm Up Jog", sets: 1, reps: "5 min", rest: "0", muscle: "Cardio" },
      { name: "Push-Ups", sets: 4, reps: "15", rest: "60s", muscle: "Chest" },
      { name: "Squats", sets: 4, reps: "20", rest: "60s", muscle: "Legs" },
      { name: "Pull-Ups", sets: 3, reps: "10", rest: "90s", muscle: "Back" },
      { name: "Plank", sets: 3, reps: "45s", rest: "30s", muscle: "Core" },
      { name: "Burpees", sets: 3, reps: "12", rest: "60s", muscle: "Full Body" },
    ]
  },
  {
    id: 2,
    name: "Upper Body Power",
    duration: "40 min",
    calories: 350,
    level: "Advanced",
    color: "#4299e1",
    icon: "💪",
    exercises: [
      { name: "Bench Press", sets: 4, reps: "8", rest: "90s", muscle: "Chest" },
      { name: "Overhead Press", sets: 4, reps: "8", rest: "90s", muscle: "Shoulders" },
      { name: "Barbell Rows", sets: 4, reps: "10", rest: "90s", muscle: "Back" },
      { name: "Bicep Curls", sets: 3, reps: "12", rest: "60s", muscle: "Biceps" },
      { name: "Tricep Dips", sets: 3, reps: "15", rest: "60s", muscle: "Triceps" },
    ]
  },
  {
    id: 3,
    name: "Core & Abs",
    duration: "30 min",
    calories: 220,
    level: "Beginner",
    color: "#9f7aea",
    icon: "🎯",
    exercises: [
      { name: "Crunches", sets: 3, reps: "20", rest: "30s", muscle: "Abs" },
      { name: "Leg Raises", sets: 3, reps: "15", rest: "30s", muscle: "Lower Abs" },
      { name: "Russian Twists", sets: 3, reps: "20", rest: "30s", muscle: "Obliques" },
      { name: "Plank", sets: 3, reps: "60s", rest: "30s", muscle: "Core" },
      { name: "Mountain Climbers", sets: 3, reps: "30s", rest: "30s", muscle: "Core" },
    ]
  },
  {
    id: 4,
    name: "Leg Day",
    duration: "50 min",
    calories: 480,
    level: "Intermediate",
    color: "#48bb78",
    icon: "🦵",
    exercises: [
      { name: "Barbell Squats", sets: 4, reps: "10", rest: "120s", muscle: "Quads" },
      { name: "Romanian Deadlift", sets: 4, reps: "10", rest: "90s", muscle: "Hamstrings" },
      { name: "Leg Press", sets: 3, reps: "15", rest: "90s", muscle: "Quads" },
      { name: "Lunges", sets: 3, reps: "12 each", rest: "60s", muscle: "Glutes" },
      { name: "Calf Raises", sets: 4, reps: "20", rest: "45s", muscle: "Calves" },
    ]
  },
]

const levelColors = {
  Beginner: '#48bb78',
  Intermediate: '#ed8936',
  Advanced: '#e94560',
}

function WorkoutPlanCard({ plan }) {
  const [expanded, setExpanded] = useState(false)
  const [activeWorkout, setActiveWorkout] = useState(false)
  const [completedExercises, setCompletedExercises] = useState([])

  const toggleExercise = (idx) => {
    setCompletedExercises(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    )
  }

  return (
    <div className={`workout-plan-card ${activeWorkout ? 'workout-active' : ''}`}>
      <div className="workout-card-header" style={{ background: `${plan.color}18` }}>
        <div className="workout-icon" style={{ background: `${plan.color}33` }}>
          {plan.icon}
        </div>
        <div className="workout-info">
          <h3 className="workout-name">{plan.name}</h3>
          <div className="workout-meta">
            <span><Timer size={12} /> {plan.duration}</span>
            <span><Flame size={12} /> {plan.calories} kcal</span>
            <span
              className="level-badge"
              style={{ color: levelColors[plan.level], background: `${levelColors[plan.level]}22` }}
            >
              {plan.level}
            </span>
          </div>
        </div>
        <div className="workout-actions">
          <button
            className="start-btn"
            style={{ background: plan.color }}
            onClick={() => { setActiveWorkout(!activeWorkout); setExpanded(true) }}
          >
            {activeWorkout ? '⏸ Pause' : <><Play size={14} fill="white" /> Start</>}
          </button>
          <button
            className="expand-btn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="exercises-list">
          <div className="exercises-header">
            <span className="col-name">Exercise</span>
            <span className="col-sets">Sets</span>
            <span className="col-reps">Reps</span>
            <span className="col-rest">Rest</span>
            <span className="col-done">Done</span>
          </div>
          {plan.exercises.map((ex, idx) => (
            <div
              key={idx}
              className={`exercise-row ${completedExercises.includes(idx) ? 'exercise-done' : ''}`}
            >
              <div className="ex-name-wrap">
                <span className="ex-muscle" style={{ color: plan.color }}>{ex.muscle}</span>
                <span className="ex-name">{ex.name}</span>
              </div>
              <span className="ex-sets">{ex.sets}</span>
              <span className="ex-reps">{ex.reps}</span>
              <span className="ex-rest">{ex.rest}</span>
              <button
                className="check-btn"
                onClick={() => toggleExercise(idx)}
              >
                <CheckCircle
                  size={20}
                  fill={completedExercises.includes(idx) ? '#48bb78' : 'transparent'}
                  color={completedExercises.includes(idx) ? '#48bb78' : '#718096'}
                />
              </button>
            </div>
          ))}
          {activeWorkout && (
            <div className="workout-progress-bar">
              <div
                className="workout-progress-fill"
                style={{
                  width: `${(completedExercises.length / plan.exercises.length) * 100}%`,
                  background: plan.color
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function Workouts() {
  const [activeTab, setActiveTab] = useState('plans')

  const totalCalories = workoutHistory.reduce((s, w) => s + w.calories, 0)
  const totalMinutes = workoutHistory.reduce((s, w) => s + w.duration, 0)

  return (
    <div className="workouts-page page-container">
      <div className="workouts-header">
        <div>
          <h2 className="section-title">My Workouts</h2>
          <p className="workouts-subtitle">Build strength, burn calories, feel amazing</p>
        </div>
        <button className="btn-primary add-btn">
          <Plus size={16} /> Custom Workout
        </button>
      </div>

      {/* Quick Stats */}
      <div className="workout-quick-stats">
        <div className="quick-stat">
          <span className="qs-value">{workoutHistory.length}</span>
          <span className="qs-label">This Week</span>
        </div>
        <div className="quick-stat-divider" />
        <div className="quick-stat">
          <span className="qs-value">{totalCalories.toLocaleString()}</span>
          <span className="qs-label">kcal Burned</span>
        </div>
        <div className="quick-stat-divider" />
        <div className="quick-stat">
          <span className="qs-value">{totalMinutes}</span>
          <span className="qs-label">Min Active</span>
        </div>
        <div className="quick-stat-divider" />
        <div className="quick-stat">
          <span className="qs-value">87</span>
          <span className="qs-label">Total Workouts</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="workout-tabs">
        <button
          className={`tab-btn ${activeTab === 'plans' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('plans')}
        >
          Workout Plans
        </button>
        <button
          className={`tab-btn ${activeTab === 'history' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
      </div>

      {activeTab === 'plans' && (
        <div className="plans-list">
          {workoutPlans.map(plan => (
            <WorkoutPlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="history-list">
          {workoutHistory.map((w, idx) => (
            <div key={idx} className="history-item">
              <div className="history-date-badge">{w.date}</div>
              <div className="history-info">
                <h4>{w.workout}</h4>
                <p>{w.duration} min · {w.calories} kcal</p>
              </div>
              <CheckCircle size={20} fill="#48bb78" color="#48bb78" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Workouts
