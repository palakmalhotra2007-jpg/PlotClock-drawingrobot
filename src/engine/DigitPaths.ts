/**
 * Digit Drawing Paths for PlotClock
 * Extracted from the actual PlotClock.ino drawNumber function
 * 
 * Each digit is defined as a sequence of drawing commands:
 * - moveTo: lift pen and move to position
 * - lineTo: draw line to position
 * - arc: draw circular arc
 */

export type DrawCommand =
  | { type: 'moveTo'; x: number; y: number }
  | { type: 'lineTo'; x: number; y: number }
  | { type: 'arc'; cx: number; cy: number; radius: number; startAngle: number; endAngle: number; squeeze?: number };

/**
 * Get drawing commands for a specific digit
 * These paths are scaled and positioned relative to a base point (bx, by)
 * 
 * @param digit - Digit 0-9 to draw
 * @param bx - Base X coordinate
 * @param by - Base Y coordinate
 * @param scale - Scaling factor (default 0.9 in original code)
 * @returns Array of drawing commands
 */
export function getDigitCommands(
  digit: number,
  bx: number,
  by: number,
  scale: number = 1.0
): DrawCommand[] {
  const commands: DrawCommand[] = [];
  
  switch (digit) {
    case 0:
      // Draw a circular zero using arc
      commands.push(
        { type: 'moveTo', x: bx + 12 * scale, y: by + 6 * scale },
        { 
          type: 'arc', 
          cx: bx + 7 * scale, 
          cy: by + 10 * scale, 
          radius: 10 * scale,
          startAngle: -0.8,
          endAngle: 6.7,
          squeeze: 0.5
        }
      );
      break;
      
    case 1:
      // Vertical line with small top stroke
      commands.push(
        { type: 'moveTo', x: bx + 3 * scale, y: by + 15 * scale },
        { type: 'lineTo', x: bx + 10 * scale, y: by + 20 * scale },
        { type: 'lineTo', x: bx + 10 * scale, y: by + 0 * scale }
      );
      break;
      
    case 2:
      // Top arc, diagonal, bottom line
      commands.push(
        { type: 'moveTo', x: bx + 2 * scale, y: by + 12 * scale },
        {
          type: 'arc',
          cx: bx + 8 * scale,
          cy: by + 14 * scale,
          radius: 6 * scale,
          startAngle: 3,
          endAngle: -0.8,
          squeeze: 1
        },
        { type: 'lineTo', x: bx + 1 * scale, y: by + 0 * scale },
        { type: 'lineTo', x: bx + 12 * scale, y: by + 0 * scale }
      );
      break;
      
    case 3:
      // Two arcs for top and bottom curves
      commands.push(
        { type: 'moveTo', x: bx + 2 * scale, y: by + 17 * scale },
        {
          type: 'arc',
          cx: bx + 5 * scale,
          cy: by + 15 * scale,
          radius: 5 * scale,
          startAngle: 3,
          endAngle: -2,
          squeeze: 1
        },
        {
          type: 'arc',
          cx: bx + 5 * scale,
          cy: by + 5 * scale,
          radius: 5 * scale,
          startAngle: 1.57,
          endAngle: -3,
          squeeze: 1
        }
      );
      break;
      
    case 4:
      // Vertical line, horizontal crossbar
      commands.push(
        { type: 'moveTo', x: bx + 10 * scale, y: by + 0 * scale },
        { type: 'lineTo', x: bx + 10 * scale, y: by + 20 * scale },
        { type: 'lineTo', x: bx + 2 * scale, y: by + 6 * scale },
        { type: 'lineTo', x: bx + 12 * scale, y: by + 6 * scale }
      );
      break;
      
    case 5:
      // Bottom arc, vertical, top line
      commands.push(
        { type: 'moveTo', x: bx + 2 * scale, y: by + 5 * scale },
        {
          type: 'arc',
          cx: bx + 5 * scale,
          cy: by + 6 * scale,
          radius: 6 * scale,
          startAngle: -2.5,
          endAngle: 2,
          squeeze: 1
        },
        { type: 'lineTo', x: bx + 5 * scale, y: by + 20 * scale },
        { type: 'lineTo', x: bx + 12 * scale, y: by + 20 * scale }
      );
      break;
      
    case 6:
      // Large bottom loop, top curve
      commands.push(
        { type: 'moveTo', x: bx + 2 * scale, y: by + 10 * scale },
        {
          type: 'arc',
          cx: bx + 7 * scale,
          cy: by + 6 * scale,
          radius: 6 * scale,
          startAngle: 2,
          endAngle: -4.4,
          squeeze: 1
        },
        { type: 'lineTo', x: bx + 11 * scale, y: by + 20 * scale }
      );
      break;
      
    case 7:
      // Top line, diagonal down
      commands.push(
        { type: 'moveTo', x: bx + 2 * scale, y: by + 20 * scale },
        { type: 'lineTo', x: bx + 12 * scale, y: by + 20 * scale },
        { type: 'lineTo', x: bx + 2 * scale, y: by + 0 }
      );
      break;
      
    case 8:
      // Two loops, top and bottom
      commands.push(
        { type: 'moveTo', x: bx + 5 * scale, y: by + 10 * scale },
        {
          type: 'arc',
          cx: bx + 5 * scale,
          cy: by + 15 * scale,
          radius: 5 * scale,
          startAngle: 4.7,
          endAngle: -1.6,
          squeeze: 1
        },
        {
          type: 'arc',
          cx: bx + 5 * scale,
          cy: by + 5 * scale,
          radius: 5 * scale,
          startAngle: -4.7,
          endAngle: 2,
          squeeze: 1
        }
      );
      break;
      
    case 9:
      // Top loop, diagonal down
      commands.push(
        { type: 'moveTo', x: bx + 9 * scale, y: by + 11 * scale },
        {
          type: 'arc',
          cx: bx + 7 * scale,
          cy: by + 15 * scale,
          radius: 5 * scale,
          startAngle: 4,
          endAngle: -0.5,
          squeeze: 1
        },
        { type: 'lineTo', x: bx + 5 * scale, y: by + 0 }
      );
      break;
  }
  
  return commands;
}

/**
 * Get drawing commands for the colon separator
 */
export function getColonCommands(
  bx: number,
  by: number,
  scale: number = 1.0
): DrawCommand[] {
  return [
    { type: 'moveTo', x: bx + 5 * scale, y: by + 15 * scale },
    {
      type: 'arc',
      cx: bx + 5 * scale,
      cy: by + 15 * scale,
      radius: 0.1 * scale,
      startAngle: 1,
      endAngle: -1,
      squeeze: 1
    },
    { type: 'moveTo', x: bx + 5 * scale, y: by + 5 * scale },
    {
      type: 'arc',
      cx: bx + 5 * scale,
      cy: by + 5 * scale,
      radius: 0.1 * scale,
      startAngle: 1,
      endAngle: -1,
      squeeze: 1
    }
  ];
}

/**
 * Convert arc commands to line segments for rendering
 * The original PlotClock code uses bogenUZS and bogenGZS functions
 * which draw arcs by incrementally calculating points
 * 
 * @param cx - Arc center X
 * @param cy - Arc center Y
 * @param radius - Arc radius
 * @param startAngle - Start angle in radians
 * @param endAngle - End angle in radians
 * @param squeeze - Horizontal squeeze factor (for elliptical arcs)
 * @param clockwise - Direction of arc
 * @returns Array of points along the arc
 */
export function arcToPoints(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  squeeze: number = 1.0,
  clockwise: boolean = true
): Array<{ x: number; y: number }> {
  const points: Array<{ x: number; y: number }> = [];
  const increment = clockwise ? 0.05 : -0.05;
  
  let angle = startAngle;
  const condition = clockwise
    ? () => angle <= endAngle
    : () => angle >= endAngle;
    
  while (condition()) {
    points.push({
      x: squeeze * radius * Math.cos(angle) + cx,
      y: radius * Math.sin(angle) + cy,
    });
    angle += increment;
  }
  
  // Add final point
  points.push({
    x: squeeze * radius * Math.cos(endAngle) + cx,
    y: radius * Math.sin(endAngle) + cy,
  });
  
  return points;
}

/**
 * Convert digit commands to a continuous path of points
 * This expands arcs into line segments and returns all coordinates
 * 
 * @param commands - Array of drawing commands
 * @returns Array of points with pen-up/pen-down flags
 */
export function commandsToPath(
  commands: DrawCommand[]
): Array<{ x: number; y: number; penDown: boolean }> {
  const path: Array<{ x: number; y: number; penDown: boolean }> = [];
  
  for (const cmd of commands) {
    if (cmd.type === 'moveTo') {
      path.push({ x: cmd.x, y: cmd.y, penDown: false });
    } else if (cmd.type === 'lineTo') {
      path.push({ x: cmd.x, y: cmd.y, penDown: true });
    } else if (cmd.type === 'arc') {
      const arcPoints = arcToPoints(
        cmd.cx,
        cmd.cy,
        cmd.radius,
        cmd.startAngle,
        cmd.endAngle,
        cmd.squeeze,
        cmd.startAngle < cmd.endAngle
      );
      
      // First point of arc should be pen down
      arcPoints.forEach((pt) => {
        path.push({ x: pt.x, y: pt.y, penDown: true });
      });
    }
  }
  
  return path;
}

/**
 * Get the complete time drawing as a path
 * Positions digits in the standard PlotClock layout
 * 
 * @param hours - Hours (0-23)
 * @param minutes - Minutes (0-59)
 * @param scale - Scale factor
 * @returns Complete path for drawing the time
 */
export function getTimePath(
  hours: number,
  minutes: number,
  scale: number = 0.9
): Array<{ x: number; y: number; penDown: boolean }> {
  const h1 = Math.floor(hours / 10);
  const h2 = hours % 10;
  const m1 = Math.floor(minutes / 10);
  const m2 = minutes % 10;
  
  const path: Array<{ x: number; y: number; penDown: boolean }> = [];
  
  // Digit 1 (tens of hours)
  const d1Commands = getDigitCommands(h1, 5, 25, scale);
  path.push(...commandsToPath(d1Commands));
  
  // Digit 2 (ones of hours)
  const d2Commands = getDigitCommands(h2, 19, 25, scale);
  path.push(...commandsToPath(d2Commands));
  
  // Colon
  const colonCommands = getColonCommands(28, 25, scale);
  path.push(...commandsToPath(colonCommands));
  
  // Digit 3 (tens of minutes)
  const d3Commands = getDigitCommands(m1, 34, 25, scale);
  path.push(...commandsToPath(d3Commands));
  
  // Digit 4 (ones of minutes)
  const d4Commands = getDigitCommands(m2, 48, 25, scale);
  path.push(...commandsToPath(d4Commands));
  
  return path;
}
