var a = -0.2;
var b = 0.4;



function f(x) {
    return (0.1 + x*x*Math.sin(x))/(x*x + 0.5);
}

//Метод трапеций
function methodTrapec(a ,b) {
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
            I += h * f(a + i*h);
        }
        I =  I + (f(a) + f(b))/2 * h;
        E2 = Math.abs(I2 - I)/3;
        I2 = I;
        m = 2 * m;
        
       
        
    }
    console.log(I);
     
}


// Гаусс
function Gauss(a, b) {
    var Xi = [-0.7745967,0,0.7745967];
    var Ai = [0.5555556,0.8888889,0.5555556];
    var ra = (b-a)/2;
    var su = (a+b)/2;
    var Q = 0;
    var S= 0;
    for (var i = 0; i < 3 ; i++) {
        Q = su+ra * Xi[i];
        S += Ai[i]*f(Q);
    }
    console.log(ra*S);
}


//methodTrapec(a ,b);
//Gauss(a, b);

