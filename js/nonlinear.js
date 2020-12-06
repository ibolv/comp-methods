

var dx = 0.001;
function f (x, y) {
    return Math.exp(x*y) - x*x + y - 1.4;
}

function g (x, y) {
    return (x+0.5)*(x+0.5) + y*y - 1;
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
    var x0 = 1;
    var y0 = 2;

    var value = matrJacobs(x0, y0);
    while (parseFloat(value.x.toFixed(4)) != x1) {
        var x1 = parseFloat(value.x.toFixed(4));
        value = matrJacobs(value.x,value.y);        
    }
    console.log('Метод Ньютона ',value.x,value.y);

}

function fiter(x) {
    return Math.exp(-x) - (x - 1.16)*(x - 1.16);
}

function fi(x) {
    return -Math.log((x-1.16)*(x-1.16));
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

methodNewton();
console.log('Метод простых итераций ',methodIteration());

console.log(fiter(0.2987568723869463));
console.log(f(0.41856313514620774, 0.3952743131409402));