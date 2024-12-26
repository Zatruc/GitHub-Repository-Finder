const $selectLanguaje = document.getElementById("select_languaje");
const $state = document.querySelector(".state");
const $refresh = document.getElementById("refresh");
const $retry = document.getElementById("retry");

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
      $refresh.style.display = "none";
      $retry.style.display = "none";
      $state.textContent = "Loading, please wait...";
      $state.style.justifyContent = "center";
      $state.style.backgroundColor = "#E9ECEF";
      $state.style.border = "none";
      break;
    case "empty":
      $retry.style.display = "none";
      $refresh.style.display = "none";
      $state.textContent = "Please select a languaje";
      $state.style.justifyContent = "center";
      $state.style.backgroundColor = "#E9ECEF";
      $state.style.border = "none";
      break;
    case "error":
      $refresh.style.display = "none";
      $retry.style.display = "block";
      $retry.addEventListener("click", handleSelectLanguaje);
      $state.innerHTML = "Error fetching repositories";
      $state.style.backgroundColor = "#FFC9C9";
      $state.style.border = "none";
      break;
    case "success":
      $state.innerHTML = "";
      $refresh.style.display = "block";
      $retry.style.display = "none";
      $refresh.addEventListener("click", handleSelectLanguaje);
      $state.style.border = "solid";
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

    name.textContent = randomRepo.name;
    !randomRepo.description
      ? (description.textContent = "No description")
      : (description.textContent = randomRepo.description);

    $state.appendChild(name);
    $state.appendChild(description);

    const extra = document.createElement("div");
    extra.classList.add("extra");

    createItems(randomRepo).forEach((item) => extra.appendChild(item));

    $state.appendChild(extra);
  } catch (error) {
    console.error(error);
    handleState("error");
  }
};

$selectLanguaje.addEventListener("change", handleSelectLanguaje);

const createItems = (randomRepo) => {
  const starContainer = document.createElement("div");
  const starIcon = document.createElement("img");
  starIcon.src = "./icons/stars.svg";
  starContainer.classList.add("item");

  const issueContainer = document.createElement("div");
  const issueIcon = document.createElement("img");
  issueIcon.src = "./icons/issues.svg";
  issueContainer.classList.add("item");

  const forkContainer = document.createElement("div");
  const forkIcon = document.createElement("img");
  forkIcon.src = "./icons/forks.svg";
  forkContainer.classList.add("item");

  const stars = document.createElement("span");
  const forks = document.createElement("span");
  const openIssues = document.createElement("span");

  stars.textContent = randomRepo.stargazers_count;
  forks.textContent = randomRepo.forks;
  openIssues.textContent = randomRepo.open_issues;

  starContainer.append(starIcon, stars);
  issueContainer.append(issueIcon, openIssues);
  forkContainer.append(forkIcon, forks);

  return [starContainer, issueContainer, forkContainer];
};
