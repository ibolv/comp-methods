var N = 20;
var m = 8;
var k = 4;

var vectX = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
var vectY = [0.2*N, 0.3*m, 0.5*k, 0.6*N, 0.7*m, k, 0.8*N, 1.2*k, 1.3*m, N];  

//var vectX = [1, 4, 5, 6];
//var vectY = [2, 3, 2, 3];

//var vectX = [1, 2, 3, 4, 5, 6];
//var vectY = [2, 3, 5, 3, 4, 6];

//var vectX = [-1, -0.5, 0, 0.5, 1];
//var vectY = [];

// Многочлен Лагранжа
function polynomialLagrange(vectX, vectY, x) {
    var L = 0;
    for (var i = 0; i < vectX.length; i++) {
        var l = 1;
        for (var j = 0; j < vectX.length; j++) {
            if (i != j) {
                l *= (x - vectX[j])/(vectX[i] - vectX[j]);
            }
        }
        L += vectY[i] * l;
    }
    return L;

}


// параболический сплайн
function Splain(vectX, vectY, x) {
    var a = [];
    var b = [];
    var S = [];
    var str = [];
    b[0] = 0;
    for (var i = 1; i <= vectX.length; i++) {
        b[i] = 2 * (vectY[i] - vectY[i-1])/(vectX[i] - vectX[i-1]) - b[i-1];
        a[i-1] = (b[i] - b[i-1]) / 2 / (vectX[i] - vectX[i-1]);
        S[i-1] = a[i-1] * (x - vectX[i-1]) * (x - vectX[i-1]) + b[i-1] * (x - vectX[i-1]) + vectY[i-1];
        str[i-1] ="" + a[i-1] + " * (x" + (-vectX[i-1]) + ")^2 + (" + b[i-1] + ") * (x" + (-vectX[i-1]) + ") + " + vectY[i-1] + "; при x [" + vectX[i-1] + "," + vectX[i] + "]";
        if (x <= vectX[i] && x >= vectX[i-1]) {
            var strX ="" + a[i-1] + " * (x" + (-vectX[i-1]) + ")^2 + (" + b[i-1] + ") * (x" + (-vectX[i-1]) + ") + " + vectY[i-1] + "; при x [" + vectX[i-1] + "," + vectX[i] + "]";
            console.log('S(x) = ', strX);
            console.log('S(' + x + ') = ', S[i-1]);
        }
    
    } 
    str.splice(vectX.length - 1, vectX.length);  
    return str;
}


//Метод наименьших квадратов
function y(vectX, vectY) {
    for (var i = 0; i < vectX.length; i++) {
        vectY[i] = Math.exp(vectX[i]);
    }
    return vectY;
}

function fi(x, deg) {
    var fix = []
    fix[0] = 1 - x;
    for (var i = 1; i < 5; i++) {
        fix[i] = x * Math.pow(1 - x, i);
    }
    return fix[deg];
}

function leastSquareMethod(vectX, vectY) {
    var C = [];
    var b = [];
    var m = 5;
    // Находим коэффициенты матрицы С
    for (var i = 0; i < m; i++) {
        C[i] = [];
        for (var k = 0; k < m; k++) {
            var Sum = 0;
            for (var j = 0; j < vectX.length; j++) {
                Sum += fi(vectX[j], i) * fi(vectX[j], k);

            }
            C[i][k] = Sum;
        }
    }
    console.log(C);

    //Находим элементы столбца b
    for (var i = 0; i < m; i++) {
        b[i] = 0;
        for (var j = 0; j < vectX.length; j++) {
            b[i] += fi(vectX[j], i) * vectY[j];
        }
    }
    console.log(b); 

    //Решаем систему уравнений
    var x = methodCholesky (C, b);
    console.log(x);

    //Мера близости 
    var S = 0;
    for (var i = 0; i < vectX.length; i++) {
        S += Math.pow(x[0] + x[1] * fi(vectX[i], 1) + x[2] * fi(vectX[i], 2) - vectY[i], 2);
    }

    //Многочлен
    var str ="" + x[0] + " * (1-x) + " + x[1] + " * x*(1-x) + (" + x[2] + ") * x*(1-x)^2 + " + x[3] + " * x*(1-x)^3 + (" + x[4] + ") * x*(1-x)^4";
    console.log(str);

}





function methodCholesky (A, B) {
    var C = [];
    var P = [];
    var y = [];
    var x = [];

    for (var i = 0; i < A.length; i++) { 
        C[i] = [];
        P[i] = [];
        for (var j = 0; j < A[i].length; j++) {
            P[i][0] = A[i][0];
            C[0][j] = A[0][j]/P[0][0];
        }
    }

    for (var i = 0; i < A.length; i++) {
        for (var j = 0; j < A[i].length; j++) {
            var SummaP = 0;
            var SummaC = 0;
            for (var k = 0; k <= j - 1; k++) {
               SummaP = SummaP + P[i][k] * C[k][j];
            } 
            P[i][j] = A[i][j] - SummaP;

            for (var k = 0; k <= i - 1; k++) {
                SummaC = SummaC + P[i][k] * C[k][j];
            }
            C[i][j] = 1/P[i][i] * (A[i][j] - SummaC);
        }
    }

    y[0] = B[0]/P[0][0];
    for (var i = 1; i < A[0].length; i++) {
        var Sum = 0;
        for (var k = 0; k <= i - 1; k++) {
            Sum = Sum + P[i][k] * y[k];
        }
        y[i] = (B[i] - Sum) / P[i][i];
    }

    x[A[0].length - 1] = y[A[0].length - 1];
    for (var i = A[0].length - 2; i >= 0; i--) {
        var SumX = 0;
        for (var k = i + 1; k <= A[0].length - 1; k++) {
            SumX = SumX + C[i][k] * x[k];
        }
        x[i] = y[i] - SumX;
    }

    // Проверка
    var vb = [];
    for (var i = 0; i < A.length; i++) {
        vb[i] = 0;
        for (var j = 0; j < A[i].length; j++) {
            vb[i] += A[i][j] * x[j];
        }
    }

    return x;
}




leastSquareMethod(vectX, vectY);
console.log('Вектор X', vectX);
console.log('Вектор Y', vectY);
//console.log(fi(vectX, vectY));
//console.log('Многочлен Лагранжа',polynomialLagrange(vectX, vectY, 6));
//console.log('Параболический сплайн',Splain(vectX, vectY, 0.91));
