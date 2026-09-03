

window.addEventListener("scroll", function() {

    const header = document.querySelector("header");

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});

function searchBar(){
    $(".areaPesquisa > input").slideToggle();
}

const API_KEY = "4695b668f385c799392b2f2910224a55";

const URL_BASE = "https://api.themoviedb.org/3";

const URL_IMAGEM = "https://image.tmdb.org/t/p/w500";


/* =========================================
   ELEMENTO PRINCIPAL
========================================= */

const catalogo = document.getElementById("catalogo");


/* =========================================
   FUNÇÃO PARA BUSCAR FILMES
========================================= */

async function buscarFilmes(endpoint) {

    try {

        const resposta = await fetch(
            `${URL_BASE}${endpoint}&api_key=${API_KEY}&language=pt-BR`
        );

        const dados = await resposta.json();

        return dados.results;

    } catch (erro) {

        console.error("Erro ao buscar filmes:", erro);

        return [];

    }

}


/* =========================================
   CRIAR CATEGORIA
========================================= */

function criarCategoria(titulo, descricao, filmes) {

    /* -----------------------------------------
       CRIA A SECTION
    ----------------------------------------- */

    const categoria = document.createElement("section");

    categoria.classList.add("categoria");


    /* -----------------------------------------
       TÍTULO
    ----------------------------------------- */

    const tituloCategoria = document.createElement("h2");

    tituloCategoria.textContent = titulo;


    /* -----------------------------------------
       DESCRIÇÃO
    ----------------------------------------- */

    const descricaoCategoria = document.createElement("p");

    descricaoCategoria.classList.add("categoria-descricao");

    descricaoCategoria.textContent = descricao;


    /* -----------------------------------------
       CONTAINER DA LISTA
    ----------------------------------------- */

    const listaContainer = document.createElement("div");

    listaContainer.classList.add("lista-container");


    /* -----------------------------------------
       LISTA DE FILMES
    ----------------------------------------- */

    const listaFilmes = document.createElement("div");

    listaFilmes.classList.add("lista-filmes");


    /* -----------------------------------------
       CRIA CADA FILME
    ----------------------------------------- */

    filmes.forEach(filme => {

        /* Cria o card */

        const card = document.createElement("div");

        card.classList.add("filme");


        /* Imagem */

        const imagem = document.createElement("img");


        /*
            Alguns filmes podem não possuir
            imagem de poster.
        */

        if (filme.poster_path) {

            imagem.src = URL_IMAGEM + filme.poster_path;

        } else {

            imagem.src = "images/sem-poster.jpg";

        }


        imagem.alt = filme.title || filme.name;


        /* Título */

        const nome = document.createElement("div");

        nome.classList.add("filme-titulo");

        nome.textContent = filme.title || filme.name;


        /* Adiciona imagem e título ao card */

        card.appendChild(imagem);

        card.appendChild(nome);


        /* Adiciona card à lista */

        listaFilmes.appendChild(card);

    });


    /* =========================================
       SETA ESQUERDA
    ========================================= */

    const setaEsquerda = document.createElement("button");

    setaEsquerda.classList.add(
        "seta",
        "seta-esquerda"
    );

    setaEsquerda.innerHTML = "‹";


    /* =========================================
       SETA DIREITA
    ========================================= */

    const setaDireita = document.createElement("button");

    setaDireita.classList.add(
        "seta",
        "seta-direita"
    );

    setaDireita.innerHTML = "›";


    /* =========================================
       FUNÇÃO DE ROLAGEM
    ========================================= */

    const distanciaRolagem = 700;


    /* Rolagem para esquerda */

    setaEsquerda.addEventListener("click", () => {

        listaFilmes.scrollBy({

            left: -distanciaRolagem,

            behavior: "smooth"

        });

    });


    /* Rolagem para direita */

    setaDireita.addEventListener("click", () => {

        listaFilmes.scrollBy({

            left: distanciaRolagem,

            behavior: "smooth"

        });

    });


    /* =========================================
       MONTA A ESTRUTURA
    ========================================= */

    listaContainer.appendChild(setaEsquerda);

    listaContainer.appendChild(listaFilmes);

    listaContainer.appendChild(setaDireita);


    categoria.appendChild(tituloCategoria);

    categoria.appendChild(descricaoCategoria);

    categoria.appendChild(listaContainer);


    /* =========================================
       ADICIONA AO CATÁLOGO
    ========================================= */

    catalogo.appendChild(categoria);

}


/* =========================================
   CARREGAR CATÁLOGO
========================================= */

async function carregarCatalogo() {


    /* =========================================
       PRINCIPAIS ESCOLHAS DO DIA
    ========================================= */

    const principais = await buscarFilmes(
        "/trending/movie/day?"
    );


    criarCategoria(

        "Principais escolhas do dia",

        "Os filmes que estão em alta hoje e que podem ser uma ótima escolha para assistir.",

        principais

    );


    /* =========================================
       SÉRIES INSPIRADORAS
    ========================================= */

    const series = await buscarFilmes(
        "/discover/tv?"
    );


    criarCategoria(

        "Séries inspiradoras",

        "Histórias marcantes, personagens incríveis e séries para assistir quando você quer se inspirar.",

        series

    );


    /* =========================================
       NOVIDADES
    ========================================= */

    const novidades = await buscarFilmes(
        "/movie/now_playing?"
    );


    criarCategoria(

        "Novidades",

        "Confira alguns dos lançamentos e filmes que estão chegando ao catálogo.",

        novidades

    );

}


/* =========================================
   INICIA O SITE
========================================= */

carregarCatalogo();