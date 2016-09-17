/// <reference path="declarations/jquery.d.ts" />
/// <reference path="convexHull.ts" />

/**
 * Main entry point.
 */
$(document).ready(function() {
    var windowSize = new Rect(10, 10, $(document).width() - 20, $(document).height() - 20);
    var convexHull = new ConvexHull(windowSize);

    var numberOfPoints = 10;

    if (urlParams["points"]) {
        numberOfPoints = urlParams["points"];
    }

    if (numberOfPoints > 1000) {
        alert("Please enter a points value less than or equal to 1000.");
    } else {
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
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();