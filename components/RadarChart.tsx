type Skill = { label: string; value: number }

const ANGLES = [
  Math.PI / 2,           // top
  Math.PI / 10,          // top-right (18°)
  -3 * Math.PI / 10,     // bottom-right (-54°)
  -7 * Math.PI / 10,     // bottom-left (-126°)
  9 * Math.PI / 10,      // top-left (162°)
]

const CX = 290, CY = 210, R = 140

function pt(r: number, i: number) {
  const a = ANGLES[i]
  return { x: CX + r * Math.cos(a), y: CY - r * Math.sin(a) }
}

function toPoints(r: number) {
  return ANGLES.map((_, i) => pt(r, i))
    .map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(' ')
}

const LABEL_CFG = [
  { anchor: 'middle' as const, dx: 0,   dy: -14 },
  { anchor: 'start'  as const, dx: 12,  dy: 0   },
  { anchor: 'start'  as const, dx: 12,  dy: 0   },
  { anchor: 'end'    as const, dx: -12, dy: 0   },
  { anchor: 'end'    as const, dx: -12, dy: 0   },
]

export default function RadarChart({ skills }: { skills: Skill[] }) {
  const dataPoints = ANGLES.map((_, i) => {
    const v = skills[i].value / 100
    const p = pt(R * v, i)
    return `${p.x.toFixed(1)},${p.y.toFixed(1)}`
  }).join(' ')

  return (
    <svg viewBox="0 0 580 420" width="100%" style={{ maxWidth: '100%', display: 'block' }}>
      {/* Grid pentagons */}
      {[0.25, 0.5, 0.75, 1].map((scale) => (
        <polygon
          key={scale}
          points={toPoints(R * scale)}
          fill="none"
          stroke="#e6e6e6"
          strokeWidth="1"
        />
      ))}

      {/* Axis lines from center to each vertex */}
      {ANGLES.map((_, i) => {
        const outer = pt(R, i)
        return (
          <line
            key={i}
            x1={CX}
            y1={CY}
            x2={outer.x.toFixed(1)}
            y2={outer.y.toFixed(1)}
            stroke="#e6e6e6"
            strokeWidth="1"
          />
        )
      })}

      {/* Data polygon */}
      <polygon
        points={dataPoints}
        fill="rgba(213,189,163,0.55)"
        stroke="rgb(193,165,135)"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Labels */}
      {skills.map((s, i) => {
        const labelPt = pt(178, i)
        const cfg = LABEL_CFG[i]
        const lx = (labelPt.x + cfg.dx).toFixed(1)
        const ly = (labelPt.y + cfg.dy).toFixed(1)
        return (
          <text
            key={i}
            x={lx}
            y={ly}
            textAnchor={cfg.anchor}
            fontFamily="Inter, system-ui, sans-serif"
            fontSize="12"
            fill="#0c0c0c"
          >
            <tspan x={lx} dy="0">{s.label}</tspan>
            <tspan x={lx} dy="16" fill="#8f8a8a">{s.value}%</tspan>
          </text>
        )
      })}
    </svg>
  )
}
