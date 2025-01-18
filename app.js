const API_KEY = "1d67a600e69f413af134250b";
const API_URL = "https://v6.exchangerate-api.com/v6";

const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertButton = document.getElementById("convert");
const resultDiv = document.getElementById("result");

async function loadCurrencies() {
  try {
    const response = await fetch(`${API_URL}/${API_KEY}/codes`);
    const data = await response.json();

    if (data.supported_codes) {
      const fromSelect = fromCurrency;
      const toSelect = toCurrency;

      data.supported_codes.forEach(([code, name]) => {
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");

        option1.value = code;
        option1.textContent = `${code} (${name})`;

        option2.value = code;
        option2.textContent = `${code} (${name})`;

        fromSelect.appendChild(option1);
        toSelect.appendChild(option2);
      });
    }
  } catch (error) {
    console.error("Erro ao carregar moedas:", error);
    resultDiv.textContent = "Erro ao carregar moedas. Tente novamente.";
  }
}

async function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount) || amount <= 0) {
    resultDiv.textContent = "Por favor, insira um valor válido.";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${API_KEY}/latest/${from}`);
    const data = await response.json();

    if (data.conversion_rates) {
      const rate = data.conversion_rates[to];
      const convertedAmount = (amount * rate).toFixed(2);

      resultDiv.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
    } else {
      resultDiv.textContent = "Erro ao buscar taxas de câmbio.";
    }
  } catch (error) {
    console.error("Erro ao converter:", error);
    resultDiv.textContent = "Erro ao realizar a conversão.";
  }
}

loadCurrencies();

convertButton.addEventListener("click", convertCurrency);
