// let ran_num = Math.random();
// 函数表达式

const hongbao = (total, num) =>{
    const arr = [];
    //定义计算变量
    let restAmout = total,
        restNum = num;

    for(let i = 0; i < num-1; i++){
        //前n-1发随机 *2两倍区间
        let amount = Math.random()*((restAmout/restNum)*2 - 0).toFixed(2);
        restAmout -= amount;
        restNum--;
        arr.push(amount);
    }
    arr.push(restAmout.toFixed(2));
    return arr;
}

const arr = hongbao(20, 47);
console.log(arr)