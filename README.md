# Convex Hull

Draws the convex hull for a set of randomly generated points. 
The scripts are written in TypeScript and the graphics are rendered using the Raphaël Javascript Library.

Currently only the "Quick Hull" algorithm has been implemented. 
There is a `ConvexHullInterface` defined which will allow easily plugging in other algorithms later. 

## How to Run

To run the script, simply load the `dist/index.htm` page in a browser.

Alternatively, run the provided Node.js server.

```node server.js```

And then navigate to localhost at port 5858.

To adjust the number of randomly generated points, which is defaulted to 10, use `?points=x` as a query string parameter in the URL,
where `x` is the number of desired points. 