const pokeContainer = document.getElementById("pokemon-container");
// const pokemonAmount = 1154;
const pokemonAmount = 20;
const colors = {
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
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};
const mainTypes = Object.keys(colors);

const fetchPokemon = async () => {
  for (let i = 1; i <= pokemonAmount; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(url);
  const pokemon = await response.json();
  console.log(pokemon);
  createCard(pokemon);
};
fetchPokemon();

function createCard(pokemon) {
  //creates the card element
  const cardEl = document.createElement(`div`);
  // then Adds a class tag to it
  cardEl.classList.add(`pokemon`);
  // adds a variable with each name starts with a Upper case.
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  //  Goes through the array of types
  const pokemonTypes = pokemon.types.map((typeEl) => typeEl.type.name);
  // and adds the common type of the pokemon
  const type = mainTypes.find((type) => pokemonTypes.indexOf(type) > -1);
  const color = colors[type];
  cardEl.style.backgroundColor = color;
  // adds a series of zero to the pokemon ID
  const pokeNumber = pokemon.id.toString().padStart(4, "0");

  // generates the HTML element
  const cardInnerHTML = `
  <div class="img-container">
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">
  </div>
  <div class="info">
  <span class="number">#${pokeNumber}</span></div>
  <h3 class="name">${name}</h3>
  <h4 class="type">Type: <span>${type}</span></h4>
  </div>
  `;
  cardEl.innerHTML = cardInnerHTML;
  pokeContainer.append(cardEl);
}
