// TODO: Add Search
// TODO: reduce api load by making a local Storage var

const appElement = document.getElementById("app");
appElement.innerHTML = `
	<nav>
		<button id="button-prev"><i class="fas fa-arrow-left"></i></button>
		<button id="button-home">POKE DEX</button>
		<button id="button-next"><i class="fas fa-arrow-right"></i></button>
		<input type="text" name="" id="search-text" placeholder="search">
		<button id="search-button"><i class="fas fa-search"></i></button>
	</nav>`;

// Navbar buttons:
const buttonHome = document.getElementById("button-home");
buttonHome.addEventListener("click", navHomePage);

// handle home page button click:
function navHomePage() {
  //console.log("going to the previous page")
  displayAllPokemons(apiUrls.main);
}

const buttonPrev = document.getElementById("button-prev");
buttonPrev.addEventListener("click", navPrevPage);

// handle previous page button click:
function navPrevPage() {
  //console.log("going to the previous page")
  displayAllPokemons(apiUrls.previous);
}

const buttonNext = document.getElementById("button-next");
buttonNext.addEventListener("click", navNextPage);

// handle previous page button click:
function navNextPage() {
  //console.log("going to the next page")
  // run function with apiUrls.next or (if null/empty) with apiUrls.main instead
  displayAllPokemons(apiUrls.next || apiUrls.main);
}

// API urls:
const apiUrls = {
  count: 0,
  currentUrl: "https://pokeapi.co/api/v2/pokemon/",
  main: "https://pokeapi.co/api/v2/pokemon/",
  next: null,
  previous: null,
};

// async function to get data from api:
async function getApi(url) {
  const fetchRequest = await fetch(url);
  const fetchData = await fetchRequest.json();
  /*
		count: 1154

		next: "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20"

		previous: null

		results: [array.....]
	*/
  return fetchData;
}
const mainContent = document.createElement("div");
mainContent.className = "pokemon-container";
mainContent.style = "margin-top: 5rem;";
// representing elemental color
const colors = {
  normal: "#F5F5F5",
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#c4aaf3",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  ghost: "#ddcbff",
  dark: "#585892",
};
const mainTypes = Object.keys(colors);

// function creates and returns a pokemon card element
async function pokemonCardElement(pokemon) {
  // destructure the pokemon object
  const { url } = pokemon;

  // get additional info on this pokemon
  const pokemonDetails = await getApi(url);
  const { types } = pokemonDetails;

  // data we get from api, contains an array of objects with only:
  // {"name":"bulbasaur","url":"https://pokeapi.co/api/v2/pokemon/1/"},

  const pokemonCard = document.createElement("div");
  pokemonCard.className = "pokemon";

  const pokemonImage = document.createElement("img");
  pokemonImage.className = "img-container";
  pokemonImage.src =
    pokemonDetails.sprites.other["official-artwork"].front_default;
  if (
    pokemonDetails.sprites.other["official-artwork"].front_default
      ? null
      : "/src/img/Pokeball.png"
  );

  const pokemonTitle = document.createElement("h2");
  pokemonTitle.textContent = `${
    pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
  }`;

  const pokemonId = document.createElement("h3");
  pokemonId.className = "number";
  //set the first letter in the name be a capital
  pokemonId.textContent = `#${pokemonDetails.id.toString().padStart(4, "0")}`;

  const type = types.map((type) => type.type.name).join(", ");
  const pokemonTypes = document.createElement("span");
  pokemonTypes.textContent = `${type}`;
  pokemonTypes.className = "type";

  const colorType = mainTypes.find((types) => type.indexOf(types) > -1);
  const color = colors[colorType];
  pokemonCard.style.backgroundColor = color;

  pokemonCard.addEventListener("click", () =>
    pokemonCardDetails(pokemonDetails)
  );

  pokemonCard.append(pokemonImage, pokemonTitle, pokemonId, pokemonTypes);

  //console.log(pokemonCard)
  return pokemonCard;
}

// display detailed pokemon info
function pokemonCardDetails(pokemon) {
  // destructure pokemon object:
  const { id, name, height, weight, base_experience, types, stats } = pokemon;
  //console.log(types)

  /* console.log(
		stats.map(stat => "<h3>" + stat.stat.name + "</h3><h3>" + stat.base_stat + "</h3><hr>").join("")
	) */

  mainContent.innerHTML = `
		<div class="pokemonCard pokemon-details ">
			
      <div class="img-cont">
      <img src="${
        pokemon.sprites.other["official-artwork"].front_default
      }" alt=""></div>
      <div class="card-name">
      <h2 class="number">#${id.toString().padStart(4, "0")}</h2>
      <h2>${name[0].toUpperCase() + pokemon.name.slice(1)}</h2>
      </div>
			<div class="card-stats">
				<div class="info">
					<h3 class="height">Height: ${height}</h3>
					<h3 class="weight">Weight ${weight} </h3>
					<h3 class="xp">XP: ${base_experience}</h3>
				</div>

				<div class="types">
					${types.map((type) => "<h3>" + type.type.name + "</h3>").join("")}
				</div>
				<div class="stats">
					${stats
            .map(
              (stat) =>
                "<h3>" +
                stat.stat.name +
                "</h3><h3>" +
                stat.base_stat +
                "</h3><hr>"
            )
            .join("")}
				</div>
        
			</div>
		</div>
	`;
}

//mainContent.append(pokemonCardElement("Pokemon one"))

// async function gets pokemon data from api and displays them on the page
async function displayAllPokemons(url) {
  // get data from api
  const pokemonData = await getApi(url);
  // call setUrls function to update urls:
  setUrls(pokemonData);

  // map pokemonData to an array of html elements
  let pokemonElements = pokemonData.results.map((pokemon) =>
    pokemonCardElement(pokemon)
  );

  // pokemonElements contains an array of promises, because we run an additional api request in the pokemonCardElement function.
  // So we need to resolve each promise in the array, to do so we use the Promise.all method
  pokemonElements = await Promise.all(pokemonElements);

  mainContent.innerHTML = "";
  // append elements to the page
  mainContent.append(...pokemonElements);
}

// update urls
function setUrls(pokemonData) {
  //console.log(pokemonData)
  apiUrls.count = pokemonData.count;
  apiUrls.next = pokemonData.next;
  // find the last page, and update apiUrls.previous in case its null
  const lastPageNumber = Math.floor(apiUrls.count / 20) * 20;
  apiUrls.previous =
    pokemonData.previous ||
    `https://pokeapi.co/api/v2/pokemon/?offset=${lastPageNumber}&limit=200`;
}

displayAllPokemons(apiUrls.main);

appElement.append(mainContent);
