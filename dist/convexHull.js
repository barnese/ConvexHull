var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.describe = function () {
        return "(" + this.x.toString() + ", " + this.y.toString() + ")";
    };
    return Point;
}());
/// <reference path="point.ts" />
Array.prototype.removePoint = function (pointToRemove) {
    var removeIndex = this.indexOf(pointToRemove, 0);
    if (removeIndex >= 0) {
        this.splice(removeIndex, 1);
    }
};
Array.prototype.printPoints = function (message) {
    var str = "";
    for (var _i = 0, _a = this; _i < _a.length; _i++) {
        var point = _a[_i];
        str += point.describe() + " ";
    }
    console.log(message);
    console.log(str);
};
/// <reference path="point.ts" />
/// <reference path="point.ts" />
var Line = (function () {
    function Line(a, b) {
        this.a = a;
        this.b = b;
    }
    return Line;
}());
/// <reference path="point.ts" />
/// <reference path="line.ts" />
var MathHelpers = (function () {
    function MathHelpers() {
    }
    /**
     * Computes the cross product between the given points.
     */
    MathHelpers.getCrossProduct = function (a, b, c) {
        return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
    };
    /**
     * Determines the distance of a point from a line.
     */
    MathHelpers.getDistanceFromLine = function (line, c) {
        var a = line.a;
        var b = line.b;
        var crossProduct = Math.abs(this.getCrossProduct(a, b, c));
        return crossProduct / Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
    };
    /**
     * Finds the point farthest from the given line.
     */
    MathHelpers.getFarthestPointFromLine = function (points, line) {
        var farthestPoint = points[0];
        var maxDistance = Number.MIN_VALUE;
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            var point = points_1[_i];
            var distanceFromLine = this.getDistanceFromLine(line, point);
            if (distanceFromLine > maxDistance) {
                maxDistance = distanceFromLine;
                farthestPoint = point;
            }
        }
        return farthestPoint;
    };
    /**
     * Determines if the point is left of the line.
     * @return true if above, false otherwise.
     */
    MathHelpers.isPointLeftOfLine = function (point, line) {
        return this.getCrossProduct(line.a, line.b, point) > 0;
    };
    return MathHelpers;
}());
var Rect = (function () {
    function Rect(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    return Rect;
}());
/// <reference path="ConvexHullInterface.ts" />
/// <reference path="arrayHelpers.ts" />
/// <reference path="mathHelpers.ts" />
/// <reference path="point.ts" />
/// <reference path="line.ts" />
/// <reference path="rect.ts" />
/**
 * Implements the QuickHull algorithm for finding a convex hull for points.
 */
var QuickHull = (function () {
    function QuickHull() {
    }
    /**
     * Finds the points on the convex hull for the given points.
     */
    QuickHull.prototype.computeHull = function (inputPoints) {
        // Clone the input array since we'll be modifying it.
        var points = inputPoints.slice(0);
        // No work is necessary in these cases.
        if (points.length < 3) {
            return points;
        }
        // Sort the points by x-coordinate so that we can find the smallest and
        // largest x-valued points.
        points.sort(function (p1, p2) { return p1.x - p2.x; });
        var line = new Line(points[0], points[points.length - 1]);
        points.removePoint(line.a);
        points.removePoint(line.b);
        var leftPoints = [];
        var rightPoints = [];
        for (var _i = 0, points_2 = points; _i < points_2.length; _i++) {
            var point = points_2[_i];
            if (MathHelpers.isPointLeftOfLine(point, line)) {
                leftPoints.push(point);
            }
            else {
                rightPoints.push(point);
            }
        }
        var leftHullPoints = this.computeHullPoints(leftPoints, line.a, line.b);
        var rightHullPoints = this.computeHullPoints(rightPoints, line.b, line.a);
        // Combine the hull points. Order is important to ensure clockwise ordering.
        var hullPoints = [];
        hullPoints.push(line.a); // Left-most point
        hullPoints = hullPoints.concat(leftHullPoints);
        hullPoints.push(line.b); // Right-most point
        hullPoints = hullPoints.concat(rightHullPoints);
        return hullPoints;
    };
    QuickHull.prototype.computeHullPoints = function (points, a, b) {
        if (points.length <= 1) {
            return points;
        }
        var lineAB = new Line(a, b);
        // Find the farthest point from the line between points A and B.
        var c = MathHelpers.getFarthestPointFromLine(points, lineAB);
        points.removePoint(c);
        var lineAC = new Line(a, c);
        var lineCB = new Line(c, b);
        // Using two lines from A to C and C to B, divide the remaining points into
        // two arrays: those on the left of line A->C and those on the left of line C->B.
        var pointsAC = [];
        var pointsCB = [];
        for (var _i = 0, points_3 = points; _i < points_3.length; _i++) {
            var p = points_3[_i];
            if (MathHelpers.isPointLeftOfLine(p, lineAC)) {
                pointsAC.push(p);
            }
            else if (MathHelpers.isPointLeftOfLine(p, lineCB)) {
                pointsCB.push(p);
            }
        }
        // Recursively conquer these subproblems.
        var hullPointsAC = this.computeHullPoints(pointsAC, a, c);
        var hullPointsBC = this.computeHullPoints(pointsCB, c, b);
        // Combine the results.
        var hullPoints = [];
        hullPoints = hullPoints.concat(hullPointsAC);
        hullPoints.push(c);
        hullPoints = hullPoints.concat(hullPointsBC);
        return hullPoints;
    };
    return QuickHull;
}());
/// <reference path="declarations/raphael.d.ts" />
/// <reference path="quickHull.ts" />
var ConvexHull = (function () {
    function ConvexHull(paperRect) {
        // Visual properties
        this.pointSize = 2;
        this.pointColor = "#000";
        this.lineColor = "#22cc22";
        this.lineStroke = 2;
        this.fillColor = "#ffe400";
        this.fillOpacity = 0.5;
        this.paperOutlineColor = "#aaa";
        this.points = [];
        this.paperRect = paperRect;
        this.paper = Raphael(paperRect.x, paperRect.y, paperRect.width, paperRect.height);
        var paperOutline = this.paper.rect(0, 0, paperRect.width, paperRect.height);
        paperOutline.attr("stroke", this.paperOutlineColor);
    }
    /**
     * Adds a point to this Convex Hull.
     */
    ConvexHull.prototype.addPoint = function (x, y) {
        this.points.push(new Point(x, y));
    };
    /**
     * Creates a bunch of random points for this Convex Hull.
     * @param count the number of random points to create
     */
    ConvexHull.prototype.createRandomPoints = function (count) {
        for (var i = 0; i < count; i++) {
            var x = Math.floor(Math.random() * this.paperRect.width);
            var y = Math.floor(Math.random() * this.paperRect.height);
            this.addPoint(x, y);
        }
    };
    /**
     * Draw a convex hull around the points.
     */
    ConvexHull.prototype.drawConvexHull = function (convexHull) {
        this.drawPath(convexHull.computeHull(this.points));
    };
    /**
     * Draws a path given an array of points.
     */
    ConvexHull.prototype.drawPath = function (points) {
        if (points.length <= 0) {
            return;
        }
        // Start the path at the first point.
        var path = ["M", points[0].x.toString(), points[0].y.toString()];
        // Ensure we loop back to the first point.
        points.push(points[0]);
        for (var _i = 0, points_4 = points; _i < points_4.length; _i++) {
            var point = points_4[_i];
            path.push("L");
            path.push(point.x.toString());
            path.push(point.y.toString());
        }
        var polygon = this.paper.path(path);
        polygon.attr("stroke", this.lineColor);
        polygon.attr("stroke-width", this.lineStroke);
        polygon.attr("fill", this.fillColor);
        polygon.attr("fill-opacity", this.fillOpacity);
    };
    /**
     * Draws the points.
     */
    ConvexHull.prototype.drawPoints = function (showCoordinates) {
        if (showCoordinates === void 0) { showCoordinates = false; }
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            this.drawPoint(point, this.pointColor);
            if (showCoordinates) {
                this.drawPointCoordinates(point);
            }
        }
    };
    ConvexHull.prototype.printPoints = function () {
        this.points.printPoints("Points:");
    };
    ConvexHull.prototype.drawPoint = function (point, color) {
        var circle = this.paper.circle(point.x, point.y, this.pointSize);
        circle.attr("fill", color);
        circle.attr("stroke", color);
    };
    ConvexHull.prototype.drawPointCoordinates = function (point) {
        var text = this.paper.text(point.x, point.y + 10, point.describe());
        text.attr("fill", this.pointColor);
    };
    return ConvexHull;
}());
/// <reference path="declarations/jquery.d.ts" />
/// <reference path="convexHull.ts" />
/**
 * Main entry point.
 */
$(document).ready(function () {
    var windowSize = new Rect(10, 10, $(document).width() - 20, $(document).height() - 20);
    var convexHull = new ConvexHull(windowSize);
    var numberOfPoints = 10;
    if (urlParams["points"]) {
        numberOfPoints = urlParams["points"];
    }
    if (numberOfPoints > 1000) {
        alert("Please enter a points value less than or equal to 1000.");
    }
    else {
        convexHull.createRandomPoints(numberOfPoints);
        convexHull.drawPoints(true);
        convexHull.drawConvexHull(new QuickHull());
    }
});
/**
 * Decodes the URL's query string parameters into urlParams.
 * Reference: http://stackoverflow.com/a/2880929
 */
var urlParams;
(window.onpopstate = function () {
    var match, pl = /\+/g, // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g, decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); }, query = window.location.search.substring(1);
    urlParams = {};
    while (match = search.exec(query))
        urlParams[decode(match[1])] = decode(match[2]);
})();
//# sourceMappingURL=convexHull.js.map