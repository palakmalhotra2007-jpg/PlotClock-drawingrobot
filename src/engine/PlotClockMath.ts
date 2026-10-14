/**
 * PlotClock Mathematical Engine
 * Based on the actual PlotClock repository by ProjectsWithRed
 * Source: https://github.com/ProjectsWithRed/plotclock
 * 
 * This module implements the exact inverse kinematics calculations
 * used in the real PlotClock drawing robot.
 */

/**
 * Robot Physical Dimensions (in millimeters)
 * These values are extracted from the actual PlotClock.ino code
 */
export const ROBOT_DIMENSIONS = {
  // Arm link lengths
  L1: 35,      // Length of servo arm (from servo center to joint)
  L2: 55.1,    // Length of first arm segment (from joint to pen holder connection)
  L3: 13.2,    // Offset distance from pen to right servo calculation point
  L4: 45,      // Length of second arm segment (right servo to pen holder)
  
  // Servo origin positions (mounting positions on the base)
  O1X: 24,     // Left servo X position
  O1Y: -25,    // Left servo Y position (negative = below drawing surface origin)
  O2X: 49,     // Right servo X position
  O2Y: -25,    // Right servo Y position
  
  // Home position (where the eraser is located)
  HOME_X: 72.2,
  HOME_Y: 45.5,
  
  // Offset angle for right servo calculation (in radians)
  // 0.621 radians = 35.6 degrees (approximately 36.5° as noted in source code)
  RIGHT_SERVO_OFFSET: 0.621,
};

/**
 * Servo calibration constants
 * These map angular positions to servo microsecond pulse widths
 */
export const SERVO_CONFIG = {
  LEFT_FACTOR: 630,      // Conversion factor for left servo
  RIGHT_FACTOR: 640,     // Conversion factor for right servo
  LEFT_NULL: 1950,       // Left servo neutral position (microseconds)
  RIGHT_NULL: 815,       // Right servo neutral position (microseconds)
};

/**
 * Result of inverse kinematics calculation
 */
export interface IKResult {
  success: boolean;
  leftServoAngle: number;      // Angle in radians
  rightServoAngle: number;     // Angle in radians
  leftServoPulse: number;      // Microseconds for left servo
  rightServoPulse: number;     // Microseconds for right servo
  intermediatePoint: {         // The calculated point H for right servo
    x: number;
    y: number;
  };
  // Detailed calculation steps for educational purposes
  steps: {
    // Left servo calculations
    dx1: number;           // X displacement from left servo to target
    dy1: number;           // Y displacement from left servo to target
    c1: number;            // Distance from left servo to target
    a1_polar: number;      // Direction angle to target
    a2_left: number;       // Angle from law of cosines
    
    // Right servo calculations  
    Hx: number;            // X coordinate of intermediate point
    Hy: number;            // Y coordinate of intermediate point
    dx2: number;           // X displacement from right servo to H
    dy2: number;           // Y displacement from right servo to H
    c2: number;            // Distance from right servo to H
    a1_right: number;      // Direction angle to H
    a2_right: number;      // Angle from law of cosines
  };
  error?: string;
}

/**
 * Law of Cosines: Calculate angle given three side lengths
 * 
 * For a triangle with sides a, b, c, the angle between sides a and c is:
 * θ = arccos((a² + c² - b²) / (2ac))
 * 
 * This is directly from the PlotClock source code (return_angle function)
 * 
 * @param a - First side length
 * @param b - Opposite side length
 * @param c - Second side length adjacent to the angle
 * @returns Angle in radians between sides a and c
 */
export function lawOfCosines(a: number, b: number, c: number): number {
  const numerator = a * a + c * c - b * b;
  const denominator = 2 * a * c;
  const cosValue = numerator / denominator;
  
  // Clamp to valid range for acos to avoid NaN
  const clampedCos = Math.max(-1, Math.min(1, cosValue));
  
  return Math.acos(clampedCos);
}

/**
 * Calculate inverse kinematics for the PlotClock robot
 * This implements the exact algorithm from the set_XY function in PlotClock.ino
 * 
 * The robot uses a dual-arm five-bar linkage mechanism:
 * - Two servos mounted at fixed positions (O1 and O2)
 * - Each servo has an arm of length L1
 * - The left arm connects to a passive joint with arm segment L2
 * - The right arm connects through an offset point H with arm segment L4
 * - Both arm segments meet at the pen holder
 * 
 * @param targetX - Target X coordinate for the pen tip
 * @param targetY - Target Y coordinate for the pen tip
 * @returns IKResult containing servo angles and detailed calculation steps
 */
export function calculateInverseKinematics(
  targetX: number,
  targetY: number
): IKResult {
  const { L1, L2, L3, L4, O1X, O1Y, O2X, O2Y, RIGHT_SERVO_OFFSET } = ROBOT_DIMENSIONS;
  
  // ============================================
  // PART 1: Calculate Left Servo Angle
  // ============================================
  
  // Step 1: Calculate displacement from left servo origin to target
  const dx1 = targetX - O1X;
  const dy1 = targetY - O1Y;
  
  // Step 2: Convert to polar coordinates
  // c1 is the straight-line distance from servo to target
  const c1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
  
  // a1_polar is the direction angle (bearing) to the target
  const a1_polar = Math.atan2(dy1, dx1);
  
  // Step 3: Use law of cosines to find the angle at the servo
  // We have a triangle with sides L1 (servo arm), L2 (passive arm), and c1 (distance to target)
  const a2_left = lawOfCosines(L1, L2, c1);
  
  // Step 4: Calculate final servo angle
  // The servo angle is the polar angle plus the triangle angle, minus 180°
  // (The subtraction of π flips the reference direction)
  const leftServoAngle = a2_left + a1_polar - Math.PI;
  
  // ============================================
  // PART 2: Calculate Right Servo Angle
  // ============================================
  
  // Step 5: Find the intermediate point H
  // The right servo doesn't directly connect to the pen tip
  // Instead, it connects through an offset point H, which is displaced
  // from the target by distance L3 at a specific angle
  
  // First, get the angle at the passive joint using the other triangle
  const a2_forH = lawOfCosines(L2, L1, c1);
  
  // The offset angle is calculated from the direction angle, minus the joint angle,
  // plus the fixed offset constant, plus 180°
  const Hx = targetX + L3 * Math.cos((a1_polar - a2_forH + RIGHT_SERVO_OFFSET) + Math.PI);
  const Hy = targetY + L3 * Math.sin((a1_polar - a2_forH + RIGHT_SERVO_OFFSET) + Math.PI);
  
  // Step 6: Calculate displacement from right servo to point H
  const dx2 = Hx - O2X;
  const dy2 = Hy - O2Y;
  
  // Step 7: Convert to polar coordinates
  const c2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
  const a1_right = Math.atan2(dy2, dx2);
  
  // Step 8: Use law of cosines for the right servo triangle
  // Triangle sides: L1 (servo arm), L4 (right arm segment), c2 (distance to H)
  const a2_right = lawOfCosines(L1, L4, c2);
  
  // Step 9: Calculate final right servo angle
  // For the right servo, we subtract the triangle angle from the polar angle
  const rightServoAngle = a1_right - a2_right;
  
  // ============================================
  // PART 3: Convert Angles to Servo Pulses
  // ============================================
  
  const { LEFT_FACTOR, RIGHT_FACTOR, LEFT_NULL, RIGHT_NULL } = SERVO_CONFIG;
  
  // The servo pulse calculation maps the angular position to microsecond timing
  // Servo motors use PWM signals where pulse width determines position
  // Typical range: 1000-2000 microseconds for 0-180 degrees
  const leftServoPulse = Math.floor((leftServoAngle * LEFT_FACTOR) + LEFT_NULL);
  const rightServoPulse = Math.floor((rightServoAngle * RIGHT_FACTOR) + RIGHT_NULL);
  
  // ============================================
  // PART 4: Validation and Return
  // ============================================
  
  // Check if calculations produced valid numbers
  const isValid = !isNaN(leftServoAngle) && !isNaN(rightServoAngle) &&
                  isFinite(leftServoAngle) && isFinite(rightServoAngle);
  
  return {
    success: isValid,
    leftServoAngle,
    rightServoAngle,
    leftServoPulse,
    rightServoPulse,
    intermediatePoint: { x: Hx, y: Hy },
    steps: {
      dx1,
      dy1,
      c1,
      a1_polar,
      a2_left,
      Hx,
      Hy,
      dx2,
      dy2,
      c2,
      a1_right,
      a2_right,
    },
    error: isValid ? undefined : 'Target position is unreachable or produces invalid angles'
  };
}

/**
 * Check if a target position is within the robot's reachable workspace
 * 
 * For a two-arm linkage, the workspace is an annulus (ring) where:
 * - Minimum reach = |L1 - L2| from servo origin
 * - Maximum reach = L1 + L2 from servo origin
 * 
 * Both servos must be able to reach the target for it to be valid
 * 
 * @param x - X coordinate
 * @param y - Y coordinate
 * @returns true if position is reachable
 */
export function isReachable(x: number, y: number): boolean {
  const { L1, L2, L4, O1X, O1Y, O2X, O2Y } = ROBOT_DIMENSIONS;
  
  // Check left servo reach
  const dx1 = x - O1X;
  const dy1 = y - O1Y;
  const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
  
  const leftMinReach = Math.abs(L1 - L2);
  const leftMaxReach = L1 + L2;
  
  if (dist1 < leftMinReach || dist1 > leftMaxReach) {
    return false;
  }
  
  // For right servo, we need to check if H point is reachable
  // This is a simplification; exact check would require calculating H first
  const dx2 = x - O2X;
  const dy2 = y - O2Y;
  const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
  
  const rightMinReach = Math.abs(L1 - L4);
  const rightMaxReach = L1 + L4;
  
  // Approximate check (actual H point could be further)
  return dist2 >= rightMinReach - 20 && dist2 <= rightMaxReach + 20;
}

/**
 * Linear interpolation between two points
 * Used for smooth pen movement along straight lines
 * 
 * @param x1 - Start X coordinate
 * @param y1 - Start Y coordinate
 * @param x2 - End X coordinate
 * @param y2 - End Y coordinate
 * @param numSteps - Number of interpolation points
 * @returns Array of intermediate points
 */
export function interpolateLinear(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  numSteps: number
): Array<{ x: number; y: number }> {
  const points: Array<{ x: number; y: number }> = [];
  
  for (let i = 0; i <= numSteps; i++) {
    const t = i / numSteps;
    points.push({
      x: x1 + t * (x2 - x1),
      y: y1 + t * (y2 - y1),
    });
  }
  
  return points;
}

/**
 * Convert radians to degrees
 */
export function radToDeg(rad: number): number {
  return rad * (180 / Math.PI);
}

/**
 * Convert degrees to radians
 */
export function degToRad(deg: number): number {
  return deg * (Math.PI / 180);
}
