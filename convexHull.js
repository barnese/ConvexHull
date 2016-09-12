/// <reference path="jquery.d.ts" />
/// <reference path="raphael.d.ts" />
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.describe = function () {
        return this.x.toString() + ", " + this.y.toString();
    };
    return Point;
}());
var ConvexHull = (function () {
    function ConvexHull(canvasOriginX, canvasOriginY, canvasWidth, canvasHeight) {
        this.canvasCircleSize = 2;
        this.canvasCircleColor = "#000";
        this.points = [];
        this.canvasOrigin = new Point(canvasOriginX, canvasOriginY);
        this.canvasSize = new Point(canvasWidth, canvasHeight);
        this.canvas = Raphael(canvasOriginX, canvasOriginY, canvasWidth, canvasHeight);
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
            var x = Math.floor(Math.random() * this.canvasSize.x);
            var y = Math.floor(Math.random() * this.canvasSize.y);
            this.addPoint(x, y);
        }
    };
    /**
     * Draws the points.
     */
    ConvexHull.prototype.drawPoints = function () {
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            var circle = this.canvas.circle(point.x, point.y, this.canvasCircleSize);
            circle.attr("fill", this.canvasCircleColor);
            circle.attr("stroke", this.canvasCircleColor);
        }
    };
    /**
     * Prints the points to the console for debugging purposes.
     */
    ConvexHull.prototype.printPoints = function () {
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            console.log(point.describe());
        }
    };
    return ConvexHull;
}());
$(document).ready(function () {
    var convexHull = new ConvexHull(0, 0, $(document).width(), $(document).height());
    convexHull.createRandomPoints(50);
    convexHull.drawPoints();
});
