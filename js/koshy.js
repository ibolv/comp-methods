var l = 1;
var m = 4;

function f(x, y) {
   //return m * y * y + 1/((x + l)*(x + l));
   //return 1/2*x*y;
   return y*y + x*x;
}

function Koshy() {
    var u = [];
    var u1 = [];
    var x = [];
    var x1 = [];
    var x0 = 0;
    u = [1];
    var h = 0.05;
    var n = 20;
    for (var i = 0; i < n; i++) {
        x1[i] = x0 + h/2*i;
        x[i] = x0 + h*i;
        u1[i] = u[i] + h/2*f(x[i], u[i]);
        u[i+1] = u[i] + h*f(x1[i], u1[i]);
    } 

    console.log(u);
   // console.log(x);
}

function methodEl() {
    var u = [];
    var x = [];
    u = [1];
    var h = 0.05;
    var x0 = 0;
    var n = 20;
    for (var i = 0; i < n; i++) {
        x[i] = x0 + h*i;
        u[i+1] = u[i] + h*f(x[i], u[i]);
    } 
    console.log(u);
    return x;
}


//Метод трапеций
function methodTrapec(a ,b,y) {
    var m = 100;
    var h = 0;
    var I = 0
    var I2 = 0;
    var E = 0.0001;
    var E2 = 1;
    while (E2 >= E) {
        I = 0;
        h = Math.abs((b - a)/m);
        for (var i = 1; i <= m - 1; i++) {
            I += h * f(a + i*h, y);
        }
        I =  I + (f(a,y) + f(b,y))/2 * h;
        E2 = Math.abs(I2 - I)/3;
        I2 = I;
        m = 2 * m;
        
       
        
    }
    return I;
    console.log(I);
     
}


//метод последовательных приближений 
function approximations() {
    var y = [1/2];
    for (var i = 0; i < 3; i++) {
        y[i+1] = y[0] + methodTrapec(0,1,y[i]);
    }


    console.log(y);
}


//Koshy();
//methodEl();
approximations();