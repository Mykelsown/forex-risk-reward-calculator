"use-strict";

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////// F // O // R // E // X //////////////////////////
///// C // A // L // C // U // L // A // T // O // R ///////////
///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// GETTING ALL THE ELEMENT THAT REQUIRES DOM MANIPULATIONscript.js
// inputs boxes selection
const inputAccBal = document.getElementById("accbalance");
const inputRiskPercentage = document.getElementById("riskPercent");
const inputCurrency = document.getElementById("currencyPair");
const currencyOptions = document.querySelectorAll(".pairs");
const inputEntry = document.getElementById("entry");
const inputStopLoss = document.getElementById("stoploss");
const inputTakeProfit = document.getElementById("takeprofit");

// Buttons selection
const btnCalculate = document.querySelector(".calculate__btn");
const btnReset = document.querySelector(".reset__btn");

// Display Result Element
const displayRiskInDollars = document.querySelector(".risk-in-dollars");
const displayRiskInPips = document.querySelector(".risk-in-pips");
const displayRewardInDollars = document.querySelector(".reward-in-dollars");
const displayRewardInPips = document.querySelector(".reward-in-pips");
const displayRiskRewardRatioInNum = document.querySelector(".r-r-r-num");
const displayRiskRewardRatioInBarRed = document.querySelector(".r-r-r-red-bar");
const displayRiskRewardRatioInBarGreen =
  document.querySelector(".r-r-r-green-bar");
const displayLotSize = document.querySelector(".lot-size");
const displayUnitSize = document.querySelector(".unit-size");
const displayShortDirection = document.querySelector(".direction-short");
const displayLongDirection = document.querySelector(".direction-long");
const displayBarMovement = document.querySelector(".r-r-r-bar");

// update style
const updatedAccBalstyle = document.querySelector(".accbalance-text");
const updatedRiskPercentagestyle = document.querySelector(
  ".risk-percentage-text"
);
const updatedCurrencystyle = document.querySelector(".currency-pair-text");

// calculate and displays result to the interface
const calcResults = function () {
  const accountBalance = +inputAccBal.value;
  const riskPercentage = +inputRiskPercentage.value;
  const instrument = inputCurrency.value;
  const entry = +inputEntry.value;
  const stopLoss = +inputStopLoss.value;
  const takeProfit = +inputTakeProfit.value;

  // Validate inputs
  function validateInput() {
    if (
      accountBalance === 0 ||
      riskPercentage === 0 ||
      instrument === "" ||
      entry === 0 ||
      stopLoss === 0 ||
      takeProfit === 0
    )
      return false;

    return true;
  }
  if (!validateInput()) alert("Invalid Inputs");

  if (instrument === "JPY/USD") {
    // Calculate Stop Loss Distance
    const slDistance = Math.abs(entry - stopLoss) * 100;
    console.log(slDistance);

    // Calculate Take Profit Distance
    const tpDistance = Math.abs(takeProfit - entry) * 100;
  }

  // Calculate Risk Amount
  const riskAmount = accountBalance * (riskPercentage / 100);

  // Calculate Stop Loss Distance
  const slDistance = Math.abs(entry - stopLoss) * 10000;
  console.log(slDistance);

  // Calculate Take Profit Distance
  const tpDistance = Math.abs(takeProfit - entry) * 10000;

  // Calculate Risk-to-Reward Ratio
  const rrr = tpDistance / slDistance;

  // Calculate Reward Amount
  const rewardAmount = rrr * riskAmount;

  // Calculate Position Size (Lot Size)
  const lotSize = riskAmount / (slDistance * 10);

  // Calculate Unit Size
  const unitSize = lotSize * 100_000;

  // Determine Trade Direction
  function isBuy() {
    if (stopLoss < entry && takeProfit > entry) return 1;
    else if (stopLoss > entry && takeProfit < entry) return 0;
    else return alert("Enter a valid Setup");
  }

  if (isBuy() === 1) {
    displayLongDirection.style.display = "block";
    displayShortDirection.style.display = "none";
  } else if (isBuy() === 0) {
    displayShortDirection.style.display = "block";
    displayLongDirection.style.display = "none";
  }

  // Update UI
  function updateInterface() {
    if (validateInput()) {
      displayRiskInDollars.textContent = `${riskAmount.toFixed(2)}`;
      displayRiskInPips.textContent = `${slDistance.toFixed(2)} pips`;
      displayRewardInDollars.textContent = `${rewardAmount.toFixed(2)}`;
      displayRewardInPips.textContent = `${tpDistance.toFixed(2)} pips`;
      displayRiskRewardRatioInNum.textContent = `1 : ${
        rrr <= 9 ? rrr.toFixed(2) : rrr.toFixed()
      }`;
      displayLotSize.textContent = `${lotSize.toFixed(2)} Lots`;
      displayUnitSize.textContent = `(${unitSize.toFixed()} units)`;

      displayBarMovement.innerHTML = "";

      const rrrBarMovement = `<div class="r-r-r-red-bar bg-red-500 h-3 flex-[1] rounded-l-lg -mr-1"></div>
              <div class="r-r-r-green-bar bg-green-500 h-3 flex-[${rrr.toFixed(
                2
              )}] rounded-r-lg"></div>`;

      displayBarMovement.insertAdjacentHTML("afterbegin", rrrBarMovement);
    }
  }
  updateInterface();
};
btnCalculate.addEventListener("click", calcResults);

// Implementing The Reset Button
const reloadData = function () {
  const accountBalance = (inputAccBal.value = "");
  const riskPercentage = (inputRiskPercentage.value = "");
  const entry = (inputEntry.value = "");
  const stopLoss = (inputStopLoss.value = "");
  const takeProfit = (inputTakeProfit.value = "");

  // clearing the result interface
  function clearingInterface() {
    displayRiskInDollars.textContent = `$0.00`;
    displayRiskInPips.textContent = `0.00 pips`;
    displayRewardInDollars.textContent = `$0.00`;
    displayRewardInPips.textContent = `0.00 pips`;
    displayRiskRewardRatioInNum.textContent = `1 : 0`;
    displayLotSize.textContent = `0.00 Lots`;
    displayUnitSize.textContent = `(0 units)`;
    displayShortDirection.style.display = "none";
    displayLongDirection.style.display = "none";

    displayBarMovement.innerHTML = "";

    const rrrBarMovementReloaded = `<div class="r-r-r-red-bar bg-red-500 h-3 flex-[1] rounded-l-lg -mr-1"></div>
              <div class="r-r-r-green-bar bg-gray-500 h-3 flex-[4] rounded-r-lg"></div>`;

    displayBarMovement.insertAdjacentHTML("afterbegin", rrrBarMovementReloaded);
  }
  clearingInterface();
};
btnReset.addEventListener("click", reloadData);

const styleAccBalanceUi = function () {
  updatedAccBalstyle.style.color = "#3385FF";
};
const styleRiskPercentageUi = function () {
  updatedRiskPercentagestyle.style.color = "#3385FF";
};
const styleCurrencyUi = function () {
  updatedCurrencystyle.style.color = "#3385FF";
};

const restoreStyleAccBal = function () {
  updatedAccBalstyle.style.color = "oklch(87.2% 0.01 258.338)";
};
const restoreStyleRisk = function () {
  updatedRiskPercentagestyle.style.color = "oklch(87.2% 0.01 258.338)";
};
const restoreStyleCurrency = function () {
  updatedCurrencystyle.style.color = "oklch(87.2% 0.01 258.338)";
};

inputAccBal.addEventListener("focus", styleAccBalanceUi);
inputAccBal.addEventListener("blur", restoreStyleAccBal);
inputRiskPercentage.addEventListener("focus", styleRiskPercentageUi);
inputRiskPercentage.addEventListener("blur", restoreStyleRisk);
inputCurrency.addEventListener("focus", styleCurrencyUi);
inputCurrency.addEventListener("blur", restoreStyleCurrency);
