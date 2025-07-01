function afficherDonnees(data) {
  const zone = document.getElementById("resultat");

  zone.innerHTML = `
    <div style="
      background: #f9f9f9;
      border: 1px solid #ccc;
      padding: 20px;
      width: 280px;
      margin: auto;
      text-align: center;
      transition: all 0.3s ease;
    ">
      <img id="poke-img" src="${data.sprites.front_default}" alt="${data.name}" style="
        width: 130px;
        height: 130px;
      "/>
      <h2 style="
        margin: 10px 0;
        font-size: 2.6em;
        color: #333;
      ">${data.name}</h2>

      <p><strong>Types :</strong></p>
      <div style="margin-bottom: 10px;">
        ${data.types.map(t => `
          <span style="
            background-color: grey ;
            padding: 4px 10px;
            border-radius: 15px;
            font-size: 0.85em;
            margin: 3px;
          ">
            ${t.type.name}
          </span>
        `).join('')}
      </div>

      <p><strong>Stats :</strong></p>
      <ul style="
        padding: 0;
        text-align: center;
        font-size: 1em;
        color: #444;
        list-style: none;
      ">
        ${data.stats.map(s => `
          <li style="padding: 4px 0;">
            ${s.stat.name} : ${s.base_stat}
          </li>
        `).join('')}
      </ul>
    </div>
  `;
}

  // Animation zoom + fade sur l'image
  const img = document.getElementById('poke-img');
  setTimeout(() => {
    img.style.opacity = 1;
    img.style.transform = 'scale';
  }, 50);


function nombreAleatoire(max) {
  return Math.floor(Math.random() * max) + 1;
}

async function getTotalPokemons() {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=0");
    const data = await res.json();
    return data.count;
  } catch {
    return 0;
  }
}

async function afficherPokemonParId(id) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    afficherDonnees(data);
  } catch {
    alert("Erreur lors du chargement du Pokémon");
  }
}

async function afficherPokemonAleatoire() {
  const total = await getTotalPokemons();
  if (total > 0) {
    const id = nombreAleatoire(total);
    afficherPokemonParId(id);
  }
}

window.addEventListener("load", async () => {
  await afficherPokemonAleatoire();
  const btn = document.getElementById("btn");
  if (btn) btn.addEventListener("click", afficherPokemonAleatoire);
});
