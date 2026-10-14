# PlotClock - Professional Robotics Simulator

A stunning, high-tech inverse kinematics simulator and mathematical analysis tool for the PlotClock two-servo five-bar linkage mechanism. Built for presentations and demonstrations.

![Status](https://img.shields.io/badge/status-production-brightgreen)
![Platform](https://img.shields.io/badge/platform-web-blue)

## 🎨 Professional UI Design

Inspired by industrial robotics control systems with:
- **Cyberpunk aesthetic** - Cyan/blue color scheme with gradient overlays
- **Real-time visualization** - Interactive 3D robot model
- **Technical HUD elements** - Status indicators, data tables, trajectory info
- **Smooth animations** - Pulsing indicators, gradient borders, hover effects
- **Monospace data displays** - Technical readouts and waypoint tables

## ✨ Features

### Interactive Simulator
- **3D Robot Visualization** with labeled components
- **Real-time IK calculations** as you adjust position
- **Servo angle displays** with degree and microsecond pulse widths
- **Waypoint interpolation table** showing trajectory data
- **Status indicators** for workspace reachability
- **Professional control panel** with sliders and quick actions

### Mathematical Analysis
- Complete derivations for all mathematics involved
- 10 comprehensive sections covering:
  - Mechanism geometry
  - Euclidean distance formulas
  - Direction angles (atan2)
  - Law of cosines
  - Left & right servo inverse kinematics
  - Servo control & PWM mapping
  - Path interpolation
  - Workspace analysis
  - Complete algorithm

### Presentation-Ready
- Polished professional interface
- Smooth transitions and animations
- High-contrast color scheme for projection
- Clear typography and spacing
- Technical aesthetic suitable for engineering presentations

## 🚀 Quick Start

```bash
cd plotclock-lab
npm install
npm run dev
```

Open your browser to `http://localhost:5173`

## 🎯 Usage

### Interactive Simulator Tab
1. Use the **TCT X,Y** slider to adjust X position (0-80mm)
2. Use the **REL** slider to adjust Y position (0-70mm)
3. Watch the 3D robot update in real-time
4. View servo angles and pulse widths on the right panel
5. Click **"Run Cycle"** to go to home position
6. Click **"Init Trace"** to center the robot
7. Toggle **"Auto-Gen Export Curve Generator"** for detailed calculations

### Mathematical Analysis Tab
- Navigate through 10 sections using the sidebar
- Read complete mathematical derivations
- All formulas rendered in professional LaTeX notation
- Proofs and step-by-step solutions included

## 📊 Technical Specifications

### Robot Parameters (Verified from Source)
```
L₁ = 35.0 mm    (Servo arm length)
L₂ = 55.1 mm    (Left passive arm)
L₃ = 13.2 mm    (Offset distance)
L₄ = 45.0 mm    (Right passive arm)
O₁ = (24, -25)  (Left servo position)
O₂ = (49, -25)  (Right servo position)
```

### Technology Stack
- **Frontend**: React 18 + TypeScript
- **3D Graphics**: Three.js + React Three Fiber
- **Styling**: Tailwind CSS + Custom gradients
- **Math Rendering**: KaTeX
- **Build Tool**: Vite

## 🎨 Color Palette

```css
Primary:   #06b6d4 (Cyan)
Secondary: #3b82f6 (Blue)
Accent:    #22c55e (Green)
Warning:   #f97316 (Orange)
Error:     #ef4444 (Red)
Background: #0a0e1a (Dark blue-black)
```

## 📸 Screenshot Features

- **Header**: Gradient with logo, model info, and active status
- **3D View**: Full robot with servo overlays and position displays
- **Control Panel**: Professional sliders with value readouts
- **Data Table**: Waypoint interpolation with status indicators
- **Footer**: Technical information and system status

## 🎓 For Presentations

Perfect for:
- Engineering project demonstrations
- Robotics course presentations
- Technical portfolio pieces
- Academic presentations
- Trade show displays

### Presentation Tips
1. Start on **Interactive Simulator** tab to show live demo
2. Adjust sliders smoothly to demonstrate IK calculations
3. Point out servo angles updating in real-time
4. Show the waypoint table for trajectory planning
5. Switch to **Mathematical Analysis** for technical depth
6. Highlight the verified dimensions from actual robot

## 🔗 Source

Based on the actual PlotClock drawing robot:
- Repository: [ProjectsWithRed/plotclock](https://github.com/ProjectsWithRed/plotclock)
- Original concept: Joo (Johannes Heberlein)
- All dimensions and formulas verified from PlotClock.ino source code

## 📦 Build for Production

```bash
npm run build
npm run preview
```

Optimized bundle:
- ~400KB gzipped
- Fast loading
- Smooth 60fps animations
- Professional grade performance

## 🎯 What Makes This Special

1. **Verified Accuracy** - All math from actual robot source code
2. **Professional Design** - Industrial control system aesthetic
3. **Real-time Feedback** - Instant visualization of calculations
4. **Complete Documentation** - Full mathematical derivations
5. **Presentation Ready** - Polished UI suitable for demos

---

**Built for impact. Ready to impress.**

Perfect for technical presentations, demonstrations, and portfolio showcases.
