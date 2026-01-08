const chat = document.getElementById("chat"); //入力欄

//正解のデータ
let teacher = [];

//返答
const res = [
    "こんにちは！元気？",
    "それはよかった！",
    "またね！"
];

//ベクトル化

let input = [];

function embedding() {
    if (chat.value === "こんにちは") {
        input = [1, 0, 0]
        teacher = [1, 0, 0];
    } else if (chat.value === "元気") {
        input = [0, 1, 0];
        teacher = [0, 1, 0];
    } else if (chat.value === "さようなら") {
        input = [0, 0, 1];
        teacher = [0, 0, 1];
    } else {
        input = [0, 0, 0];
        teacher = [0, 0, 0];
    }
}

//シグモイド関数
function sigmoid(x) {
    if (x > 50) {
        return 1;
    }
    if (x < -50) {
        return 0;
    }
    return 1 / (1 + Math.exp(-x));
}

//重み・バイアス
let w1 = Math.random() * 2 - 1;
let w2 = Math.random() * 2 - 1;
let w3 = Math.random() * 2 - 1;
let w4 = Math.random() * 2 - 1;
let w5 = Math.random() * 2 - 1;
let w6 = Math.random() * 2 - 1;
let w7 = Math.random() * 2 - 1;
let w8 = Math.random() * 2 - 1;
let w9 = Math.random() * 2 - 1;
let bias1 = Math.random() * 2 - 1;
let bias2 = Math.random() * 2 - 1;
let bias3 = Math.random() * 2 - 1;

//出力層
let outputArray = []; //出力を保存

function output() {
    let res1 = sigmoid(input[0] * w1 + input[1] * w2 + input[2] * w3 + bias1);
    let res2 = sigmoid(input[0] * w4 + input[1] * w5 + input[2] * w6 + bias2);
    let res3 = sigmoid(input[0] * w7 + input[1] * w8 + input[2] * w9 + bias3);

    outputArray = [res1, res2, res3];
}

//誤差(学習進捗確認用)
let finalError;

function error() {
    let error1 = (teacher[0] - outputArray[0]) ** 2;
    let error2 = (teacher[1] - outputArray[1]) ** 2;
    let error3 = (teacher[2] - outputArray[2]) ** 2;
    finalError = error1 + error2 + error3;
}

//学習率
let lr = 0.5;

//重み・バイアスの更新
function update() {
    w1 = w1 + lr * (teacher[0] - outputArray[0]) * outputArray[0] * (1 - outputArray[0]) * input[0];
    w2 = w2 + lr * (teacher[1] - outputArray[1]) * outputArray[1] * (1 - outputArray[1]) * input[1];
    w3 = w3 + lr * (teacher[2] - outputArray[2]) * outputArray[2] * (1 - outputArray[2]) * input[2];
    w4 = w4 + lr * (teacher[0] - outputArray[0]) * outputArray[0] * (1 - outputArray[0]) * input[0];
    w5 = w5 + lr * (teacher[1] - outputArray[1]) * outputArray[1] * (1 - outputArray[1]) * input[1];
    w6 = w6 + lr * (teacher[2] - outputArray[2]) * outputArray[2] * (1 - outputArray[2]) * input[2];
    w7 = w7 + lr * (teacher[0] - outputArray[0]) * outputArray[0] * (1 - outputArray[0]) * input[0];
    w8 = w8 + lr * (teacher[1] - outputArray[1]) * outputArray[1] * (1 - outputArray[1]) * input[1];
    w9 = w9 + lr * (teacher[2] - outputArray[2]) * outputArray[2] * (1 - outputArray[2]) * input[2];
    bias1 = bias1 + lr * (teacher[0] - outputArray[0]) * outputArray[0] * (1 - outputArray[0]);
    bias2 = bias2 + lr * (teacher[1] - outputArray[1]) * outputArray[1] * (1 - outputArray[1]);
    bias3 = bias3 + lr * (teacher[2] - outputArray[2]) * outputArray[2] * (1 - outputArray[2]);
}

//テキスト表示
const text = document.getElementById("text");

//ループカウンター
let count = 0;

//epochループ
function epoch() {
    count++;

    outputArray = [];

    //あらかじめ3パターン学習させる
    const vals = ["こんにちは", "元気", "さようなら"];
    for (let val of vals) {
        chat.input = val;
        embedding();
        output();
        error();
        update();
    }

    if (count % 100 === 0) {
        console.log("epoch:", count, "finalError:", finalError);
    }

    if (count <= 1000) {
        requestAnimationFrame(epoch);
    }

    if (count === 1000) {
        //学習済みモデルにユーザー入力を渡す
        embedding();
        output();

        let maxValue = Math.max(...outputArray);
        let index = outputArray.indexOf(maxValue);
        text.textContent = res[index];
        
        //入力に影響が出ないように
        setTimeout(() => {
            chat.value = "";
        }, 0);
    }
}

const Btn = document.getElementById("Btn"); //チャット開始ボタン

Btn.addEventListener('click', () => {
    count = 0;
    epoch();
});