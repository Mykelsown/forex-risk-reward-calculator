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
const updateDollarIcon = document.querySelector(".dollar-icon");
const updateRiskPercentageicon = document.querySelector(
  ".risk-percentage-icon"
);
const updateCurrencyIcon = document.querySelector(".currency-icon");

// change mode
const lightAndDarkCont = document.querySelector(".light-n-dark-cont");
const lightModeElement = document.querySelector(".light-mode");
const lightModeIcon = document.querySelector(".light-mode-icon");
const darkModeElement = document.querySelector(".dark-mode");
const darkModeIcon = document.querySelector(".dark-mode-icon");
const changeBody = document.querySelector(".app");
const getAllWhiteText = document.querySelectorAll(".text-white");
const getAllGrayText = document.querySelectorAll(".text-gray-400");
const getDarkBackground = document.querySelectorAll(".bg-priBlues-900");
const getInputsBox = document.querySelectorAll(".bg-gray-700");
const getRiskRewardColor = document.querySelectorAll(".bg-priBlues-800");

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

  // Digit Grouping
  function digitGrouping(digits) {
    const convertedDigits = `${digits}`;
    const separateDigits = convertedDigits.split(".");
    const firstEl = separateDigits[0];
    let modifiedDigits = "";
    for (let i = firstEl.length - 1; i >= 0; i--) {
      modifiedDigits += firstEl[firstEl.length - 1 - i];
      if (i % 3 === 0 && i !== 0) {
        modifiedDigits += ",";
      }
    }

    const semiFinale = [modifiedDigits, separateDigits[1]];
    const finale = semiFinale.join(".");

    if (separateDigits.length === 2) {
      return finale;
    } else {
      return modifiedDigits;
    }
  }

  // Update UI
  function updateInterface() {
    if (validateInput()) {
      displayRiskInDollars.textContent = `$${digitGrouping(
        riskAmount.toFixed(2)
      )}`;
      displayRiskInPips.textContent = `${digitGrouping(
        slDistance.toFixed(2)
      )} pips`;
      displayRewardInDollars.textContent = `$${digitGrouping(
        rewardAmount.toFixed(2)
      )}`;
      displayRewardInPips.textContent = `${digitGrouping(
        tpDistance.toFixed(2)
      )} pips`;
      displayRiskRewardRatioInNum.textContent = `1 : ${
        rrr <= 9 ? rrr.toFixed(2) : rrr.toFixed()
      }`;
      displayLotSize.textContent = `${digitGrouping(lotSize.toFixed(2))} Lots`;
      displayUnitSize.textContent = `(${digitGrouping(
        unitSize.toFixed()
      )} units)`;

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

// Implementing The Reset Button functionality
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

// the changing of elements styles: changes the style when the input box is being clicked
const styleAccBalanceUi = function () {
  updatedAccBalstyle.style.color = "#3385FF";
  updateDollarIcon.classList.add("fill-blue-500");
};
const styleRiskPercentageUi = function () {
  updatedRiskPercentagestyle.style.color = "#3385FF";
  updateRiskPercentageicon.classList.add("fill-blue-500");
};
const styleCurrencyUi = function () {
  updatedCurrencystyle.style.color = "#3385FF";
  updateCurrencyIcon.classList.add("fill-blue-500");
};

const restoreStyleAccBal = function () {
  updatedAccBalstyle.style.color = "rgb(75 85 99)";
  updateDollarIcon.classList.remove("fill-blue-500");
};
const restoreStyleRisk = function () {
  updatedRiskPercentagestyle.style.color = "rgb(75 85 99)";
  updateRiskPercentageicon.classList.remove("fill-blue-500");
};
const restoreStyleCurrency = function () {
  updatedCurrencystyle.style.color = "rgb(75 85 99)";
  updateCurrencyIcon.classList.remove("fill-blue-500");
};

inputAccBal.addEventListener("focus", styleAccBalanceUi);
inputAccBal.addEventListener("blur", restoreStyleAccBal);
inputRiskPercentage.addEventListener("focus", styleRiskPercentageUi);
inputRiskPercentage.addEventListener("blur", restoreStyleRisk);
inputCurrency.addEventListener("focus", styleCurrencyUi);
inputCurrency.addEventListener("blur", restoreStyleCurrency);

// Implementing Dark/Light Mode functionalities

let changeTheme = true;

if (changeTheme) {
  const lightMode = function () {
    changeBody.classList.remove(
      "bg-[radial-gradient(circle_at_center,#001433_45%,#000E24_100%)]"
    );
    changeBody.classList.add("bg-white");
  };
  lightModeElement.addEventListener("click", lightMode);

  getAllWhiteText.forEach((el) => {
    function changeTextColor() {
      el.classList.remove("text-white");
      el.classList.add("text-priBlues-900");
    }

    lightModeElement.addEventListener("click", changeTextColor);
  });

  getAllGrayText.forEach((el) => {
    function changeGrayColor() {
      el.classList.remove("text-gray-400");
      el.classList.add("text-gray-700");
    }
    lightModeElement.addEventListener("click", changeGrayColor);
  });

  getDarkBackground.forEach((el) => {
    function changeBackgroundMain() {
      el.classList.remove("bg-priBlues-900");
      el.classList.add("bg-priBlues-100");
    }
    lightModeElement.addEventListener("click", changeBackgroundMain);
  });

  getInputsBox.forEach((el) => {
    function changeInputsBox() {
      el.classList.remove("bg-gray-700");
      el.classList.add("bg-gray-400");
    }
    lightModeElement.addEventListener("click", changeInputsBox);
  });

  getRiskRewardColor.forEach((el) => {
    function changeRiskRewardBgColor() {
      el.classList.remove("bg-priBlues-800");
      el.classList.add("bg-priBlues-400");
    }
    lightModeElement.addEventListener("click", changeRiskRewardBgColor);
  });

  const changeSunMoon = function () {
    lightModeElement.classList.add("bg-gray-800");
    lightModeIcon.classList.add("fill-white");
    lightModeElement.classList.remove("w-[40%]");
    lightModeElement.classList.add("w-[60%]");
    darkModeElement.classList.remove("bg-gray-800");
    darkModeElement.classList.remove("w-[60%]");
    darkModeIcon.classList.remove("fill-white");
    darkModeElement.classList.add("w-[40%]");
    lightAndDarkCont.classList.remove("bg-gray-600");
    lightAndDarkCont.classList.add("text-white");
  };
  lightModeElement.addEventListener("click", changeSunMoon);
}

const backToDarKMode = function () {
  changeTheme = false;
  if (!changeTheme) {
    window.location.reload();
  }
};
darkModeElement.addEventListener("click", backToDarKMode);
