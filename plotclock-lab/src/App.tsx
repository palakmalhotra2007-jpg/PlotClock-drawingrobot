import { useState } from 'react';
import Robot3D from './components/Robot3D';
import IKCalculator from './components/Calculator';
import MathDerivations from './components/MathDerivations';
import { IKResult } from './engine/PlotClockMath';
import './styles/custom.css';

type Tab = 'simulator' | 'derivations';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('simulator');
  const [ikResult, setIkResult] = useState<IKResult | null>(null);
  const [targetPosition, setTargetPosition] = useState({ x: 35, y: 35 });

  return (
    <div className="h-screen flex flex-col bg-[#0a0e1a] text-white overflow-hidden">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1a1f35] to-[#0f1420] border-b border-cyan-500/30 px-6 py-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  PLOTCLOCK
                </h1>
                <p className="text-xs text-cyan-400/70 uppercase tracking-wider">
                  Inverse Kinematics Simulator & Trajectory Engine
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <div className="text-xs text-cyan-400/70 uppercase">Model</div>
              <div className="text-sm font-mono text-cyan-400">2-DOF 5-BAR</div>
            </div>
            <div className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="text-xs text-green-400/70 uppercase">Status</div>
              <div className="text-sm font-mono text-green-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                ACTIVE
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-[#0f1420] border-b border-cyan-500/20 px-6">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`relative px-6 py-3 transition-all ${
              activeTab === 'simulator'
                ? 'text-cyan-400'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="relative z-10 font-semibold uppercase text-sm tracking-wide">
              Interactive Simulator
            </span>
            {activeTab === 'simulator' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('derivations')}
            className={`relative px-6 py-3 transition-all ${
              activeTab === 'derivations'
                ? 'text-cyan-400'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="relative z-10 font-semibold uppercase text-sm tracking-wide">
              Mathematical Analysis
            </span>
            {activeTab === 'derivations' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            )}
          </button>
        </div>
      </nav>

      {/* Content Area */}
      <main className="flex-1 overflow-hidden">
        {activeTab === 'simulator' && (
          <div className="h-full grid grid-cols-12 gap-4 p-4">
            {/* Left Column - 3D View */}
            <div className="col-span-8 space-y-4">
              <div className="h-full bg-gradient-to-br from-[#1a1f35] to-[#0f1420] rounded-xl border border-cyan-500/20 overflow-hidden relative">
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                
                {/* Header */}
                <div className="relative z-10 bg-gradient-to-r from-cyan-500/10 to-transparent border-b border-cyan-500/20 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <h2 className="font-bold text-cyan-400 uppercase tracking-wider text-sm">
                        2D Scara Vector Rig
                      </h2>
                      <span className="text-xs text-cyan-400/50 font-mono">
                        [ISO-ROBOTIC POSE CORRECT=1]
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 rounded text-xs text-cyan-400 transition-all">
                        PARK RIG
                      </button>
                      <button className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded text-xs text-red-400 transition-all">
                        E-STOP CT-OFF
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3D View */}
                <div className="relative h-[calc(100%-56px)]">
                  <Robot3D
                    ikResult={ikResult}
                    targetPosition={targetPosition}
                    showLabels={true}
                    showAxes={true}
                  />
                  
                  {/* Overlay Info */}
                  <div className="absolute top-4 left-4 space-y-2">
                    <div className="bg-black/60 backdrop-blur-sm border border-cyan-500/30 rounded px-3 py-2">
                      <div className="text-xs text-cyan-400/70 uppercase mb-1">Servo 1 (RL)</div>
                      <div className="font-mono text-cyan-400">
                        {ikResult ? `${(ikResult.leftServoAngle * 180 / Math.PI).toFixed(2)}°` : '--'}
                      </div>
                    </div>
                    <div className="bg-black/60 backdrop-blur-sm border border-purple-500/30 rounded px-3 py-2">
                      <div className="text-xs text-purple-400/70 uppercase mb-1">Servo 2 (RR)</div>
                      <div className="font-mono text-purple-400">
                        {ikResult ? `${(ikResult.rightServoAngle * 180 / Math.PI).toFixed(2)}°` : '--'}
                      </div>
                    </div>
                  </div>

                  {/* Position Display */}
                  <div className="absolute top-4 right-4 space-y-2">
                    <div className="bg-black/60 backdrop-blur-sm border border-cyan-500/30 rounded px-3 py-2">
                      <div className="text-xs text-cyan-400/70 uppercase mb-1">IK Joint Angle</div>
                      <div className="font-mono text-cyan-400 text-xl">
                        {targetPosition.x.toFixed(1)}°
                      </div>
                      <div className="text-xs text-cyan-400/50 mt-1">PIVOT: 13.5mm</div>
                    </div>
                    <div className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded px-3 py-2">
                      <div className="text-xs text-green-400/70 uppercase mb-1">IK Joint 2 Angle & Pitch</div>
                      <div className="font-mono text-green-400 text-xl">
                        {targetPosition.y.toFixed(1)}°
                      </div>
                      <div className="text-xs text-green-400/50 mt-1">LEN: 413.2</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Controls & Data */}
            <div className="col-span-4 space-y-4 overflow-y-auto custom-scrollbar">
              <IKCalculator
                onIKResultChange={setIkResult}
                onPositionChange={(x, y) => setTargetPosition({ x, y })}
              />
            </div>
          </div>
        )}

        {activeTab === 'derivations' && (
          <div className="h-full">
            <MathDerivations />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#1a1f35] to-[#0f1420] border-t border-cyan-500/20 px-6 py-3">
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-6 text-cyan-400/50">
            <span className="font-mono">ProjectsWithRed/plotclock</span>
            <span className="font-mono">L₁:35mm L₂:55.1mm L₃:13.2mm L₄:45mm</span>
          </div>
          <div className="flex items-center gap-2 text-cyan-400/70">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="font-mono">SYSTEM NOMINAL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
