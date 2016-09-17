/// <reference path="point.ts" />
/// <reference path="line.ts" />

class MathHelpers {
    
    /**
     * Computes the cross product between the given points.
     */
    static getCrossProduct(a: Point, b: Point, c: Point) {
        return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
    }

    /**
     * Determines the distance of a point from a line.
     */
    private static getDistanceFromLine(line: Line, c: Point) {
        var a = line.a;
        var b = line.b;
        var crossProduct = Math.abs(this.getCrossProduct(a, b, c));

        return crossProduct / Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
    }

    /**
     * Finds the point farthest from the given line.
     */
    static getFarthestPointFromLine(points: Point[], line: Line) {
        var farthestPoint = points[0];
        var maxDistance = Number.MIN_VALUE;

        for (var point of points) {
            var distanceFromLine = this.getDistanceFromLine(line, point);

            if (distanceFromLine > maxDistance) {
                maxDistance = distanceFromLine;
                farthestPoint = point;
            } 
        }

        return farthestPoint;
    }

    /**
     * Determines if the point is left of the line.
     * @return true if above, false otherwise.
     */
    static isPointLeftOfLine(point: Point, line: Line) {
        return this.getCrossProduct(line.a, line.b, point) > 0;
    }
}