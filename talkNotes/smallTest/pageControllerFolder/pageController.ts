//@auto-fold here



export function pageController(currentStatus, subPanelContainer){
    let pageNavigator = document.createElement("div")
    pageNavigator.classList.add("pageNavigator")

    let pageNumberInput = document.createElement("input")
    pageNumberInput.classList.add("pageNumberInput")

    let leftButton = document.createElement("div")
    let rightButton = document.createElement("div")
    leftButton.innerHTML = "L"
    pageNumberInput.value = "1"
    pageNumberInput.style.margin = "0 auto"
    rightButton.innerHTML = "R"

    pageNavigator.append(leftButton, pageNumberInput, rightButton)

    subPanelContainer.append(pageNavigator)

    //@auto-fold here
    leftButton.addEventListener("click", function(){
        let totalPageNumber = currentStatus.pageArrayFullPage.length
        let currentPageNumber = parseInt(pageNumberInput.value)
        if (currentPageNumber > 1){
            let newPageNumber = currentPageNumber - 1
            pageNumberInput.value = newPageNumber.toString()

            currentStatus.currentPage = currentStatus.pageArrayFullPage[newPageNumber]
            currentStatus.pageArrayFullPage[currentPageNumber].style.left = "+100%"
            currentStatus.pageArrayFullPage[newPageNumber].style.left = "0%"
        }
    })

    // turn to next page
    //@auto-fold here
    rightButton.addEventListener("click", function(){
        let totalPageNumber = currentStatus.pageArrayFullPage.length
        let currentPageNumber = parseInt(pageNumberInput.value)

        if (currentPageNumber < totalPageNumber-1){
            let newPageNumber = currentPageNumber + 1
            pageNumberInput.value = newPageNumber.toString()

            currentStatus.currentPage = currentStatus.pageArrayFullPage[newPageNumber]
            currentStatus.pageArrayFullPage[currentPageNumber].style.left = "-100%"
            currentStatus.pageArrayFullPage[newPageNumber].style.left = "0%"
        }// if currentpage > 0
    })
}// right Button

export function updatePageController(currentStatus, newPageNumber){
    let pageNumberInput = document.querySelector(".pageNumberInput")
    pageNumberInput.value = newPageNumber
    currentStatus.currentPage = newPageNumber
    currentStatus.previousPage = newPageNumber - 1
    currentStatus.newPage = newPageNumber + 1
}

export function updatePageNumberInNewOrder(currentStatus){
    for (let i = 1; i < currentStatus.pageArrayFullPage.length; i++){
        currentStatus.pageArrayFullPage[i].setAttribute("pageNumber", i)
        currentStatus.pageArraySmallView[i].setAttribute("pageNumber", i)
    }
}


export function highlightCurrentPageInOverviewMode(smallPageView:HTMLDivElement, currentPageNumber: number, currentStatus){

    for (let i = 1; i < currentStatus.pageArraySmallView.length; i++){
        currentStatus.pageArraySmallView[i].style.border = "0px"
    }
    let currentPageHtml = currentStatus.pageArraySmallView[currentPageNumber]
     // smallPageView.parentNode.querySelector(`.divPageSmall[pageNumber='${currentPageNumber}']`)
    currentPageHtml.style.border = "3px red solid"
}
