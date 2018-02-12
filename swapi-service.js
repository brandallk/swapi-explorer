function SwapiService() {

    var baseURLs = {
        people: "https://swapi.co/api/people",
        planets: "https://swapi.co/api/planets",
        starships: "https://swapi.co/api/starships"
    }

    var prevURLs = {
        people: null,
        planets: null,
        starships: null
    }

    var nextURLs = {
        people: null,
        planets: null,
        starships: null
    }

    this.getData = function(type, page, callback) {
        var url = baseURLs[type]
        if(page == "previous") { url = prevURLs[type] }
        if(page == "next") { url = nextURLs[type] }

        $.get(url).done( data => {
            // console.log("url", url, "data.previous", data.previous, "data.next", data.next, "data.results", data.results)

            prevURLs[type] = data.previous
            nextURLs[type] = data.next

            callback(data.results, type)
        })
    }

    this.getHomeworld = function(url, callback) {
        $.get(url).done( data => {
            callback(data.name)
        })
    }

    this.getPrevUrl = function(type) {
        return prevURLs[type]
    }

    this.getNextUrl = function(type) {
        return nextURLs[type]
    }

}