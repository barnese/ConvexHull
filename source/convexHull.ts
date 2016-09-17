/// <reference path="declarations/jquery.d.ts" />
/// <reference path="declarations/raphael.d.ts" />
/// <reference path="quickHull.ts" />

class ConvexHull {
    private points: Point[];
    private paper: RaphaelPaper;
    private paperRect: Rect;

    // Visual properties
    private pointSize: number = 2;
    private pointColor: string = "#000";
    private lineColor: string = "#22cc22";
    private lineStroke: number = 2;
    private fillColor: string = "#ffe400";
    private fillOpacity: number = 0.5;
    private paperOutlineColor: string = "#aaa";

    constructor(paperRect: Rect) {
        this.points = [];
        this.paperRect = paperRect;

        this.paper = Raphael(paperRect.x, paperRect.y, paperRect.width, paperRect.height);

        var paperOutline = this.paper.rect(0, 0, paperRect.width, paperRect.height);
        paperOutline.attr("stroke", this.paperOutlineColor);
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
     * Draw a convex hull around the points.
     */
    drawConvexHull(convexHull: ConvexHullInterface) {        
        this.drawPath(convexHull.computeHull(this.points));
    }

    /**
     * Draws a path given an array of points.
     */
    private drawPath(points: Point[]) {
        if (points.length <= 0) {
            return;
        }

        // Start the path at the first point.
        var path: string[] = ["M", points[0].x.toString(), points[0].y.toString()];

        // Ensure we loop back to the first point.
        points.push(points[0]);

        for (var point of points) {
            path.push("L");
            path.push(point.x.toString());
            path.push(point.y.toString());
        }

        var polygon = this.paper.path(path);
        polygon.attr("stroke", this.lineColor);
        polygon.attr("stroke-width", this.lineStroke);
        polygon.attr("fill", this.fillColor);
        polygon.attr("fill-opacity", this.fillOpacity);
    }

    /**
     * Draws the points.
     */
    drawPoints(showCoordinates = false) {
        for (var point of this.points) {
            this.drawPoint(point, this.pointColor);

            if (showCoordinates) {
                this.drawPointCoordinates(point);
            }
        }
    }

    printPoints() {
        this.points.printPoints("Points:");
    }

    private drawPoint(point: Point, color: string) {
        var circle = this.paper.circle(point.x, point.y, this.pointSize);
        circle.attr("fill", color);
        circle.attr("stroke", color);
    }

    private drawPointCoordinates(point: Point) {
        var text = this.paper.text(point.x, point.y + 10, point.describe());
        text.attr("fill", this.pointColor);
    }
}

/**
 * Main entry point.
 */
$(document).ready(function() {
    var windowSize = new Rect(10, 10, $(document).width() - 20, $(document).height() - 20);
    var convexHull = new ConvexHull(windowSize);
    convexHull.createRandomPoints(15);
    convexHull.drawPoints(true);
    convexHull.drawConvexHull(new QuickHull());
});
