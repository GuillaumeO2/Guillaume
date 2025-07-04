function afficherDonnees(data) {
  const zone = document.getElementById("resultat");

  // Detecte largeur écran
  const isMobile = window.innerWidth <= 600;

  zone.innerHTML = `
    <div style="
      background: #f9f9f9;
      border: 1px solid #ccc;
      padding: 20px;
      width: 100%;
      max-width: 280px;
      margin: auto;
      text-align: center;
      transition: all 0.3s ease;
    ">
      <img id="poke-img" src="${data.sprites.front_default}" alt="${data.name}" style="
        width: ${isMobile ? '100px' : '130px'};
        height: ${isMobile ? '100px' : '130px'};
        transition: all 0.3s ease;
      "/>
      <h2 style="
        margin: 10px 0;
        font-size: ${isMobile ? '1.6em' : '2.6em'};
        color: #333;
      ">${data.name}</h2>

      <p><strong>Types :</strong></p>
      <div style="margin-bottom: 10px;">
        ${data.types.map(t => `
          <span style="
            background-color: grey;
            padding: 4px 10px;
            border-radius: 15px;
            font-size: ${isMobile ? '0.75em' : '0.85em'};
            margin: 3px;
            display: inline-block;
          ">
            ${t.type.name}
          </span>
        `).join('')}
      </div>

      <p><strong>Stats :</strong></p>
      <ul style="
        padding: 0;
        text-align: center;
        font-size: ${isMobile ? '0.9em' : '1em'};
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

  // Animation zoom + fade sur l'image
  const img = document.getElementById('poke-img');
  setTimeout(() => {
    if (img) {
      img.style.opacity = 1;
      img.style.transform = 'scale(1)';
    }
  }, 50);
}
