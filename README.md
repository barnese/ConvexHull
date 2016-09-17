# Convex Hull

Draws the convex hull for a set of randomly generated points. 
The scripts are written in TypeScript and the graphics are rendered using the Raphaël Javascript Library.

Currently only the "Quick Hull" algorithm has been implemented. 
There is a `ConvexHullInterface` defined which will allow easily plugging in order algorithms later. 

## How to Run

To run the script, simply load the `dist/index.htm` page in a browser.

Alternatively, run the provided Node.js server.

```node server.js```

And then navigate to 

```http://localhost:5858```
