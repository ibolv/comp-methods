
//var x0 = 1;
var y0 = 2;

var dx = 0.001;
function f (x) {
    return 2*x*x*x - y*y - 1;
}

function g (x, y) {
    return x*y*y*y - y - 4;
}

function fxr (x, y) {
    return (f(x + dx, y)  - f(x, y))/dx;
}

function gxr (x, y) {
    return (g(x + dx, y)  - g(x, y))/dx;
}

function fyr (x, y) {
    return (f(x, y + dx)  - f(x, y))/dx;
}

function gyr (x, y) {
    return (g(x, y + dx)  - g(x, y))/dx;
}

function f2 (x) {
    return (f(x + dx) - 2*f(x) + f(x - dx))/(dx * dx);
}

function matrJacobs(x0, y0) {

    var detX = f(x0,y0) * gyr(x0,y0) - fyr(x0,y0) * g(x0,y0);
    var detY = fxr(x0,y0) * g(x0,y0) - f(x0,y0) * gxr(x0,y0);
    var det = fxr(x0,y0) * gyr(x0,y0) - fyr(x0,y0) * gxr(x0,y0);
    var x = x0 - detX / det;
    var y = y0 - detY / det;
    return {x : x, y : y};
}

function methodNewton() {

    var value = matrJacobs(x0, y0);
    while (parseFloat(value.x.toFixed(4)) != x1) {
        var x1 = parseFloat(value.x.toFixed(4));
        value = matrJacobs(value.x,value.y);
        console.log(value.x,value.y, x1);
        
    }

}

function fi(x) {
    return Math.log((x-1.16)*(x-1.16));
}

function methodIteration() {
    //Точность
    var E = 0.0001;
    var x = 0.1;
    var x0 = 0;
    while(Math.abs(x - x0) > E) {
        x0 = x; 
        var x1 = fi(x0);
        var x2 = fi(x1);
        var d = x0 - 2 * x1 + x2;
        if (d!=0) {
            x = (x0*x2-x1*x1)/d; 
        } else {
            return x;
        }
    }
    return x;
    
}

//methodNewton();
console.log(methodIteration());
