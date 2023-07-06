let passwordField = document.getElementById("password");
let copyText = document.querySelector("span");
let generatePass = document.querySelector("button");
let PasswordLen = document.querySelector("#length input");
let includeUpper = document.querySelector("#upper input");
let includeLower = document.querySelector("#lower input");
let includeNumber = document.querySelector("#num input");
let includeSymbol = document.querySelector("#sym input");

const getLower = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getUpper = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getNumber = () => {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};

const getSymbol = () => {
  const symbols = "!@#$%^&*()_,.<>/?={}[]|";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const randomFunction = {
  lower: getLower,
  upper: getUpper,
  number: getNumber,
  symbol: getSymbol,
};

generatePass.onclick = () => {
  let length = +PasswordLen.value;
  let hasLower = includeLower.checked;
  let hasUpper = includeUpper.checked;
  let hasNum = includeNumber.checked;
  let hasSym = includeSymbol.checked;
  passwordField.value = generatePassword(
    length,
    hasLower,
    hasUpper,
    hasNum,
    hasSym
  );
};

let generatePassword = (length, lower, upper, number, symbol) => {
  let generate = "";
  const typesCount = lower + upper + number + symbol;
  const typeArr = [{ lower, upper }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );
  if (typesCount == 0) {
    return "";
  }
  for (let i = 0; i < length; i += typesCount) {
    typeArr.forEach((type) => {
      let funcName = Object.keys(type)[0];
      generate += randomFunction[funcName]();
    });
  }
  return generate;
};

copyText.onclick = () => {
  let text = passwordField.value;
  copyText.innerHTML = `<i class="fa-solid fa-check"></i>`;
  setTimeout(() => {
    copyText.innerHTML = `<i class="fa-solid fa-copy"></i>`;
  }, 500);
  navigator.clipboard.writeText(text);
};
