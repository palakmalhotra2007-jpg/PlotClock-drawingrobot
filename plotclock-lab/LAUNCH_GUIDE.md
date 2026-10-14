# PlotClock Learning Lab - Launch Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm installed
- Modern web browser (Chrome, Firefox, Edge, or Safari)
- Approximately 500MB disk space for node_modules

### Installation & Launch

```bash
# Navigate to the project directory
cd plotclock-lab

# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
```

The application will open at `http://localhost:5173` (or next available port).

### Production Build

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

## 📊 What You'll See

### 1. **3D Simulator Tab** (Default View)
- Left panel: Interactive 3D robot model
- Right panel: Live inverse kinematics calculator
- Adjust target position sliders to see robot move in real-time
- Shows servo angles, pulse widths, and calculation steps

### 2. **Calculator Tab**
- Focused view of the IK calculator
- Detailed step-by-step mathematical breakdown
- All intermediate values displayed with units
- Reachability analysis

### 3. **Math Theory Tab**
- 7 comprehensive learning sections:
  1. Cartesian Coordinates
  2. Distance & Displacement
  3. Trigonometry & atan2
  4. Law of Cosines
  5. Inverse Kinematics
  6. Servo Calibration
  7. Path Interpolation
- Each with formulas, derivations, and examples

### 4. **Source Code Tab**
- Actual PlotClock.ino code with annotations
- Key functions explained line-by-line
- Links to GitHub repository

### 5. **Drawing & Quiz Tabs**
- Framework in place (placeholder UI)
- Ready for future enhancement

## 🎯 Try These Activities

### Beginner Exercises

1. **Home Position**
   - Go to Calculator tab
   - Click "Home Position" button
   - Observe how servo angles change
   - Check "Show Detailed Calculation Steps"

2. **Center Position**
   - Click "Center" button
   - Compare values with Home position
   - Notice the intermediate point H coordinates

3. **Reachability Test**
   - Move X slider to 0
   - Move Y slider to 0
   - See "Position is UNREACHABLE" message
   - Try to find the workspace boundaries

### Intermediate Challenges

1. **Workspace Mapping**
   - Systematically test positions
   - Find maximum X and Y values
   - Identify the reachable workspace shape

2. **Angle Analysis**
   - Position pen at (30, 40)
   - Note both servo angles
   - Read the step-by-step calculations
   - Verify using calculator and formulas

3. **Mathematical Deep-Dive**
   - Go to Math Theory → Law of Cosines
   - Follow the numerical example
   - Compare with live calculator values
   - Trace the exact formula in Source Code tab

### Advanced Projects

1. **Servo Calibration Understanding**
   - Study the pulse width calculations
   - Understand FACTOR and NULL constants
   - Calculate expected pulse for arbitrary angle

2. **Path Planning**
   - Plan a straight line from (20, 30) to (50, 40)
   - Calculate required number of interpolation steps
   - Estimate total movement time

3. **Workspace Optimization**
   - Determine the exact workspace boundary
   - Calculate maximum drawing area
   - Identify optimal digit placement positions

## 🔍 Features in Detail

### Interactive 3D View
- **Orbit Controls**: Click and drag to rotate
- **Zoom**: Mouse wheel or pinch gesture
- **Pan**: Right-click and drag (or Shift + click)
- **Reset**: Refresh page or double-click canvas

### Live Calculator
- **Sliders**: Real-time position adjustment (0.1mm precision)
- **Buttons**: Quick preset positions
- **Toggle Steps**: Show/hide detailed calculations
- **Color Coding**:
  - 🔵 Blue = Left servo calculations
  - 🟣 Purple = Right servo calculations
  - 🟢 Green = Intermediate results
  - 🩷 Pink = Point H (intermediate)

### Math Theory Navigator
- Click any topic in the left sidebar
- Scroll through detailed content
- All formulas rendered with KaTeX
- Source code excerpts included

## 💡 Learning Tips

1. **Visual + Math Approach**
   - Keep 3D view and calculator visible together
   - Adjust position, watch robot move AND see calculations

2. **Work Through Topics Sequentially**
   - Start with Cartesian Coordinates
   - Progress through to Inverse Kinematics
   - Build understanding layer by layer

3. **Verify Everything**
   - Don't just read formulas
   - Calculate by hand
   - Compare with live calculator
   - Cross-reference with source code

4. **Experiment Freely**
   - No position can damage the virtual robot
   - Unreachable positions just show error messages
   - Try extreme values to understand limits

## 🐛 Troubleshooting

### Development Server Won't Start
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run dev
```

### 3D View Not Rendering
- Check browser console (F12) for WebGL errors
- Ensure graphics drivers are up to date
- Try different browser
- Hardware acceleration must be enabled

### Math Formulas Not Displaying
- KaTeX CDN might be blocked
- Check network/firewall
- Formulas should load from jsdelivr.net

### Build Warnings About Chunk Size
- Normal for Three.js applications
- Doesn't affect functionality
- Can be optimized with code splitting (future enhancement)

## 📚 Next Steps

After mastering the basics:

1. **Study the Source Code Engine**
   - `/src/engine/PlotClockMath.ts`
   - Compare with actual PlotClock.ino
   - Understand implementation choices

2. **Explore Real Hardware**
   - Visit [ProjectsWithRed/plotclock](https://github.com/ProjectsWithRed/plotclock)
   - Watch assembly video
   - Consider building your own!

3. **Contribute**
   - Implement drawing animation component
   - Add quiz questions
   - Improve 3D visualization
   - Translate to other languages

## 🎓 Educational Use

This platform is ideal for:
- **Robotics Courses**: Kinematics, linkages, servo control
- **Mathematics Classes**: Trigonometry, vectors, optimization
- **Computer Science**: Algorithm implementation, 3D graphics
- **Engineering Programs**: Mechatronics, controls, simulation

## 📞 Support Resources

- **GitHub Repository**: [ProjectsWithRed/plotclock](https://github.com/ProjectsWithRed/plotclock)
- **Original Design**: [Thingiverse Thing:248009](https://www.thingiverse.com/thing:248009)
- **Video Guide**: [YouTube Assembly Tutorial](https://youtu.be/s5AP7tbfueg)

---

**Ready to learn? Start the dev server and explore!**

```bash
npm run dev
```

Then open your browser to the displayed local address (typically `http://localhost:5173`).

**Happy Learning! 🤖✨**
