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

let isEncounted = false;
let isEditNow = false;
let nowData = 1;

// -->

// <!-- module

const makeSpace = (digit, max) => {
    let text = "";
    for(let i = digit; i < max; i++) {
        text += SPACE_STRING;
    }
    return text;
};


const resetInfo = (id, digit) => {
    const text = document.getElementById(id);
    let innerText = "";
    innerText += makeSpace(1, digit);
    innerText += "0";
    text.innerHTML = innerText;
};

const resetStuck = () => {
    resetInfo("stuck", STUCK_DIGIT);
};

const resetLuck = () => {
    resetInfo("luck", LUCK_DIGIT);
};

const resetEncount = () => {
    resetInfo("encount", ENCOUNT_DIGIT);
};

const resetRate = () => {
    const rateText = document.getElementById("rate");
    rateText.innerHTML = SPACE_STRING + "0.00";
};

const resetMin = () => {
    resetInfo("min", MIN_DIGIT);
};

const resetMax = () => {
    resetInfo("max", MAX_DIGIT);
};

const resetTotal = () => {
    resetInfo("total", TOTAL_DIGIT);
};


const countStuck = () => {
    const stuckText = document.getElementById("stuck");
    const stuckNum = Number(stuckText.textContent);
    
    // エラー処理
    if(isNaN(stuckNum)) {
        resetStuck();
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
        resetLuck();
        return;
    }

    // 値の更新
    const luckStr = Math.min(999, luckNum + dropNum).toString();
    const digit = luckStr.length;
    const innerText = makeSpace(digit, LUCK_DIGIT) + luckStr;
    luckText.innerHTML = innerText;
};

const countEncount = () => {
    const encountText = document.getElementById("encount");
    const encountNum = Number(encountText.textContent);
    
    // エラー処理
    if(isNaN(encountNum)) {
        resetEncount();
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
    isEncounted = true;
};

const countTotal = () => {
    const totalText = document.getElementById("total");
    const totalNum = Number(totalText.textContent);
    
    // エラー処理
    if(isNaN(totalNum)) {
        resetTotal();
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
        resetTotal();
        resetEncount();
        resetRate();
        isEncounted = false;
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
        resetMin();
        resetStuck();
        return;
    }

    // 値の比較・更新
    if(!isEncounted || minNum > stuckNum) { 
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
        resetMax();
        resetStuck();
        return;
    }

    // 値の比較・更新
    if(maxNum < stuckNum) {
        const digit = stuckNum.toString().length;
        const innerText = makeSpace(digit, MAX_DIGIT) + stuckNum;
        maxText.innerHTML = innerText;
    }
};

const setInput = (id) => {
    const textElem = document.getElementById(id);
    const content = Number(textElem.textContent);
    textElem.innerHTML = "";
    const inputElem = document.createElement("input");
    inputElem.value = content;
    inputElem.size = 3;
    inputElem.id = id + "-input";
    textElem.appendChild(inputElem);
};

const removeInput = (id, maxDigit) => {
    const inputElem = document.getElementById(id + "-input");
    const textElem = document.getElementById(id);
    let content = Number(inputElem.value);
    if(isNaN(content) || content < 0) {
        content = 0;
    }
    const digit = content.toString().length;
    textElem.innerHTML = makeSpace(digit, maxDigit) + content;
};

const saveInfo = (id, dataNum) => {
    localStorage.setItem(id + dataNum, Number(document.getElementById(id).innerHTML));
};

const saveAllInfo = (dataNum) => {
    saveInfo("stuck", dataNum);
    saveInfo("luck", dataNum);
    saveInfo("encount", dataNum);
    saveInfo("min", dataNum);
    saveInfo("max", dataNum);
    saveInfo("total", dataNum);
};

const loadInfo = (id, dataNum, digitRange) => {
    const data = Number(localStorage.getItem(id + dataNum));
    const digit = data.toString().length;
    document.getElementById(id).innerHTML = makeSpace(digit, digitRange) + data.toString();
};

const loadAllInfo = (dataNum) => {
    loadInfo("stuck", dataNum, STUCK_DIGIT);
    loadInfo("luck", dataNum, LUCK_DIGIT);
    loadInfo("encount", dataNum, ENCOUNT_DIGIT);
    loadInfo("min", dataNum, MIN_DIGIT);
    loadInfo("max", dataNum, MAX_DIGIT);
    loadInfo("total", dataNum, TOTAL_DIGIT);
    isEncounted = Boolean(Number(document.getElementById("encount").textContent));
};

// -->

// <!-- event listener

const onClickLapButton = () => {
    if(isEditNow) {
        return;
    }
    countStuck();
    countTotal();
    checkMax();
    if(!isEncounted) {
        checkMin();
    }
    calcRate();
    saveAllInfo(nowData);
};

const onClickEncountButton = () => {
    if(isEditNow) {
        return;
    }
    countEncount();
    checkMin();
    calcRate();
    resetStuck();
    countLuck();
    saveAllInfo(nowData);
};

const onClickEditButton = () => {
    // ボタン名変更
    const editButton = document.getElementById("btn-edit");
    if(isEditNow) {
        editButton.innerHTML = "編集";
        editButton.style.color = "black";
        // inputをもどす
        removeInput("stuck", STUCK_DIGIT);
        removeInput("luck", LUCK_DIGIT);
        removeInput("encount", ENCOUNT_DIGIT);
        removeInput("min", MIN_DIGIT);
        removeInput("max", MAX_DIGIT);
        removeInput("total", TOTAL_DIGIT);
        isEditNow = false;

        isEncounted = true;
        calcRate();
        saveAllInfo(nowData);
    } else {
        editButton.innerHTML = "完了";
        editButton.style.color = "red";
        // inputをつける
        setInput("stuck");
        setInput("luck");
        setInput("encount");
        setInput("min");
        setInput("max");
        setInput("total");
        isEditNow = true;
    }
};

const onClickResetButton = () => {
    if(isEditNow) {
        return;
    }
    const isConfirm = window.confirm("すべてのデータをリセットします。よろしいですか？");
    if(isConfirm) {
        resetStuck();
        resetLuck();
        resetEncount();
        resetRate();
        resetMin();
        resetMax();
        resetTotal();
        isEncounted = false;
        localStorage.clear();
    }
};

// -->

// onLoad
(() => {
    const lapButton = document.getElementById("btn-lap");
    lapButton.addEventListener("click", onClickLapButton);

    const encountButton = document.getElementById("btn-encount");
    encountButton.addEventListener("click", onClickEncountButton);

    const editButton = document.getElementById("btn-edit");
    editButton.addEventListener("click", onClickEditButton);

    const resetButton = document.getElementById("btn-reset");
    resetButton.addEventListener("click", onClickResetButton);

    loadAllInfo(1);
})();


