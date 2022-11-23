const pokeContainer = document.getElementById("pokemon-container");
const pokemonAmount = 1154;

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
// fetchPokemon();

function createCard(pokemon) {
  const cardEl = document.createElement(`div`);
  cardEl.classList.add(`pokemon`);

  const cardInnerHTML = `
  ${pokemon.id}
  `;
  cardEl.innerHTML = cardInnerHTML;
  pokeContainer.append(cardEl);
}
