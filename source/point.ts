class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    describe() {
        return "(" + this.x.toString() + ", " + this.y.toString() + ")";
    } 
}