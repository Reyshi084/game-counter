"use strict";

// <-- parameter

const SPACE_STRING = "&ensp;";
const STUCK_DIGIT = 3;
const LUCK_DIGIT = 3;
const ENCOUNT_DIGIT = 3;
const RATE_DIGIT = 5;
const MIN_DIGIT = 3;
const MAX_DIGIT = 4;
const TOTAL_DIGIT = 5;
const EXLOSE_DIGIT = 5;
const TREASURE_NUM_DIGIT = 3;
const TREASURE_RATE_DIGIT = 5;
const LUCKRES_NUM_DIGIT = 3;
const LUCKRES_RATE_DIGIT = 5;

const DEFAULT_DROP = "1";
const MAX_SAVEDATA_NUM = 5;

let isEncount = false;
let isEditNow = false;
let nowData = 1;
let isZeroHamariMode = false;
let isKinkiMode = false;

// -->

// <!-- module

const makeSpace = (digit, max) => {
  let text = "";
  for (let i = digit; i < max; i++) {
    text += SPACE_STRING;
  }
  return text;
};

// １度でも遭遇したことがあるかどうか
const checkEncount = () => {
  return Boolean(Number(document.getElementById("encount").textContent));
};

// 総周回数の矛盾処理
const checkTotal = () => {
  const totalText = document.getElementById("total");
  const totalNum = Number(totalText.textContent);
  const stuckNum = Number(document.getElementById("stuck").textContent);
  if (totalNum < stuckNum) {
    const digit = stuckNum.toString().length;
    totalText.innerHTML = makeSpace(digit, TOTAL_DIGIT) + stuckNum.toString();
  }
};

const resetInfo = (id, digit) => {
  const text = document.getElementById(id);
  let innerText = "";
  innerText += makeSpace(1, digit);
  innerText += "0";
  text.innerHTML = innerText;
};

const resetTitle = () => {
  const title = document.getElementById("data-title");
  title.innerHTML = "EX" + nowData;
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

const resetExLose = () => {
  resetInfo("exlose", EXLOSE_DIGIT);
};

const resetTreasureNum = () => {
  resetInfo("treasure-num", TREASURE_NUM_DIGIT);
};

const resetTreasureRate = () => {
  const rateText = document.getElementById("treasure-rate");
  rateText.innerHTML = SPACE_STRING + "0.00";
};

const resetLuckresNum = () => {
  resetInfo("luckres-num", LUCKRES_NUM_DIGIT);
};

const resetLastDate = () => {
  const lastDateText = document.getElementById("last-date");
  lastDateText.innerHTML = "";
};

const resetLuckresRate = () => {
  const rateText = document.getElementById("luckres-rate");
  rateText.innerHTML = SPACE_STRING + "0.00";
};

const countStuck = () => {
  const stuckText = document.getElementById("stuck");
  const stuckNum = Number(stuckText.textContent);

  // エラー処理
  if (isNaN(stuckNum)) {
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

const countLuck = (drop) => {
  const dropNum = Number(drop);
  const luckText = document.getElementById("luck");
  const luckNum = Number(luckText.textContent);

  // エラー処理
  if (isNaN(drop)) {
    return;
  }
  if (isNaN(luckNum)) {
    resetLuck();
    return;
  }

  // 値の更新
  const luckStr = Math.min(999, luckNum + dropNum).toString();
  const digit = luckStr.length;
  const innerText = makeSpace(digit, LUCK_DIGIT) + luckStr;
  luckText.innerHTML = innerText;
};

const countTotal = () => {
  const totalText = document.getElementById("total");
  const totalNum = Number(totalText.textContent);

  // エラー処理
  if (isNaN(totalNum)) {
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

const countEncount = () => {
  const encountText = document.getElementById("encount");
  const encountNum = Number(encountText.textContent);

  // エラー処理
  if (isNaN(encountNum)) {
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
  isEncount = true;

  // 0ハマりモード時に総周回数をカウントする
  if (isZeroHamariMode) {
    countTotal();
  }
};

const countExLose = () => {
  const exloseText = document.getElementById("exlose");
  const exloseNum = Number(exloseText.textContent);

  // エラー処理
  if (isNaN(exloseNum)) {
    resetExLose();
    return;
  }

  let innerNum = exloseNum;
  let innerText = "";

  // 数値の変更
  innerNum = Math.floor(innerNum);
  innerNum = Math.max(innerNum, 0);
  innerNum++;

  // 空白を入れた文字列の作成
  const digit = innerNum.toString().length;
  innerText += makeSpace(digit, EXLOSE_DIGIT);
  innerText += innerNum.toString();

  // 文字列の置換
  exloseText.innerHTML = innerText;
};

const countTreasureNum = () => {
  const treasureNumText = document.getElementById("treasure-num");
  const treasureNum = Number(treasureNumText.textContent);

  // エラー処理
  if (isNaN(treasureNum)) {
    resetExLose();
    return;
  }

  let innerNum = treasureNum;
  let innerText = "";

  // 数値の変更
  innerNum = Math.floor(innerNum);
  innerNum = Math.max(innerNum, 0);
  innerNum++;

  // 空白を入れた文字列の作成
  const digit = innerNum.toString().length;
  innerText += makeSpace(digit, TREASURE_NUM_DIGIT);
  innerText += innerNum.toString();

  // 文字列の置換
  treasureNumText.innerHTML = innerText;
};

const changeTreasureNum = (treasureNum) => {
  const treasureNumText = document.getElementById("treasure-num");

  let innerNum = treasureNum;
  let innerText = "";

  innerNum = Math.floor(innerNum);
  innerNum = Math.max(innerNum, 0);

  // 空白を入れた文字列の作成
  const digit = innerNum.toString().length;
  innerText += makeSpace(digit, TREASURE_NUM_DIGIT);
  innerText += innerNum.toString();

  // 文字列の置換
  treasureNumText.innerHTML = innerText;
};

const countLuckresNum = () => {
  const luckresNumText = document.getElementById("luckres-num");
  const luckresNum = Number(luckresNumText.textContent);

  // エラー処理
  if (isNaN(luckresNum)) {
    resetExLose();
    return;
  }

  let innerNum = luckresNum;
  let innerText = "";

  // 数値の変更
  innerNum = Math.floor(innerNum);
  innerNum = Math.max(innerNum, 0);
  innerNum++;

  // 空白を入れた文字列の作成
  const digit = innerNum.toString().length;
  innerText += makeSpace(digit, LUCKRES_NUM_DIGIT);
  innerText += innerNum.toString();

  // 文字列の置換
  luckresNumText.innerHTML = innerText;
};

const calcEncountRate = () => {
  const totalText = document.getElementById("total");
  const totalNum = Number(totalText.textContent);
  const encountText = document.getElementById("encount");
  const encountNum = Number(encountText.textContent);
  const rateText = document.getElementById("rate");

  // エラー処理
  if (totalNum <= 0) {
    resetTotal();
    resetRate();
    isEncount = false;
    return;
  }

  // 小数点第２位まで求めて置換
  let innerText = "";
  const rate = (Math.ceil((encountNum * 10000.0) / totalNum) / 100.0).toFixed(
    2
  );
  const digit = rate.toString().length;
  innerText += makeSpace(digit, RATE_DIGIT);
  innerText += rate;
  rateText.innerHTML = innerText;
};

const calcTreasureRate = () => {
  const exloseText = document.getElementById("exlose");
  const exloseNum = Number(exloseText.textContent);
  const encountText = document.getElementById("encount");
  const encountNum = Number(encountText.textContent);
  const treasureNumText = document.getElementById("treasure-num");
  const treasureNum = Number(treasureNumText.textContent);
  const rateText = document.getElementById("treasure-rate");

  // 小数点第２位まで求めて置換
  let innerText = "";
  let rate;
  if (encountNum - exloseNum === 0) {
    rate = 0;
    rate = rate.toFixed(2);
  } else {
    rate = (
      Math.ceil((treasureNum * 10000.0) / (encountNum - exloseNum)) / 100.0
    ).toFixed(2);
  }
  const digit = rate.toString().length;
  innerText += makeSpace(digit, TREASURE_RATE_DIGIT);
  innerText += rate;
  rateText.innerHTML = innerText;
};

const calcLuckresRate = () => {
  const luckresNumText = document.getElementById("luckres-num");
  const luckresNum = Number(luckresNumText.textContent);
  const encountText = document.getElementById("encount");
  const encountNum = Number(encountText.textContent);
  const exloseText = document.getElementById("exlose");
  const exloseNum = Number(exloseText.textContent);
  const rateText = document.getElementById("luckres-rate");

  // 小数点第２位まで求めて置換
  let innerText = "";
  let rate;
  if (encountNum === 0) {
    rate = 0;
    rate = rate.toFixed(2);
  } else {
    rate = (
      Math.ceil((luckresNum * 10000.0) / (encountNum - exloseNum)) / 100.0
    ).toFixed(2);
  }
  const digit = rate.toString().length;
  innerText += makeSpace(digit, LUCKRES_RATE_DIGIT);
  innerText += rate;
  rateText.innerHTML = innerText;
};

const checkMin = () => {
  const minText = document.getElementById("min");
  const minNum = Number(minText.textContent);
  const stuckText = document.getElementById("stuck");
  const stuckNum = Number(stuckText.textContent);

  // エラー処理
  if (isNaN(minNum) || isNaN(stuckNum)) {
    resetMin();
    resetStuck();
    return;
  }

  // 値の比較・更新
  if (!isEncount || minNum > stuckNum) {
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
  if (isNaN(maxNum) || isNaN(stuckNum)) {
    resetMax();
    resetStuck();
    return;
  }

  // 値の比較・更新
  if (maxNum < stuckNum) {
    const digit = stuckNum.toString().length;
    const innerText = makeSpace(digit, MAX_DIGIT) + stuckNum;
    maxText.innerHTML = innerText;
  }
};

const setInputTitle = () => {
  const titleElem = document.getElementById("data-title");
  const content = titleElem.textContent;
  titleElem.innerHTML = "";
  const inputElem = document.createElement("input");
  inputElem.value = content;
  inputElem.size = 10;
  inputElem.id = "title-input";
  titleElem.appendChild(inputElem);
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

const removeInputTitle = () => {
  const inputElem = document.getElementById("title-input");
  const titleElem = document.getElementById("data-title");
  let content = inputElem.value;
  if (content === "") {
    content = "EX" + nowData;
  }
  titleElem.textContent = content;
};

const removeInput = (id, maxDigit) => {
  const inputElem = document.getElementById(id + "-input");
  const textElem = document.getElementById(id);
  let content = Number(inputElem.value);
  if (isNaN(content) || content < 0) {
    content = 0;
  }
  const digit = content.toString().length;
  textElem.innerHTML = makeSpace(digit, maxDigit) + content;
};

const displayKinkiInfo = () => {
  const treasureTr = document.getElementById("treasure");
  const luckresTr = document.getElementById("luckres");

  treasureTr.style.display = "";
  luckresTr.style.display = "";
};

const hideKinkiInfo = () => {
  const treasureTr = document.getElementById("treasure");
  const luckresTr = document.getElementById("luckres");

  treasureTr.style.display = "none";
  luckresTr.style.display = "none";
};

const displayTreasureCalcButton = () => {
  const treasureBtn = document.getElementById("precise-calc");
  treasureBtn.style.display = "";
};

const hideTreasureCalcButton = () => {
  const treasureBtn = document.getElementById("precise-calc");
  treasureBtn.style.display = "none";
};

const saveInfo = (id, dataNum) => {
  localStorage.setItem(
    id + dataNum,
    Number(document.getElementById(id).innerHTML)
  );
};

const saveTitle = () => {
  localStorage.setItem(
    "title" + nowData,
    document.getElementById("data-title").textContent
  );
};

const saveKinkiMode = () => {
  localStorage.setItem("kinkimode" + nowData, isKinkiMode.toString());
};

const saveZeroHamariMode = () => {
  localStorage.setItem("zerohamari-mode", isZeroHamariMode.toString());
};

const saveLastDate = (dateStr) => {
  localStorage.setItem("last-date" + nowData, dateStr);
};

const saveAllInfo = (dataNum) => {
  saveTitle();
  saveInfo("stuck", dataNum);
  saveInfo("luck", dataNum);
  saveInfo("encount", dataNum);
  saveInfo("min", dataNum);
  saveInfo("max", dataNum);
  saveInfo("total", dataNum);
  saveInfo("exlose", dataNum);
  saveInfo("treasure-num", dataNum);
  saveInfo("luckres-num", dataNum);
  saveZeroHamariMode();
  saveKinkiMode();
};

const loadInfo = (id, dataNum, digitRange) => {
  const data = Number(localStorage.getItem(id + dataNum));
  const digit = data.toString().length;
  document.getElementById(id).innerHTML =
    makeSpace(digit, digitRange) + data.toString();
};

const loadTitle = () => {
  let data = localStorage.getItem("title" + nowData);
  if (!data) {
    data = "EX" + nowData;
  }
  document.getElementById("data-title").textContent = data;
};

const loadKinkiMode = () => {
  isKinkiMode = localStorage.getItem("kinkimode" + nowData) === "true";
  const kinkiCheckBox = document.getElementById("kinki-mode");
  // 初期状態の変更
  if (isKinkiMode) {
    displayKinkiInfo();
    kinkiCheckBox.checked = true;
  } else {
    hideKinkiInfo();
    kinkiCheckBox.checked = false;
  }
};

const loadZeroHamariMode = () => {
  isZeroHamariMode = localStorage.getItem("zerohamari-mode") === "true";
  const zeroHamariCheckBox = document.getElementById("zerohamari-mode");
  // 初期状態の変更
  if (isZeroHamariMode) {
    zeroHamariCheckBox.checked = true;
  } else {
    zeroHamariCheckBox.checked = false;
  }
};

const loadLastDate = () => {
  const lastDateText = document.getElementById("last-date");
  const lastDateStr = localStorage.getItem("last-date" + nowData);
  // データが存在しない時
  if (lastDateStr === null) {
    lastDateText.innerHTML = "";
    return;
  }
  lastDateText.innerHTML = lastDateStr;
};

const loadAllInfo = (dataNum) => {
  loadTitle();
  loadInfo("stuck", dataNum, STUCK_DIGIT);
  loadInfo("luck", dataNum, LUCK_DIGIT);
  loadInfo("encount", dataNum, ENCOUNT_DIGIT);
  loadInfo("min", dataNum, MIN_DIGIT);
  loadInfo("max", dataNum, MAX_DIGIT);
  loadInfo("total", dataNum, TOTAL_DIGIT);
  loadInfo("exlose", dataNum, EXLOSE_DIGIT);
  loadInfo("treasure-num", dataNum, TREASURE_NUM_DIGIT);
  loadInfo("luckres-num", dataNum, LUCKRES_NUM_DIGIT);
  loadZeroHamariMode();
  loadKinkiMode();
  loadLastDate();
  isEncount = checkEncount();
  checkTotal();
};

const updateLastDate = () => {
  const dateText = document.getElementById("last-date");
  const nowDate = new Date();
  const year = nowDate.getFullYear();
  const month = ("00" + (nowDate.getMonth() + 1)).slice(-2);
  const day = ("00" + nowDate.getDate()).slice(-2);
  const hour = ("00" + nowDate.getHours()).slice(-2);
  const min = ("00" + nowDate.getMinutes()).slice(-2);
  const result =
    "(" + year + "/" + month + "/" + day + " " + hour + ":" + min + ")";
  dateText.innerHTML = result;

  saveLastDate(result);
};

const displayZeroHamariPopup = () => {
  alert(
    "遭遇ボタンを押すと総周回数がカウントされるようになります。\nEXステージ出現時には周回ボタンを押さず、クエスト終了時に遭遇ボタンを押すようにしてください。"
  );
};

const convertBase64ToSavedata = (bdata) => {
  try {
    const data = JSON.parse(decodeURIComponent(atob(bdata)));
    return data?.is_savedata === true ? data : false;
  } catch (e) {
    return false;
  }
};

const convertSavedataToBase64 = () => {
  try {
    return btoa(
      encodeURIComponent(
        JSON.stringify({
          title: localStorage.getItem("title" + nowData),
          stuck: localStorage.getItem("stuck" + nowData),
          luck: localStorage.getItem("luck" + nowData),
          encount: localStorage.getItem("encount" + nowData),
          min: localStorage.getItem("min" + nowData),
          max: localStorage.getItem("max" + nowData),
          total: localStorage.getItem("total" + nowData),
          exlose: localStorage.getItem("exlose" + nowData),
          treasure_num: localStorage.getItem("treasure-num" + nowData),
          luckres_num: localStorage.getItem("luckres-num" + nowData),
          kinkimode: localStorage.getItem("kinkimode" + nowData),
          last_date: localStorage.getItem("last-date" + nowData),
          is_savedata: true
        })
      )
    );
  } catch (e) {
    window.alert("バックアップを取得できませんでした");
    return false;
  }
};

// -->

// <!-- event listener

const onClickLapButton = () => {
  if (isEditNow) {
    return;
  }
  countStuck();
  countTotal();
  checkMax();
  if (!isEncount) {
    checkMin();
  }
  calcEncountRate();
  updateLastDate();
  saveAllInfo(nowData);
};

const onClickEncountButton = () => {
  if (isEditNow) {
    return;
  }
  const drop = prompt(
    "ドロップ数を入力（負けてしまった場合は0を入力してください）",
    DEFAULT_DROP
  );
  // キャンセルボタンが押されたとき
  if (drop === null) {
    return;
  }
  countEncount();
  checkMin();

  resetStuck();
  countLuck(drop);
  if (drop === "0") {
    countExLose();
  } else if (drop === "2" && isKinkiMode) {
    countTreasureNum();
  } else if (drop > 2 && isKinkiMode) {
    countLuckresNum();
    const isTreasure = confirm("至宝が発動した場合は[OK]を押してください");
    if (isTreasure) {
      countTreasureNum();
    }
  }
  calcEncountRate();
  calcLuckresRate();
  calcTreasureRate();
  updateLastDate();
  saveAllInfo(nowData);
};

const onClickEditButton = () => {
  // ボタン名変更
  const editButton = document.getElementById("btn-edit");
  const lapButton = document.getElementById("btn-lap");
  const encountButton = document.getElementById("btn-encount");
  const resetButton = document.getElementById("btn-reset");

  if (isEditNow) {
    editButton.innerHTML = "編集";
    editButton.style.color = "black";
    lapButton.style.color = "black";
    encountButton.style.color = "black";
    resetButton.style.color = "black";

    // inputをもどす
    removeInputTitle();
    removeInput("stuck", STUCK_DIGIT);
    removeInput("luck", LUCK_DIGIT);
    removeInput("encount", ENCOUNT_DIGIT);
    removeInput("min", MIN_DIGIT);
    removeInput("max", MAX_DIGIT);
    removeInput("total", TOTAL_DIGIT);
    removeInput("exlose", EXLOSE_DIGIT);
    removeInput("treasure-num", TREASURE_NUM_DIGIT);
    removeInput("luckres-num", LUCKRES_NUM_DIGIT);
    hideTreasureCalcButton();
    isEditNow = false;

    // 更新後の処理
    isEncount = checkEncount();
    checkTotal();
    calcEncountRate();
    calcLuckresRate();
    calcTreasureRate();
    saveAllInfo(nowData);
  } else {
    editButton.innerHTML = "完了";
    editButton.style.color = "red";
    lapButton.style.color = "gray";
    encountButton.style.color = "gray";
    resetButton.style.color = "gray";

    // inputをつける
    setInputTitle();
    setInput("stuck");
    setInput("luck");
    setInput("encount");
    setInput("min");
    setInput("max");
    setInput("total");
    setInput("exlose");
    setInput("treasure-num");
    setInput("luckres-num");
    if (isKinkiMode) {
      displayTreasureCalcButton();
    }
    isEditNow = true;
  }
};

const onClickResetButton = () => {
  if (isEditNow) {
    return;
  }
  const isConfirm = window.confirm(
    "データ" + nowData + "をリセットします。よろしいですか？"
  );
  if (isConfirm) {
    resetTitle();
    resetStuck();
    resetLuck();
    resetEncount();
    resetRate();
    resetMin();
    resetMax();
    resetTotal();
    resetExLose();
    resetTreasureNum();
    resetTreasureRate();
    resetLuckresNum();
    resetLuckresRate();
    resetLastDate();
    isEncount = false;
    saveAllInfo(nowData);
    saveLastDate("");
  }
};

const onClickKinkiCheckBox = () => {
  isKinkiMode = !isKinkiMode;
  if (isKinkiMode) {
    displayKinkiInfo();
    // 編集状態でモードが変更された場合（設定）
    if (isEditNow) {
      displayTreasureCalcButton();
    }
  } else {
    hideKinkiInfo();
    // 編集状態でモードが変更された場合（解除）
    if (isEditNow) {
      hideTreasureCalcButton();
    }
  }
  saveAllInfo(nowData);
};

const onClickZeroHamariCheckBox = () => {
  isZeroHamariMode = !isZeroHamariMode;
  if (isZeroHamariMode) {
    displayZeroHamariPopup();
  }
  saveAllInfo(nowData);
};

const onClickTreasureCalcButton = () => {
  const conf = confirm(
    "至宝発動数以外の情報を入力した状態で[OK]を押して次に進んでください"
  );
  if (!conf) {
    return;
  }

  // 必要な値をinputから取得
  const luckresNum = Number(document.getElementById("luckres-num-input").value);
  const luck = Number(document.getElementById("luck-input").value);
  const encount = Number(document.getElementById("encount-input").value);
  const exlose = Number(document.getElementById("exlose-input").value);

  // ラキリザが0の場合は即決定
  if (luckresNum === 0) {
    onClickEditButton();
    changeTreasureNum(luck - (encount - exlose));
    calcTreasureRate();
    return;
  }

  // ラキリザ合計ドロップ数
  const retTotal = prompt(
    "全" + luckresNum + "回のラキリザで合計何ドロップしたか入力"
  );
  if (retTotal === null) {
    return;
  }
  const luckresTotalLuck = Number(retTotal);

  // ラキリザ合計至宝発動数
  const retTreasure = prompt(
    "全" + luckresNum + "回のラキリザのうち何回至宝が発動したか入力"
  );
  if (retTreasure === null) {
    return;
  }
  const luckresTotalTreasureNum = Number(retTreasure);

  // 計算
  onClickEditButton();
  changeTreasureNum(
    luck -
      luckresTotalLuck -
      (encount - luckresNum - exlose) +
      luckresTotalTreasureNum
  );
  calcTreasureRate();
  saveAllInfo(nowData);
};

const onClickExportDataButton = () => {
  if (isEditNow) {
    window.alert("編集中はバックアップの作成ができません");
    return;
  }

  saveAllInfo(nowData);
  const bdata = convertSavedataToBase64();
  navigator.clipboard.writeText(bdata).then(() => {
    window.alert(
      `クリップボードに"DATA${nowData}"のバックアップデータをコピーしました`
    );
  });
};

const onClickImportDataButton = () => {
  const bdata = prompt(
    `バックアップデータをペーストしてください\n※注意: 現在表示されている"DATA${nowData}"に上書きされます`
  );
  if (bdata === null) {
    return;
  }

  const data = convertBase64ToSavedata(bdata);
  if (!data) {
    window.alert("正しいバックアップデータではありません");
  } else {
    localStorage.setItem("title" + nowData, data.title);
    localStorage.setItem("stuck" + nowData, data.stuck);
    localStorage.setItem("luck" + nowData, data.luck);
    localStorage.setItem("encount" + nowData, data.encount);
    localStorage.setItem("min" + nowData, data.min);
    localStorage.setItem("max" + nowData, data.max);
    localStorage.setItem("total" + nowData, data.total);
    localStorage.setItem("exlose" + nowData, data.exlose);
    localStorage.setItem("treasure-num" + nowData, data.treasure_num);
    localStorage.setItem("luckres-num" + nowData, data.luckres_num);
    localStorage.setItem("kinkimode" + nowData, data.kinkimode);
    localStorage.setItem("last-date" + nowData, data.last_date);

    loadAllInfo(nowData);
    calcEncountRate();
    calcLuckresRate();
    calcTreasureRate();
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

  const zeroHamariCheckBox = document.getElementById("zerohamari-mode");
  zeroHamariCheckBox.addEventListener("change", onClickZeroHamariCheckBox);

  const kinkiCheckBox = document.getElementById("kinki-mode");
  kinkiCheckBox.addEventListener("change", onClickKinkiCheckBox);

  const treasureCalcButton = document.getElementById("btn-treasure-calc");
  treasureCalcButton.addEventListener("click", onClickTreasureCalcButton);

  const importSavedataButton = document.getElementById("btn-import-bdata");
  importSavedataButton.addEventListener("click", onClickImportDataButton);

  const exportSavedataButton = document.getElementById("btn-export-bdata");
  exportSavedataButton.addEventListener("click", onClickExportDataButton);

  // セーブデータの切り替え
  for (let i = 1; i <= MAX_SAVEDATA_NUM; i++) {
    const savedataButton = document.getElementById("btn-save-" + i);
    savedataButton.addEventListener("click", () => {
      if (isEditNow) {
        onClickEditButton();
      }
      nowData = i;
      document.getElementById("now-data").innerHTML = nowData;
      loadAllInfo(nowData);
      calcEncountRate();
      calcLuckresRate();
      calcTreasureRate();
      localStorage.setItem("last-data", nowData);
    });
  }
  hideTreasureCalcButton();
  let lastData = localStorage.getItem("last-data");
  nowData = lastData ? lastData : 1;
  document.getElementById("now-data").innerHTML = nowData;
  loadAllInfo(nowData);
  calcEncountRate();
  calcLuckresRate();
  calcTreasureRate();
})();
