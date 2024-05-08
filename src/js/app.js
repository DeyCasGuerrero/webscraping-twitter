async function fetchDataAndRenderChart() {
    try {
        const response = await fetch("https://deycasguerrero.github.io/webscraping-twitter/data.json");
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const jsonData = await response.json();
        renderData(jsonData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderData(data) {
    const container = document.getElementById('container');

    data.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('tweet', 'bg-black', 'rounded-lg', 'shadow-md', 'p-4', 'mb-4', 'border-2', 'border-white');

        const texto = document.createElement('p');
        texto.classList.add('text-xl', 'mb-2','bg-white','text-black','p-5','rounded-lg');
        texto.textContent = item.texto;
        div.appendChild(texto);

        if (item.link.length > 0) {
            const link = document.createElement('a');
            link.href = item.link[0]; 
            link.textContent = "Enlace";
            div.appendChild(link);
        }

        if (item.imagenes.length > 0) {
            const divPerfil = document.createElement('div');
            divPerfil.classList.add('mb-4');

            const imagenPerfil = document.createElement('img');
            imagenPerfil.alt = "adodeidad";
            imagenPerfil.src = item.imagenes[0]; 
            imagenPerfil.classList.add('w-14', 'h-14', 'rounded-full');
            divPerfil.appendChild(imagenPerfil);
            div.appendChild(divPerfil);

            const divPublicaciones = document.createElement('div');
            divPublicaciones.classList.add('grid', 'gap-4', 'p-5', 'max-sm:grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4');

            item.imagenes.slice(1).forEach(imagenSrc => { 
                const imagen = document.createElement('img');
                imagen.alt = "ado";
                imagen.src = imagenSrc;
                imagen.classList.add('w-full', 'h-auto', 'rounded-md', 'border-2', 'border-white');
                divPublicaciones.appendChild(imagen);
            });

            div.appendChild(divPublicaciones);
        }

        container.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", fetchDataAndRenderChart);


document.addEventListener("DOMContentLoaded", fetchDataAndRenderChart);