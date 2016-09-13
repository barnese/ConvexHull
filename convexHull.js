/// <reference path="jquery.d.ts" />
/// <reference path="raphael.d.ts" />
/// <reference path="helpers.ts" />
var ConvexHull = (function () {
    function ConvexHull(paperRect) {
        this.canvasCircleSize = 2;
        this.canvasCircleColor = "#000";
        this.points = [];
        this.paperRect = paperRect;
        this.paper = Raphael(paperRect.x, paperRect.y, paperRect.width, paperRect.height);
        var paperOutline = this.paper.rect(0, 0, paperRect.width, paperRect.height);
        paperOutline.attr("stroke", "#aaa");
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
     * Draws the points.
     */
    ConvexHull.prototype.drawPoints = function () {
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            var circle = this.paper.circle(point.x, point.y, this.canvasCircleSize);
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
    var windowSize = new Rect(10, 10, $(document).width() - 20, $(document).height() - 20);
    var convexHull = new ConvexHull(windowSize);
    convexHull.createRandomPoints(50);
    convexHull.drawPoints();
});
