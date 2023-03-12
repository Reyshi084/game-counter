"use strict";

// <-- parameter

const SPACE_STRING = "&ensp;"
const STUCK_DIGIT = 3;
const LUCK_DIGIT = 3;
const ENCOUNT_DIGIT = 3;
const RATE_DIGIT = 5;
const MIN_DIGIT = 3;
const MAX_DIGIT = 4;
const TOTAL_DIGIT = 5;
const DEFAULT_DROP = "1";

let isEncountFirst = false;

// -->

// <!-- module

const makeSpace = (digit, max) => {
    let text = "";
    for(let i = digit; i < max; i++) {
        text += SPACE_STRING;
    }
    return text;
}

const resetStuck = () => {
    const stuckText = document.getElementById("stuck");
    let innerText = "";
    innerText += makeSpace(1, STUCK_DIGIT);
    innerText += "0";
    stuckText.innerHTML = innerText;
};

const countStuck = () => {
    const stuckText = document.getElementById("stuck");
    const stuckNum = Number(stuckText.textContent);
    
    // エラー処理
    if(isNaN(stuckNum)) {
        stuckText.innerHTML = SPACE_STRING + SPACE_STRING + "0";
        return;
    }

    let innerNum = stuckNum;
    let innerText = "";

    // 数値の変更
    innerNum = Math.floor(innerNum);
    innerNum = Math.max(innerNum, 0);
    innerNum++;
    
    // 空白を入れた文字列の作成
    const digit = innerNum.toString().length;
    innerText += makeSpace(digit, STUCK_DIGIT);
    innerText += innerNum.toString();
    
    // 文字列の置換
    stuckText.innerHTML = innerText;
};

const countLuck = () => {
    const drop = prompt("ドロップ数を入力", DEFAULT_DROP);
    const dropNum = Number(drop);
    const luckText = document.getElementById("luck");
    const luckNum = Number(luckText.textContent);

    // エラー処理
    if(isNaN(drop)) {
        return;
    }
    if(isNaN(luckNum)) {
        luckText.innerHTML = SPACE_STRING + SPACE_STRING + "0";
        return;
    }

    // 値の更新
    const luckStr = Math.min(999, luckNum + dropNum).toString();
    const digit = luckStr.length;
    const innerText = makeSpace(digit, LUCK_DIGIT) + luckStr;
    luckText.innerHTML = innerText;
}

const countEncount = () => {
    const encountText = document.getElementById("encount");
    const encountNum = Number(encountText.textContent);
    
    // エラー処理
    if(isNaN(encountNum)) {
        encountText.innerHTML = SPACE_STRING + SPACE_STRING + "0";
        return;
    }

    let innerNum = encountNum;
    let innerText = "";

    // 数値の変更
    innerNum = Math.floor(innerNum);
    innerNum = Math.max(innerNum, 0);
    innerNum++;
    
    // 空白を入れた文字列の作成
    const digit = innerNum.toString().length;
    innerText += makeSpace(digit, ENCOUNT_DIGIT);
    innerText += innerNum.toString(); 
    // 文字列の置換
    encountText.innerHTML = innerText;
    isEncountFirst = true;
};

const countTotal = () => {
    const totalText = document.getElementById("total");
    const totalNum = Number(totalText.textContent);
    
    // エラー処理
    if(isNaN(totalNum)) {
        totalText.innerHTML = SPACE_STRING + SPACE_STRING + "0";
        return;
    }

    let innerNum = totalNum;
    let innerText = "";

    // 数値の変更
    innerNum = Math.floor(innerNum);
    innerNum = Math.max(innerNum, 0);
    innerNum++;
    
    // 空白を入れた文字列の作成
    const digit = innerNum.toString().length;
    innerText += makeSpace(digit, TOTAL_DIGIT);
    innerText += innerNum.toString();
    
    // 文字列の置換
    totalText.innerHTML = innerText;
};

const calcRate = () => {
    const totalText = document.getElementById("total");
    const totalNum = Number(totalText.textContent);
    const encountText = document.getElementById("encount");
    const encountNum = Number(encountText.textContent);
    const rateText = document.getElementById("rate");
    
    // エラー処理
    if(isNaN(totalNum) || isNaN(encountNum) || totalNum <= 0) {
        totalText.innerHTML = SPACE_STRING + SPACE_STRING + SPACE_STRING + SPACE_STRING + "0";
        encountText.innerHTML = SPACE_STRING + SPACE_STRING + "0";
        rateText.innerHTML = SPACE_STRING + "0.00";
        isEncountFirst = false;
        return;
    }

    // 小数点第２位まで求めて置換
    let innerText = "";
    const rate = ((Math.ceil(encountNum * 10000.0 / totalNum)) / 100.0).toFixed(2);
    const digit = rate.toString().length;
    innerText += makeSpace(digit, RATE_DIGIT);
    innerText += rate;
    rateText.innerHTML = innerText;
};

const checkMin = () => {
    const minText = document.getElementById("min");
    const minNum = Number(minText.textContent);
    const stuckText = document.getElementById("stuck");
    const stuckNum = Number(stuckText.textContent);

    // エラー処理
    if(isNaN(minNum) || isNaN(stuckNum)) {
        minText.innerHTML = SPACE_STRING + SPACE_STRING + "0";
        stuckText.innerHTML = SPACE_STRING + SPACE_STRING + "0";
        return;
    }

    // 値の比較・更新
    if(!isEncountFirst || minNum > stuckNum) { 
        const digit = stuckNum.toString().length;
        const innerText = makeSpace(digit, MIN_DIGIT) + stuckNum;
        minText.innerHTML = innerText;
    }
};

const checkMax = () => {
    const maxText = document.getElementById("max");
    const maxNum = Number(maxText.textContent);
    const stuckText = document.getElementById("stuck");
    const stuckNum = Number(stuckText.textContent);

    // エラー処理
    if(isNaN(maxNum) || isNaN(stuckNum)) {
        maxText.innerHTML = SPACE_STRING + SPACE_STRING + SPACE_STRING + "0";
        stuckText.innerHTML = SPACE_STRING + SPACE_STRING + "0";
        return;
    }

    // 値の比較・更新
    if(maxNum < stuckNum) {
        const digit = stuckNum.toString().length;
        const innerText = makeSpace(digit, MAX_DIGIT) + stuckNum;
        maxText.innerHTML = innerText;
    }
};

// -->

// <!-- event listener

const onClickLapButton = () => {
    countStuck();
    countTotal();
    checkMax();
    if(!isEncountFirst) {
        checkMin();
    }
    calcRate();
};

const onClickEncountButton = () => {
    countEncount();
    checkMin();
    calcRate();
    resetStuck();
    countLuck();
};

const onClickEditButton = () => {
    
};

const onClickResetButton = () => {
    
};

// -->

// onLoad
(() => {
    const lapButton = document.getElementById("btn-lap");
    lapButton.addEventListener("click", onClickLapButton);

    const encountButton = document.getElementById("btn-encount");
    encountButton.addEventListener("click", onClickEncountButton);
})();


