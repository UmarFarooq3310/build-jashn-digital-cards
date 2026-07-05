#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const scrim = `<defs><linearGradient id="sc" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="rgba(0,0,0,0)"/><stop offset="100%" stop-color="rgba(0,0,0,0.72)"/></linearGradient></defs><rect x="0" y="330" width="320" height="97" fill="url(#sc)"/>`

function wrap(body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 427" width="320" height="427">${body}${scrim}</svg>`
}

const svgs = {}

// ── BIRTHDAY ─────────────────────────────────────────────────────────────
svgs['birthday'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a0533"/><stop offset="100%" stop-color="#3b0764"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<circle cx="30" cy="30" r="2" fill="#fff" opacity=".6"/><circle cx="80" cy="18" r="1.5" fill="#fff" opacity=".5"/>
<circle cx="150" cy="25" r="2" fill="#fff" opacity=".7"/><circle cx="240" cy="15" r="1.5" fill="#fff" opacity=".5"/>
<circle cx="290" cy="35" r="2" fill="#fff" opacity=".6"/>
<ellipse cx="60" cy="100" rx="28" ry="36" fill="#f472b6" opacity=".85"/>
<ellipse cx="52" cy="90" rx="10" ry="14" fill="#fda4af" opacity=".4"/>
<path d="M60 136 Q58 155 62 175" stroke="#f472b6" stroke-width="2" fill="none"/>
<ellipse cx="260" cy="85" rx="26" ry="33" fill="#fbbf24" opacity=".85"/>
<ellipse cx="252" cy="76" rx="9" ry="12" fill="#fde68a" opacity=".4"/>
<path d="M260 118 Q258 138 262 158" stroke="#fbbf24" stroke-width="2" fill="none"/>
<ellipse cx="160" cy="70" rx="24" ry="31" fill="#2dd4bf" opacity=".8"/>
<path d="M160 101 Q158 120 162 142" stroke="#2dd4bf" stroke-width="2" fill="none"/>
<rect x="20" y="180" width="12" height="6" rx="2" fill="#f472b6" transform="rotate(-30,26,183)" opacity=".8"/>
<rect x="280" y="160" width="10" height="5" rx="2" fill="#fbbf24" transform="rotate(20,285,162)" opacity=".8"/>
<rect x="100" y="155" width="10" height="5" rx="2" fill="#34d399" transform="rotate(-45,105,157)" opacity=".8"/>
<rect x="210" y="170" width="11" height="5" rx="2" fill="#818cf8" transform="rotate(15,215,172)" opacity=".8"/>
<circle cx="45" cy="200" r="5" fill="#f472b6" opacity=".7"/>
<circle cx="275" cy="190" r="4" fill="#fbbf24" opacity=".7"/>
<rect x="60" y="330" width="200" height="70" rx="8" fill="#fde68a"/>
<rect x="60" y="330" width="200" height="18" rx="8" fill="#fbbf24" opacity=".7"/>
<rect x="90" y="268" width="140" height="65" rx="7" fill="#fbcfe8"/>
<rect x="90" y="268" width="140" height="16" rx="7" fill="#f9a8d4" opacity=".8"/>
<rect x="115" y="218" width="90" height="53" rx="6" fill="#c7d2fe"/>
<rect x="138" y="188" width="10" height="32" rx="4" fill="#f472b6"/>
<rect x="158" y="182" width="10" height="38" rx="4" fill="#fbbf24"/>
<rect x="178" y="190" width="10" height="30" rx="4" fill="#818cf8"/>
<ellipse cx="143" cy="184" rx="6" ry="9" fill="#fbbf24" opacity=".95"/>
<ellipse cx="163" cy="178" rx="6" ry="9" fill="#fb923c" opacity=".95"/>
<ellipse cx="183" cy="186" rx="6" ry="9" fill="#fbbf24" opacity=".95"/>
`)

// ── ANNIVERSARY ──────────────────────────────────────────────────────────
svgs['anniversary'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stop-color="#4a0e2e"/><stop offset="100%" stop-color="#831843"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<ellipse cx="30" cy="60" rx="18" ry="10" fill="#f9a8d4" opacity=".25" transform="rotate(-20,30,60)"/>
<ellipse cx="290" cy="80" rx="16" ry="9" fill="#f9a8d4" opacity=".2" transform="rotate(15,290,80)"/>
<polygon points="160,70 200,130 160,165 120,130" fill="#fce7f3" stroke="#fbbf24" stroke-width="2.5" opacity=".9"/>
<polygon points="160,70 200,130 160,110" fill="#fde68a" opacity=".5"/>
<line x1="120" y1="130" x2="200" y2="130" stroke="#fbbf24" stroke-width="1.5" opacity=".6"/>
<circle cx="118" cy="255" r="52" fill="none" stroke="#fde68a" stroke-width="5" opacity=".9"/>
<circle cx="202" cy="255" r="52" fill="none" stroke="#fde68a" stroke-width="5" opacity=".9"/>
<circle cx="55" cy="355" r="28" fill="#be185d" opacity=".9"/>
<circle cx="46" cy="344" r="18" fill="#db2777" opacity=".8"/>
<circle cx="58" cy="340" r="14" fill="#ec4899" opacity=".7"/>
<line x1="55" y1="383" x2="50" y2="420" stroke="#15803d" stroke-width="3"/>
<circle cx="265" cy="355" r="28" fill="#be185d" opacity=".9"/>
<circle cx="256" cy="344" r="18" fill="#db2777" opacity=".8"/>
<circle cx="268" cy="340" r="14" fill="#ec4899" opacity=".7"/>
<line x1="265" y1="383" x2="270" y2="420" stroke="#15803d" stroke-width="3"/>
<path d="M130 220 Q130 200 160 205 Q190 200 190 220 Q190 240 160 250 Q130 240 130 220Z" fill="#f9a8d4" opacity=".6"/>
`)

// ── NEW BABY ──────────────────────────────────────────────────────────────
svgs['new-baby'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fdf2f8"/><stop offset="100%" stop-color="#e9d5ff"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<ellipse cx="60" cy="60" rx="50" ry="28" fill="white" opacity=".7"/>
<ellipse cx="100" cy="48" rx="35" ry="22" fill="white" opacity=".65"/>
<ellipse cx="260" cy="80" rx="45" ry="25" fill="white" opacity=".65"/>
<circle cx="180" cy="35" r="4" fill="#e879f9" opacity=".6"/>
<circle cx="40" cy="120" r="3" fill="#a78bfa" opacity=".5"/>
<path d="M60 280 Q60 360 160 370 Q260 360 260 280Z" fill="#f9a8d4" stroke="#db2777" stroke-width="2.5"/>
<rect x="60" y="268" width="200" height="20" rx="10" fill="#f472b6"/>
<path d="M60 280 Q80 190 200 210 L200 280Z" fill="#fde68a" stroke="#fbbf24" stroke-width="2"/>
<line x1="72" y1="372" x2="248" y2="372" stroke="#6b7280" stroke-width="4" stroke-linecap="round"/>
<circle cx="100" cy="395" r="32" fill="white" stroke="#d1d5db" stroke-width="4"/>
<circle cx="100" cy="395" r="10" fill="#9ca3af"/>
<circle cx="220" cy="395" r="32" fill="white" stroke="#d1d5db" stroke-width="4"/>
<circle cx="220" cy="395" r="10" fill="#9ca3af"/>
<path d="M200 212 Q270 170 268 260" stroke="#9ca3af" stroke-width="6" fill="none" stroke-linecap="round"/>
<ellipse cx="105" cy="28" rx="28" ry="14" fill="#fbcfe8" stroke="#f9a8d4" stroke-width="2"/>
<ellipse cx="93" cy="22" rx="14" ry="10" fill="#f9a8d4"/>
<ellipse cx="215" cy="28" rx="28" ry="14" fill="#bae6fd" stroke="#7dd3fc" stroke-width="2"/>
<ellipse cx="203" cy="22" rx="14" ry="10" fill="#7dd3fc"/>
`)

// ── GET WELL SOON ─────────────────────────────────────────────────────────
svgs['get-well-soon'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#e0f2fe"/><stop offset="100%" stop-color="#ccfbf1"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<ellipse cx="60" cy="55" rx="50" ry="28" fill="white" opacity=".7"/>
<ellipse cx="260" cy="70" rx="45" ry="25" fill="white" opacity=".6"/>
<line x1="160" y1="427" x2="160" y2="220" stroke="#15803d" stroke-width="5"/>
<line x1="160" y1="340" x2="100" y2="270" stroke="#15803d" stroke-width="4"/>
<line x1="160" y1="320" x2="220" y2="260" stroke="#15803d" stroke-width="4"/>
<line x1="160" y1="300" x2="80" y2="240" stroke="#15803d" stroke-width="3"/>
<line x1="160" y1="300" x2="240" y2="235" stroke="#15803d" stroke-width="3"/>
<circle cx="160" cy="185" r="42" fill="#f9a8d4" opacity=".9"/>
<circle cx="160" cy="163" r="22" fill="#f9a8d4" opacity=".8"/>
<circle cx="182" cy="173" r="22" fill="#f9a8d4" opacity=".8"/>
<circle cx="138" cy="173" r="22" fill="#f9a8d4" opacity=".8"/>
<circle cx="160" cy="200" r="22" fill="#f9a8d4" opacity=".8"/>
<circle cx="160" cy="185" r="22" fill="#fbbf24"/>
<circle cx="160" cy="185" r="10" fill="#92400e" opacity=".6"/>
<circle cx="95" cy="240" r="32" fill="#bae6fd" opacity=".9"/>
<circle cx="95" cy="222" r="17" fill="#bae6fd"/><circle cx="113" cy="232" r="17" fill="#bae6fd"/>
<circle cx="77" cy="232" r="17" fill="#bae6fd"/><circle cx="95" cy="252" r="17" fill="#bae6fd"/>
<circle cx="95" cy="240" r="16" fill="#fbbf24"/>
<circle cx="225" cy="235" r="30" fill="#fef08a" opacity=".9"/>
<circle cx="225" cy="219" r="16" fill="#fef08a"/><circle cx="241" cy="228" r="16" fill="#fef08a"/>
<circle cx="209" cy="228" r="16" fill="#fef08a"/><circle cx="225" cy="248" r="16" fill="#fef08a"/>
<circle cx="225" cy="235" r="15" fill="#fb923c"/>
<path d="M255 75 Q255 50 275 57 Q295 50 295 75 Q295 104 275 118 Q255 104 255 75Z" fill="#fce7f3" stroke="#f472b6" stroke-width="3"/>
<rect x="269" y="65" width="12" height="40" rx="3" fill="#ef4444"/>
<rect x="259" y="81" width="32" height="12" rx="3" fill="#ef4444"/>
`)

// ── FAREWELL ──────────────────────────────────────────────────────────────
svgs['farewell'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0c1445"/><stop offset="60%" stop-color="#1e3a8a"/><stop offset="100%" stop-color="#7c3aed"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<circle cx="20" cy="25" r="2" fill="#fff" opacity=".7"/><circle cx="60" cy="15" r="1.5" fill="#fff" opacity=".6"/>
<circle cx="100" cy="30" r="2" fill="#fff" opacity=".5"/><circle cx="140" cy="20" r="1.5" fill="#fff" opacity=".5"/>
<ellipse cx="220" cy="130" rx="70" ry="32" fill="white" opacity=".12"/>
<ellipse cx="80" cy="200" rx="60" ry="28" fill="white" opacity=".09"/>
<path d="M40 260 L240 160 L262 168 L254 185 L70 280Z" fill="#e0e7ff" stroke="#818cf8" stroke-width="2"/>
<path d="M240 160 L265 120 L262 168Z" fill="#c7d2fe" stroke="#818cf8" stroke-width="1.5"/>
<path d="M120 240 L200 165 L240 175 L180 255Z" fill="#a5b4fc" opacity=".7"/>
<path d="M70 280 Q35 292 40 260Z" fill="#c7d2fe" stroke="#818cf8" stroke-width="1.5"/>
<circle cx="100" cy="268" r="10" fill="#dbeafe" stroke="#93c5fd" stroke-width="1.5"/>
<circle cx="140" cy="252" r="10" fill="#dbeafe" stroke="#93c5fd" stroke-width="1.5"/>
<path d="M40 262 Q0 290 0 360" stroke="white" stroke-width="2" fill="none" stroke-dasharray="8,6" opacity=".3"/>
<rect x="0" y="360" width="320" height="67" fill="#0f172a"/>
<rect x="20" y="330" width="30" height="40" fill="#1e293b"/>
<rect x="60" y="315" width="25" height="55" fill="#1e293b"/>
<rect x="100" y="340" width="20" height="30" fill="#1e293b"/>
<rect x="180" y="320" width="28" height="50" fill="#1e293b"/>
<rect x="220" y="335" width="22" height="35" fill="#1e293b"/>
<rect x="260" y="325" width="30" height="45" fill="#1e293b"/>
<rect x="26" y="338" width="6" height="5" fill="#fbbf24" opacity=".6"/>
<rect x="66" y="322" width="5" height="5" fill="#fbbf24" opacity=".5"/>
<rect x="188" y="330" width="5" height="5" fill="#fbbf24" opacity=".6"/>
`)

// ── CONGRATULATIONS ───────────────────────────────────────────────────────
svgs['congratulations'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stop-color="#1c0a00"/><stop offset="100%" stop-color="#431407"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<path d="M30 380 L170 120" stroke="#fbbf24" stroke-width="8" stroke-linecap="round"/>
<path d="M30 380 L14 415 L58 405 Z" fill="#fbbf24"/>
<path d="M30 380 L90 340 L155 270 L170 120 L110 200 L55 275 Z" fill="#fde68a" opacity=".35" stroke="#fbbf24" stroke-width="1.5"/>
<rect x="170" y="95" width="22" height="10" rx="3" fill="#f472b6" transform="rotate(-25,181,100)" opacity=".9"/>
<rect x="195" y="78" width="18" height="9" rx="3" fill="#818cf8" transform="rotate(15,204,82)" opacity=".9"/>
<rect x="218" y="108" width="16" height="8" rx="3" fill="#34d399" transform="rotate(-50,226,112)" opacity=".9"/>
<rect x="145" y="72" width="18" height="8" rx="3" fill="#fbbf24" transform="rotate(40,154,76)" opacity=".9"/>
<rect x="238" y="85" width="15" height="8" rx="3" fill="#f472b6" transform="rotate(-20,245,89)" opacity=".9"/>
<rect x="268" y="95" width="13" height="7" rx="3" fill="#818cf8" transform="rotate(10,274,98)" opacity=".9"/>
<circle cx="200" cy="65" r="8" fill="#fbbf24" opacity=".8"/>
<circle cx="240" cy="75" r="7" fill="#f472b6" opacity=".8"/>
<circle cx="160" cy="60" r="6" fill="#818cf8" opacity=".8"/>
<circle cx="278" cy="68" r="7" fill="#34d399" opacity=".8"/>
<path d="M170 120 Q200 160 185 200 Q170 240 200 270" stroke="#f472b6" stroke-width="3" fill="none" opacity=".6"/>
<path d="M170 118 Q145 165 160 210 Q175 255 150 285" stroke="#818cf8" stroke-width="3" fill="none" opacity=".6"/>
<circle cx="280" cy="175" r="14" fill="#fbbf24" opacity=".5"/>
<circle cx="35" cy="150" r="11" fill="#f472b6" opacity=".4"/>
`)

// ── THANK YOU ─────────────────────────────────────────────────────────────
svgs['thank-you'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0.2" y2="1"><stop offset="0%" stop-color="#052e16"/><stop offset="100%" stop-color="#14532d"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<ellipse cx="20" cy="80" rx="40" ry="20" fill="#16a34a" opacity=".3" transform="rotate(-30,20,80)"/>
<ellipse cx="300" cy="100" rx="38" ry="18" fill="#16a34a" opacity=".28" transform="rotate(20,300,100)"/>
<ellipse cx="30" cy="350" rx="42" ry="20" fill="#16a34a" opacity=".3" transform="rotate(-20,30,350)"/>
<rect x="80" y="230" width="160" height="145" rx="8" fill="#fef9c3" stroke="#fbbf24" stroke-width="2.5"/>
<rect x="65" y="195" width="190" height="42" rx="8" fill="#fef9c3" stroke="#fbbf24" stroke-width="2.5"/>
<rect x="152" y="230" width="16" height="145" fill="#ef4444" opacity=".6"/>
<rect x="65" y="210" width="190" height="14" fill="#ef4444" opacity=".6"/>
<path d="M160 195 Q110 148 88 162 Q75 178 100 188 Q128 196 160 195Z" fill="#fce7f3" stroke="#f472b6" stroke-width="2.5"/>
<path d="M160 195 Q210 148 232 162 Q245 178 220 188 Q192 196 160 195Z" fill="#fce7f3" stroke="#f472b6" stroke-width="2.5"/>
<circle cx="160" cy="195" r="14" fill="#f472b6" stroke="#be185d" stroke-width="2"/>
<path d="M55 100 Q55 78 68 84 Q81 78 81 100 Q81 124 68 135 Q55 124 55 100Z" fill="#fca5a5" opacity=".7"/>
<path d="M240 85 Q240 66 251 71 Q262 66 262 85 Q262 106 251 115 Q240 106 240 85Z" fill="#fca5a5" opacity=".7"/>
`)

// ── MISS YOU ──────────────────────────────────────────────────────────────
svgs['miss-you'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0.2" y2="1"><stop offset="0%" stop-color="#2e1065"/><stop offset="100%" stop-color="#4c1d95"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<circle cx="255" cy="60" r="40" fill="#fde68a" opacity=".9"/>
<circle cx="270" cy="50" r="32" fill="#4c1d95"/>
<circle cx="20" cy="30" r="2" fill="#fff" opacity=".7"/><circle cx="60" cy="18" r="1.5" fill="#fff" opacity=".6"/>
<circle cx="100" cy="40" r="2" fill="#fff" opacity=".6"/><circle cx="140" cy="22" r="1.5" fill="#fff" opacity=".5"/>
<rect x="50" y="190" width="220" height="160" rx="10" fill="#ede9fe" stroke="#a78bfa" stroke-width="3"/>
<path d="M50 190 L160 265 L270 190" stroke="#a78bfa" stroke-width="2.5" fill="none"/>
<path d="M50 190 L160 278 L270 190 L50 190Z" fill="#ddd6fe" opacity=".6" stroke="#a78bfa" stroke-width="1.5"/>
<path d="M75 110 Q75 88 88 94 Q101 88 101 110 Q101 134 88 145 Q75 134 75 110Z" fill="#f9a8d4" opacity=".85"/>
<path d="M130 70 Q130 54 140 58 Q150 54 150 70 Q150 88 140 96 Q130 88 130 70Z" fill="#f9a8d4" opacity=".75"/>
<path d="M37 148 Q37 136 44 140 Q51 136 51 148 Q51 162 44 169 Q37 162 37 148Z" fill="#c4b5fd" opacity=".7"/>
<path d="M265 120 Q265 109 271 113 Q277 109 277 120 Q277 133 271 139 Q265 133 265 120Z" fill="#c4b5fd" opacity=".7"/>
`)

// ── GOOD LUCK ─────────────────────────────────────────────────────────────
svgs['good-luck'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0.2" y2="1"><stop offset="0%" stop-color="#1c1006"/><stop offset="100%" stop-color="#78350f"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<circle cx="160" cy="145" r="55" fill="#16a34a" opacity=".85"/>
<circle cx="160" cy="90" r="55" fill="#16a34a" opacity=".85"/>
<circle cx="105" cy="118" r="55" fill="#16a34a" opacity=".85"/>
<circle cx="215" cy="118" r="55" fill="#16a34a" opacity=".85"/>
<circle cx="160" cy="118" r="28" fill="#15803d"/>
<circle cx="148" cy="105" r="12" fill="#86efac" opacity=".3"/>
<path d="M160 173 Q155 215 145 260" stroke="#15803d" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M65 390 Q52 335 72 295 Q95 255 160 250 Q225 255 248 295 Q268 335 255 390" stroke="#fbbf24" stroke-width="12" fill="none" stroke-linecap="round"/>
<line x1="55" y1="390" x2="75" y2="390" stroke="#fbbf24" stroke-width="12" stroke-linecap="round"/>
<line x1="245" y1="390" x2="265" y2="390" stroke="#fbbf24" stroke-width="12" stroke-linecap="round"/>
<circle cx="70" cy="380" r="6" fill="#1c1006"/>
<circle cx="250" cy="380" r="6" fill="#1c1006"/>
<circle cx="62" cy="355" r="6" fill="#1c1006"/>
<circle cx="258" cy="355" r="6" fill="#1c1006"/>
<circle cx="22" cy="45" r="8" fill="#fbbf24" opacity=".7"/>
<circle cx="270" cy="38" r="7" fill="#fde68a" opacity=".65"/>
<circle cx="285" cy="215" r="6" fill="#fde68a" opacity=".5"/>
`)

// ── WELCOME BACK ──────────────────────────────────────────────────────────
svgs['welcome-back'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fffbeb"/><stop offset="100%" stop-color="#fed7aa"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<circle cx="160" cy="55" r="38" fill="#fbbf24" opacity=".9"/>
<circle cx="160" cy="55" r="28" fill="#fde68a"/>
<line x1="160" y1="5" x2="160" y2="14" stroke="#fbbf24" stroke-width="4" stroke-linecap="round"/>
<line x1="196" y1="14" x2="190" y2="21" stroke="#fbbf24" stroke-width="3.5"/>
<line x1="207" y1="46" x2="198" y2="49" stroke="#fbbf24" stroke-width="3.5"/>
<line x1="124" y1="14" x2="130" y2="21" stroke="#fbbf24" stroke-width="3.5"/>
<line x1="113" y1="46" x2="122" y2="49" stroke="#fbbf24" stroke-width="3.5"/>
<rect x="88" y="170" width="144" height="230" rx="4" fill="#fef3c7" stroke="#92400e" stroke-width="3.5"/>
<path d="M88 170 Q88 118 160 110 Q232 118 232 170" stroke="#92400e" stroke-width="3.5" fill="#fef9c3"/>
<rect x="98" y="182" width="52" height="70" rx="4" stroke="#92400e" stroke-width="2" fill="none"/>
<rect x="170" y="182" width="52" height="70" rx="4" stroke="#92400e" stroke-width="2" fill="none"/>
<rect x="98" y="264" width="52" height="80" rx="4" stroke="#92400e" stroke-width="2" fill="none"/>
<rect x="170" y="264" width="52" height="80" rx="4" stroke="#92400e" stroke-width="2" fill="none"/>
<circle cx="182" cy="308" r="10" fill="#fbbf24" stroke="#92400e" stroke-width="2"/>
<rect x="22" y="350" width="44" height="48" rx="5" fill="#92400e" opacity=".7"/>
<ellipse cx="44" cy="350" rx="28" ry="10" fill="#78350f"/>
<line x1="44" y1="340" x2="44" y2="295" stroke="#15803d" stroke-width="4"/>
<circle cx="44" cy="278" r="24" fill="#f9a8d4"/><circle cx="44" cy="278" r="12" fill="#fbbf24"/>
<rect x="254" y="350" width="44" height="48" rx="5" fill="#92400e" opacity=".7"/>
<ellipse cx="276" cy="350" rx="28" ry="10" fill="#78350f"/>
<line x1="276" y1="340" x2="276" y2="295" stroke="#15803d" stroke-width="4"/>
<circle cx="276" cy="278" r="24" fill="#86efac"/><circle cx="276" cy="278" r="12" fill="#fbbf24"/>
`)

// ── EID UL FITR ───────────────────────────────────────────────────────────
svgs['eid-ul-fitr'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0a1628"/><stop offset="100%" stop-color="#064e3b"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<circle cx="14" cy="12" r="2" fill="#fff" opacity=".6"/><circle cx="40" cy="8" r="1.5" fill="#fff" opacity=".5"/>
<circle cx="80" cy="20" r="2" fill="#fff" opacity=".6"/><circle cx="130" cy="10" r="1.5" fill="#fff" opacity=".5"/>
<circle cx="200" cy="18" r="2" fill="#fff" opacity=".6"/><circle cx="280" cy="12" r="1.5" fill="#fff" opacity=".5"/>
<circle cx="55" cy="40" r="1.5" fill="#fff" opacity=".4"/><circle cx="170" cy="35" r="1" fill="#fff" opacity=".4"/>
<circle cx="240" cy="45" r="1.5" fill="#fff" opacity=".5"/>
<circle cx="190" cy="55" r="36" fill="#fde68a" opacity=".95"/>
<circle cx="206" cy="45" r="28" fill="#0a1628"/>
<polygon points="228,32 231,42 241,42 233,48 236,58 228,52 220,58 223,48 215,42 225,42" fill="#fde68a" opacity=".95"/>
<rect x="20" y="240" width="280" height="130" fill="#0f2d1f"/>
<path d="M60 240 Q60 196 160 186 Q260 196 260 240" fill="#0d3320"/>
<line x1="160" y1="186" x2="160" y2="172" stroke="#fde68a" stroke-width="2.5"/>
<circle cx="160" cy="170" r="5" fill="#fde68a"/>
<path d="M20 240 Q20 212 44 206 Q68 212 68 240" fill="#0d3320"/>
<path d="M252 240 Q252 212 276 206 Q300 212 300 240" fill="#0d3320"/>
<rect x="8" y="192" width="20" height="78" rx="4" fill="#0d3320"/>
<polygon points="8,192 18,168 28,192" fill="#0d3320"/>
<rect x="292" y="192" width="20" height="78" rx="4" fill="#0d3320"/>
<polygon points="292,192 302,168 312,192" fill="#0d3320"/>
<rect x="38" y="130" width="22" height="32" rx="4" fill="#fbbf24" opacity=".85"/>
<polygon points="38,130 49,112 60,130" fill="#fbbf24" opacity=".75"/>
<line x1="49" y1="109" x2="49" y2="112" stroke="#fbbf24" stroke-width="2.5"/>
<rect x="128" y="110" width="22" height="32" rx="4" fill="#fb923c" opacity=".85"/>
<polygon points="128,110 139,92 150,110" fill="#fb923c" opacity=".75"/>
<line x1="139" y1="89" x2="139" y2="92" stroke="#fb923c" stroke-width="2.5"/>
<rect x="248" y="118" width="20" height="30" rx="4" fill="#fbbf24" opacity=".85"/>
<polygon points="248,118 258,102 268,118" fill="#fbbf24" opacity=".75"/>
`)

// ── EID UL ADHA ───────────────────────────────────────────────────────────
svgs['eid-ul-adha'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0a2010"/><stop offset="100%" stop-color="#14532d"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<circle cx="14" cy="12" r="2" fill="#fff" opacity=".5"/><circle cx="60" cy="8" r="1.5" fill="#fff" opacity=".5"/>
<circle cx="120" cy="20" r="2" fill="#fff" opacity=".5"/><circle cx="280" cy="15" r="2" fill="#fff" opacity=".5"/>
<circle cx="218" cy="52" r="30" fill="#fde68a" opacity=".95"/>
<circle cx="232" cy="43" r="23" fill="#0a2010"/>
<polygon points="255,35 257.5,43 266,43 259,48 261.5,56 255,51 248.5,56 251,48 244,43 252.5,43" fill="#fde68a" opacity=".9"/>
<rect x="80" y="185" width="160" height="120" fill="#1a0a00" opacity=".9"/>
<line x1="80" y1="185" x2="106" y2="155" stroke="#b45309" stroke-width="3"/>
<line x1="240" y1="185" x2="266" y2="155" stroke="#b45309" stroke-width="3"/>
<line x1="106" y1="155" x2="266" y2="155" stroke="#b45309" stroke-width="3"/>
<rect x="80" y="187" width="160" height="14" fill="#b45309" opacity=".5"/>
<rect x="133" y="230" width="54" height="75" rx="4" fill="#fef9c3" opacity=".5"/>
<circle cx="80" cy="193" r="10" fill="#6b7280" stroke="#4b5563" stroke-width="2"/>
<circle cx="80" cy="193" r="4" fill="#374151"/>
<circle cx="80" cy="193" r="36" fill="none" stroke="#b45309" stroke-width="1.5" stroke-dasharray="6,5" opacity=".4"/>
<circle cx="80" cy="193" r="44" fill="none" stroke="#b45309" stroke-width="1" stroke-dasharray="4,7" opacity=".25"/>
<circle cx="80" cy="193" r="55" fill="none" stroke="#b45309" stroke-width="1" stroke-dasharray="3,8" opacity=".2"/>
`)

// ── RAMADAN ───────────────────────────────────────────────────────────────
svgs['ramadan'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0f0c29"/><stop offset="100%" stop-color="#1e1b4b"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<circle cx="20" cy="20" r="2" fill="#fff" opacity=".6"/><circle cx="55" cy="10" r="1.5" fill="#fff" opacity=".5"/>
<circle cx="100" cy="28" r="2" fill="#fff" opacity=".6"/><circle cx="200" cy="15" r="1.5" fill="#fff" opacity=".5"/>
<circle cx="290" cy="25" r="2" fill="#fff" opacity=".6"/><circle cx="250" cy="40" r="1.5" fill="#fff" opacity=".4"/>
<circle cx="240" cy="52" r="32" fill="#fde68a" opacity=".9"/>
<circle cx="255" cy="43" r="25" fill="#0f0c29"/>
<polygon points="272,33 274.5,41 283,41 276,46 278.5,54 272,49 265.5,54 268,46 261,41 269.5,41" fill="#fde68a" opacity=".9"/>
<rect x="20" y="258" width="280" height="100" fill="#0a0820"/>
<path d="M60 258 Q60 228 160 220 Q260 228 260 258" fill="#0c0a22"/>
<line x1="160" y1="220" x2="160" y2="208" stroke="#fbbf24" stroke-width="2"/>
<circle cx="160" cy="206" r="4" fill="#fbbf24"/>
<rect x="8" y="210" width="16" height="68" rx="3" fill="#0c0a22"/>
<polygon points="8,210 16,194 24,210" fill="#0c0a22"/>
<rect x="296" y="210" width="16" height="68" rx="3" fill="#0c0a22"/>
<polygon points="296,210 304,194 312,210" fill="#0c0a22"/>
<rect x="133" y="130" width="24" height="35" rx="5" fill="#fbbf24" opacity=".9"/>
<polygon points="133,130 145,110 157,130" fill="#fbbf24" opacity=".8"/>
<line x1="145" y1="107" x2="145" y2="110" stroke="#fbbf24" stroke-width="3"/>
<line x1="138" y1="140" x2="152" y2="140" stroke="#b45309" stroke-width="1.5" opacity=".5"/>
<line x1="138" y1="148" x2="152" y2="148" stroke="#b45309" stroke-width="1.5" opacity=".5"/>
<ellipse cx="90" cy="360" rx="50" ry="16" fill="#92400e" opacity=".8"/>
<ellipse cx="72" cy="350" rx="16" ry="9" fill="#78350f"/>
<ellipse cx="90" cy="346" rx="16" ry="9" fill="#78350f"/>
<ellipse cx="108" cy="350" rx="16" ry="9" fill="#92400e" opacity=".8"/>
`)

// ── JUMMA ─────────────────────────────────────────────────────────────────
svgs['jumma'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#002418"/><stop offset="100%" stop-color="#004d40"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<circle cx="20" cy="20" r="2" fill="#fff" opacity=".5"/><circle cx="80" cy="12" r="1.5" fill="#fff" opacity=".4"/>
<circle cx="200" cy="22" r="2" fill="#fff" opacity=".5"/><circle cx="280" cy="10" r="1.5" fill="#fff" opacity=".4"/>
<circle cx="160" cy="45" r="28" fill="#fde68a" opacity=".9"/>
<circle cx="171" cy="37" r="22" fill="#002418"/>
<polygon points="186,27 188,34 196,34 190,38 192,46 186,42 180,46 182,38 176,34 184,34" fill="#fde68a" opacity=".9"/>
<rect x="10" y="258" width="300" height="115" fill="#00201a"/>
<path d="M55 258 Q55 220 160 212 Q265 220 265 258" fill="#001f17"/>
<line x1="160" y1="212" x2="160" y2="198" stroke="#fde68a" stroke-width="2.5"/>
<circle cx="160" cy="196" r="5" fill="#fde68a"/>
<path d="M10 258 Q10 230 34 224 Q58 230 58 258" fill="#001f17"/>
<path d="M262 258 Q262 230 286 224 Q310 230 310 258" fill="#001f17"/>
<rect x="2" y="208" width="16" height="68" rx="3" fill="#001f17"/>
<polygon points="2,208 10,188 18,208" fill="#001f17"/>
<rect x="302" y="208" width="16" height="68" rx="3" fill="#001f17"/>
<polygon points="302,208 310,188 318,208" fill="#001f17"/>
<path d="M140 373 L140 345 Q140 330 160 328 Q180 330 180 345 L180 373" stroke="#fde68a" stroke-width="2.5" fill="none"/>
<path d="M130 100 Q145 88 160 94 Q175 88 190 100 Q178 118 160 124 Q142 118 130 100Z" fill="#fde68a" opacity=".2"/>
`)

// ── HAJJ ──────────────────────────────────────────────────────────────────
svgs['hajj'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1c0e00"/><stop offset="100%" stop-color="#78350f"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<circle cx="14" cy="12" r="2" fill="#fff" opacity=".5"/><circle cx="60" cy="8" r="1.5" fill="#fff" opacity=".4"/>
<circle cx="250" cy="18" r="2" fill="#fff" opacity=".5"/>
<circle cx="210" cy="50" r="26" fill="#fde68a" opacity=".9"/>
<circle cx="222" cy="42" r="20" fill="#1c0e00"/>
<polygon points="238,32 240,40 248,40 242,44 244,52 238,48 232,52 234,44 228,40 236,40" fill="#fde68a" opacity=".9"/>
<rect x="100" y="195" width="120" height="90" fill="#1a0a00" stroke="#b45309" stroke-width="3"/>
<line x1="100" y1="195" x2="120" y2="170" stroke="#b45309" stroke-width="2.5"/>
<line x1="220" y1="195" x2="240" y2="170" stroke="#b45309" stroke-width="2.5"/>
<line x1="120" y1="170" x2="240" y2="170" stroke="#b45309" stroke-width="2.5"/>
<rect x="100" y="197" width="120" height="12" fill="#b45309" opacity=".6"/>
<rect x="142" y="240" width="36" height="45" rx="3" fill="#fef9c3" opacity=".4"/>
<circle cx="100" cy="200" r="8" fill="#6b7280" stroke="#4b5563" stroke-width="2"/>
<circle cx="100" cy="200" r="3" fill="#374151"/>
<circle cx="100" cy="200" r="32" fill="none" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="5,5" opacity=".5"/>
<circle cx="100" cy="200" r="42" fill="none" stroke="#fbbf24" stroke-width="1" stroke-dasharray="4,6" opacity=".3"/>
<circle cx="100" cy="200" r="55" fill="none" stroke="#fbbf24" stroke-width="1" stroke-dasharray="3,8" opacity=".2"/>
<circle cx="100" cy="200" r="68" fill="none" stroke="#fbbf24" stroke-width="0.8" stroke-dasharray="2,9" opacity=".15"/>
`)

// ── UMRAH ─────────────────────────────────────────────────────────────────
svgs['umrah'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#120b00"/><stop offset="100%" stop-color="#b45309"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<circle cx="20" cy="18" r="2" fill="#fff" opacity=".5"/><circle cx="70" cy="10" r="1.5" fill="#fff" opacity=".4"/>
<circle cx="270" cy="22" r="2" fill="#fff" opacity=".5"/>
<circle cx="88" cy="52" r="28" fill="#fde68a" opacity=".9"/>
<circle cx="100" cy="43" r="22" fill="#120b00"/>
<polygon points="113,32 115,40 124,40 117,45 120,53 113,48 106,53 109,45 102,40 111,40" fill="#fde68a" opacity=".9"/>
<rect x="60" y="230" width="200" height="130" fill="#0a0500" stroke="#b45309" stroke-width="2.5"/>
<path d="M85 230 Q85 188 160 180 Q235 188 235 230" fill="#0c0600"/>
<line x1="160" y1="180" x2="160" y2="166" stroke="#fde68a" stroke-width="2.5"/>
<circle cx="160" cy="164" r="5" fill="#fde68a"/>
<path d="M60 230 Q60 208 78 204 Q96 208 96 230" fill="#0c0600"/>
<path d="M224 230 Q224 208 242 204 Q260 208 260 230" fill="#0c0600"/>
<rect x="46" y="190" width="14" height="60" rx="3" fill="#0c0600"/>
<polygon points="46,190 53,174 60,190" fill="#0c0600"/>
<rect x="260" y="190" width="14" height="60" rx="3" fill="#0c0600"/>
<polygon points="260,190 267,174 274,190" fill="#0c0600"/>
<rect x="18" y="198" width="12" height="54" rx="2" fill="#0c0600"/>
<polygon points="18,198 24,184 30,198" fill="#0c0600"/>
<rect x="290" y="198" width="12" height="54" rx="2" fill="#0c0600"/>
<polygon points="290,198 296,184 302,198" fill="#0c0600"/>
<rect x="128" y="268" width="44" height="92" rx="3" fill="#fef3c7" opacity=".3"/>
`)

// ── MILAD ─────────────────────────────────────────────────────────────────
svgs['milad'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0a0a2a"/><stop offset="100%" stop-color="#003344"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<circle cx="20" cy="25" r="2" fill="#fff" opacity=".6"/><circle cx="60" cy="12" r="1.5" fill="#fff" opacity=".5"/>
<circle cx="100" cy="30" r="2" fill="#fff" opacity=".6"/><circle cx="200" cy="18" r="2" fill="#fff" opacity=".5"/>
<circle cx="280" cy="28" r="1.5" fill="#fff" opacity=".6"/>
<circle cx="160" cy="52" r="30" fill="#fde68a" opacity=".9"/>
<circle cx="173" cy="43" r="23" fill="#0a0a2a"/>
<polygon points="188,32 190.5,40 200,40 192.5,45 195,53 188,48 181,53 183.5,45 176,40 185.5,40" fill="#fde68a" opacity=".9"/>
<circle cx="160" cy="52" r="50" fill="none" stroke="#fde68a" stroke-width="1" stroke-dasharray="4,6" opacity=".3"/>
<circle cx="160" cy="52" r="65" fill="none" stroke="#fde68a" stroke-width="0.8" stroke-dasharray="3,7" opacity=".2"/>
<rect x="20" y="258" width="280" height="110" fill="#04151f"/>
<path d="M60 258 Q60 220 160 212 Q260 220 260 258" fill="#051a26"/>
<line x1="160" y1="212" x2="160" y2="198" stroke="#fbbf24" stroke-width="2.5"/>
<circle cx="160" cy="196" r="5" fill="#fbbf24"/>
<rect x="4" y="208" width="16" height="70" rx="3" fill="#051a26"/>
<polygon points="4,208 12,188 20,208" fill="#051a26"/>
<rect x="300" y="208" width="16" height="70" rx="3" fill="#051a26"/>
<polygon points="300,208 308,188 316,208" fill="#051a26"/>
<path d="M8 148 Q60 135 100 148 Q60 155 8 148Z" fill="#fde68a" opacity=".15"/>
<path d="M220 138 Q260 125 312 138 Q260 148 220 138Z" fill="#fde68a" opacity=".15"/>
<path d="M30 170 Q160 152 290 170" stroke="#fbbf24" stroke-width="1" fill="none" stroke-dasharray="4,8" opacity=".3"/>
`)

// ── GRADUATION ────────────────────────────────────────────────────────────
svgs['graduation'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0.2" y2="1"><stop offset="0%" stop-color="#0d1b4c"/><stop offset="100%" stop-color="#1e3a8a"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<circle cx="25" cy="25" r="2.5" fill="#fbbf24" opacity=".8"/><circle cx="80" cy="15" r="2" fill="#fbbf24" opacity=".7"/>
<circle cx="140" cy="28" r="2.5" fill="#fbbf24" opacity=".8"/><circle cx="260" cy="18" r="2" fill="#fbbf24" opacity=".7"/>
<circle cx="295" cy="35" r="2.5" fill="#fbbf24" opacity=".8"/>
<ellipse cx="160" cy="148" rx="95" ry="26" fill="#1e3a8a"/>
<rect x="90" y="88" width="140" height="62" rx="6" fill="#1e3a8a" stroke="#93c5fd" stroke-width="2"/>
<line x1="255" y1="148" x2="285" y2="196" stroke="#fbbf24" stroke-width="5" stroke-linecap="round"/>
<circle cx="285" cy="202" r="14" fill="#fbbf24"/>
<line x1="278" y1="216" x2="272" y2="240" stroke="#fbbf24" stroke-width="3"/>
<line x1="285" y1="216" x2="285" y2="240" stroke="#fbbf24" stroke-width="3"/>
<line x1="292" y1="216" x2="298" y2="240" stroke="#fbbf24" stroke-width="3"/>
<rect x="55" y="240" width="210" height="140" rx="10" fill="#fef9c3" stroke="#fbbf24" stroke-width="3"/>
<ellipse cx="55" cy="310" rx="18" ry="70" fill="#fef3c7" stroke="#fbbf24" stroke-width="2.5"/>
<ellipse cx="265" cy="310" rx="18" ry="70" fill="#fef3c7" stroke="#fbbf24" stroke-width="2.5"/>
<rect x="150" y="240" width="20" height="140" fill="#ef4444" opacity=".45"/>
<rect x="85" y="272" width="150" height="8" rx="2" fill="#92400e" opacity=".35"/>
<rect x="95" y="288" width="130" height="8" rx="2" fill="#92400e" opacity=".3"/>
<rect x="105" y="304" width="110" height="8" rx="2" fill="#92400e" opacity=".25"/>
<circle cx="160" cy="355" r="16" fill="#fbbf24" stroke="#b45309" stroke-width="2"/>
<rect x="15" y="185" width="18" height="8" rx="2" fill="#f472b6" transform="rotate(-30,24,189)" opacity=".8"/>
<rect x="283" y="175" width="16" height="7" rx="2" fill="#34d399" transform="rotate(20,291,178)" opacity=".8"/>
`)

// ── NEW JOB ───────────────────────────────────────────────────────────────
svgs['new-job'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0.2" y2="1"><stop offset="0%" stop-color="#052e16"/><stop offset="100%" stop-color="#166534"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<rect x="60" y="190" width="200" height="170" rx="8" fill="#ecfdf5" stroke="#059669" stroke-width="2.5"/>
<path d="M60 218 L160 270 L260 218" stroke="#059669" stroke-width="2.5" fill="none"/>
<path d="M60 218 L160 282 L260 218 L60 218Z" fill="#d1fae5" opacity=".5"/>
<path d="M60 360 L110 305" stroke="#059669" stroke-width="1.5" opacity=".4"/>
<path d="M260 360 L210 305" stroke="#059669" stroke-width="1.5" opacity=".4"/>
<rect x="115" y="140" width="90" height="58" rx="6" fill="#fef9c3" stroke="#fbbf24" stroke-width="3"/>
<rect x="115" y="140" width="90" height="16" rx="6" fill="#fbbf24" opacity=".6"/>
<line x1="130" y1="168" x2="185" y2="168" stroke="#92400e" stroke-width="2" opacity=".5"/>
<line x1="135" y1="180" x2="180" y2="180" stroke="#92400e" stroke-width="2" opacity=".4"/>
<circle cx="65" cy="110" r="22" fill="#fbbf24" opacity=".9"/><circle cx="65" cy="110" r="12" fill="#f59e0b"/>
<line x1="65" y1="80" x2="65" y2="88" stroke="#fbbf24" stroke-width="3.5" stroke-linecap="round"/>
<line x1="85" y1="88" x2="80" y2="94" stroke="#fbbf24" stroke-width="3"/>
<line x1="90" y1="110" x2="82" y2="110" stroke="#fbbf24" stroke-width="3"/>
<circle cx="255" cy="100" r="18" fill="#a78bfa" opacity=".5"/>
<circle cx="255" cy="100" r="10" fill="#7c3aed" opacity=".6"/>
`)

// ── PROMOTION ─────────────────────────────────────────────────────────────
svgs['promotion'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stop-color="#1c0500"/><stop offset="100%" stop-color="#9a3412"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<polygon points="160,80 178,138 238,138 190,174 208,232 160,196 112,232 130,174 82,138 142,138" fill="#fde68a" stroke="#fbbf24" stroke-width="3"/>
<circle cx="160" cy="155" r="35" fill="#fbbf24" opacity=".3"/>
<rect x="80" y="265" width="160" height="130" rx="6" fill="#fef3c7" stroke="#fbbf24" stroke-width="2.5"/>
<rect x="80" y="265" width="160" height="22" rx="6" fill="#fbbf24" opacity=".6"/>
<rect x="93" y="300" width="134" height="8" rx="2" fill="#92400e" opacity=".4"/>
<rect x="100" y="316" width="120" height="8" rx="2" fill="#92400e" opacity=".35"/>
<rect x="108" y="332" width="104" height="8" rx="2" fill="#92400e" opacity=".3"/>
<rect x="20" y="180" width="14" height="8" rx="2" fill="#f472b6" transform="rotate(-30,27,184)" opacity=".8"/>
<rect x="285" y="165" width="14" height="7" rx="2" fill="#34d399" transform="rotate(20,292,168)" opacity=".8"/>
<circle cx="30" cy="115" r="10" fill="#fbbf24" opacity=".6"/>
<circle cx="290" cy="105" r="8" fill="#fbbf24" opacity=".55"/>
`)

// ── NEW HOME ──────────────────────────────────────────────────────────────
svgs['new-home'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fef3c7"/><stop offset="100%" stop-color="#fed7aa"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<circle cx="250" cy="60" r="42" fill="#fbbf24" opacity=".7"/>
<circle cx="250" cy="60" r="30" fill="#fde68a"/>
<ellipse cx="70" cy="90" rx="55" ry="30" fill="white" opacity=".6"/>
<ellipse cx="280" cy="120" rx="45" ry="25" fill="white" opacity=".5"/>
<polygon points="160,140 240,210 80,210" fill="#ef4444" stroke="#dc2626" stroke-width="2.5"/>
<polygon points="160,140 80,210 80,360 240,360 240,210" fill="#fef9c3" stroke="#b45309" stroke-width="2.5"/>
<rect x="105" y="270" width="50" height="90" rx="4" fill="#92400e" stroke="#78350f" stroke-width="2"/>
<rect x="170" y="258" width="50" height="50" rx="4" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/>
<line x1="195" y1="258" x2="195" y2="308" stroke="#0284c7" stroke-width="1.5"/>
<line x1="170" y1="283" x2="220" y2="283" stroke="#0284c7" stroke-width="1.5"/>
<rect x="80" y="355" width="160" height="25" fill="#92400e" opacity=".2"/>
<ellipse cx="65" cy="310" rx="22" ry="14" fill="#16a34a" opacity=".8"/>
<ellipse cx="255" cy="300" rx="20" ry="12" fill="#16a34a" opacity=".8"/>
<circle cx="130" cy="316" r="6" fill="#fbbf24" stroke="#92400e" stroke-width="1.5"/>
`)

// ── BUSINESS LAUNCH ───────────────────────────────────────────────────────
svgs['business-launch'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0.1" y2="1"><stop offset="0%" stop-color="#030712"/><stop offset="100%" stop-color="#0c1445"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<circle cx="20" cy="20" r="2" fill="#fff" opacity=".7"/><circle cx="80" cy="12" r="1.5" fill="#fff" opacity=".6"/>
<circle cx="200" cy="25" r="2" fill="#fff" opacity=".7"/><circle cx="270" cy="15" r="1.5" fill="#fff" opacity=".6"/>
<circle cx="300" cy="40" r="2" fill="#fff" opacity=".6"/>
<ellipse cx="160" cy="190" rx="60" ry="70" fill="#1d4ed8" opacity=".2"/>
<path d="M160 320 L148 280 L124 268 L148 272 L160 230 L172 272 L196 268 L172 280 Z" fill="#f0f9ff" stroke="#93c5fd" stroke-width="2"/>
<ellipse cx="160" cy="226" rx="28" ry="14" fill="#1d4ed8" opacity=".5"/>
<rect x="145" y="320" width="30" height="65" fill="#6b7280" opacity=".8"/>
<path d="M115 385 Q160 370 205 385 L220 427 L100 427 Z" fill="#374151"/>
<path d="M145 320 Q160 310 175 320" stroke="#93c5fd" stroke-width="2.5" fill="none"/>
<circle cx="35" cy="155" r="6" fill="#fbbf24" opacity=".7"/>
<circle cx="285" cy="145" r="5" fill="#fbbf24" opacity=".6"/>
<circle cx="55" cy="220" r="4" fill="#60a5fa" opacity=".5"/>
<circle cx="265" cy="210" r="4" fill="#60a5fa" opacity=".5"/>
<rect x="15" y="195" width="12" height="6" rx="2" fill="#f472b6" transform="rotate(-25,21,198)" opacity=".7"/>
<rect x="290" y="185" width="11" height="5" rx="2" fill="#34d399" transform="rotate(15,295,187)" opacity=".7"/>
`)

// ── EXAM PASS ─────────────────────────────────────────────────────────────
svgs['exam-pass'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0.2" y2="1"><stop offset="0%" stop-color="#0d1b4c"/><stop offset="100%" stop-color="#283593"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<rect x="55" y="150" width="210" height="230" rx="10" fill="#fef9c3" stroke="#fbbf24" stroke-width="3"/>
<ellipse cx="55" cy="265" rx="16" ry="115" fill="#fef3c7" stroke="#fbbf24" stroke-width="2.5"/>
<ellipse cx="265" cy="265" rx="16" ry="115" fill="#fef3c7" stroke="#fbbf24" stroke-width="2.5"/>
<rect x="148" y="150" width="24" height="230" fill="#ef4444" opacity=".3"/>
<rect x="85" y="188" width="150" height="8" rx="2" fill="#1e3a8a" opacity=".4"/>
<rect x="90" y="206" width="140" height="8" rx="2" fill="#1e3a8a" opacity=".35"/>
<rect x="95" y="224" width="130" height="8" rx="2" fill="#1e3a8a" opacity=".3"/>
<rect x="90" y="242" width="140" height="8" rx="2" fill="#1e3a8a" opacity=".3"/>
<rect x="85" y="260" width="150" height="8" rx="2" fill="#1e3a8a" opacity=".25"/>
<circle cx="160" cy="318" r="28" fill="#fbbf24" opacity=".8"/>
<path d="M146 318 L156 330 L178 306" stroke="#166534" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<polygon points="160,60 168,86 196,86 174,102 182,128 160,112 138,128 146,102 124,86 152,86" fill="#fbbf24" opacity=".9"/>
<rect x="20" y="170" width="14" height="7" rx="2" fill="#f472b6" transform="rotate(-30,27,173)" opacity=".8"/>
<rect x="284" y="160" width="13" height="6" rx="2" fill="#34d399" transform="rotate(20,290,163)" opacity=".8"/>
`)

// ── NEW YEAR ──────────────────────────────────────────────────────────────
svgs['new-year'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#020617"/><stop offset="100%" stop-color="#1e1b4b"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<circle cx="20" cy="20" r="2" fill="#fff" opacity=".7"/><circle cx="70" cy="10" r="1.5" fill="#fff" opacity=".6"/>
<circle cx="130" cy="28" r="2" fill="#fff" opacity=".7"/><circle cx="200" cy="15" r="1.5" fill="#fff" opacity=".5"/>
<circle cx="280" cy="22" r="2" fill="#fff" opacity=".7"/><circle cx="250" cy="42" r="1.5" fill="#fff" opacity=".5"/>
<circle cx="45" cy="55" r="1.5" fill="#fff" opacity=".6"/><circle cx="310" cy="60" r="2" fill="#fff" opacity=".6"/>
<circle cx="160" cy="155" r="90" fill="#1e1b4b" opacity=".5"/>
<circle cx="160" cy="155" r="70" fill="none" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="6,6" opacity=".5"/>
<circle cx="160" cy="155" r="50" fill="none" stroke="#fbbf24" stroke-width="1" stroke-dasharray="4,6" opacity=".35"/>
<rect x="150" y="60" width="20" height="95" fill="#b45309" opacity=".8"/>
<ellipse cx="160" cy="155" rx="55" ry="18" fill="#b45309" opacity=".7"/>
<polygon points="160,55 167,76 190,76 172,89 179,110 160,97 141,110 148,89 130,76 153,76" fill="#fde68a"/>
<rect x="20" y="160" width="16" height="8" rx="2" fill="#f472b6" transform="rotate(-30,28,164)" opacity=".9"/>
<rect x="285" y="145" width="14" height="7" rx="2" fill="#818cf8" transform="rotate(20,292,148)" opacity=".9"/>
<rect x="50" y="210" width="14" height="7" rx="2" fill="#34d399" transform="rotate(-45,57,213)" opacity=".8"/>
<rect x="255" y="200" width="13" height="6" rx="2" fill="#fbbf24" transform="rotate(15,261,203)" opacity=".8"/>
<circle cx="30" cy="135" r="8" fill="#f472b6" opacity=".7"/>
<circle cx="290" cy="125" r="7" fill="#818cf8" opacity=".7"/>
<circle cx="55" cy="185" r="6" fill="#34d399" opacity=".6"/>
<circle cx="265" cy="175" r="6" fill="#fbbf24" opacity=".6"/>
<rect x="0" y="340" width="320" height="87" fill="#020617" opacity=".4"/>
`)

// ── INDEPENDENCE DAY ──────────────────────────────────────────────────────
svgs['independence-day'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#052e16"/><stop offset="100%" stop-color="#166534"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<rect x="38" y="30" width="10" height="280" rx="4" fill="#78716c"/>
<rect x="48" y="32" width="200" height="140" rx="4" fill="#064e3b"/>
<rect x="48" y="32" width="44" height="140" fill="white" opacity=".92"/>
<line x1="92" y1="32" x2="92" y2="172" stroke="#d1d5db" stroke-width="1" opacity=".4"/>
<circle cx="166" cy="102" r="38" fill="white" opacity=".95"/>
<circle cx="182" cy="92" r="30" fill="#064e3b"/>
<polygon points="202,78 205,88 215,88 207,94 210,104 202,98 194,104 197,94 189,88 199,88" fill="white" opacity=".95"/>
<path d="M0 210 Q40 222 80 210 Q120 198 160 210 Q200 222 240 210 Q280 198 320 210" stroke="#064e3b" stroke-width="2" fill="none" opacity=".6"/>
<path d="M0 225 Q40 237 80 225 Q120 213 160 225 Q200 237 240 225 Q280 213 320 225" stroke="#064e3b" stroke-width="1.5" fill="none" opacity=".4"/>
<polygon points="8,210 28,210 18,226" fill="#064e3b" opacity=".8"/>
<polygon points="36,205 56,205 46,221" fill="white" opacity=".8"/>
<polygon points="70,210 90,210 80,226" fill="#064e3b" opacity=".8"/>
<polygon points="108,206 128,206 118,222" fill="white" opacity=".8"/>
<polygon points="145,210 165,210 155,226" fill="#064e3b" opacity=".8"/>
<polygon points="183,208 203,208 193,224" fill="white" opacity=".8"/>
<polygon points="218,210 238,210 228,226" fill="#064e3b" opacity=".8"/>
<polygon points="255,206 275,206 265,222" fill="white" opacity=".8"/>
<polygon points="290,210 310,210 300,226" fill="#064e3b" opacity=".8"/>
<circle cx="22" cy="260" r="10" fill="#fbbf24" opacity=".7"/>
<circle cx="298" cy="255" r="8" fill="#fbbf24" opacity=".65"/>
`)

// ── KASHMIR DAY ───────────────────────────────────────────────────────────
svgs['kashmir-day'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0d1b4c"/><stop offset="100%" stop-color="#1e40af"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<polygon points="30,300 80,180 130,240 160,160 190,240 240,180 290,300" fill="#e2e8f0" opacity=".85"/>
<polygon points="80,180 130,240 160,160 190,240 240,180" fill="white" opacity=".7"/>
<polygon points="30,300 80,180 55,300" fill="#cbd5e1" opacity=".6"/>
<polygon points="290,300 240,180 265,300" fill="#cbd5e1" opacity=".6"/>
<ellipse cx="95" cy="195" rx="18" ry="22" fill="white" opacity=".5"/>
<ellipse cx="225" cy="192" rx="16" ry="20" fill="white" opacity=".5"/>
<circle cx="30" cy="25" r="2" fill="#fff" opacity=".6"/><circle cx="80" cy="15" r="1.5" fill="#fff" opacity=".5"/>
<circle cx="200" cy="20" r="2" fill="#fff" opacity=".6"/><circle cx="280" cy="12" r="1.5" fill="#fff" opacity=".5"/>
<circle cx="160" cy="55" r="28" fill="#fde68a" opacity=".9"/>
<circle cx="172" cy="47" r="21" fill="#0d1b4c"/>
<polygon points="185,36 187.5,44 196,44 189,49 191.5,57 185,52 178.5,57 181,49 174,44 182.5,44" fill="#fde68a" opacity=".9"/>
<rect x="0" y="380" width="320" height="47" fill="#0d1b4c" opacity=".5"/>
`)

// ── MOTHERS DAY ───────────────────────────────────────────────────────────
svgs['mothers-day'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0.2" y2="1"><stop offset="0%" stop-color="#4a0e2e"/><stop offset="100%" stop-color="#db2777"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<ellipse cx="30" cy="60" rx="20" ry="11" fill="#f9a8d4" opacity=".3" transform="rotate(-20,30,60)"/>
<ellipse cx="290" cy="80" rx="18" ry="10" fill="#f9a8d4" opacity=".25" transform="rotate(15,290,80)"/>
<line x1="160" y1="427" x2="160" y2="220" stroke="#15803d" stroke-width="5"/>
<line x1="160" y1="340" x2="95" y2="265" stroke="#15803d" stroke-width="4"/>
<line x1="160" y1="310" x2="225" y2="255" stroke="#15803d" stroke-width="4"/>
<line x1="160" y1="285" x2="75" y2="235" stroke="#15803d" stroke-width="3"/>
<line x1="160" y1="285" x2="245" y2="232" stroke="#15803d" stroke-width="3"/>
<circle cx="160" cy="185" r="44" fill="#f9a8d4" opacity=".9"/>
<circle cx="160" cy="163" r="23" fill="#f9a8d4"/><circle cx="183" cy="174" r="23" fill="#f9a8d4"/>
<circle cx="137" cy="174" r="23" fill="#f9a8d4"/><circle cx="160" cy="200" r="23" fill="#f9a8d4"/>
<circle cx="160" cy="185" r="23" fill="#fbbf24"/>
<circle cx="160" cy="185" r="10" fill="#92400e" opacity=".6"/>
<circle cx="95" cy="240" r="30" fill="#fda4af" opacity=".9"/>
<circle cx="95" cy="224" r="16" fill="#fda4af"/><circle cx="111" cy="233" r="16" fill="#fda4af"/>
<circle cx="79" cy="233" r="16" fill="#fda4af"/><circle cx="95" cy="252" r="16" fill="#fda4af"/>
<circle cx="95" cy="240" r="15" fill="#fbbf24"/>
<circle cx="225" cy="232" r="28" fill="#f472b6" opacity=".9"/>
<circle cx="225" cy="218" r="15" fill="#f472b6"/><circle cx="239" cy="226" r="15" fill="#f472b6"/>
<circle cx="211" cy="226" r="15" fill="#f472b6"/><circle cx="225" cy="244" r="15" fill="#f472b6"/>
<circle cx="225" cy="232" r="14" fill="#fbbf24"/>
<path d="M120 120 Q120 98 133 104 Q146 98 146 120 Q146 144 133 155 Q120 144 120 120Z" fill="#fce7f3" opacity=".8"/>
<path d="M174 110 Q174 92 185 96 Q196 92 196 110 Q196 130 185 140 Q174 130 174 110Z" fill="#fce7f3" opacity=".7"/>
`)

// ── FATHERS DAY ───────────────────────────────────────────────────────────
svgs['fathers-day'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0.2" y2="1"><stop offset="0%" stop-color="#0d1b4c"/><stop offset="100%" stop-color="#374151"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<circle cx="20" cy="25" r="2" fill="#fff" opacity=".6"/><circle cx="80" cy="15" r="1.5" fill="#fff" opacity=".5"/>
<circle cx="250" cy="20" r="2" fill="#fff" opacity=".6"/><circle cx="300" cy="35" r="1.5" fill="#fff" opacity=".5"/>
<rect x="80" y="110" width="160" height="200" rx="10" fill="#1e3a8a" stroke="#93c5fd" stroke-width="2"/>
<rect x="80" y="110" width="160" height="30" rx="10" fill="#93c5fd" opacity=".3"/>
<path d="M140 110 Q160 80 180 110" stroke="#fbbf24" stroke-width="3" fill="none"/>
<circle cx="160" cy="78" r="15" fill="#fde68a" stroke="#fbbf24" stroke-width="2"/>
<path d="M150 108 L155 140 L160 130 L165 140 L170 108" stroke="#fbbf24" stroke-width="2" fill="none"/>
<line x1="115" y1="160" x2="205" y2="160" stroke="#93c5fd" stroke-width="2" opacity=".5"/>
<line x1="115" y1="178" x2="205" y2="178" stroke="#93c5fd" stroke-width="2" opacity=".4"/>
<line x1="115" y1="196" x2="175" y2="196" stroke="#93c5fd" stroke-width="2" opacity=".35"/>
<rect x="115" y="220" width="90" height="75" rx="5" fill="#fbbf24" opacity=".15"/>
<circle cx="55" cy="220" r="28" fill="#fde68a" opacity=".8"/>
<circle cx="55" cy="220" r="18" fill="#f59e0b"/>
<line x1="55" y1="184" x2="55" y2="192" stroke="#fbbf24" stroke-width="3.5" stroke-linecap="round"/>
<line x1="79" y1="196" x2="73" y2="201" stroke="#fbbf24" stroke-width="3"/>
<line x1="84" y1="220" x2="76" y2="220" stroke="#fbbf24" stroke-width="3"/>
`)

// ── VALENTINES ────────────────────────────────────────────────────────────
svgs['valentines'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0.2" y2="1"><stop offset="0%" stop-color="#450a0a"/><stop offset="100%" stop-color="#991b1b"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<path d="M160 360 Q40 270 40 180 A68 68 0 0 1 160 145 A68 68 0 0 1 280 180 Q280 270 160 360Z" fill="#f43f5e" opacity=".9"/>
<path d="M160 330 Q65 255 65 185 A52 52 0 0 1 160 160 A52 52 0 0 1 255 185 Q255 255 160 330Z" fill="#fb7185" opacity=".45"/>
<line x1="25" y1="355" x2="295" y2="145" stroke="#fbbf24" stroke-width="5" stroke-linecap="round"/>
<polygon points="25,355 40,340 18,332" fill="#fbbf24"/>
<polygon points="295,145 280,160 302,168" fill="#fbbf24"/>
<path d="M38 78 Q38 56 52 62 Q66 56 66 78 Q66 102 52 114 Q38 102 38 78Z" fill="#fda4af" opacity=".8"/>
<path d="M254 65 Q254 46 265 50 Q276 46 276 65 Q276 86 265 96 Q254 86 254 65Z" fill="#fda4af" opacity=".8"/>
<circle cx="50" cy="380" r="24" fill="#be123c" opacity=".9"/>
<circle cx="38" cy="368" r="14" fill="#e11d48"/>
<circle cx="55" cy="364" r="11" fill="#f43f5e"/>
<line x1="50" y1="404" x2="46" y2="420" stroke="#15803d" stroke-width="3"/>
<circle cx="270" cy="380" r="24" fill="#be123c" opacity=".9"/>
<circle cx="258" cy="368" r="14" fill="#e11d48"/>
<circle cx="275" cy="364" r="11" fill="#f43f5e"/>
<line x1="270" y1="404" x2="274" y2="420" stroke="#15803d" stroke-width="3"/>
`)

// ── FRIENDSHIP DAY ────────────────────────────────────────────────────────
svgs['friendship-day'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stop-color="#4a0020"/><stop offset="100%" stop-color="#c2410c"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<path d="M20 265 Q20 225 50 220 L130 220 Q148 220 148 236 L148 268 Q148 284 130 288 L60 288 Q20 284 20 265Z" fill="#fddcb5" stroke="#fbbf24" stroke-width="2.5"/>
<path d="M300 265 Q300 225 270 220 L190 220 Q172 220 172 236 L172 268 Q172 284 190 288 L260 288 Q300 284 300 265Z" fill="#fddcb5" stroke="#a78bfa" stroke-width="2.5"/>
<rect x="128" y="220" width="64" height="24" rx="12" fill="#fddcb5" stroke="#fbbf24" stroke-width="2"/>
<rect x="115" y="270" width="90" height="14" rx="7" fill="#f472b6" opacity=".8"/>
<line x1="118" y1="277" x2="202" y2="277" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="3,2" opacity=".7"/>
<path d="M60 140 Q60 110 78 116 Q96 110 96 140 Q96 172 78 185 Q60 172 60 140Z" fill="#fce7f3" opacity=".85"/>
<path d="M175 128 Q175 100 191 105 Q207 100 207 128 Q207 158 191 170 Q175 158 175 128Z" fill="#bae6fd" opacity=".85"/>
<path d="M113 88 Q113 66 126 71 Q139 66 139 88 Q139 112 126 122 Q113 112 113 88Z" fill="#fb923c" opacity=".8"/>
<circle cx="25" cy="78" r="10" fill="#fbbf24" opacity=".7"/>
<circle cx="295" cy="68" r="8" fill="#fbbf24" opacity=".65"/>
<rect x="18" y="180" width="14" height="7" rx="2" fill="#34d399" transform="rotate(-25,25,183)" opacity=".8"/>
<rect x="285" y="170" width="13" height="6" rx="2" fill="#818cf8" transform="rotate(15,291,173)" opacity=".8"/>
`)

// ── BASANT ────────────────────────────────────────────────────────────────
svgs['basant'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#082f0a"/><stop offset="100%" stop-color="#14532d"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<circle cx="160" cy="80" r="52" fill="#fbbf24" opacity=".9"/>
<circle cx="160" cy="80" r="38" fill="#fde68a"/>
<line x1="160" y1="20" x2="160" y2="28" stroke="#fbbf24" stroke-width="4" stroke-linecap="round"/>
<line x1="204" y1="36" x2="196" y2="43" stroke="#fbbf24" stroke-width="3.5"/>
<line x1="116" y1="36" x2="124" y2="43" stroke="#fbbf24" stroke-width="3.5"/>
<polygon points="105,195 160,130 215,195 215,240 160,280 105,240" fill="#fde68a" stroke="#fbbf24" stroke-width="2.5"/>
<polygon points="105,195 215,195 215,240 105,240" fill="#fb923c" opacity=".6"/>
<line x1="105" y1="195" x2="215" y2="195" stroke="#fbbf24" stroke-width="2"/>
<line x1="160" y1="130" x2="160" y2="280" stroke="#fbbf24" stroke-width="2"/>
<path d="M160 280 Q165 330 200 370 Q220 400 230 427" stroke="#1e293b" stroke-width="2" fill="none"/>
<path d="M178 310 L188 320 L175 322" stroke="#1e293b" stroke-width="1.5" fill="none"/>
<path d="M192 350 L203 358 L190 362" stroke="#1e293b" stroke-width="1.5" fill="none"/>
<circle cx="38" cy="340" r="20" fill="#f9a8d4" opacity=".8"/>
<circle cx="38" cy="328" r="10" fill="#f472b6" opacity=".8"/>
<circle cx="45" cy="323" r="8" fill="#ec4899" opacity=".7"/>
<circle cx="282" cy="330" r="18" fill="#86efac" opacity=".8"/>
<circle cx="282" cy="319" r="9" fill="#34d399" opacity=".8"/>
<circle cx="288" cy="314" r="7" fill="#10b981" opacity=".7"/>
`)

// ── CONDOLENCE ────────────────────────────────────────────────────────────
svgs['condolence'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1e2a38"/><stop offset="100%" stop-color="#2d3e50"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<line x1="160" y1="80" x2="100" y2="130" stroke="#94a3b8" stroke-width="1.2" opacity=".4"/>
<line x1="160" y1="80" x2="160" y2="135" stroke="#94a3b8" stroke-width="1.5" opacity=".5"/>
<line x1="160" y1="80" x2="220" y2="130" stroke="#94a3b8" stroke-width="1.2" opacity=".4"/>
<circle cx="160" cy="75" r="12" fill="#fef9c3" opacity=".4"/>
<line x1="160" y1="400" x2="160" y2="155" stroke="#4b5563" stroke-width="5"/>
<ellipse cx="118" cy="270" rx="50" ry="26" fill="#4b5563" opacity=".6" transform="rotate(-30,118,270)"/>
<ellipse cx="202" cy="250" rx="50" ry="26" fill="#4b5563" opacity=".55" transform="rotate(28,202,250)"/>
<ellipse cx="122" cy="215" rx="44" ry="22" fill="#374151" opacity=".55" transform="rotate(-22,122,215)"/>
<ellipse cx="198" cy="198" rx="44" ry="22" fill="#374151" opacity=".5" transform="rotate(20,198,198)"/>
<ellipse cx="128" cy="170" rx="36" ry="18" fill="#374151" opacity=".5" transform="rotate(-15,128,170)"/>
<circle cx="112" cy="264" r="5" fill="#86efac" opacity=".35"/>
<circle cx="196" cy="244" r="5" fill="#86efac" opacity=".3"/>
<path d="M40 360 Q160 345 280 360" stroke="#64748b" stroke-width="2" stroke-dasharray="5,4" fill="none" opacity=".5"/>
`)

// ── NIKAH ─────────────────────────────────────────────────────────────────
svgs['nikah'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stop-color="#1c1000"/><stop offset="100%" stop-color="#78350f"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<path d="M20 427 L20 175 Q20 28 160 15 Q300 28 300 175 L300 427" stroke="#fbbf24" stroke-width="3" fill="none"/>
<path d="M42 427 L42 182 Q42 55 160 44 Q278 55 278 182 L278 427" stroke="#fbbf24" stroke-width="1.5" fill="none" opacity=".35"/>
<circle cx="160" cy="17" r="14" fill="#fbbf24" opacity=".8"/>
<circle cx="80" cy="165" r="55" fill="none" stroke="#fde68a" stroke-width="5.5" opacity=".9"/>
<circle cx="80" cy="165" r="55" fill="none" stroke="#fbbf24" stroke-width="2" opacity=".5"/>
<circle cx="178" cy="165" r="55" fill="none" stroke="#fde68a" stroke-width="5.5" opacity=".9"/>
<circle cx="178" cy="165" r="55" fill="none" stroke="#fbbf24" stroke-width="2" opacity=".5"/>
<polygon points="160,52 172,90 212,90 180,112 192,150 160,128 128,150 140,112 108,90 148,90" fill="#fde68a"/>
<ellipse cx="50" cy="100" rx="18" ry="10" fill="#f9a8d4" opacity=".3" transform="rotate(-20,50,100)"/>
<ellipse cx="270" cy="90" rx="16" ry="9" fill="#f9a8d4" opacity=".25" transform="rotate(15,270,90)"/>
<ellipse cx="40" cy="350" rx="20" ry="11" fill="#f9a8d4" opacity=".2" transform="rotate(-30,40,350)"/>
<ellipse cx="280" cy="340" rx="18" ry="10" fill="#f9a8d4" opacity=".2" transform="rotate(25,280,340)"/>
`)

// ── SHAADI ────────────────────────────────────────────────────────────────
svgs['shaadi'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0.2" y2="1"><stop offset="0%" stop-color="#2a0005"/><stop offset="100%" stop-color="#7f1d1d"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<path d="M15 427 L15 168 Q15 22 160 8 Q305 22 305 168 L305 427" stroke="#fbbf24" stroke-width="3" fill="none"/>
<circle cx="160" cy="10" r="14" fill="#fbbf24" opacity=".8"/>
<circle cx="92" cy="210" r="34" fill="#e9d0b0" stroke="#c8a96e" stroke-width="2.5"/>
<path d="M62 290 Q62 252 92 244 Q122 252 122 290 L128 427 L56 427Z" fill="#e9d0b0" stroke="#c8a96e" stroke-width="2.5"/>
<rect x="84" y="250" width="16" height="40" fill="#fbbf24" opacity=".4"/>
<path d="M75 202 Q92 194 109 202" stroke="#fbbf24" stroke-width="2.5" fill="none"/>
<circle cx="228" cy="210" r="34" fill="#f9c8d2" stroke="#f472b6" stroke-width="2.5"/>
<path d="M182 296 Q186 250 228 244 Q270 250 274 296 Q264 340 228 355 Q192 340 182 296Z" fill="#f9c8d2" stroke="#f472b6" stroke-width="2.5"/>
<path d="M205 200 Q228 192 251 200 Q246 182 228 178 Q210 182 205 200Z" fill="#fafafa" opacity=".7"/>
<path d="M178 290 Q185 282 192 290" stroke="#fbbf24" stroke-width="3" stroke-linecap="round"/>
<path d="M105 122 Q105 100 118 106 Q131 100 131 122 Q131 146 118 157 Q105 146 105 122Z" fill="#fce7f3" opacity=".7"/>
<ellipse cx="32" cy="80" rx="14" ry="8" fill="#f9a8d4" opacity=".3" transform="rotate(-25,32,80)"/>
<ellipse cx="288" cy="72" rx="13" ry="7" fill="#f9a8d4" opacity=".25" transform="rotate(20,288,72)"/>
`)

// ── MEHNDI ────────────────────────────────────────────────────────────────
svgs['mehndi'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0.2" y2="1"><stop offset="0%" stop-color="#052e16"/><stop offset="100%" stop-color="#78350f"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<path d="M100 427 L100 270 Q100 240 116 240 L116 195 Q116 184 124 184 Q132 184 132 195 L132 216 Q132 206 140 206 Q148 206 148 216 L148 210 Q148 200 156 200 Q164 200 164 210 L164 216 Q164 206 172 206 Q180 206 180 222 L180 240 Q192 244 196 260 L196 427Z" fill="#fef3c7" stroke="#92400e" stroke-width="2.5"/>
<circle cx="148" cy="310" r="35" fill="none" stroke="#92400e" stroke-width="2"/>
<circle cx="148" cy="310" r="20" fill="none" stroke="#92400e" stroke-width="1.5"/>
<circle cx="148" cy="310" r="8" fill="#92400e" opacity=".4"/>
<line x1="148" y1="275" x2="148" y2="345" stroke="#92400e" stroke-width="1.2" opacity=".5"/>
<line x1="113" y1="310" x2="183" y2="310" stroke="#92400e" stroke-width="1.2" opacity=".5"/>
<path d="M118 362 Q148 356 178 362 Q166 378 148 384 Q130 378 118 362Z" fill="none" stroke="#92400e" stroke-width="1.5"/>
<path d="M108 392 Q148 386 188 392" stroke="#92400e" stroke-width="1.2" stroke-dasharray="3,3" fill="none"/>
<path d="M108 408 Q148 402 188 408" stroke="#92400e" stroke-width="1" stroke-dasharray="3,3" fill="none" opacity=".7"/>
<circle cx="255" cy="90" r="38" fill="#f97316" opacity=".85"/>
<circle cx="255" cy="90" r="24" fill="#fbbf24"/>
<circle cx="255" cy="90" r="10" fill="#92400e" opacity=".6"/>
<ellipse cx="52" cy="178" rx="42" ry="22" fill="#92400e" opacity=".8"/>
<rect x="10" y="158" width="84" height="42" rx="10" fill="#78350f" opacity=".7"/>
<ellipse cx="52" cy="200" rx="42" ry="22" fill="#92400e" opacity=".8"/>
<line x1="10" y1="164" x2="94" y2="194" stroke="#fbbf24" stroke-width="1.5" opacity=".5"/>
<line x1="94" y1="164" x2="10" y2="194" stroke="#fbbf24" stroke-width="1.5" opacity=".5"/>
`)

// ─────────────────────────────────────────────────────────────────────────
// INVITATION TYPES
// ─────────────────────────────────────────────────────────────────────────
const invSvgs = {}

invSvgs['mehndi'] = svgs['mehndi']
invSvgs['nikkah'] = svgs['nikah']
invSvgs['barat'] = svgs['shaadi']

invSvgs['dholki'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stop-color="#3b0764"/><stop offset="100%" stop-color="#78350f"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<circle cx="20" cy="20" r="2" fill="#fbbf24" opacity=".7"/><circle cx="300" cy="30" r="2" fill="#fbbf24" opacity=".6"/>
<ellipse cx="160" cy="168" rx="110" ry="52" fill="#92400e" stroke="#fbbf24" stroke-width="3"/>
<rect x="50" y="150" width="220" height="90" rx="14" fill="#78350f" stroke="#fbbf24" stroke-width="2.5"/>
<ellipse cx="160" cy="240" rx="110" ry="52" fill="#92400e" stroke="#fbbf24" stroke-width="3"/>
<line x1="50" y1="162" x2="270" y2="228" stroke="#fbbf24" stroke-width="2" opacity=".5"/>
<line x1="270" y1="162" x2="50" y2="228" stroke="#fbbf24" stroke-width="2" opacity=".5"/>
<line x1="50" y1="180" x2="270" y2="210" stroke="#fbbf24" stroke-width="1.5" opacity=".3"/>
<circle cx="80" cy="192" r="18" fill="#fef3c7" opacity=".3"/>
<circle cx="240" cy="197" r="18" fill="#fef3c7" opacity=".3"/>
<circle cx="55" cy="340" r="30" fill="#f97316" opacity=".85"/>
<circle cx="55" cy="340" r="18" fill="#fbbf24"/>
<circle cx="55" cy="340" r="7" fill="#92400e" opacity=".6"/>
<circle cx="265" cy="330" r="28" fill="#f97316" opacity=".85"/>
<circle cx="265" cy="330" r="17" fill="#fbbf24"/>
<circle cx="265" cy="330" r="7" fill="#92400e" opacity=".6"/>
<path d="M55 80 Q55 58 68 64 Q81 58 81 80 Q81 104 68 115 Q55 104 55 80Z" fill="#f9a8d4" opacity=".8"/>
<path d="M240 70 Q240 51 251 56 Q262 51 262 70 Q262 91 251 102 Q240 91 240 70Z" fill="#f9a8d4" opacity=".7"/>
`)

invSvgs['walima'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stop-color="#1c1000"/><stop offset="100%" stop-color="#713f12"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<rect x="50" y="110" width="220" height="260" rx="10" fill="#fef9c3" opacity=".95"/>
<rect x="50" y="110" width="220" height="35" rx="10" fill="#fbbf24" opacity=".8"/>
<ellipse cx="70" cy="295" rx="28" ry="14" fill="#fde68a" opacity=".7"/>
<ellipse cx="250" cy="295" rx="28" ry="14" fill="#fde68a" opacity=".7"/>
<circle cx="70" cy="255" r="22" fill="#dc2626" opacity=".85"/>
<circle cx="70" cy="255" r="13" fill="#ef4444"/>
<line x1="70" y1="233" x2="70" y2="241" stroke="#ef4444" stroke-width="3"/>
<circle cx="250" cy="250" r="22" fill="#dc2626" opacity=".85"/>
<circle cx="250" cy="250" r="13" fill="#ef4444"/>
<line x1="250" y1="228" x2="250" y2="236" stroke="#ef4444" stroke-width="3"/>
<path d="M118 200 Q118 178 131 184 Q144 178 144 200 Q144 224 131 235 Q118 224 118 200Z" fill="#f9a8d4" opacity=".7"/>
<path d="M176 192 Q176 172 187 177 Q198 172 198 192 Q198 214 187 224 Q176 214 176 192Z" fill="#f9a8d4" opacity=".7"/>
<polygon points="160,30 170,60 202,60 178,78 186,108 160,90 134,108 142,78 118,60 150,60" fill="#fde68a"/>
<path d="M60 380 Q160 365 260 380" stroke="#fbbf24" stroke-width="2.5" fill="none"/>
`)

invSvgs['engagement'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stop-color="#4a0e2e"/><stop offset="100%" stop-color="#c2185b"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<polygon points="160,75 198,130 160,168 122,130" fill="#fce7f3" stroke="#fbbf24" stroke-width="3" opacity=".95"/>
<polygon points="160,75 198,130 160,110" fill="#fde68a" opacity=".55"/>
<line x1="122" y1="130" x2="198" y2="130" stroke="#fbbf24" stroke-width="2" opacity=".6"/>
<circle cx="100" cy="250" r="62" fill="none" stroke="#fde68a" stroke-width="5.5"/>
<circle cx="220" cy="250" r="62" fill="none" stroke="#fde68a" stroke-width="5.5"/>
<path d="M108 200 Q108 178 121 184 Q134 178 134 200 Q134 224 121 235 Q108 224 108 200Z" fill="#fce7f3" opacity=".7"/>
<path d="M186 190 Q186 170 197 175 Q208 170 208 190 Q208 212 197 222 Q186 212 186 190Z" fill="#fce7f3" opacity=".7"/>
<ellipse cx="30" cy="55" rx="20" ry="11" fill="#f9a8d4" opacity=".3" transform="rotate(-20,30,55)"/>
<ellipse cx="290" cy="70" rx="18" ry="10" fill="#f9a8d4" opacity=".25" transform="rotate(15,290,70)"/>
<ellipse cx="30" cy="360" rx="20" ry="11" fill="#f9a8d4" opacity=".25" transform="rotate(-30,30,360)"/>
<ellipse cx="290" cy="350" rx="18" ry="10" fill="#f9a8d4" opacity=".2" transform="rotate(25,290,350)"/>
`)

invSvgs['eid-party'] = svgs['eid-ul-fitr']
invSvgs['milad'] = svgs['milad']

invSvgs['quran-khatam'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#002418"/><stop offset="100%" stop-color="#064e3b"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<circle cx="20" cy="20" r="2" fill="#fde68a" opacity=".5"/><circle cx="300" cy="25" r="2" fill="#fde68a" opacity=".5"/>
<rect x="70" y="140" width="180" height="230" rx="10" fill="#fef9c3" stroke="#fbbf24" stroke-width="3"/>
<rect x="70" y="140" width="8" height="230" rx="4" fill="#92400e"/>
<rect x="82" y="155" width="158" height="8" rx="2" fill="#92400e" opacity=".4"/>
<rect x="82" y="172" width="140" height="8" rx="2" fill="#92400e" opacity=".35"/>
<rect x="82" y="189" width="150" height="8" rx="2" fill="#92400e" opacity=".35"/>
<rect x="82" y="206" width="130" height="8" rx="2" fill="#92400e" opacity=".3"/>
<rect x="82" y="223" width="145" height="8" rx="2" fill="#92400e" opacity=".3"/>
<rect x="82" y="240" width="135" height="8" rx="2" fill="#92400e" opacity=".28"/>
<rect x="82" y="257" width="148" height="8" rx="2" fill="#92400e" opacity=".28"/>
<rect x="82" y="274" width="125" height="8" rx="2" fill="#92400e" opacity=".25"/>
<rect x="82" y="291" width="140" height="8" rx="2" fill="#92400e" opacity=".25"/>
<circle cx="160" cy="82" r="38" fill="#fde68a" opacity=".2"/>
<circle cx="160" cy="82" r="24" fill="none" stroke="#fde68a" stroke-width="1.5" opacity=".4"/>
<circle cx="160" cy="82" r="12" fill="#fde68a" opacity=".3"/>
<path d="M130 350 Q160 342 190 350" stroke="#fbbf24" stroke-width="2.5" fill="none"/>
`)

invSvgs['iftaar'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0f0c29"/><stop offset="100%" stop-color="#1e1b4b"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<circle cx="20" cy="22" r="2" fill="#fff" opacity=".6"/><circle cx="80" cy="12" r="1.5" fill="#fff" opacity=".5"/>
<circle cx="250" cy="18" r="2" fill="#fff" opacity=".6"/>
<circle cx="230" cy="55" r="32" fill="#fde68a" opacity=".9"/>
<circle cx="245" cy="46" r="25" fill="#0f0c29"/>
<polygon points="263,36 265.5,44 274,44 267,49 269.5,57 263,52 256.5,57 259,49 252,44 260.5,44" fill="#fde68a" opacity=".9"/>
<rect x="40" y="300" width="240" height="80" rx="8" fill="#1a1040" opacity=".8"/>
<ellipse cx="90" cy="310" rx="32" ry="12" fill="#fef9c3" opacity=".8"/>
<rect x="86" y="310" width="8" height="22" rx="3" fill="#6b7280"/>
<circle cx="76" cy="322" r="16" fill="#d1d5db" stroke="#9ca3af" stroke-width="2"/>
<circle cx="104" cy="322" r="16" fill="#d1d5db" stroke="#9ca3af" stroke-width="2"/>
<rect x="165" y="290" width="90" height="60" rx="6" fill="#fef3c7" opacity=".7"/>
<ellipse cx="175" cy="302" rx="12" ry="7" fill="#92400e" opacity=".7"/>
<ellipse cx="195" cy="298" rx="12" ry="7" fill="#92400e" opacity=".7"/>
<ellipse cx="215" cy="302" rx="12" ry="7" fill="#78350f" opacity=".7"/>
<ellipse cx="235" cy="298" rx="12" ry="7" fill="#92400e" opacity=".6"/>
<rect x="105" y="165" width="22" height="38" rx="6" fill="#fbbf24" opacity=".9"/>
<polygon points="105,165 116,140 127,165" fill="#fbbf24" opacity=".8"/>
<line x1="116" y1="137" x2="116" y2="140" stroke="#fbbf24" stroke-width="3"/>
<rect x="193" y="155" width="20" height="36" rx="5" fill="#fb923c" opacity=".9"/>
<polygon points="193,155 203,132 213,155" fill="#fb923c" opacity=".8"/>
<line x1="203" y1="129" x2="203" y2="132" stroke="#fb923c" stroke-width="3"/>
`)

invSvgs['chelum'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1e2a38"/><stop offset="100%" stop-color="#2d3e50"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<line x1="160" y1="95" x2="105" y2="140" stroke="#94a3b8" stroke-width="1.2" opacity=".4"/>
<line x1="160" y1="95" x2="160" y2="145" stroke="#94a3b8" stroke-width="1.5" opacity=".5"/>
<line x1="160" y1="95" x2="215" y2="140" stroke="#94a3b8" stroke-width="1.2" opacity=".4"/>
<circle cx="160" cy="88" r="12" fill="#fef9c3" opacity=".35"/>
<line x1="160" y1="427" x2="160" y2="175" stroke="#4b5563" stroke-width="5"/>
<ellipse cx="120" cy="282" rx="48" ry="24" fill="#4b5563" opacity=".6" transform="rotate(-28,120,282)"/>
<ellipse cx="200" cy="264" rx="48" ry="24" fill="#4b5563" opacity=".55" transform="rotate(26,200,264)"/>
<ellipse cx="124" cy="230" rx="40" ry="20" fill="#374151" opacity=".55" transform="rotate(-20,124,230)"/>
<ellipse cx="196" cy="214" rx="40" ry="20" fill="#374151" opacity=".5" transform="rotate(18,196,214)"/>
<path d="M40 368 Q160 352 280 368" stroke="#64748b" stroke-width="2" stroke-dasharray="5,4" fill="none" opacity=".45"/>
<path d="M60 390 Q160 376 260 390" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,5" fill="none" opacity=".35"/>
`)

invSvgs['birthday-party'] = svgs['birthday']
invSvgs['graduation-party'] = svgs['graduation']

invSvgs['family-reunion'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stop-color="#1c0800"/><stop offset="100%" stop-color="#9a3412"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<circle cx="160" cy="95" r="40" fill="#fddcb5" stroke="#f97316" stroke-width="3"/>
<circle cx="160" cy="78" r="18" fill="#fddcb5"/>
<path d="M110 175 Q110 140 160 132 Q210 140 210 175 L218 300 L102 300Z" fill="#fddcb5" stroke="#f97316" stroke-width="2.5"/>
<circle cx="70" cy="150" r="30" fill="#fddcb5" stroke="#fbbf24" stroke-width="2.5"/>
<circle cx="70" cy="137" r="13" fill="#fddcb5"/>
<path d="M34 218 Q34 195 70 190 Q106 195 106 218 L110 300 L30 300Z" fill="#fddcb5" stroke="#fbbf24" stroke-width="2"/>
<circle cx="250" cy="148" r="30" fill="#fddcb5" stroke="#a78bfa" stroke-width="2.5"/>
<circle cx="250" cy="135" r="13" fill="#fddcb5"/>
<path d="M214 218 Q214 195 250 190 Q286 195 286 218 L290 300 L210 300Z" fill="#fddcb5" stroke="#a78bfa" stroke-width="2"/>
<rect x="0" y="295" width="320" height="45" fill="#92400e" opacity=".4"/>
<rect x="15" y="185" width="14" height="7" rx="2" fill="#f472b6" transform="rotate(-25,22,188)" opacity=".8"/>
<rect x="288" y="178" width="13" height="6" rx="2" fill="#34d399" transform="rotate(18,294,181)" opacity=".8"/>
`)

invSvgs['baby-shower'] = svgs['new-baby']

invSvgs['kids-party'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a0030"/><stop offset="100%" stop-color="#be185d"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<ellipse cx="55" cy="100" rx="30" ry="38" fill="#f472b6" opacity=".85"/>
<path d="M55 138 Q53 160 57 182" stroke="#f472b6" stroke-width="2.5" fill="none"/>
<ellipse cx="160" cy="78" rx="28" ry="35" fill="#fbbf24" opacity=".85"/>
<path d="M160 113 Q158 135 162 158" stroke="#fbbf24" stroke-width="2.5" fill="none"/>
<ellipse cx="265" cy="92" rx="26" ry="33" fill="#818cf8" opacity=".85"/>
<path d="M265 125 Q263 147 267 170" stroke="#818cf8" stroke-width="2.5" fill="none"/>
<path d="M30 365 L150 120" stroke="#fbbf24" stroke-width="7" stroke-linecap="round"/>
<path d="M30 365 L14 400 L56 392 Z" fill="#fbbf24"/>
<path d="M30 365 L80 335 L142 268 L150 120 L100 205 L52 274 Z" fill="#fde68a" opacity=".3" stroke="#fbbf24" stroke-width="1.5"/>
<rect x="160" y="98" width="18" height="9" rx="2" fill="#f472b6" transform="rotate(-25,169,102)" opacity=".9"/>
<rect x="185" y="80" width="16" height="8" rx="2" fill="#34d399" transform="rotate(15,193,84)" opacity=".9"/>
<rect x="208" y="108" width="15" height="7" rx="2" fill="#fbbf24" transform="rotate(-50,215,111)" opacity=".9"/>
<rect x="230" y="84" width="14" height="7" rx="2" fill="#818cf8" transform="rotate(20,237,87)" opacity=".9"/>
<circle cx="195" cy="66" r="8" fill="#fb923c" opacity=".8"/>
<circle cx="240" cy="72" r="7" fill="#f472b6" opacity=".8"/>
`)

invSvgs['house-warming'] = svgs['new-home']

invSvgs['shop-opening'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0.2" y2="1"><stop offset="0%" stop-color="#0d1b4c"/><stop offset="100%" stop-color="#1e40af"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<rect x="40" y="165" width="240" height="220" rx="6" fill="#fffbeb" stroke="#fbbf24" stroke-width="3"/>
<rect x="40" y="165" width="240" height="55" rx="6" fill="#fbbf24"/>
<rect x="55" y="178" width="210" height="28" rx="4" fill="#fef9c3" opacity=".4"/>
<rect x="55" y="245" width="90" height="140" rx="4" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/>
<line x1="100" y1="245" x2="100" y2="385" stroke="#0284c7" stroke-width="1.5"/>
<line x1="55" y1="315" x2="145" y2="315" stroke="#0284c7" stroke-width="1.5"/>
<rect x="170" y="285" width="95" height="100" rx="4" fill="#d1fae5" stroke="#059669" stroke-width="2"/>
<rect x="185" y="310" width="30" height="40" rx="3" fill="#059669" opacity=".3"/>
<rect x="225" y="310" width="30" height="40" rx="3" fill="#059669" opacity=".3"/>
<rect x="40" y="385" width="240" height="20" fill="#fbbf24" opacity=".3"/>
<circle cx="160" cy="90" r="40" fill="#fde68a" opacity=".8"/>
<circle cx="160" cy="90" r="26" fill="#fbbf24"/>
<line x1="160" y1="42" x2="160" y2="50" stroke="#fbbf24" stroke-width="4" stroke-linecap="round"/>
<line x1="200" y1="52" x2="194" y2="58" stroke="#fbbf24" stroke-width="3.5"/>
<line x1="210" y1="82" x2="202" y2="82" stroke="#fbbf24" stroke-width="3.5"/>
`)

invSvgs['office-party'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0.2" y2="1"><stop offset="0%" stop-color="#0d1b4c"/><stop offset="100%" stop-color="#374151"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<circle cx="20" cy="22" r="2" fill="#fbbf24" opacity=".7"/><circle cx="300" cy="28" r="2" fill="#fbbf24" opacity=".6"/>
<rect x="45" y="140" width="230" height="240" rx="8" fill="#1e3a8a" stroke="#93c5fd" stroke-width="2"/>
<rect x="45" y="140" width="230" height="32" rx="8" fill="#93c5fd" opacity=".3"/>
<rect x="65" y="190" width="80" height="60" rx="4" fill="#bae6fd" opacity=".3"/>
<rect x="175" y="190" width="80" height="60" rx="4" fill="#bae6fd" opacity=".3"/>
<rect x="65" y="270" width="80" height="60" rx="4" fill="#bae6fd" opacity=".2"/>
<rect x="175" y="270" width="80" height="60" rx="4" fill="#bae6fd" opacity=".2"/>
<rect x="20" y="178" width="16" height="8" rx="2" fill="#f472b6" transform="rotate(-30,28,182)" opacity=".9"/>
<rect x="285" y="165" width="14" height="7" rx="2" fill="#818cf8" transform="rotate(20,292,168)" opacity=".9"/>
<rect x="55" y="108" width="14" height="7" rx="2" fill="#34d399" transform="rotate(-45,62,111)" opacity=".8"/>
<rect x="252" y="100" width="13" height="6" rx="2" fill="#fbbf24" transform="rotate(15,258,103)" opacity=".8"/>
<circle cx="35" cy="100" r="9" fill="#f472b6" opacity=".7"/>
<circle cx="285" cy="92" r="8" fill="#818cf8" opacity=".65"/>
<circle cx="160" cy="72" r="30" fill="#fbbf24" opacity=".6"/>
<polygon points="160,50 168,74 194,74 174,88 180,112 160,98 140,112 146,88 126,74 152,74" fill="#fde68a"/>
`)

invSvgs['seminar'] = wrap(`
<defs><linearGradient id="bg" x1="0" y1="0" x2="0.2" y2="1"><stop offset="0%" stop-color="#0d1b4c"/><stop offset="100%" stop-color="#283593"/></linearGradient></defs>
<rect width="320" height="427" fill="url(#bg)"/>
<rect x="20" y="160" width="280" height="190" rx="8" fill="#1e3a8a" opacity=".7"/>
<rect x="20" y="160" width="280" height="5" fill="#93c5fd" opacity=".6"/>
<line x1="20" y1="185" x2="300" y2="185" stroke="#93c5fd" stroke-width="1" opacity=".3"/>
<rect x="35" y="195" width="110" height="30" rx="3" fill="#93c5fd" opacity=".2"/>
<rect x="35" y="235" width="90" height="20" rx="3" fill="#93c5fd" opacity=".15"/>
<rect x="35" y="265" width="100" height="20" rx="3" fill="#93c5fd" opacity=".15"/>
<rect x="35" y="295" width="80" height="20" rx="3" fill="#93c5fd" opacity=".12"/>
<rect x="175" y="195" width="110" height="140" rx="4" fill="#60a5fa" opacity=".15"/>
<circle cx="160" cy="92" r="45" fill="#1e3a8a" opacity=".6"/>
<circle cx="150" cy="75" r="22" fill="#c7d2fe" opacity=".8"/>
<path d="M100 155 Q100 128 130 120 Q160 115 180 120 Q205 130 205 155" fill="#c7d2fe" opacity=".5"/>
<line x1="136" y1="138" x2="136" y2="155" stroke="#93c5fd" stroke-width="2"/>
<line x1="165" y1="136" x2="165" y2="155" stroke="#93c5fd" stroke-width="2"/>
`)

invSvgs['product-launch'] = svgs['business-launch']
invSvgs['school-function'] = svgs['graduation']

// ─────────────────────────────────────────────────────────────────────────
// WRITE ALL FILES
// ─────────────────────────────────────────────────────────────────────────
let count = 0

for (const [id, content] of Object.entries(svgs)) {
  const dir = path.join(__dirname, '..', 'public', 'occasions')
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, `${id}.jpg`), content)
  fs.writeFileSync(path.join(dir, `${id}.svg`), content)
  count++
}

for (const [id, content] of Object.entries(invSvgs)) {
  const dir = path.join(__dirname, '..', 'public', 'invitations')
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, `${id}.jpg`), content)
  fs.writeFileSync(path.join(dir, `${id}.svg`), content)
  count++
}

console.log(`✅ Generated ${count} rich illustrated SVG images`)
