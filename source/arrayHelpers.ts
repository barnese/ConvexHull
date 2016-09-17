/// <reference path="point.ts" />

interface Array<T> {
   removePoint(pointToRemove: Point): void;
   printPoints(message: string): void;
}

Array.prototype.removePoint = function(pointToRemove: Point) {
    var removeIndex = this.indexOf(pointToRemove, 0);
    if (removeIndex >= 0) {
        this.splice(removeIndex, 1);
    }   
}

Array.prototype.printPoints = function(message: string) {
    var str = "";
    for (var point of this) {
        str += point.describe() + " ";
    }
    console.log(message);
    console.log(str);
}
