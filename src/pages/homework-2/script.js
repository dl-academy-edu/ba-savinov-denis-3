// 1. Создать программу, которая запрашивает у пользователя число, в консоль выводит числа от 1 до 
// до этого числа, но пропускает числа, которые кратны (делятся без остатка) 4-м.

// 2. Написать программу, которая будет получать число и с помощью цикла while считать его факториал.

// 3. Написать программу, которая будет получать число и его степень, с помощью цикла for возвести число в 
// степень.

// 4. Написать проверку, для программ 1-3, чтобы если пользователь вводил неверные данные, например 
// слово вместо числа, то должно вывестись сообщение  об ошибке.

// 5. Написать игру “Угадай число”, для генерации случайного числа использовать следующий код: let rand = Math.ﬂoor(1 + Math.random() * 10);
// Игра должна продолжаться до тех пор, пока пользователь не укажет правильное число. Можете использовать пустой for или while(true).

//http://localhost:3000/pages/homework-1/


//№1-------------------------------------------------------------------------------------------------------


let numberStr, number;
numberStr = prompt("Введите число больше 0:");
number = +numberStr;

while(number !== number || numberStr === null || !numberStr.trim() || number === 0) {
    numberStr = prompt("Вы ввели не число, введите число:", 1);
    number = +numberStr;
}

for (let i = 1; i <= number; i++) {
    if (i%4) {
        console.log (i);
    }
}


//№2----------------------------------------------------------------------------------------------------

// let numberFactorialStr, numberFactorial, n, factorial;
// numberFactorialStr = prompt("Введите число для расчета факториала");
// numberFactorial = +numberFactorialStr;

// while(numberFactorial !== numberFactorial || numberFactorialStr === null || !numberFactorialStr.trim()) {
//     numberFactorialStr = prompt("Вы ввели не число, введите число:", 1);
//     numberFactorial = +numberFactorialStr;
// }

// n = 0;
// factorial = 1;
// while (n <= numberFactorial) {
//     if (numberFactorial === 0) {
//         factorial = 1;
//         break;
//     }
//     if (!n) { 
//         n++;
//         continue
//     };
//     factorial = factorial * n;
//     n++;
// }

// console.log ("Факториал числа = "+ factorial);




//№3------------------------------------------------------------------------------------------------------
 
// let numberDegreeStr, degreeStr, numberDegree, degree, result;
// numberDegreeStr = prompt("Введите число для возведения в степень:");
// numberDegree = +numberDegreeStr;

// while(numberDegree !== numberDegree || numberDegreeStr === null || !numberDegreeStr.trim()) {
//     numberDegreeStr = prompt("Вы ввели не число, введите число:", 1);
//     numberDegree = +numberDegreeStr;
// }

// degreeStr = prompt("Введите степень числа:");
// degree = +degreeStr;

// while(degree !== degree || degree === null || !degreeStr.trim()) {
//     degreeStr = prompt("Вы ввели не число, введите числовое значение степени:", 1);
//     degree = +degreeStr;
// }
// result = 1;
// for (let k = 0; k < degree; k++) {
//     result *= numberDegree;
// }

// console.log (`Число ${numberDegree} в степени ${degree} равно ${result}`);



//№4 ------------------------------------------------------------------------------------------------

// let numberGameStr, numberGame, rand;
// rand = Math.floor(1 + Math.random()*10);

// console.log ("Для быстрой проверки задания - загадано число = "+ rand);

// numberGameStr = prompt("Я загадал число, попробуй угадать, введи число от 1 до 10:");
// numberGame = +numberGameStr;

// while(numberGame !== numberGame || numberGameStr === null || !numberGameStr.trim()) {
//     numberGameStr = prompt("Вы ввели не число, введите число от 1 до 10:");
//     numberGame = +numberGameStr;
// }

// while (true) {
   
//     numberGameStr = prompt("Не угадал, попробуй снова, введи число от 1 до 10:");
//     numberGame = +numberGameStr;

//     while(numberGame !== numberGame || numberGameStr === null || !numberGameStr.trim()) {
//         numberGameStr = prompt("Вы ввели не число, введите число от 1 до 10:");
//         numberGame = +numberGameStr;
//     }

//     if (numberGame === rand) {
//         console.log ("Верно, ты угадал число, было загадано число "+rand);
//         break;
//     }
// }

//end ------------------------------------------------------------------------------------------------