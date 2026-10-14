import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Text } from '@react-three/drei';
import * as THREE from 'three';
import { ROBOT_DIMENSIONS, IKResult } from '../engine/PlotClockMath';

interface Robot3DProps {
  ikResult: IKResult | null;
  targetPosition: { x: number; y: number };
  showLabels?: boolean;
  showAxes?: boolean;
}

/**
 * 3D Model of the PlotClock Drawing Robot
 * Renders the physical robot based on actual dimensions and IK calculations
 */
function RobotModel({ ikResult, targetPosition, showLabels = true, showAxes = true }: Robot3DProps) {
  const { L1, O1X, O1Y, O2X, O2Y } = ROBOT_DIMENSIONS;
  
  // Calculate 3D positions for visualization
  const positions = useMemo(() => {
    if (!ikResult || !ikResult.success) {
      return null;
    }
    
    // Left servo arm endpoint (joint position)
    const leftJointX = O1X + L1 * Math.cos(ikResult.leftServoAngle);
    const leftJointY = O1Y + L1 * Math.sin(ikResult.leftServoAngle);
    
    // Right servo arm endpoint
    const rightJointX = O2X + L1 * Math.cos(ikResult.rightServoAngle);
    const rightJointY = O2Y + L1 * Math.sin(ikResult.rightServoAngle);
    
    return {
      leftServo: new THREE.Vector3(O1X, 0, -O1Y),
      leftJoint: new THREE.Vector3(leftJointX, 0, -leftJointY),
      rightServo: new THREE.Vector3(O2X, 0, -O2Y),
      rightJoint: new THREE.Vector3(rightJointX, 0, -rightJointY),
      pen: new THREE.Vector3(targetPosition.x, 0, -targetPosition.y),
      intermediateH: new THREE.Vector3(
        ikResult.intermediatePoint.x,
        0,
        -ikResult.intermediatePoint.y
      ),
    };
  }, [ikResult, targetPosition, O1X, O1Y, O2X, O2Y, L1]);
  
  if (!positions) {
    return null;
  }
  
  return (
    <group>
      {/* Base plate */}
      <mesh position={[35, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[80, 60, 2]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      
      {/* Drawing surface */}
      <mesh position={[35, 0.1, 10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[70, 50]} />
        <meshStandardMaterial color="#ffffff" opacity={0.9} transparent />
      </mesh>
      
      {/* Left servo body */}
      <mesh position={positions.leftServo}>
        <boxGeometry args={[8, 6, 8]} />
        <meshStandardMaterial color="#1e40af" />
      </mesh>
      
      {/* Left servo arm (L1) */}
      <Line
        start={positions.leftServo}
        end={positions.leftJoint}
        color="#3b82f6"
        lineWidth={4}
      />
      
      {/* Left joint */}
      <mesh position={positions.leftJoint}>
        <sphereGeometry args={[2, 16, 16]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
      
      {/* Left arm segment (L2) */}
      <Line
        start={positions.leftJoint}
        end={positions.pen}
        color="#10b981"
        lineWidth={3}
      />
      
      {/* Right servo body */}
      <mesh position={positions.rightServo}>
        <boxGeometry args={[8, 6, 8]} />
        <meshStandardMaterial color="#7c3aed" />
      </mesh>
      
      {/* Right servo arm (L1) */}
      <Line
        start={positions.rightServo}
        end={positions.rightJoint}
        color="#a78bfa"
        lineWidth={4}
      />
      
      {/* Right joint */}
      <mesh position={positions.rightJoint}>
        <sphereGeometry args={[2, 16, 16]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
      
      {/* Right arm segment (L4) to intermediate point H */}
      <Line
        start={positions.rightJoint}
        end={positions.intermediateH}
        color="#8b5cf6"
        lineWidth={3}
      />
      
      {/* Intermediate point H visualization */}
      <mesh position={positions.intermediateH}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshStandardMaterial color="#ec4899" opacity={0.7} transparent />
      </mesh>
      
      {/* Connection from H to pen (L3 offset) */}
      <Line
        start={positions.intermediateH}
        end={positions.pen}
        color="#ec4899"
        lineWidth={2}
        dashed
      />
      
      {/* Pen holder */}
      <mesh position={positions.pen}>
        <cylinderGeometry args={[1.5, 1.5, 8, 16]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      
      {/* Pen tip indicator */}
      <mesh position={new THREE.Vector3(positions.pen.x, -5, positions.pen.z)}>
        <coneGeometry args={[0.5, 3, 16]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>
      
      {/* Labels */}
      {showLabels && (
        <>
          <Text
            position={[positions.leftServo.x, 8, positions.leftServo.z]}
            fontSize={3}
            color="#3b82f6"
          >
            Left Servo
          </Text>
          <Text
            position={[positions.rightServo.x, 8, positions.rightServo.z]}
            fontSize={3}
            color="#a78bfa"
          >
            Right Servo
          </Text>
          <Text
            position={[positions.pen.x, -10, positions.pen.z]}
            fontSize={3}
            color="#ef4444"
          >
            Pen ({targetPosition.x.toFixed(1)}, {targetPosition.y.toFixed(1)})
          </Text>
        </>
      )}
      
      {/* Coordinate axes */}
      {showAxes && (
        <group>
          {/* X axis (red) */}
          <arrowHelper
            args={[
              new THREE.Vector3(1, 0, 0),
              new THREE.Vector3(0, 0, 0),
              40,
              0xff0000,
            ]}
          />
          {/* Y axis (green) */}
          <arrowHelper
            args={[
              new THREE.Vector3(0, 1, 0),
              new THREE.Vector3(0, 0, 0),
              30,
              0x00ff00,
            ]}
          />
          {/* Z axis (blue) */}
          <arrowHelper
            args={[
              new THREE.Vector3(0, 0, 1),
              new THREE.Vector3(0, 0, 0),
              30,
              0x0000ff,
            ]}
          />
        </group>
      )}
    </group>
  );
}

/**
 * Helper component to draw lines between points
 */
function Line({
  start,
  end,
  color,
  lineWidth = 2,
  dashed = false,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color: string;
  lineWidth?: number;
  dashed?: boolean;
}) {
  const points = [start, end];
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  
  return (
    <line>
      <bufferGeometry attach="geometry" {...lineGeometry} />
      <lineBasicMaterial
        attach="material"
        color={color}
        linewidth={lineWidth}
        transparent={dashed}
        opacity={dashed ? 0.5 : 1}
      />
    </line>
  );
}

/**
 * Main 3D Canvas Component
 */
export default function Robot3D(props: Robot3DProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{
          position: [60, 80, 60],
          fov: 50,
        }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#0a0a0a']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        
        <RobotModel {...props} />
        
        <Grid
          args={[100, 100]}
          cellSize={5}
          cellThickness={0.5}
          cellColor="#444444"
          sectionSize={10}
          sectionThickness={1}
          sectionColor="#666666"
          fadeDistance={200}
          fadeStrength={1}
          followCamera={false}
          position={[0, -0.1, 0]}
        />
        
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={20}
          maxDistance={200}
        />
      </Canvas>
    </div>
  );
}
