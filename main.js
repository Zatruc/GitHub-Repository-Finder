const $selectLanguaje = document.getElementById("select_languaje");
const $state = document.querySelector(".state");
const $refresh = document.querySelector(".refresh");
const $retry = document.querySelector(".retry");

// charge the languajes to the select
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json"
    );
    const data = await response.json();
    data.forEach((languaje) => {
      const option = document.createElement("option");
      option.value = languaje.title;
      option.textContent = languaje.title;
      $selectLanguaje.appendChild(option);
    });
  } catch (error) {
    console.error(error);
  }
});
