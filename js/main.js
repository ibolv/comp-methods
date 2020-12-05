var m = 4;
var k = 20;

var A = [[12 + k, 2, m/4, 1, 2],
         [4, 113 + k, 1, m/10, m-4],
         [1, 2, -24 - k, 3, 4],
         [1, 2/m, 4, 33 + k, 4],
         [-1, 2, -3, 3 + m, -44 - k]];

         

/*var A = [[-4, 1, 1],
         [1, -9, 3],
         [1, 2, -16]];*/

//var B = [2, 5, 13];
var B = [1, 2, 3, 4, 5]


// Метод Холецкого
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
    
    console.log(x);
    console.log(vb);

    return vb;

}



// Метож Зейделя
function methodsSeidel(A, B) {
    var bS = [];
    var d = [];
    var x0 = [];
    var q = [];
    var x = [];
    for (var i = 0; i < A.length; i++) {
        bS[i] = [];
        x[i] = 0;
        x0[i] = 0;
        q[i] = 0;
        for (var j = 0; j < A[i].length; j++) {
            if ( i == j) {
                bS[i][j] = 0;
            } else {
                bS[i][j] = A[i][j]/A[i][i] * (-1);
            }
            q[i] += Math.abs(bS[i][j]); 
            d[i] = B[i]/A[i][i]; 
        }
        
    }
    var qMax = Math.max.apply(null, q);

    //Погрешность
    var E = 0.01;

    var modul = [];
    while (1) {
        for (var i = 0; i < A.length; i ++) {
           for (var j = 0; j < A[i].length; j++) {
                x[i] += x0[j] * bS[i][j];
            }
            x[i] += d[i];
            modul[i] = Math.abs(x[i] - x0[i]);
            x0[i] = x[i];
            x[i] = 0;
        }    
        
  //console.log(x0);  
        if ((Math.max.apply(null, modul)) < qMax/(1 - qMax) * E) {
             break;
         }
         
    }
   console.log(x0);

   //Проверка 
   var vectb = [];
   for (var i = 0; i < A.length; i++) {
    vectb[i] = 0;
       for (var j = 0; j < A[i].length; j++) {
        vectb[i] += A[i][j] * x0[j];
       }
   }

   console.log(vectb);

    
    return bS;

}

//var arr = methodCholesky(A, B);
//console.log(A);

//console.log(methodsSeidel(A, B));
