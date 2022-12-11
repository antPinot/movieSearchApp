//function recupererDonnees() {

    const API_KEY_ONE = 'f6e256e1'

    const API_KEY_TWO = 'de846841'

    const API_KEY_OWN = '47ffd4e3'

    let body = document.querySelector('body')
    let results = document.querySelector("#results")

    let searchButton = document.querySelector("#searchButton")
    let saisie = document.querySelector("#saisie")

    let tableauResultats = []

    let displayedMovies = 0


    //var nbPage = 0;

    searchButton.addEventListener("click", (ev) => {
        ev.preventDefault();
        if (results.hasChildNodes()) {
            results.innerHTML = ''
        }
        fetch(`https://www.omdbapi.com/?s=${saisie.value}&apikey=${API_KEY_OWN}`)
            .then(totalPage => totalPage.json())
            .then(film => {
                if (film.Response == "True") {
                    return nbPage = Math.ceil((film.totalResults) / 10)
                } else {
                    let alerte = document.createElement('p')
                    alerte.setAttribute("class", "bg-danger col-3 offset-4")
                    alerte.innerHTML = "Veuillez entrer une saisie valide"
                    results.appendChild(alerte)
                    //let header = document.querySelector("header")
                    //header.insertAdjacentElement("afterend", alerte)
                }
            })
            .then(nbPage => {

                for (let i = 1; i <= nbPage; i++) {
                    fetch(`https://www.omdbapi.com/?s=${saisie.value}&page=${i}&apikey=${API_KEY_OWN}`)
                        .then(response => response.json())
                        .then(films => {

                            for (resultat of films.Search) {
                                tableauResultats.push(resultat)
                                //console.log(tableauResultats.length)
                            }
                        })
                        .then(() => {
                            if (tableauResultats.length <= 10) {
                                for (let i = 0; i < 8; i++) {
                                    let link = document.createElement("a")
                                    link.setAttribute("class", "col-3")
                                    link.setAttribute("href", `https://www.imdb.com/title/${tableauResultats[i].imdbID}`)
                                    link.innerHTML = tableauResultats[i].Title
                                    results.appendChild(link)
                                    let img = document.createElement("img")
                                    img.setAttribute("src", `${tableauResultats[i].Poster}`)
                                    link.appendChild(img)
                                    displayedMovies = i
                                }
                                

                            }
                        })
                }




            })

        /*.then (movies => {
            console.log(`La longueur finale du tableau est de ${tableauResultats.length}`)

        })*/

    })
//}

//function nextPage(){
    let nextPageButton = document.querySelector("#nextPageButton")

    nextPageButton.addEventListener("click", (ev) => {
        ev.preventDefault();
        if (results.hasChildNodes()) {
            results.innerHTML = ''
        }

        console.log(`test`)
        newLimit = displayedMovies + 8;
        if (newLimit > tableauResultats.length){
            newLimit = tableauResultats.length
        }
        for (let i = displayedMovies; i<newLimit; i++) {
            let link = document.createElement("a")
            link.setAttribute("class", "col-3")
            link.setAttribute("href", `https://www.imdb.com/title/${tableauResultats[i].imdbID}`)
            link.innerHTML = tableauResultats[i].Title
            results.appendChild(link)
            let img = document.createElement("img")
            img.setAttribute("src", `${tableauResultats[i].Poster}`)
            link.appendChild(img)
            displayedMovies = i
        }
        console.log(displayedMovies)    
    })
//}

let previousPageButton = document.querySelector("#previousPageButton")

previousPageButton.addEventListener("click", (ev) => {
    ev.preventDefault();
    if (results.hasChildNodes()) {
        results.innerHTML = ''
    }

    console.log(`test`)
    newLimit = displayedMovies - 8;
    if (newLimit < 0){
        newLimit = 0
    }
    for (let i = displayedMovies; i>newLimit; i--) {
        let link = document.createElement("a")
        link.setAttribute("class", "col-3")
        link.setAttribute("href", `https://www.imdb.com/title/${tableauResultats[i].imdbID}`)
        link.innerHTML = tableauResultats[i].Title
        results.appendChild(link)
        let img = document.createElement("img")
        img.setAttribute("src", `${tableauResultats[i].Poster}`)
        link.appendChild(img)
        displayedMovies = i
    }
    console.log(displayedMovies)    
})

