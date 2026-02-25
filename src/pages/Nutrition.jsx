import React, { useState } from 'react'
import { Plus, Droplets, ChevronDown, ChevronUp } from 'lucide-react'
import { RadialBarChart, RadialBar, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { meals, user } from '../data/mockData'
import './Nutrition.css'

const macroColors = ['#FF4500', '#4299e1', '#48bb78']

function MacroCircle({ value, max, label, color }) {
  const pct = Math.round((value / max) * 100)
  return (
    <div className="macro-circle">
      <div className="macro-ring" style={{ '--color': color, '--pct': pct }}>
        <svg viewBox="0 0 36 36" className="circular-chart">
          <path
            className="circle-bg"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="circle"
            strokeDasharray={`${pct}, 100`}
            style={{ stroke: color }}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="20.35" className="percentage">{pct}%</text>
        </svg>
      </div>
      <p className="macro-value">{value}g</p>
      <p className="macro-label">{label}</p>
    </div>
  )
}

function MealCard({ meal }) {
  const [expanded, setExpanded] = useState(false)
  const totalProtein = meal.items.reduce((s, i) => s + i.protein, 0)
  const totalCarbs = meal.items.reduce((s, i) => s + i.carbs, 0)
  const totalFat = meal.items.reduce((s, i) => s + i.fat, 0)

  return (
    <div className="meal-card">
      <div className="meal-header" onClick={() => setExpanded(!expanded)}>
        <div className="meal-left">
          <span className="meal-icon">{meal.icon}</span>
          <div>
            <h3 className="meal-type">{meal.type}</h3>
            <p className="meal-time">{meal.time} · {meal.items.length} items</p>
          </div>
        </div>
        <div className="meal-right">
          <span className="meal-calories">{meal.totalCalories} kcal</span>
          <button className="expand-btn">
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="meal-body">
          <div className="meal-macros">
            <span style={{ color: '#FF4500' }}>P: {totalProtein}g</span>
            <span style={{ color: '#4299e1' }}>C: {totalCarbs}g</span>
            <span style={{ color: '#48bb78' }}>F: {totalFat}g</span>
          </div>
          <div className="meal-items-list">
            {meal.items.map((item, idx) => (
              <div key={idx} className="meal-item-row">
                <span className="item-name">{item.name}</span>
                <div className="item-macros">
                  <span className="item-cal">{item.calories} kcal</span>
                  <span>P: {item.protein}g</span>
                  <span>C: {item.carbs}g</span>
                  <span>F: {item.fat}g</span>
                </div>
              </div>
            ))}
          </div>
          <button className="add-item-btn">
            <Plus size={14} /> Add Item
          </button>
        </div>
      )}
    </div>
  )
}

function WaterTracker({ intake, goal }) {
  const cups = Math.round(intake * 4)
  const totalCups = Math.round(goal * 4)

  return (
    <div className="water-tracker">
      <div className="water-header">
        <div className="water-title-row">
          <Droplets size={20} color="#4299e1" />
          <h3>Water Intake</h3>
        </div>
        <span className="water-value">{intake}L / {goal}L</span>
      </div>
      <div className="water-cups">
        {Array.from({ length: totalCups }).map((_, i) => (
          <div
            key={i}
            className={`water-cup ${i < cups ? 'cup-filled' : ''}`}
          >
            💧
          </div>
        ))}
      </div>
      <div className="water-bar">
        <div
          className="water-fill"
          style={{ width: `${(intake / goal) * 100}%` }}
        />
      </div>
      <p className="water-remaining">
        {((goal - intake) * 1000).toFixed(0)}ml remaining today
      </p>
      <button className="log-water-btn">+ Add 250ml</button>
    </div>
  )
}

function Nutrition() {
  const totalCals = meals.reduce((s, m) => s + m.totalCalories, 0)
  const goalCals = user.goals.dailyCalories
  const remaining = goalCals - totalCals
  const totalProtein = meals.reduce((s, m) => s + m.items.reduce((si, i) => si + i.protein, 0), 0)
  const totalCarbs = meals.reduce((s, m) => s + m.items.reduce((si, i) => si + i.carbs, 0), 0)
  const totalFat = meals.reduce((s, m) => s + m.items.reduce((si, i) => si + i.fat, 0), 0)

  const pieData = [
    { name: 'Protein', value: totalProtein * 4, color: '#FF4500' },
    { name: 'Carbs', value: totalCarbs * 4, color: '#4299e1' },
    { name: 'Fat', value: totalFat * 9, color: '#48bb78' },
  ]

  return (
    <div className="nutrition-page page-container">
      <div className="nutrition-header">
        <div>
          <h2 className="section-title">Nutrition Tracker</h2>
          <p className="nutrition-subtitle">Track your meals and hit your goals</p>
        </div>
        <button className="btn-primary add-meal-btn">
          <Plus size={16} /> Log Meal
        </button>
      </div>

      {/* Daily Summary */}
      <div className="daily-summary">
        <div className="calorie-ring-wrap">
          <div className="calorie-center">
            <div className="cal-remaining">{remaining}</div>
            <div className="cal-remaining-label">kcal left</div>
          </div>
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie
                data={[
                  { value: totalCals, fill: '#FF4500' },
                  { value: Math.max(0, remaining), fill: '#2d3748' },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={70}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                strokeWidth={0}
              >
                {[0, 1].map((_, i) => (
                  <Cell key={i} fill={i === 0 ? '#FF4500' : '#2d3748'} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="summary-stats">
          <div className="summary-stat-row">
            <span className="ss-label">Goal</span>
            <span className="ss-value">{goalCals} kcal</span>
          </div>
          <div className="summary-stat-row">
            <span className="ss-label">Consumed</span>
            <span className="ss-value consumed">{totalCals} kcal</span>
          </div>
          <div className="summary-stat-row">
            <span className="ss-label">Remaining</span>
            <span className={`ss-value ${remaining < 0 ? 'over' : 'remaining'}`}>
              {remaining < 0 ? `${Math.abs(remaining)} over` : `${remaining} kcal`}
            </span>
          </div>
        </div>

        <div className="macro-breakdown">
          <h4 className="macro-title">Macros</h4>
          <div className="macros-row">
            <MacroCircle value={totalProtein} max={150} label="Protein" color="#FF4500" />
            <MacroCircle value={totalCarbs} max={250} label="Carbs" color="#4299e1" />
            <MacroCircle value={totalFat} max={70} label="Fat" color="#48bb78" />
          </div>
        </div>
      </div>

      {/* Meals */}
      <div className="section">
        <h2 className="section-title">Today's Meals</h2>
        <div className="meals-list">
          {meals.map(meal => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>
      </div>

      {/* Water Tracker */}
      <WaterTracker intake={user.stats.waterIntake} goal={user.goals.waterIntake} />
    </div>
  )
}

export default Nutrition
