"use-strict";

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////// F // O // R // E // X //////////////////////////
///// C // A // L // C // U // L // A // T // O // R ///////////
///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// GETTING ALL THE ELEMENT THAT REQUIRES DOM MANIPULATIONscript.js
// inputs boxes selection
const inputAccBal = document.getElementById("accBalance");
const inputRiskPercentage = document.getElementById("riskPercent");
const inputCurrency = document.getElementById("currencyPair");
const currencyOptionOne = document.getElementById("eurusd");
const currencyOptionTwo = document.getElementById("gbpusd");
const currencyOptionThree = document.getElementById("usdjpy");
const currencyOptionFour = document.getElementById("xauusd");
const inputEntry = document.getElementById("entry");
const inputStopLoss = document.getElementById("stoploss");
const inputTakeProfit = document.getElementById("takeprofit");

// Buttons selection
const btnCalculate = document.querySelector(".calculate__btn");
const btnReset = document.querySelector(".reset__btn");

// Display Result Element
const riskInDollars = document.querySelector('.risk-in-dollars')
const riskInPips = document.querySelector('.risk-in-pips')
const rewardInDollars = document.querySelector('.reward-in-dollars')
const rewardInPips = document.querySelector('.reward-in-pips')
const riskRewardRatioInNum = document.querySelector('.r-r-r-num')
const riskRewardRatioInBarRed = document.querySelector('.r-r-r-red-bar')
const riskRewardRatioInBargreen = document.querySelector('.r-r-r-green-bar')
const lotSize = document.querySelector('.lot-size')
const unitSize = document.querySelector('.unit-size')