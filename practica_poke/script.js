async function obtenerPersonajes() {

    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    const data = await response.json();

    const personajes = await Promise.all(
        data.results.map(async (personaje) => {
            const response = await fetch(personaje.url);
            return await response.json();
        })
    );

    return personajes;
}

function pintarPersonajes(personajes) {

    console.log("Pintando personajes:", personajes);

    let tarjetasHTML = "";

    personajes.forEach(personaje => {

        tarjetasHTML += `
            <div class="card">

                <img src="${personaje.sprites.front_default}" 
                     alt="${personaje.name}">

                <h3>${personaje.name}</h3>

                <p class="species">ID: ${personaje.id}</p>

                <p class="status">Peso: ${personaje.weight}</p>

            </div>
        `;
    });

    document.getElementById("main-container").innerHTML = tarjetasHTML;
}

obtenerPersonajes().then(pintarPersonajes);