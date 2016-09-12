/// <reference path="jquery.d.ts" />
/// <reference path="raphael.d.ts" />

class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    describe() {
        return this.x.toString() + ", " + this.y.toString();
    } 
}

class ConvexHull {
    private points: Point[];
    private canvas;
    private canvasOrigin: Point;
    private canvasSize: Point;

    private canvasCircleSize: number = 2;
    private canvasCircleColor: string = "#000";

    constructor(canvasOriginX: number, canvasOriginY: number, canvasWidth: number, canvasHeight: number) {
        this.points = [];
        this.canvasOrigin = new Point(canvasOriginX, canvasOriginY);
        this.canvasSize = new Point(canvasWidth, canvasHeight);

        this.canvas = Raphael(canvasOriginX, canvasOriginY, canvasWidth, canvasHeight);        
    }

    /**
     * Adds a point to this Convex Hull.
     */
    addPoint(x: number, y: number) {
        this.points.push(new Point(x, y));
    }

    /**
     * Creates a bunch of random points for this Convex Hull.
     * @param count the number of random points to create 
     */
    createRandomPoints(count: number) {
        for (var i = 0; i < count; i++) {
            var x = Math.floor(Math.random() * this.canvasSize.x);
            var y = Math.floor(Math.random() * this.canvasSize.y);
            this.addPoint(x, y);
        }
    }

    /**
     * Draws the points.
     */
    drawPoints() {
        for (var point of this.points) {
            var circle = this.canvas.circle(point.x, point.y, this.canvasCircleSize);
            circle.attr("fill", this.canvasCircleColor);
            circle.attr("stroke", this.canvasCircleColor);
        }
    }

    /**
     * Prints the points to the console for debugging purposes.
     */
    printPoints() {
        for (var point of this.points) {
            console.log(point.describe());
        }
    }
}

$(document).ready(function() {
    var convexHull = new ConvexHull(0, 0, $(document).width(), $(document).height());
    convexHull.createRandomPoints(50);
    convexHull.drawPoints();
});
