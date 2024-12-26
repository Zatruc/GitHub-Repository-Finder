const $selectLanguaje = document.getElementById("select_languaje");
const $state = document.querySelector(".state");
const $refresh = document.querySelector(".refresh");
const $retry = document.querySelector(".retry");
const $extraState = document.querySelector(".extra");

// load languajes to the select
document.addEventListener("DOMContentLoaded", async () => {
  handleState("empty");
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

const handleState = (state) => {
  switch (state) {
    case "loading":
      $state.innerHTML = "Loading, please wait...";
      break;
    case "empty":
      $state.innerHTML = "Please select a languaje";
      break;
    case "error":
      $state.innerHTML = "Error fetching repositories";
      break;
    case "success":
      $state.innerHTML = "";
      break;
    default:
      $state.innerHTML = "";
  }
};

const handleSelectLanguaje = async () => {
  const languaje = $selectLanguaje.value;
  if (!languaje) {
    handleState("empty");
    return;
  }

  handleState("loading");
  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=language:${languaje}&sort=stars&order=desc`
    );
    const data = await response.json();
    handleState("success");
    const randomRepo =
      data.items[Math.floor(Math.random() * data.items.length)];
    console.log(randomRepo);
    const name = document.createElement("h2");
    const description = document.createElement("p");
    const stars = document.createElement("p");
    const forks = document.createElement("p");
    const openIssues = document.createElement("p");

    name.textContent = randomRepo.name;
    description.textContent = randomRepo.description;
    stars.textContent = randomRepo.stargazers_count;
    forks.textContent = randomRepo.forks;
    openIssues.textContent = randomRepo.open_issues;

    $state.appendChild(name);
    $state.appendChild(description);
    $extraState.appendChild(stars);
    $extraState.appendChild(forks);
    $extraState.appendChild(openIssues);
  } catch (error) {
    console.error(error);
    handleState("error");
  }
};

$selectLanguaje.addEventListener("change", handleSelectLanguaje);
