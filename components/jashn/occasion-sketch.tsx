/**
 * OccasionSketch — inline SVG illustrations for every occasion & invitation type.
 * No external images. Each sketch is a self-contained portrait-ratio SVG scene.
 */

// ─── Birthday ──────────────────────────────────────────────────────────────
function SketchBirthday() {
  return (
    <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* bg balloons */}
      <ellipse cx="20" cy="40" rx="12" ry="15" fill="#f472b6" opacity="0.7"/>
      <line x1="20" y1="55" x2="22" y2="80" stroke="#f472b6" strokeWidth="1" opacity="0.6"/>
      <ellipse cx="100" cy="30" rx="11" ry="14" fill="#818cf8" opacity="0.7"/>
      <line x1="100" y1="44" x2="98" y2="80" stroke="#818cf8" strokeWidth="1" opacity="0.6"/>
      <ellipse cx="60" cy="20" rx="13" ry="16" fill="#fbbf24" opacity="0.7"/>
      <line x1="60" y1="36" x2="60" y2="80" stroke="#fbbf24" strokeWidth="1" opacity="0.6"/>
      {/* cake base */}
      <rect x="30" y="110" width="60" height="30" rx="4" fill="#fde68a"/>
      <rect x="30" y="110" width="60" height="8" rx="2" fill="#fbbf24" opacity="0.8"/>
      {/* cake middle tier */}
      <rect x="37" y="90" width="46" height="22" rx="3" fill="#fbcfe8"/>
      <rect x="37" y="90" width="46" height="7" rx="2" fill="#f9a8d4" opacity="0.8"/>
      {/* frosting drips */}
      <path d="M37 97 Q42 104 47 97 Q52 104 57 97 Q62 104 67 97 Q72 104 77 97 Q82 104 83 97" fill="none" stroke="white" strokeWidth="1.5" opacity="0.7"/>
      {/* candles */}
      <rect x="50" y="72" width="5" height="18" rx="2" fill="#f472b6"/>
      <rect x="65" y="68" width="5" height="22" rx="2" fill="#818cf8"/>
      <rect x="44" y="75" width="5" height="15" rx="2" fill="#fbbf24"/>
      {/* flames */}
      <ellipse cx="52.5" cy="70" rx="3" ry="4" fill="#fbbf24" opacity="0.9"/>
      <ellipse cx="67.5" cy="66" rx="3" ry="4" fill="#fb923c" opacity="0.9"/>
      <ellipse cx="46.5" cy="73" rx="2.5" ry="3.5" fill="#fbbf24" opacity="0.9"/>
      {/* confetti dots */}
      <circle cx="15" cy="100" r="3" fill="#f472b6" opacity="0.7"/>
      <circle cx="108" cy="85" r="2.5" fill="#818cf8" opacity="0.7"/>
      <circle cx="90" cy="60" r="2" fill="#fbbf24" opacity="0.7"/>
      <rect x="10" y="120" width="6" height="3" rx="1" fill="#34d399" opacity="0.7" transform="rotate(-30 13 121)"/>
      <rect x="105" y="110" width="6" height="3" rx="1" fill="#f472b6" opacity="0.7" transform="rotate(20 108 111)"/>
    </svg>
  )
}

// ─── Anniversary ───────────────────────────────────────────────────────────
function SketchAnniversary() {
  return (
    <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* soft glow */}
      <circle cx="60" cy="75" r="50" fill="#fce7f3" opacity="0.3"/>
      {/* two overlapping rings */}
      <circle cx="44" cy="72" r="22" fill="none" stroke="#fbbf24" strokeWidth="3" opacity="0.9"/>
      <circle cx="76" cy="72" r="22" fill="none" stroke="#fbbf24" strokeWidth="3" opacity="0.9"/>
      {/* diamond on top */}
      <polygon points="60,30 70,45 60,55 50,45" fill="#a5b4fc" opacity="0.9"/>
      <polygon points="60,30 70,45 60,38" fill="#c7d2fe" opacity="0.7"/>
      <polygon points="60,55 70,45 60,48" fill="#818cf8" opacity="0.6"/>
      {/* roses */}
      <circle cx="25" cy="130" r="10" fill="#f9a8d4" opacity="0.8"/>
      <circle cx="22" cy="126" r="6" fill="#f472b6" opacity="0.7"/>
      <circle cx="28" cy="125" r="5" fill="#ec4899" opacity="0.6"/>
      <line x1="25" y1="140" x2="25" y2="155" stroke="#16a34a" strokeWidth="1.5"/>
      <circle cx="95" cy="130" r="10" fill="#f9a8d4" opacity="0.8"/>
      <circle cx="92" cy="126" r="6" fill="#f472b6" opacity="0.7"/>
      <circle cx="98" cy="125" r="5" fill="#ec4899" opacity="0.6"/>
      <line x1="95" y1="140" x2="95" y2="155" stroke="#16a34a" strokeWidth="1.5"/>
      {/* hearts */}
      <path d="M55 100 Q55 92 60 95 Q65 92 65 100 Q65 108 60 112 Q55 108 55 100Z" fill="#f472b6" opacity="0.8"/>
      <path d="M35 85 Q35 80 38.5 82 Q42 80 42 85 Q42 90 38.5 93 Q35 90 35 85Z" fill="#fca5a5" opacity="0.6"/>
      <path d="M78 85 Q78 80 81.5 82 Q85 80 85 85 Q85 90 81.5 93 Q78 90 78 85Z" fill="#fca5a5" opacity="0.6"/>
    </svg>
  )
}

// ─── New Baby ──────────────────────────────────────────────────────────────
function SketchBaby() {
  return (
    <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* pastel bg circle */}
      <circle cx="60" cy="80" r="55" fill="#fce7f3" opacity="0.25"/>
      {/* pram body */}
      <path d="M20 100 Q20 130 60 135 Q100 130 100 100Z" fill="#fbcfe8" stroke="#f9a8d4" strokeWidth="1.5"/>
      <rect x="20" y="95" width="80" height="10" rx="5" fill="#f9a8d4"/>
      {/* pram hood */}
      <path d="M20 98 Q30 60 80 70 L80 98Z" fill="#fde68a" opacity="0.8" stroke="#fbbf24" strokeWidth="1"/>
      {/* wheels */}
      <circle cx="35" cy="140" r="12" fill="none" stroke="#d1d5db" strokeWidth="3"/>
      <circle cx="35" cy="140" r="4" fill="#9ca3af"/>
      <circle cx="85" cy="140" r="12" fill="none" stroke="#d1d5db" strokeWidth="3"/>
      <circle cx="85" cy="140" r="4" fill="#9ca3af"/>
      {/* handle */}
      <path d="M80 70 Q110 55 110 90" fill="none" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round"/>
      {/* stars */}
      <circle cx="25" cy="25" r="3" fill="#fbbf24" opacity="0.7"/>
      <circle cx="95" cy="20" r="2.5" fill="#a5b4fc" opacity="0.7"/>
      <circle cx="55" cy="15" r="2" fill="#f9a8d4" opacity="0.7"/>
      {/* baby booties */}
      <ellipse cx="50" cy="155" rx="10" ry="5" fill="#fbcfe8" stroke="#f9a8d4" strokeWidth="1"/>
      <ellipse cx="70" cy="155" rx="10" ry="5" fill="#a5f3fc" stroke="#67e8f9" strokeWidth="1"/>
    </svg>
  )
}

// ─── Eid / Islamic ─────────────────────────────────────────────────────────
function SketchEid() {
  return (
    <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* night sky */}
      <rect width="120" height="160" fill="#0f172a" opacity="0.0"/>
      {/* stars */}
      {[[15,15],[55,8],[100,20],[10,50],[110,40],[80,12],[30,35]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill="#fde68a" opacity="0.8"/>
      ))}
      {/* crescent moon */}
      <circle cx="65" cy="38" r="22" fill="#fde68a" opacity="0.95"/>
      <circle cx="75" cy="32" r="18" fill="#1e3a5f" opacity="1"/>
      {/* star near crescent */}
      <polygon points="88,28 90,33 95,33 91,36 93,41 88,38 83,41 85,36 81,33 86,33" fill="#fde68a" opacity="0.9"/>
      {/* mosque silhouette */}
      <rect x="25" y="110" width="70" height="40" fill="#1e3a5f"/>
      {/* main dome */}
      <ellipse cx="60" cy="110" rx="25" ry="20" fill="#1e3a5f"/>
      {/* side domes */}
      <ellipse cx="28" cy="120" rx="12" ry="10" fill="#1e3a5f"/>
      <ellipse cx="92" cy="120" rx="12" ry="10" fill="#1e3a5f"/>
      {/* minarets */}
      <rect x="15" y="88" width="8" height="40" rx="2" fill="#1e3a5f"/>
      <polygon points="15,88 19,75 23,88" fill="#1e3a5f"/>
      <rect x="97" y="88" width="8" height="40" rx="2" fill="#1e3a5f"/>
      <polygon points="97,88 101,75 105,88" fill="#1e3a5f"/>
      {/* lanterns */}
      <rect x="45" y="65" width="8" height="12" rx="2" fill="#fbbf24" opacity="0.9"/>
      <polygon points="45,65 49,58 53,65" fill="#fbbf24" opacity="0.8"/>
      <line x1="49" y1="55" x2="49" y2="58" stroke="#fbbf24" strokeWidth="1"/>
      <rect x="67" y="60" width="8" height="12" rx="2" fill="#f97316" opacity="0.9"/>
      <polygon points="67,60 71,53 75,60" fill="#f97316" opacity="0.8"/>
      <line x1="71" y1="50" x2="71" y2="53" stroke="#f97316" strokeWidth="1"/>
    </svg>
  )
}

// ─── Ramadan / Iftaar ──────────────────────────────────────────────────────
function SketchRamadan() {
  return (
    <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* dusk sky gradient via shapes */}
      <rect width="120" height="80" fill="#1e3a5f" opacity="0.9"/>
      <rect y="80" width="120" height="80" fill="#92400e" opacity="0.3"/>
      {/* moon */}
      <circle cx="85" cy="30" r="16" fill="#fde68a" opacity="0.9"/>
      <circle cx="92" cy="25" r="13" fill="#1e3a5f" opacity="1"/>
      {/* stars */}
      {[[15,20],[40,10],[60,25],[105,15]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill="#fde68a" opacity="0.7"/>
      ))}
      {/* mosque silhouette small */}
      <rect x="30" y="85" width="60" height="35" fill="#0f172a"/>
      <ellipse cx="60" cy="85" rx="20" ry="14" fill="#0f172a"/>
      <rect x="20" y="75" width="6" height="35" rx="1" fill="#0f172a"/>
      <polygon points="20,75 23,66 26,75" fill="#0f172a"/>
      <rect x="94" y="75" width="6" height="35" rx="1" fill="#0f172a"/>
      <polygon points="94,75 97,66 100,75" fill="#0f172a"/>
      {/* lantern */}
      <rect x="52" y="125" width="16" height="22" rx="3" fill="#fbbf24" opacity="0.85"/>
      <polygon points="52,125 60,118 68,125" fill="#f59e0b"/>
      <line x1="60" y1="115" x2="60" y2="118" stroke="#fbbf24" strokeWidth="1.5"/>
      <rect x="55" y="128" width="10" height="2" fill="#d97706" opacity="0.5"/>
      <rect x="55" y="132" width="10" height="2" fill="#d97706" opacity="0.5"/>
      {/* dates bowl */}
      <ellipse cx="35" cy="152" rx="18" ry="7" fill="#92400e" opacity="0.8"/>
      <ellipse cx="29" cy="148" rx="5" ry="3" fill="#78350f"/>
      <ellipse cx="37" cy="146" rx="5" ry="3" fill="#78350f"/>
      <ellipse cx="43" cy="149" rx="5" ry="3" fill="#92400e"/>
    </svg>
  )
}

// ─── Graduation ────────────────────────────────────────────────────────────
function SketchGraduation() {
  return (
    <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* scroll / diploma */}
      <rect x="20" y="95" width="80" height="50" rx="6" fill="#fef9c3" stroke="#fbbf24" strokeWidth="1.5"/>
      <rect x="20" y="95" width="80" height="10" rx="3" fill="#fbbf24" opacity="0.6"/>
      <rect x="20" y="135" width="80" height="10" rx="3" fill="#fbbf24" opacity="0.6"/>
      {/* ribbon */}
      <rect x="55" y="95" width="10" height="50" fill="#ef4444" opacity="0.3"/>
      {/* lines of text */}
      <rect x="35" y="115" width="50" height="3" rx="1" fill="#a16207" opacity="0.5"/>
      <rect x="40" y="122" width="40" height="3" rx="1" fill="#a16207" opacity="0.4"/>
      <rect x="45" y="129" width="30" height="3" rx="1" fill="#a16207" opacity="0.3"/>
      {/* mortarboard */}
      <ellipse cx="60" cy="60" rx="28" ry="8" fill="#1e3a5f"/>
      <rect x="44" y="40" width="32" height="22" rx="3" fill="#1e3a5f"/>
      {/* tassel */}
      <line x1="88" y1="60" x2="95" y2="75" stroke="#fbbf24" strokeWidth="2"/>
      <circle cx="95" cy="78" r="4" fill="#fbbf24"/>
      {/* stars */}
      <circle cx="20" cy="25" r="3" fill="#fbbf24" opacity="0.7"/>
      <circle cx="100" cy="20" r="2.5" fill="#818cf8" opacity="0.7"/>
      <circle cx="60" cy="15" r="2" fill="#fbbf24" opacity="0.6"/>
      {/* confetti */}
      <rect x="10" y="80" width="6" height="3" rx="1" fill="#f472b6" opacity="0.7" transform="rotate(-30 13 81)"/>
      <rect x="106" y="70" width="5" height="3" rx="1" fill="#34d399" opacity="0.7" transform="rotate(20 108 71)"/>
    </svg>
  )
}

// ─── Shaadi / Wedding ──────────────────────────────────────────────────────
function SketchShaadi() {
  return (
    <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Mughal arch */}
      <path d="M20 155 L20 80 Q20 30 60 25 Q100 30 100 80 L100 155Z" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.7"/>
      <path d="M28 155 L28 82 Q28 40 60 36 Q92 40 92 82 L92 155Z" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.4"/>
      {/* groom silhouette */}
      <circle cx="47" cy="75" r="10" fill="#1e3a5f"/>
      <path d="M37 95 Q37 120 47 125 Q57 120 57 95 Q52 90 47 88 Q42 90 37 95Z" fill="#1e3a5f"/>
      <rect x="43" y="100" width="8" height="18" fill="#fbbf24" opacity="0.5"/>
      {/* bride silhouette */}
      <circle cx="73" cy="75" r="10" fill="#f9a8d4"/>
      <path d="M58 100 Q60 125 73 130 Q86 125 88 100 Q80 92 73 88 Q66 92 58 100Z" fill="#f9a8d4"/>
      {/* veil */}
      <path d="M63 68 Q73 62 83 68 Q80 58 73 56 Q66 58 63 68Z" fill="white" opacity="0.8"/>
      {/* petals */}
      {[[15,30],[105,25],[20,130],[100,130],[60,20]].map(([x,y],i) => (
        <ellipse key={i} cx={x} cy={y} rx="5" ry="3" fill="#f9a8d4" opacity="0.6" transform={`rotate(${i*36} ${x} ${y})`}/>
      ))}
      {/* hearts */}
      <path d="M55 48 Q55 43 58 45 Q61 43 61 48 Q61 53 58 56 Q55 53 55 48Z" fill="#f472b6" opacity="0.8"/>
    </svg>
  )
}

// ─── Mehndi ────────────────────────────────────────────────────────────────
function SketchMehndi() {
  return (
    <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* hand outline */}
      <path d="M35 155 L35 90 Q35 80 42 80 L42 60 Q42 55 46 55 Q50 55 50 60 L50 75 Q50 70 54 70 Q58 70 58 75 L58 72 Q58 67 62 67 Q66 67 66 72 L66 75 Q66 70 70 70 Q74 70 74 80 L74 90 Q80 92 82 100 L82 155Z" fill="#fde68a" stroke="#fbbf24" strokeWidth="1.5"/>
      {/* mehndi pattern on hand */}
      <circle cx="58" cy="100" r="8" fill="none" stroke="#92400e" strokeWidth="1.2"/>
      <circle cx="58" cy="100" r="4" fill="#92400e" opacity="0.5"/>
      <path d="M50 115 Q58 112 66 115 Q62 122 58 124 Q54 122 50 115Z" fill="none" stroke="#92400e" strokeWidth="1"/>
      <path d="M46 130 Q58 127 70 130" fill="none" stroke="#92400e" strokeWidth="1" strokeDasharray="2,2"/>
      <path d="M48 140 Q58 137 68 140" fill="none" stroke="#92400e" strokeWidth="1" strokeDasharray="2,2"/>
      {/* marigold flowers */}
      <circle cx="20" cy="40" r="12" fill="#f97316" opacity="0.8"/>
      <circle cx="20" cy="40" r="7" fill="#fbbf24"/>
      <circle cx="20" cy="40" r="3" fill="#92400e" opacity="0.7"/>
      <circle cx="100" cy="35" r="11" fill="#f97316" opacity="0.8"/>
      <circle cx="100" cy="35" r="6" fill="#fbbf24"/>
      <circle cx="100" cy="35" r="3" fill="#92400e" opacity="0.7"/>
      {/* dholki drum */}
      <ellipse cx="60" cy="30" rx="20" ry="10" fill="#92400e" opacity="0.8"/>
      <rect x="40" y="25" width="40" height="18" rx="4" fill="#78350f" opacity="0.7"/>
      <ellipse cx="60" cy="43" rx="20" ry="10" fill="#92400e" opacity="0.8"/>
      {/* strings */}
      <line x1="40" y1="28" x2="80" y2="40" stroke="#fbbf24" strokeWidth="1" opacity="0.6"/>
      <line x1="80" y1="28" x2="40" y2="40" stroke="#fbbf24" strokeWidth="1" opacity="0.6"/>
    </svg>
  )
}

// ─── Independence Day ──────────────────────────────────────────────────────
function SketchIndependence() {
  return (
    <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* flag pole */}
      <rect x="28" y="20" width="4" height="130" rx="2" fill="#78716c"/>
      {/* Pakistani flag green */}
      <rect x="32" y="22" width="76" height="52" rx="2" fill="#01411c"/>
      {/* white stripe on left */}
      <rect x="32" y="22" width="16" height="52" fill="white"/>
      {/* crescent on flag */}
      <circle cx="76" cy="48" r="14" fill="white" opacity="0.95"/>
      <circle cx="81" cy="44" r="11" fill="#01411c"/>
      {/* star on flag */}
      <polygon points="88,38 90,43 95,43 91,46 93,51 88,48 83,51 85,46 81,43 86,43" fill="white" opacity="0.95"/>
      {/* bunting strings */}
      <path d="M0 95 Q30 105 60 95 Q90 85 120 95" fill="none" stroke="#01411c" strokeWidth="1.5" opacity="0.7"/>
      <path d="M0 105 Q30 115 60 105 Q90 95 120 105" fill="none" stroke="#01411c" strokeWidth="1" opacity="0.5"/>
      {/* flag triangles on string */}
      {[10,30,50,70,90,110].map((x,i) => (
        <polygon key={i} points={`${x},95 ${x+10},95 ${x+5},108`} fill={i%2===0 ? '#01411c' : 'white'} opacity="0.85"/>
      ))}
      {/* star sparkles */}
      <circle cx="20" cy="130" r="3" fill="#fbbf24" opacity="0.7"/>
      <circle cx="100" cy="125" r="2.5" fill="#fbbf24" opacity="0.7"/>
    </svg>
  )
}

// ─── Valentine's ───────────────────────────────────────────────────────────
function SketchValentines() {
  return (
    <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* large heart */}
      <path d="M60 130 Q20 100 20 70 A22 22 0 0 1 60 55 A22 22 0 0 1 100 70 Q100 100 60 130Z" fill="#f43f5e" opacity="0.85"/>
      <path d="M60 120 Q28 95 28 72 A16 16 0 0 1 60 62 A16 16 0 0 1 92 72 Q92 95 60 120Z" fill="#fb7185" opacity="0.5"/>
      {/* arrow through heart */}
      <line x1="15" y1="115" x2="105" y2="55" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round"/>
      <polygon points="15,115 22,108 10,105" fill="#fbbf24"/>
      <polygon points="105,55 98,62 110,65" fill="#fbbf24"/>
      {/* small floating hearts */}
      <path d="M20 30 Q20 24 24 27 Q28 24 28 30 Q28 36 24 40 Q20 36 20 30Z" fill="#f9a8d4" opacity="0.8"/>
      <path d="M90 25 Q90 20 93 22 Q96 20 96 25 Q96 30 93 33 Q90 30 90 25Z" fill="#f9a8d4" opacity="0.8"/>
      <path d="M8 75 Q8 71 11 73 Q14 71 14 75 Q14 79 11 81 Q8 79 8 75Z" fill="#fda4af" opacity="0.7"/>
      <path d="M106 80 Q106 76 109 78 Q112 76 112 80 Q112 84 109 86 Q106 84 106 80Z" fill="#fda4af" opacity="0.7"/>
      {/* roses at bottom */}
      <circle cx="40" cy="152" r="8" fill="#be123c" opacity="0.8"/>
      <circle cx="37" cy="148" r="5" fill="#e11d48" opacity="0.7"/>
      <line x1="40" y1="155" x2="38" y2="160" stroke="#15803d" strokeWidth="1.5"/>
      <circle cx="80" cy="152" r="8" fill="#be123c" opacity="0.8"/>
      <circle cx="77" cy="148" r="5" fill="#e11d48" opacity="0.7"/>
      <line x1="80" y1="155" x2="82" y2="160" stroke="#15803d" strokeWidth="1.5"/>
    </svg>
  )
}

// ─── Condolence ────────────────────────────────────────────────────────────
function SketchCondolence() {
  return (
    <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* muted sky */}
      <rect width="120" height="100" fill="#94a3b8" opacity="0.15"/>
      {/* olive branch / sprout */}
      <line x1="60" y1="155" x2="60" y2="60" stroke="#4b5563" strokeWidth="2"/>
      <ellipse cx="45" cy="100" rx="14" ry="8" fill="#6b7280" opacity="0.7" transform="rotate(-30 45 100)"/>
      <ellipse cx="75" cy="90" rx="14" ry="8" fill="#6b7280" opacity="0.6" transform="rotate(30 75 90)"/>
      <ellipse cx="48" cy="75" rx="12" ry="7" fill="#4b5563" opacity="0.6" transform="rotate(-20 48 75)"/>
      <ellipse cx="72" cy="68" rx="12" ry="7" fill="#4b5563" opacity="0.5" transform="rotate(20 72 68)"/>
      {/* calligraphy-like curved line */}
      <path d="M25 135 Q60 125 95 135" fill="none" stroke="#4b5563" strokeWidth="1.5" opacity="0.5" strokeDasharray="4,3"/>
      {/* soft light rays */}
      <line x1="60" y1="20" x2="30" y2="55" stroke="#d1d5db" strokeWidth="1" opacity="0.4"/>
      <line x1="60" y1="20" x2="60" y2="58" stroke="#d1d5db" strokeWidth="1" opacity="0.5"/>
      <line x1="60" y1="20" x2="90" y2="55" stroke="#d1d5db" strokeWidth="1" opacity="0.4"/>
      <circle cx="60" cy="18" r="6" fill="#fde68a" opacity="0.4"/>
    </svg>
  )
}

// ─── Friendship Day ────────────────────────────────────────────────────────
function SketchFriendship() {
  return (
    <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* two hands clasped */}
      <path d="M15 100 Q15 80 30 78 L55 78 Q62 78 62 88 L62 110 Q62 120 50 122 L30 122 Q15 120 15 100Z" fill="#fddcb5" stroke="#f9a8d4" strokeWidth="1.5"/>
      <path d="M105 100 Q105 80 90 78 L65 78 Q58 78 58 88 L58 110 Q58 120 70 122 L90 122 Q105 120 105 100Z" fill="#fddcb5" stroke="#a5b4fc" strokeWidth="1.5"/>
      {/* clasped fingers */}
      <rect x="50" y="78" width="20" height="8" rx="4" fill="#fddcb5" stroke="#fbbf24" strokeWidth="1"/>
      {/* friendship bracelet */}
      <rect x="45" y="108" width="30" height="5" rx="2.5" fill="#f472b6" opacity="0.8"/>
      <rect x="47" y="110" width="26" height="1.5" rx="1" fill="#fbbf24" opacity="0.7"/>
      {/* floating hearts */}
      <path d="M25 50 Q25 44 29 47 Q33 44 33 50 Q33 56 29 60 Q25 56 25 50Z" fill="#f9a8d4" opacity="0.8"/>
      <path d="M87 45 Q87 40 90.5 42 Q94 40 94 45 Q94 50 90.5 53 Q87 50 87 45Z" fill="#a5b4fc" opacity="0.8"/>
      <path d="M54 30 Q54 26 57 28 Q60 26 60 30 Q60 34 57 36 Q54 34 54 30Z" fill="#fb923c" opacity="0.8"/>
      {/* stars */}
      <circle cx="15" cy="30" r="3" fill="#fbbf24" opacity="0.7"/>
      <circle cx="105" cy="25" r="2.5" fill="#fbbf24" opacity="0.7"/>
    </svg>
  )
}

// ─── Generic / Mubarak ─────────────────────────────────────────────────────
function SketchGeneric() {
  return (
    <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* decorative mandala-like rings */}
      <circle cx="60" cy="75" r="45" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.4"/>
      <circle cx="60" cy="75" r="35" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.3"/>
      <circle cx="60" cy="75" r="25" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.25"/>
      {/* sparkle star */}
      <polygon points="60,35 63,68 75,75 63,82 60,115 57,82 45,75 57,68" fill="#fbbf24" opacity="0.85"/>
      {/* corner flowers */}
      <circle cx="18" cy="18" r="10" fill="#f9a8d4" opacity="0.6"/>
      <circle cx="18" cy="18" r="5" fill="#f472b6" opacity="0.7"/>
      <circle cx="102" cy="18" r="10" fill="#f9a8d4" opacity="0.6"/>
      <circle cx="102" cy="18" r="5" fill="#f472b6" opacity="0.7"/>
      <circle cx="18" cy="142" r="10" fill="#a5f3fc" opacity="0.6"/>
      <circle cx="18" cy="142" r="5" fill="#22d3ee" opacity="0.7"/>
      <circle cx="102" cy="142" r="10" fill="#a5f3fc" opacity="0.6"/>
      <circle cx="102" cy="142" r="5" fill="#22d3ee" opacity="0.7"/>
    </svg>
  )
}
