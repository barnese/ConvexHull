/// <reference path="jquery.d.ts" />
/// <reference path="raphael.d.ts" />
/// <reference path="helpers.ts" />

class ConvexHull {
    private points: Point[];
    private paper;
    private paperRect: Rect;

    private canvasCircleSize: number = 2;
    private canvasCircleColor: string = "#000";

    constructor(paperRect: Rect) {
        this.points = [];
        this.paperRect = paperRect;

        this.paper = Raphael(paperRect.x, paperRect.y, paperRect.width, paperRect.height);

        var paperOutline = this.paper.rect(0, 0, paperRect.width, paperRect.height);
        paperOutline.attr("stroke", "#aaa");
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
            var x = Math.floor(Math.random() * this.paperRect.width);
            var y = Math.floor(Math.random() * this.paperRect.height);
            this.addPoint(x, y);
        }
    }

    /**
     * Draws the points.
     */
    drawPoints() {
        for (var point of this.points) {
            var circle = this.paper.circle(point.x, point.y, this.canvasCircleSize);
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
    var windowSize = new Rect(10, 10, $(document).width() - 20, $(document).height() - 20);
    var convexHull = new ConvexHull(windowSize);
    convexHull.createRandomPoints(50);
    convexHull.drawPoints();
});
