/// <reference path="ConvexHullInterface.ts" />
/// <reference path="arrayHelpers.ts" />
/// <reference path="mathHelpers.ts" />
/// <reference path="point.ts" />
/// <reference path="line.ts" />
/// <reference path="rect.ts" />

/**
 * Implements the QuickHull algorithm for finding a convex hull for points.
 */
class QuickHull implements ConvexHullInterface {
    /**
     * Finds the points on the convex hull for the given points.
     */
    computeHull(inputPoints: Point[]) {
        // Clone the input array since we'll be modifying it.
        var points = inputPoints.slice(0);

        // No work is necessary in these cases.
        if (points.length < 3) {
            return points;
        }

        // Sort the points by x-coordinate so that we can find the smallest and
        // largest x-valued points.
        points.sort((p1, p2) => p1.x - p2.x);

        var line = new Line(points[0], points[points.length - 1]);

        points.removePoint(line.a);
        points.removePoint(line.b);

        var leftPoints: Point[] = [];
        var rightPoints: Point[] = [];

        for (var point of points) {
            if (MathHelpers.isPointLeftOfLine(point, line)) {
                leftPoints.push(point);
            } else {
                rightPoints.push(point);
            }
        }

        var leftHullPoints = this.computeHullPoints(leftPoints, line.a, line.b);
        var rightHullPoints = this.computeHullPoints(rightPoints, line.b, line.a);

        // Combine the hull points. Order is important to ensure clockwise ordering.
        var hullPoints: Point[] = [];

        hullPoints.push(line.a); // Left-most point
        hullPoints = hullPoints.concat(leftHullPoints);        
        hullPoints.push(line.b); // Right-most point
        hullPoints = hullPoints.concat(rightHullPoints);

        return hullPoints;
    }

    private computeHullPoints(points: Point[], a: Point, b: Point) {
        if (points.length <= 1) {
            return points;
        }

        var lineAB = new Line(a, b)

        // Find the farthest point from the line between points A and B.
        var c = MathHelpers.getFarthestPointFromLine(points, lineAB);
        
        points.removePoint(c);

        var lineAC = new Line(a, c);
        var lineCB = new Line(c, b);

        // Using two lines from A to C and C to B, divide the remaining points into
        // two arrays: those on the left of line A->C and those on the left of line C->B.
        var pointsAC: Point[] = [];
        var pointsCB: Point[] = [];

        for (var p of points) {
            if (MathHelpers.isPointLeftOfLine(p, lineAC)) {
                pointsAC.push(p);
            } else if (MathHelpers.isPointLeftOfLine(p, lineCB)) {
                pointsCB.push(p);
            }
        }

        // Recursively conquer these subproblems.
        var hullPointsAC = this.computeHullPoints(pointsAC, a, c);
        var hullPointsBC = this.computeHullPoints(pointsCB, c, b);

        // Combine the results.
        var hullPoints: Point[] = [];

        hullPoints = hullPoints.concat(hullPointsAC);
        hullPoints.push(c);
        hullPoints = hullPoints.concat(hullPointsBC);

        return hullPoints;
    }
}