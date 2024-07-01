const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const pokeWeight = document.getElementById('weight');
const pokeHeight = document.getElementById('height');
const photo = document.getElementById('sprite');
const pokeTypesBoxes = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

const suggestionsBox = document.getElementById('suggestions');

const pokemonList = [];

async function fetchAllPokemonData() {
    try {
        const response = await fetch('https://pokeapi-proxy.freecodecamp.rocks/api/pokemon');
        const pokemonData = await response.json();
        // console.log('Async start');
        // processPokemonList(pokemonData);
        populateSearchArray(pokemonData);
        // console.log('Async end');
        return pokemonData;
    } catch (error) {
        console.error('Error fetching the Pokémon data:', error);
    }
}

async function fetchPokemonDetails(pokemonNameNumber) {
    try {
        const baseUrl = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/';
        const pokemonUrl = `${baseUrl}${pokemonNameNumber}/`;
        const response = await fetch(pokemonUrl);
        const pokemonDetails = await response.json();
        processPokemonDetails(pokemonDetails);
        return pokemonDetails;
    }
    
    catch (err) {
        resetDisplay();
        alert('Pokémon not found');
        console.log(`Pokémon not found: ${err}`);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Loaded start');
    fetchAllPokemonData();
    console.log('DOM Loaded end');
});

function processPokemonDetails(details) {
    let activeTypes = [];
    const { name, id, weight, height, stats, sprites, types } = details;
    // console.log(types);
    stats.forEach(({ stat, base_stat }) => {
    });
    types.forEach((item)=>{
        const { type } = item;
        activeTypes.push(type);
        
    })
    console.log(activeTypes);
    updatePokemonUI({
        name,
        id,
        weight,
        height,
        photoUrl: sprites.front_default,
        pokeHp: stats[0].base_stat,
        pokeAttack: stats[1].base_stat,
        pokeDefense: stats[2].base_stat,
        pokeSpecialAttack: stats[3].base_stat,
        pokeSpecialDefense: stats[4].base_stat,
        pokeSpeed: stats[5].base_stat,
        pokeTypes: activeTypes,
    });
}

function displayResult(pokemonArray) {
    pokemonArray.forEach(({ name }) => {
        console.log(name);
        fetchPokemonDetails(name);
    });
}

function updatePokemonUI({ name, id, weight, height, photoUrl, pokeHp, pokeAttack, pokeDefense, pokeSpecialAttack, pokeSpecialDefense, pokeSpeed, pokeTypes }) {
    pokemonName.innerText = name.toUpperCase();
    pokemonId.innerText = id;
    pokeWeight.innerText = weight;
    pokeHeight.innerText = height;
    photo.src = photoUrl;
    hp.innerText = pokeHp;
    attack.innerText = pokeAttack;
    defense.innerText = pokeDefense;
    specialAttack.innerText = pokeSpecialAttack;
    specialDefense.innerText = pokeSpecialDefense;
    speed.innerText = pokeSpeed;
    pokeTypesBoxes.innerHTML='';
    pokeTypes.forEach((typeItem)=>{
        const typeDiv = document.createElement('div');
        typeDiv.classList.add('types');
        typeDiv.classList.add(`${typeItem.name}`);
        typeDiv.textContent=`${typeItem.name.toUpperCase()}`;
        pokeTypesBoxes.appendChild(typeDiv);
    })
}

function populateSearchArray(data) {
    const { results } = data;
    results.forEach((result)=>{
        pokemonList.push(result.name);
    })
}

function showSuggestions(query) {
    
    suggestionsBox.innerHTML = '';
    if (query.length === 0) {
        return;
    }
    const filteredList = pokemonList.filter(pokemon => pokemon.toLowerCase().startsWith(query.toLowerCase()));
    filteredList.forEach(pokemon => {
        const div = document.createElement('div');
        div.classList.add('suggestion');
        div.textContent = pokemon;
        div.onclick = function() {
            document.getElementById('search-input').value = pokemon;
            suggestionsBox.innerHTML = '';
            fetchPokemonDetails(pokemon);
        };
        suggestionsBox.appendChild(div);
    });
}

const resetDisplay = () => {
    
    
    
    // reset stats
    pokemonName.innerText = '';
    pokemonId.innerText = '';
    pokeWeight.innerText = '';
    pokeHeight.innerText = '';
    photo.src = '';
    hp.innerText = '';
    attack.innerText = '';
    defense.innerText = '';
    specialAttack.innerText = '';
    specialDefense.innerText = '';
    speed.innerText = '';
    pokeTypesBoxes.innerHTML='';
};


searchButton.addEventListener('click', ()=>{
    const inputText = searchInput.value.toLowerCase();
    fetchPokemonDetails(inputText);
})
