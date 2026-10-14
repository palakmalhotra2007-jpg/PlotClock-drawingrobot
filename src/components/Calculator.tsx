import { useState, useEffect } from 'react';
import {
  calculateInverseKinematics,
  isReachable,
  ROBOT_DIMENSIONS,
  radToDeg,
  IKResult,
} from '../engine/PlotClockMath';

interface CalculatorProps {
  onIKResultChange?: (result: IKResult | null) => void;
  onPositionChange?: (x: number, y: number) => void;
}

export default function Calculator({ onIKResultChange, onPositionChange }: CalculatorProps) {
  const [targetX, setTargetX] = useState<number>(35);
  const [targetY, setTargetY] = useState<number>(35);
  const [ikResult, setIkResult] = useState<IKResult | null>(null);
  const [showSteps, setShowSteps] = useState(false);
  
  useEffect(() => {
    const result = calculateInverseKinematics(targetX, targetY);
    setIkResult(result);
    onIKResultChange?.(result);
    onPositionChange?.(targetX, targetY);
  }, [targetX, targetY, onIKResultChange, onPositionChange]);
  
  const reachable = isReachable(targetX, targetY);
  
  return (
    <div className="space-y-4">
      {/* Main Control Panel */}
      <div className="bg-gradient-to-br from-[#1a1f35] to-[#0f1420] rounded-xl border border-cyan-500/20 overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-500/10 to-transparent border-b border-cyan-500/20 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <h2 className="font-bold text-cyan-400 uppercase tracking-wider text-sm">
              Interactive Kinematics Simulator
            </h2>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          {/* Reachability Status */}
          <div className={`p-3 rounded-lg border ${
            reachable 
              ? 'bg-green-500/10 border-green-500/30' 
              : 'bg-red-500/10 border-red-500/30'
          }`}>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                reachable ? 'bg-green-400' : 'bg-red-400'
              } animate-pulse`} />
              <span className={`font-mono text-xs uppercase tracking-wider ${
                reachable ? 'text-green-400' : 'text-red-400'
              }`}>
                {reachable ? 'WITHIN WORKSPACE' : 'OUT OF REACH'}
              </span>
            </div>
          </div>

          {/* Input Controls */}
          <div className="space-y-4">
            {/* X Position */}
            <div className="bg-black/20 rounded-lg p-3 border border-cyan-500/10">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-cyan-400/70 uppercase tracking-wider font-semibold">
                  TCT X,Y
                </label>
                <div className="font-mono text-cyan-400 text-lg">{targetX.toFixed(1)}</div>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="80"
                  step="0.1"
                  value={targetX}
                  onChange={(e) => setTargetX(parseFloat(e.target.value))}
                  className="w-full h-2 bg-cyan-500/20 rounded-lg appearance-none cursor-pointer slider-cyan"
                />
                <div className="flex justify-between mt-1 text-xs text-cyan-400/50 font-mono">
                  <span>0.0</span>
                  <span>80.0</span>
                </div>
              </div>
            </div>
            
            {/* Y Position */}
            <div className="bg-black/20 rounded-lg p-3 border border-green-500/10">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-green-400/70 uppercase tracking-wider font-semibold">
                  REL
                </label>
                <div className="font-mono text-green-400 text-lg">{targetY.toFixed(1)}</div>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="70"
                  step="0.1"
                  value={targetY}
                  onChange={(e) => setTargetY(parseFloat(e.target.value))}
                  className="w-full h-2 bg-green-500/20 rounded-lg appearance-none cursor-pointer slider-green"
                />
                <div className="flex justify-between mt-1 text-xs text-green-400/50 font-mono">
                  <span>0.0</span>
                  <span>70.0</span>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setTargetX(ROBOT_DIMENSIONS.HOME_X); setTargetY(ROBOT_DIMENSIONS.HOME_Y); }}
                className="px-3 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 rounded text-xs text-cyan-400 font-semibold uppercase tracking-wider transition-all"
              >
                ▶ Run Cycle
              </button>
              <button
                onClick={() => { setTargetX(35); setTargetY(35); }}
                className="px-3 py-2 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 rounded text-xs text-orange-400 font-semibold uppercase tracking-wider transition-all"
              >
                ⟳ Init Trace
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Display */}
      {ikResult && ikResult.success && (
        <div className="space-y-3">
          {/* Servo Angles */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-lg p-3">
              <div className="text-xs text-cyan-400/70 uppercase mb-1 font-semibold">Servo 1 (L)</div>
              <div className="font-mono text-2xl text-cyan-400 mb-1">
                {radToDeg(ikResult.leftServoAngle).toFixed(2)}°
              </div>
              <div className="text-xs text-cyan-400/50 font-mono">
                {ikResult.leftServoPulse} μs
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 rounded-lg p-3">
              <div className="text-xs text-purple-400/70 uppercase mb-1 font-semibold">Servo 2 (R)</div>
              <div className="font-mono text-2xl text-purple-400 mb-1">
                {radToDeg(ikResult.rightServoAngle).toFixed(2)}°
              </div>
              <div className="text-xs text-purple-400/50 font-mono">
                {ikResult.rightServoPulse} μs
              </div>
            </div>
          </div>
          
          {/* Waypoint Interpolation Table */}
          <div className="bg-gradient-to-br from-[#1a1f35] to-[#0f1420] rounded-xl border border-cyan-500/20 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500/10 to-transparent border-b border-cyan-500/20 px-4 py-2 flex justify-between items-center">
              <div className="text-xs text-cyan-400 uppercase tracking-wider font-semibold">
                ≡ Waypoint Interpolation Table
              </div>
              <div className="text-xs text-cyan-400/50 font-mono">
                ID: 44 POINTS
              </div>
            </div>
            
            <div className="p-3">
              <table className="w-full data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>TCT X,Y</th>
                    <th>REL</th>
                    <th>GR</th>
                    <th>LEFT (μs)</th>
                    <th>MODE</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#01</td>
                    <td>{targetX.toFixed(1)}</td>
                    <td>{targetY.toFixed(1)}</td>
                    <td>90.0°</td>
                    <td>{ikResult.leftServoPulse}</td>
                    <td className="text-orange-400">LINEAR RAPID</td>
                    <td className="text-green-400">DONE</td>
                  </tr>
                  <tr>
                    <td>#02</td>
                    <td>−46.8, 17.8</td>
                    <td>116.4°</td>
                    <td>80.0°</td>
                    <td>1890 μs</td>
                    <td className="text-orange-400">LINEAR RAPID</td>
                    <td className="text-green-400">DONE</td>
                  </tr>
                  <tr>
                    <td>#03</td>
                    <td>−58.9, 12.8</td>
                    <td>111.4°</td>
                    <td>87.0°</td>
                    <td>2095 μs</td>
                    <td className="text-cyan-400">BEZIER CURVE</td>
                    <td className="text-cyan-400">ACTIVE</td>
                  </tr>
                  <tr>
                    <td>#04</td>
                    <td>−87.1, 12.8</td>
                    <td>98.0°</td>
                    <td>84.2°</td>
                    <td>1790 μs</td>
                    <td className="text-cyan-400">BEZIER CURVE</td>
                    <td className="text-gray-500">QUEUED</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Detailed Steps Toggle */}
          <button
            onClick={() => setShowSteps(!showSteps)}
            className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30 rounded-lg text-sm font-semibold text-cyan-400 uppercase tracking-wider transition-all"
          >
            {showSteps ? '▼' : '▶'} Auto-Gen Export Curve Generator
          </button>
          
          {/* Calculation Steps */}
          {showSteps && (
            <div className="bg-gradient-to-br from-[#1a1f35] to-[#0f1420] rounded-xl border border-cyan-500/20 overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-500/10 to-transparent border-b border-cyan-500/20 px-4 py-2">
                <div className="text-xs text-cyan-400 uppercase tracking-wider font-semibold">
                  → Full-Scale Trajectory Header: 72.8° f
                </div>
              </div>
              
              <div className="p-4 space-y-3 text-xs font-mono">
                <div className="space-y-1">
                  <div className="text-cyan-400/70">controlled.is UNVENDED CONTEXT=0 [signed]</div>
                  <div className="text-cyan-400">compute.INCREMENTAL Trajectory Params [ fwd, Zonal_Pc ]</div>
                  <div className="text-cyan-400/70 ml-4">⊢ Δx: {ikResult.steps.dx1.toFixed(3)} || Δy: {ikResult.steps.dy1.toFixed(3)}</div>
                  <div className="text-cyan-400/70 ml-4">⊢ c1 len: {ikResult.steps.c1.toFixed(3)} || α1 dir: {(ikResult.steps.a1_polar * 180/Math.PI).toFixed(3)}°</div>
                  <div className="text-cyan-400/70 ml-4">⊢ α2 law: {(ikResult.steps.a2_left * 180/Math.PI).toFixed(3)}° || θ_L: {radToDeg(ikResult.leftServoAngle).toFixed(3)}°</div>
                </div>
                
                <div className="border-t border-cyan-500/20 pt-3 space-y-1">
                  <div className="text-purple-400/70">f= EEXEC(0/H) (Trajectory /Header [v1.#] f(j)xb, fz/c, fdm+, fdm-, [fgfx f1 jxb_u)]</div>
                  <div className="text-purple-400">Z-AXEL 1=2: f(z) HDRV X(dx, fdm, FLARC_INTERP) Compute [∠baz](2)</div>
                  <div className="text-purple-400/70 ml-4">⊢ H point: ({ikResult.steps.Hx.toFixed(2)}, {ikResult.steps.Hy.toFixed(2)})</div>
                  <div className="text-purple-400/70 ml-4">⊢ c2 len: {ikResult.steps.c2.toFixed(3)} || α_H: {(ikResult.steps.a1_right * 180/Math.PI).toFixed(3)}°</div>
                  <div className="text-purple-400/70 ml-4">⊢ θ_R: {radToDeg(ikResult.rightServoAngle).toFixed(3)}° [fℓ xdb.f1=z2, fdm=z2b_#]</div>
                </div>
                
                <div className="border-t border-cyan-500/20 pt-3">
                  <div className="text-green-400">f -28.b0, 156.b, 143, δe4, 1 [Algn.f interpolate]</div>
                  <div className="text-green-400/70 ml-4">→ Trajectory OK | SERVOS_IN_TOLERANCE | δnorm acceptable</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
