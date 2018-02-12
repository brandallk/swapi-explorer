function SwapiController() {
    var swapiService = new SwapiService()

    function drawInitialPageState() {
        var $appDiv = $('div.app')

        var btnsDiv = `
            <div>
                <h1 class="text-center">SWAPI Explorer</h1>
                <div class="dataTypeBtns py-3 px-5 d-flex justify-content-around">
                    <button type="button" class="people-btn btn btn-info px-3">People</button>
                    <button type="button" class="planets-btn btn btn-info px-3">Planets</button>
                    <button type="button" class="starships-btn btn btn-info px-3">Starships</button>
                </div>
                <hr>   
                <div class="paginationBtns py-3 px-5 d-flex justify-content-around">
                    <button type="button" class="prev-btn btn btn-info px-3">Prev</button>
                    <button type="button" class="next-btn btn btn-info px-3">Next</button>
                </div>
            </div>
        `
        $appDiv.html(btnsDiv)

        activateDataTypeBtns()

        swapiService.getData("people", null, drawResults)
    }

    function activateDataTypeBtns() {
        var dataTypes = ["people", "planets", "starships"]

        dataTypes.forEach( type => {
            var $btn = $(`button.${type}-btn`)
            $btn.on('click', () => {
                swapiService.getData(type, null, drawResults)
            })
        })
    }

    function activatePrevButton(resultsType) {
        var $btn = $('button.prev-btn')
        $btn.off()

        if (swapiService.getPrevUrl(resultsType)) {
            $btn.addClass('btn-info')
            $btn.removeAttr('disabled')
            $btn.on('click', () => {
                swapiService.getData(resultsType, "previous", drawResults)
            })
        } else {
            $btn.removeClass('btn-info')
            $btn.attr('disabled', 'true')
        }
    }

    function activateNextButton(resultsType) {
        var $btn = $('button.next-btn')
        $btn.off()

        if (swapiService.getNextUrl(resultsType)) {
            $btn.addClass('btn-info')
            $btn.removeAttr('disabled')
            $btn.on('click', () => {
                swapiService.getData(resultsType, "next", drawResults)
            })
        } else {
            $btn.removeClass('btn-info')
            $btn.attr('disabled', 'true')
        }
    }

    function activateShowHomeBtn() {
        var $btn = $('button.showHomeworld')
        $btn.on('click', function() {
            if ($(this).text() == "Show home world") {
                var url = $(this).attr('data-homeURL')
                swapiService.getHomeworld(url, showHomeWorld)
    
                var $personName = $(this).siblings('.person-name')
                function showHomeWorld(homeworldName) {
                    $personName.append(`<span class="homeworld-span ml-3">(${homeworldName})</span>`)
                }

                $(this).text("Hide home world")

            } else {
                $('.homeworld-span').remove()
                $(this).text("Show home world")
            }
        })
    }

    function drawResults(resultsArr, resultsType) {
        var $appDiv = $('div.app')

        if ($('ul.people').length > 0) {
            $('ul.people').remove()
        }

        var template = `<ul class="people list-group">`
        resultsArr.forEach( item => {
            template += `
                <li class="list-group-item d-flex flex-column flex-sm-row justify-content-between align-items-center">
                    <span class="person-name h5 mr-3">${item.name}</span>
                `
            if (resultsType == "people") {
                template += `<button type="button" class="showHomeworld btn btn-info px-3 mt-2" data-homeURL="${item.homeworld}">Show home world</button>`
            }
            template += `</li>`
        })
        template += `</ul>`
        
        $appDiv.append(template)
        
        activatePrevButton(resultsType)
        activateNextButton(resultsType)
        if (resultsType == "people") {
            activateShowHomeBtn()
        }
    }

    drawInitialPageState()
}