window.addEventListener("load", () => {
  const zone = document.getElementById("resultat");
  const btn = document.getElementById("btn");

  if (!zone) {
    console.error("Element #resultat non trouvé !");
    return;
  }
  if (!btn) {
    console.error("Element #btn non trouvé !");
    return;
  }

  function afficherDonnees(data) {
    zone.innerHTML = `
      <div class="bg-white border border-gray-300 p-6 max-w-xs mx-auto rounded-lg shadow-md text-center transition-all duration-300">
        <img
          id="poke-img"
          src="${data.sprites.front_default}"
          alt="${data.name}"
          class="w-32 h-32 mx-auto"
          style="image-rendering: pixelated;"
        />
        <h2 class="mt-4 text-4xl font-bold text-gray-800 capitalize">${data.name}</h2>

        <p class="mt-4 font-semibold text-gray-700">Types :</p>
        <div class="mt-2 flex justify-center flex-wrap gap-2">
          ${data.types.map(t => `
            <span class="bg-gray-600 text-white rounded-full px-3 py-1 text-sm capitalize">
              ${t.type.name}
            </span>
          `).join('')}
        </div>

        <p class="mt-4 font-semibold text-gray-700">Stats :</p>
        <ul class="mt-2 text-gray-700 text-left list-none space-y-1">
          ${data.stats.map(s => `
            <li class="capitalize">${s.stat.name} : ${s.base_stat}</li>
          `).join('')}
        </ul>
      </div>
    `;
  }

  function nombreAleatoire(max) {
    return Math.floor(Math.random() * max) + 1;
  }

  async function getTotalPokemons() {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1");
      const data = await res.json();
      return data.count;
    } catch (e) {
      console.error("Erreur getTotalPokemons", e);
      return 0;
    }
  }

  async function afficherPokemonParId(id) {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      afficherDonnees(data);
    } catch (e) {
      console.error("Erreur afficherPokemonParId", e);
      alert("Erreur lors du chargement du Pokémon");
    }
  }

  async function afficherPokemonAleatoire() {
    const total = await getTotalPokemons();
    if (total > 0) {
      const id = nombreAleatoire(total);
      afficherPokemonParId(id);
    } else {
      console.error("Impossible de récupérer le nombre total de Pokémon");
      zone.innerHTML = "<p>Erreur de chargement, réessaie plus tard.</p>";
    }
  }

  afficherPokemonAleatoire();

  btn.addEventListener("click", afficherPokemonAleatoire);
});
