const pokeContainer = document.getElementById("pokemon-container");
// const pokemonAmount = 1154;
const pokemonAmount = 20;

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
  const cardEl = document.createElement(`div`);
  cardEl.classList.add(`pokemon`);
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const type = pokemon.types.map((typeEl) => typeEl.type.name);
  const id = pokemon.id;
  const cardInnerHTML = `
  <div class="img-container">
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png">
  <div class="info">
  <span class=""number>${id}</span></div>
  <h3 class="name">${name}</h3>
  <h4 class="type">Type: <span>${type}</span></h4>
  </div>
  `;
  cardEl.innerHTML = cardInnerHTML;
  pokeContainer.append(cardEl);
}
