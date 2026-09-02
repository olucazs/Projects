const API_KEY = "4695b668f385c799392b2f2910224a55";

const catalogo = document.querySelector("#catalogo");

async function buscarFilmes(endpoint) {

    try {

        const resposta = await fetch(
            `https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}&language=pt-BR`
        );

        const dados = await resposta.json();

        return dados.results;

    } catch (erro) {

        console.error("Erro ao buscar filmes:", erro);

        return [];

    }
}

function criarCard(filme) {

    const card = document.createElement("div");

    card.classList.add("filme");


    // Imagem
    const imagem = document.createElement("img");

    imagem.src = `https://image.tmdb.org/t/p/w500${filme.poster_path}`;

    imagem.alt = filme.title || filme.name;


    // Informações
    const informacoes = document.createElement("div");

    informacoes.classList.add("informacoes");


    // Título
    const titulo = document.createElement("h3");

    titulo.textContent = filme.title || filme.name;


    // Ano
    const ano = document.createElement("span");

    if (filme.release_date) {

        ano.textContent = filme.release_date.substring(0, 4);

    }


    // Nota
    const nota = document.createElement("span");

    nota.classList.add("nota");

    nota.textContent = `★ ${filme.vote_average.toFixed(1)}`;


    // Botão
    const botao = document.createElement("button");

    botao.classList.add("btn-info");

    botao.textContent = "＋";


    // Barra de progresso
    const progresso = document.createElement("div");

    progresso.classList.add("progresso");


    const barra = document.createElement("div");

    barra.classList.add("barra");


    // Montar informações
    informacoes.appendChild(titulo);

    informacoes.appendChild(ano);

    informacoes.appendChild(nota);

    informacoes.appendChild(botao);


    progresso.appendChild(barra);


    // Montar card
    card.appendChild(imagem);

    card.appendChild(informacoes);

    card.appendChild(progresso);


    return card;

}

function criarCategoria(titulo, filmes) {

    const section = document.createElement("section");

    section.classList.add("categoria");


    // Título
    const h2 = document.createElement("h2");

    h2.textContent = titulo;


    // Lista
    const lista = document.createElement("div");

    lista.classList.add("lista-filmes");


    // Criar cards
    filmes.forEach(filme => {

        if (filme.poster_path) {

            const card = criarCard(filme);

            lista.appendChild(card);

        }

    });


    // Montar categoria
    section.appendChild(h2);

    section.appendChild(lista);


    catalogo.appendChild(section);

}

async function iniciar() {

    const populares = await buscarFilmes(
        "movie/popular"
    );


    const avaliados = await buscarFilmes(
        "movie/top_rated"
    );


    const emAlta = await buscarFilmes(
        "trending/movie/week"
    );


    criarCategoria(
        "Filmes populares",
        populares
    );


    criarCategoria(
        "Mais bem avaliados",
        avaliados
    );


    criarCategoria(
        "Em alta",
        emAlta
    );

}


iniciar();