import { useState } from 'react';
import katex from 'katex';

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

function Formula({ latex, display = false }: { latex: string; display?: boolean }) {
  const html = katex.renderToString(latex, {
    displayMode: display,
    throwOnError: false,
  });
  
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function MathDerivations() {
  const [activeSection, setActiveSection] = useState<string>('geometry');
  
  const sections: Section[] = [
    {
      id: 'geometry',
      title: '1. Mechanism Geometry',
      content: (
        <div className="space-y-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-blue-400">1. Mechanism Geometry</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg space-y-4">
            <p className="text-gray-300">
              The PlotClock mechanism is a planar two-servo five-bar linkage. Physical parameters extracted from 
              the actual PlotClock.ino source code (ProjectsWithRed/plotclock repository):
            </p>
            
            <div className="bg-gray-900 p-4 rounded">
              <div className="text-center my-2">
                <Formula latex="L_1 = 35 \text{ mm}" display />
                <Formula latex="L_2 = 55.1 \text{ mm}" display />
                <Formula latex="L_3 = 13.2 \text{ mm}" display />
                <Formula latex="L_4 = 45 \text{ mm}" display />
                <Formula latex="O_1 = (24, -25) \text{ mm}" display />
                <Formula latex="O_2 = (49, -25) \text{ mm}" display />
              </div>
            </div>
            
            <p className="text-gray-300">
              Coordinate system: Right-handed Cartesian with origin at drawing surface front-left corner, x-axis horizontal (→), y-axis vertical (↑), units in millimeters.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'distance',
      title: '2. Euclidean Distance',
      content: (
        <div className="space-y-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-blue-400">2. Euclidean Distance Formula</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg space-y-4">
            <h3 className="text-xl font-semibold text-green-400">Theorem</h3>
            <p className="text-gray-300">
              For points <Formula latex="P_1 = (x_1, y_1)" /> and <Formula latex="P_2 = (x_2, y_2)" /> in ℝ²:
            </p>
            <div className="bg-gray-900 p-4 rounded text-center">
              <Formula latex="d(P_1, P_2) = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}" display />
            </div>
            
            <h3 className="text-xl font-semibold text-green-400 mt-6">Proof</h3>
            <div className="space-y-3 text-gray-300">
              <div className="bg-gray-900 p-4 rounded">
                <p className="mb-2">Let <Formula latex="\Delta x = x_2 - x_1" /> and <Formula latex="\Delta y = y_2 - y_1" />.</p>
                <p className="mb-3">These form a right triangle with legs <Formula latex="|\Delta x|" /> and <Formula latex="|\Delta y|" />, and hypotenuse d.</p>
                <p className="mb-2">By the Pythagorean theorem:</p>
                <div className="text-center my-3">
                  <Formula latex="d^2 = (\Delta x)^2 + (\Delta y)^2" display />
                </div>
                <p className="mb-2">Taking the positive square root:</p>
                <div className="text-center my-3">
                  <Formula latex="d = \sqrt{(\Delta x)^2 + (\Delta y)^2} = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}" display />
                </div>
                <p className="text-green-400 mt-3">∎</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'atan2',
      title: '3. Direction Angle',
      content: (
        <div className="space-y-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-blue-400">3. Direction Angle using atan2</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg space-y-4">
            <h3 className="text-xl font-semibold text-green-400">Definition</h3>
            <p className="text-gray-300">
              The function <Formula latex="\text{atan2}: \mathbb{R} \times \mathbb{R} \to (-\pi, \pi]" /> returns the angle θ 
              of the vector <Formula latex="(x, y)" /> measured counterclockwise from the positive x-axis:
            </p>
            <div className="bg-gray-900 p-4 rounded text-center">
              <Formula latex="\theta = \text{atan2}(y, x)" display />
            </div>
            
            <h3 className="text-xl font-semibold text-green-400 mt-6">Properties</h3>
            <div className="space-y-3 text-gray-300">
              <div className="bg-gray-900 p-4 rounded">
                <p className="mb-2">1. <strong>Full range:</strong> Returns angles in <Formula latex="(-\pi, \pi]" />, covering all four quadrants</p>
                <p className="mb-2">2. <strong>Sign information:</strong> Uses signs of both x and y to determine quadrant</p>
                <p className="mb-3">3. <strong>No division by zero:</strong> Handles x = 0 correctly</p>
                
                <p className="mt-4 mb-2">For the displacement vector <Formula latex="(\Delta x, \Delta y)" />:</p>
                <div className="text-center my-3">
                  <Formula latex="\alpha = \text{atan2}(\Delta y, \Delta x)" display />
                </div>
                <p>gives the bearing from <Formula latex="P_1" /> to <Formula latex="P_2" /></p>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-green-400 mt-6">Relation to atan</h3>
            <div className="bg-gray-900 p-4 rounded text-gray-300">
              <p className="mb-2">While <Formula latex="\text{atan}(y/x)" /> only gives angles in <Formula latex="(-\pi/2, \pi/2)" />, 
              atan2 considers both coordinates:</p>
              <div className="text-center my-3 space-y-2">
                <div><Formula latex="\text{atan2}(y, x) = \begin{cases} \text{atan}(y/x) & x > 0 \\ \text{atan}(y/x) + \pi & x < 0, y \geq 0 \\ \text{atan}(y/x) - \pi & x < 0, y < 0 \\ +\pi/2 & x = 0, y > 0 \\ -\pi/2 & x = 0, y < 0 \end{cases}" display /></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'lawofcosines',
      title: '4. Law of Cosines',
      content: (
        <div className="space-y-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-blue-400">4. Law of Cosines</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg space-y-4">
            <h3 className="text-xl font-semibold text-green-400">Theorem</h3>
            <p className="text-gray-300">
              In a triangle with sides a, b, c and angle γ opposite side b:
            </p>
            <div className="bg-gray-900 p-4 rounded text-center">
              <Formula latex="b^2 = a^2 + c^2 - 2ac\cos\gamma" display />
            </div>
            
            <h3 className="text-xl font-semibold text-green-400 mt-6">Derivation (Coordinate Method)</h3>
            <div className="space-y-4 text-gray-300">
              <div className="bg-gray-900 p-4 rounded space-y-3">
                <p><strong>Setup:</strong> Place vertex A at origin, side c along positive x-axis to vertex B at <Formula latex="(c, 0)" />, 
                and vertex C at angle γ from x-axis.</p>
                
                <p>Coordinates:</p>
                <div className="text-center my-2 space-y-1">
                  <div><Formula latex="A = (0, 0)" display /></div>
                  <div><Formula latex="B = (c, 0)" display /></div>
                  <div><Formula latex="C = (a\cos\gamma, a\sin\gamma)" display /></div>
                </div>
                
                <p>Distance BC (side b):</p>
                <div className="text-center my-2">
                  <Formula latex="b^2 = (c - a\cos\gamma)^2 + (0 - a\sin\gamma)^2" display />
                </div>
                
                <p>Expand:</p>
                <div className="text-center my-2 space-y-1">
                  <div><Formula latex="b^2 = c^2 - 2ac\cos\gamma + a^2\cos^2\gamma + a^2\sin^2\gamma" display /></div>
                  <div><Formula latex="= c^2 - 2ac\cos\gamma + a^2(\cos^2\gamma + \sin^2\gamma)" display /></div>
                  <div><Formula latex="= c^2 - 2ac\cos\gamma + a^2" display /></div>
                </div>
                
                <p>Therefore:</p>
                <div className="text-center my-2">
                  <Formula latex="b^2 = a^2 + c^2 - 2ac\cos\gamma" display />
                </div>
                <p className="text-green-400 mt-2">∎</p>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-green-400 mt-6">Solving for Angle</h3>
            <div className="bg-gray-900 p-4 rounded space-y-3 text-gray-300">
              <p>Given sides a, b, c, solve for angle γ:</p>
              <div className="text-center my-3 space-y-2">
                <div><Formula latex="b^2 = a^2 + c^2 - 2ac\cos\gamma" display /></div>
                <div><Formula latex="2ac\cos\gamma = a^2 + c^2 - b^2" display /></div>
                <div><Formula latex="\cos\gamma = \frac{a^2 + c^2 - b^2}{2ac}" display /></div>
                <div><Formula latex="\gamma = \arccos\left(\frac{a^2 + c^2 - b^2}{2ac}\right)" display /></div>
              </div>
              <p className="text-sm text-blue-300 mt-3">
                Note: Valid only if <Formula latex="|a - c| \leq b \leq a + c" /> (triangle inequality)
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'leftservo',
      title: '5. Left Servo IK',
      content: (
        <div className="space-y-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-blue-400">5. Left Servo Inverse Kinematics</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg space-y-4">
            <h3 className="text-xl font-semibold text-green-400">Problem Statement</h3>
            <p className="text-gray-300">
              Given target position <Formula latex="T = (x_T, y_T)" />, find left servo angle <Formula latex="\theta_L" /> such that 
              the pen reaches T.
            </p>
            
            <h3 className="text-xl font-semibold text-green-400 mt-6">Solution</h3>
            <div className="space-y-4 text-gray-300">
              <div className="bg-gray-900 p-4 rounded space-y-3">
                <p><strong>Step 1:</strong> Calculate displacement from left servo to target:</p>
                <div className="text-center my-2 space-y-1">
                  <div><Formula latex="\Delta x = x_T - O_{1x} = x_T - 24" display /></div>
                  <div><Formula latex="\Delta y = y_T - O_{1y} = y_T + 25" display /></div>
                </div>
                
                <p><strong>Step 2:</strong> Compute distance (Euclidean norm):</p>
                <div className="text-center my-2">
                  <Formula latex="c_1 = \sqrt{(\Delta x)^2 + (\Delta y)^2}" display />
                </div>
                
                <p><strong>Step 3:</strong> Compute direction angle:</p>
                <div className="text-center my-2">
                  <Formula latex="\alpha_1 = \text{atan2}(\Delta y, \Delta x)" display />
                </div>
                
                <p><strong>Step 4:</strong> The linkage forms a triangle with sides <Formula latex="L_1" />, <Formula latex="L_2" />, <Formula latex="c_1" />. 
                Apply law of cosines to find angle <Formula latex="\alpha_2" /> at servo:</p>
                <div className="text-center my-2">
                  <Formula latex="\alpha_2 = \arccos\left(\frac{L_1^2 + c_1^2 - L_2^2}{2L_1c_1}\right)" display />
                </div>
                
                <p><strong>Step 5:</strong> The servo angle combines the direction and triangle angle:</p>
                <div className="text-center my-2">
                  <Formula latex="\theta_L = \alpha_1 + \alpha_2 - \pi" display />
                </div>
                <p className="text-sm text-blue-300">
                  The π subtraction accounts for the servo reference frame orientation.
                </p>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-green-400 mt-6">Geometric Interpretation</h3>
            <div className="bg-gray-900 p-4 rounded text-gray-300">
              <p className="mb-2">
                The angle <Formula latex="\alpha_1" /> points from servo toward target. 
                The angle <Formula latex="\alpha_2" /> is the opening angle of the triangle at the servo. 
                Their sum gives the absolute servo angle, adjusted by π for the mounting orientation.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'rightservo',
      title: '6. Right Servo IK',
      content: (
        <div className="space-y-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-blue-400">6. Right Servo Inverse Kinematics</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg space-y-4">
            <h3 className="text-xl font-semibold text-green-400">Complexity</h3>
            <p className="text-gray-300">
              The right servo does not connect directly to the pen. Instead, it connects through an intermediate point H, 
              offset by <Formula latex="L_3 = 13.2" /> mm from the target.
            </p>
            
            <h3 className="text-xl font-semibold text-green-400 mt-6">Solution</h3>
            <div className="space-y-4 text-gray-300">
              <div className="bg-gray-900 p-4 rounded space-y-3">
                <p><strong>Step 1:</strong> Calculate intermediate point H. First, find angle at passive joint on left side:</p>
                <div className="text-center my-2">
                  <Formula latex="\alpha_2' = \arccos\left(\frac{L_2^2 + c_1^2 - L_1^2}{2L_2c_1}\right)" display />
                </div>
                
                <p><strong>Step 2:</strong> Point H is located at distance <Formula latex="L_3" /> from T, at specific angle. The offset angle is <Formula latex="0.621" /> rad (≈ 35.6°):</p>
                <div className="text-center my-2 space-y-1">
                  <div><Formula latex="H_x = x_T + L_3\cos(\alpha_1 - \alpha_2' + 0.621 + \pi)" display /></div>
                  <div><Formula latex="H_y = y_T + L_3\sin(\alpha_1 - \alpha_2' + 0.621 + \pi)" display /></div>
                </div>
                
                <p><strong>Step 3:</strong> Compute displacement from right servo to H:</p>
                <div className="text-center my-2 space-y-1">
                  <div><Formula latex="\Delta x_H = H_x - O_{2x} = H_x - 49" display /></div>
                  <div><Formula latex="\Delta y_H = H_y - O_{2y} = H_y + 25" display /></div>
                </div>
                
                <p><strong>Step 4:</strong> Distance to H:</p>
                <div className="text-center my-2">
                  <Formula latex="c_2 = \sqrt{(\Delta x_H)^2 + (\Delta y_H)^2}" display />
                </div>
                
                <p><strong>Step 5:</strong> Direction to H:</p>
                <div className="text-center my-2">
                  <Formula latex="\alpha_{1H} = \text{atan2}(\Delta y_H, \Delta x_H)" display />
                </div>
                
                <p><strong>Step 6:</strong> Triangle with sides <Formula latex="L_1, L_4, c_2" />:</p>
                <div className="text-center my-2">
                  <Formula latex="\alpha_{2H} = \arccos\left(\frac{L_1^2 + c_2^2 - L_4^2}{2L_1c_2}\right)" display />
                </div>
                
                <p><strong>Step 7:</strong> Right servo angle:</p>
                <div className="text-center my-2">
                  <Formula latex="\theta_R = \alpha_{1H} - \alpha_{2H}" display />
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'servopulse',
      title: '7. Servo Control',
      content: (
        <div className="space-y-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-blue-400">7. Servo Pulse Width Mapping</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg space-y-4">
            <h3 className="text-xl font-semibold text-green-400">PWM Control</h3>
            <p className="text-gray-300">
              Hobby servos use Pulse Width Modulation (PWM) at 50 Hz (20 ms period). Position is determined by pulse duration.
            </p>
            
            <h3 className="text-xl font-semibold text-green-400 mt-6">Linear Mapping</h3>
            <div className="bg-gray-900 p-4 rounded space-y-3 text-gray-300">
              <p>The angle-to-pulse mapping is linear:</p>
              <div className="text-center my-3 space-y-2">
                <div><Formula latex="P_L = \lfloor k_L \cdot \theta_L + P_{L0} \rfloor" display /></div>
                <div><Formula latex="P_R = \lfloor k_R \cdot \theta_R + P_{R0} \rfloor" display /></div>
              </div>
              <p>where:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><Formula latex="P_L, P_R" /> are pulse widths in microseconds</li>
                <li><Formula latex="k_L, k_R" /> are scaling factors (dimensionless)</li>
                <li><Formula latex="P_{L0}, P_{R0}" /> are offset constants (μs)</li>
                <li><Formula latex="\lfloor \cdot \rfloor" /> is the floor function</li>
              </ul>
            </div>
            
            <h3 className="text-xl font-semibold text-green-400 mt-6">PlotClock Calibration Constants</h3>
            <div className="bg-gray-900 p-4 rounded text-center">
              <Formula latex="k_L = 630, \quad P_{L0} = 1950 \text{ μs}" display />
              <Formula latex="k_R = 640, \quad P_{R0} = 815 \text{ μs}" display />
            </div>
            <p className="text-gray-300 text-sm mt-2">
              These values are determined through calibration to ensure 90° servo movement corresponds to the correct angular displacement.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'interpolation',
      title: '8. Path Interpolation',
      content: (
        <div className="space-y-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-blue-400">8. Linear Interpolation</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg space-y-4">
            <h3 className="text-xl font-semibold text-green-400">Motivation</h3>
            <p className="text-gray-300">
              Direct point-to-point movement would cause discontinuous jumps. Smooth motion requires intermediate waypoints.
            </p>
            
            <h3 className="text-xl font-semibold text-green-400 mt-6">Definition</h3>
            <div className="bg-gray-900 p-4 rounded space-y-3 text-gray-300">
              <p>For start point <Formula latex="P_1 = (x_1, y_1)" /> and end point <Formula latex="P_2 = (x_2, y_2)" />, 
              the linear interpolation with parameter <Formula latex="t \in [0, 1]" /> is:</p>
              <div className="text-center my-3 space-y-1">
                <div><Formula latex="P(t) = (1-t)P_1 + tP_2" display /></div>
                <div><Formula latex="= \big((1-t)x_1 + tx_2, (1-t)y_1 + ty_2\big)" display /></div>
              </div>
              <p>Equivalently:</p>
              <div className="text-center my-3">
                <Formula latex="P(t) = P_1 + t(P_2 - P_1)" display />
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-green-400 mt-6">Properties</h3>
            <div className="bg-gray-900 p-4 rounded text-gray-300">
              <ul className="list-disc list-inside space-y-2">
                <li><Formula latex="P(0) = P_1" /> (starts at initial point)</li>
                <li><Formula latex="P(1) = P_2" /> (ends at final point)</li>
                <li>P(t) lies on the straight line segment from <Formula latex="P_1" /> to <Formula latex="P_2" /></li>
                <li>Motion is uniform when t varies linearly</li>
              </ul>
            </div>
            
            <h3 className="text-xl font-semibold text-green-400 mt-6">PlotClock Implementation</h3>
            <div className="bg-gray-900 p-4 rounded space-y-3 text-gray-300">
              <p>Number of steps based on distance:</p>
              <div className="text-center my-2">
                <Formula latex="n = \left\lfloor 7\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2} \right\rfloor" display />
              </div>
              <p>Generate waypoints:</p>
              <div className="text-center my-2">
                <Formula latex="P_i = P_1 + \frac{i}{n}(P_2 - P_1), \quad i = 0, 1, \ldots, n" display />
              </div>
              <p className="text-sm text-blue-300 mt-2">
                Factor 7 provides approximately 7 steps per millimeter, ensuring smooth visual motion.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'workspace',
      title: '9. Workspace Analysis',
      content: (
        <div className="space-y-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-blue-400">9. Reachable Workspace</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg space-y-4">
            <h3 className="text-xl font-semibold text-green-400">Definition</h3>
            <p className="text-gray-300">
              The workspace W is the set of all points <Formula latex="(x, y)" /> that the mechanism can reach:
            </p>
            <div className="bg-gray-900 p-4 rounded text-center">
              <Formula latex="W = \{(x,y) \in \mathbb{R}^2 : \exists \theta_L, \theta_R \text{ satisfying IK}\}" display />
            </div>
            
            <h3 className="text-xl font-semibold text-green-400 mt-6">Necessary Conditions</h3>
            <div className="bg-gray-900 p-4 rounded space-y-3 text-gray-300">
              <p><strong>1. Triangle Inequality for Left Servo:</strong></p>
              <p className="ml-4">For a valid triangle with sides <Formula latex="L_1, L_2, c_1" />:</p>
              <div className="text-center my-2">
                <Formula latex="|L_1 - L_2| \leq c_1 \leq L_1 + L_2" display />
              </div>
              <p className="ml-4">With <Formula latex="L_1 = 35, L_2 = 55.1" />:</p>
              <div className="text-center my-2">
                <Formula latex="20.1 \leq \sqrt{(x-24)^2 + (y+25)^2} \leq 90.1" display />
              </div>
              
              <p className="mt-4"><strong>2. Triangle Inequality for Right Servo:</strong></p>
              <p className="ml-4">Similar constraint from <Formula latex="O_2" /> to point H with sides <Formula latex="L_1, L_4" />:</p>
              <div className="text-center my-2">
                <Formula latex="|L_1 - L_4| \leq c_2 \leq L_1 + L_4" display />
              </div>
              <p className="ml-4">With <Formula latex="L_1 = 35, L_4 = 45" />:</p>
              <div className="text-center my-2">
                <Formula latex="10 \leq c_2 \leq 80" display />
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-green-400 mt-6">Workspace Shape</h3>
            <div className="bg-gray-900 p-4 rounded text-gray-300">
              <p>
                The reachable workspace is the intersection of two annuli (ring-shaped regions), 
                centered at <Formula latex="O_1" /> and <Formula latex="O_2" />. The actual boundary is complex due to 
                the offset <Formula latex="L_3" /> in the right servo calculation.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'summary',
      title: '10. Complete Algorithm',
      content: (
        <div className="space-y-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-blue-400">10. Complete Inverse Kinematics Algorithm</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg space-y-4">
            <h3 className="text-xl font-semibold text-green-400">Input</h3>
            <p className="text-gray-300">Target position <Formula latex="T = (x_T, y_T)" /> in mm</p>
            
            <h3 className="text-xl font-semibold text-green-400 mt-6">Output</h3>
            <p className="text-gray-300">Servo pulse widths <Formula latex="P_L, P_R" /> in μs</p>
            
            <h3 className="text-xl font-semibold text-green-400 mt-6">Algorithm</h3>
            <div className="bg-gray-900 p-4 rounded space-y-2 text-sm text-gray-300 font-mono">
              <div className="text-blue-300">// Left Servo</div>
              <div>Δx₁ ← x_T - 24</div>
              <div>Δy₁ ← y_T + 25</div>
              <div>c₁ ← √(Δx₁² + Δy₁²)</div>
              <div>α₁ ← atan2(Δy₁, Δx₁)</div>
              <div>α₂ ← arccos((35² + c₁² - 55.1²) / (70 × c₁))</div>
              <div>θ_L ← α₁ + α₂ - π</div>
              <div>P_L ← ⌊630 × θ_L + 1950⌋</div>
              
              <div className="mt-4 text-purple-300">// Right Servo</div>
              <div>α₂' ← arccos((55.1² + c₁² - 35²) / (110.2 × c₁))</div>
              <div>H_x ← x_T + 13.2 × cos(α₁ - α₂' + 0.621 + π)</div>
              <div>H_y ← y_T + 13.2 × sin(α₁ - α₂' + 0.621 + π)</div>
              <div>Δx₂ ← H_x - 49</div>
              <div>Δy₂ ← H_y + 25</div>
              <div>c₂ ← √(Δx₂² + Δy₂²)</div>
              <div>α₁ʰ ← atan2(Δy₂, Δx₂)</div>
              <div>α₂ʰ ← arccos((35² + c₂² - 45²) / (70 × c₂))</div>
              <div>θ_R ← α₁ʰ - α₂ʰ</div>
              <div>P_R ← ⌊640 × θ_R + 815⌋</div>
              
              <div className="mt-4 text-green-300">// Output</div>
              <div>return (P_L, P_R)</div>
            </div>
            
            <div className="bg-blue-900/20 border border-blue-700 p-4 rounded mt-4">
              <p className="text-sm text-gray-300">
                <strong>Note:</strong> This algorithm is implemented exactly as shown in the PlotClock.ino source code 
                (set_XY function) from the ProjectsWithRed/plotclock repository.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];
  
  return (
    <div className="flex h-full">
      <div className="w-80 bg-gray-900 border-r border-gray-700 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-bold text-white mb-4">Sections</h2>
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-8">
        {sections.find((s) => s.id === activeSection)?.content}
      </div>
    </div>
  );
}
