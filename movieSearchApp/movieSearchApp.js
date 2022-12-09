function recupererDonnees() {
    
    let body = document.querySelector('body')
    let results = document.querySelector("#results")

    let searchButton = document.querySelector("button")
    let saisie = document.querySelector("#saisie")


    searchButton.addEventListener("click", (ev) => {
        ev.preventDefault();
        if (results.hasChildNodes()){
            results.innerHTML = ''
        }
        fetch(`https://www.omdbapi.com/?s=${saisie.value}&apikey=f6e256e1`)
        .then(response => response.json())
        .then(films => {
            if (films.Response == "True"){
                console.log(films)
            for (resultat of films.Search) {
                console.log(resultat)
                let link = document.createElement("a")
                link.setAttribute("class", "col-3")
                link.setAttribute ("href", `https://www.imdb.com/title/${resultat.imdbID}`)
                link.innerHTML = resultat.Title
                results.appendChild(link)
                let img = document.createElement("img")
                img.setAttribute("src", `${resultat.Poster}`)
                link.appendChild(img)
            }
            }else{
                alert ("Veuillez entrer une saisie valide")
            }
        })
    })
}


