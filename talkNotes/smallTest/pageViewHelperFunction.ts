import {mainController} from "./constructInitialCondition"
import * as GreatNoteDataClass from "./GreatNoteDataClass"
import {socket} from "./socketFunction"
import {pageController, updatePageController, updatePageNumberInNewOrder, highlightCurrentPageInOverviewMode} from "./pageControllerFolder/pageController"

//@auto-fold here
export function createSubPanel(name:string, first:boolean){
    let subPanelTemplate = <HTMLTemplateElement>document.querySelector("#subPanelTemplate")
    let subPanel = document.importNode(subPanelTemplate.content, true)
    let subPanelNavbarTitle = subPanel.querySelector(`.subPanelTitle`)
    subPanelNavbarTitle.innerHTML = `${name}SubPanel`
    let subPanelContent = subPanel.querySelector(".subPanelContent")
    subPanelContent.parentNode.classList.add(`${name}SubPanel`)

    if (first){
        subPanelContent.setAttribute("status", "open")
    } else {
        subPanelContent.setAttribute("status", "close")
    }

    let subPanelSwitch = subPanel.querySelector(".subPanelSwitch")
    subPanelSwitch.addEventListener("click", function(event){
        let newStatus = subPanelContent.getAttribute("status")=="open"?"close":"open"
        subPanelContent.setAttribute("status", newStatus)
    })

    return subPanel
}

//@auto-fold here
export function createSubPanelItem(name:string){
    // to create subpanel and fill with subPanelItem
    let subPanelItem = document.createElement("div")
    subPanelItem.classList.add("subPanelItem", `${name}SubPanelItem`)
    subPanelItem.innerText = name[0]
    subPanelItem.addEventListener("click", function(){
        let subPanelArray = subPanelItem.parentNode.querySelectorAll(".subPanelItem")
        Array.from(subPanelArray).forEach(p=>{
            p.setAttribute("status", "off")
        })
        subPanelItem.setAttribute("status", "on")
    })

    return subPanelItem
}

//@auto-fold here
export function functionButtonCreater(name, buttonFunction){
    let functionButton = document.createElement("div")
    functionButton.innerHTML = name
    functionButton.classList.add("functionButton")
    functionButton.addEventListener("click", buttonFunction)
    return functionButton
}



export function createSwitchViewModeButton(fullPageModeDiv, overviewModeDiv){
    let switchViewModeButton = document.createElement("button")
    switchViewModeButton.innerText = "pageMode"
    switchViewModeButton.setAttribute("mode", "pageMode")

    switchViewModeButton.addEventListener("click", function(e){
       let mode = (switchViewModeButton.getAttribute("mode") == "overviewMode") ? "pageMode": "overviewMode"
       switchViewModeButton.setAttribute("mode", mode)
       switchViewModeButton.innerText = mode

       if (mode=="overviewMode"){
          fullPageModeDiv.setAttribute("status", "off")
          overviewModeDiv.setAttribute("status", "on")

          // pageViewHelperFunction.renderOverviewMode()
       } else {
          fullPageModeDiv.setAttribute("status", "on")
          overviewModeDiv.setAttribute("status", "off")
          // pageViewHelperFunction.renderFullPageMode()
       }
    })
    return switchViewModeButton
}

export function createNewPage(currentStatus, fullPageModeDiv:HTMLDivElement, overviewModeDiv:HTMLDivElement, fullPageData?, overviewPageData?, saveToDatabase=true){
    let newPage = GreatNoteDataClass.GNContainerDiv({name: "fullPage", arrayID: mainController.mainDocArray["mainArray_pageFull"], insertPosition: false, dataPointer: false, saveToDatabase: saveToDatabase, specialCreationMessage: "createNewFullPageObject"})

    newPage.classList.add("divPage")
    newPage._dataStructure = ["innerText"]
    newPage._styleStructure = ["background", "width", "height"]

    let newPageAccesssPointer = saveToDatabase? newPage.getAccessPointer(): false // to avoid error when saveToDatabase is false and you cannot get the accessPointer of the new pagge
    let smallView = GreatNoteDataClass.GNContainerDiv({name: "overviewPage", arrayID: mainController.mainDocArray["mainArray_pageOverview"], insertPosition: false, dataPointer: newPageAccesssPointer, saveToDatabase: saveToDatabase, specialCreationMessage: "createNewOverviewPageObject"})
    smallView.classList.add("divPageSmall")
    smallView._dataStructure = ["innerText"]
    smallView._styleStructure = ["background", "width", "height"]
    smallView.style.background = "pink"
    smallView.style.width = `${currentStatus.overviewPageSize[0]}px`
    smallView.style.height = `${currentStatus.overviewPageSize[1]}px`

    //
    // let smallViewContent = document.createElement("div")
    // smallViewContent.classList.add("smallViewContent")
    // let smallViewDescription = document.createElement("div")
    // smallViewDescription.classList.add("smallViewDescription")
    // smallView.append(smallViewContent, smallViewDescription)

    // ==========================
    // add events to smallView
    // ==========================
    // smallViewDescription.innerText = `${pkmDatabase[dummyNumber].name}`

    // ==========================
    // add events to smallView
    // ==========================
    addEventToNewPage(currentStatus, newPage)
    clickEventOfSmallPage(currentStatus, smallView)

    // if saveToDatabase is false, then you do not need to save it
    if (saveToDatabase){
        newPage.saveHTMLObjectToDatabase()
        smallView.saveHTMLObjectToDatabase()
    }

    if (fullPageData && overviewPageData){
        fillInNewPageDataContent(newPage, fullPageData)
        fillInSmallViewDataContent(smallView, overviewPageData)
        // fillInDataContent(fullPageData, overviewPageData)
        // socket.emit("clientAskServerToInitiateSynchronization")
    }
    return [newPage, smallView]
}


import * as GreatNoteSvgDataClass from "./GreatNoteSVGDataClass"

export function fillInNewPageDataContent(newPage, fullPageData){
    newPage.initializeHTMLObjectFromData(fullPageData)
    console.log(227, fullPageData)
    newPage.innerText = fullPageData.data.innerText
}

export function fillInSmallViewDataContent(smallView, overviewPageData){
    smallView.initializeHTMLObjectFromData(overviewPageData)
    let smallViewDescription = smallView.querySelector(".smallViewDescription")
    // smallViewDescription.innerText = overviewPageData.data.innerText
}


export function addEventToNewPage(currentStatus, newPage){
    newPage.addEventListener("click", function(e){
      console.log(240, "pageViewHelperFunction", e.target._identity)
      if (newPage.contains(e.target)){

      // if (newPage.compareDocumentPosition(e.target)){
          if (currentStatus.selectedObject) currentStatus.selectedObject.classList.remove("selectedObject")
          currentStatus.selectedObject = e.target
          e.target.classList.add("selectedObject")
          // e.target.style.background = "maroon"
      }

    })
}

export function insertNewPage(currentStatus, newFullPage, newSmallView, fullPageModeDiv, overviewModeDiv){
    // get the new page number
    let newPageNumber = currentStatus.newPageNumber

    currentStatus.newPageNumber += 1
    currentStatus.pageArrayFullPage.splice(newPageNumber, 0, newFullPage)
    currentStatus.pageArraySmallView.splice(newPageNumber, 0, newSmallView)
    currentStatus.previousPage = currentStatus.currentPage ? currentStatus.currentPage:null
    currentStatus.currentPage = newFullPage

    // ==========================
    // appending new pages to the fullPageModeDiv and overviewModeDiv
    //==========================

    newFullPage.setAttribute("pageNumber", newPageNumber)
    fullPageModeDiv.append(newFullPage)

    newSmallView.setAttribute("pageNumber", newPageNumber)
    let smallViewContent = newSmallView.querySelector(".smallViewContent")
    // smallViewContent.innerText = newPageNumber
    overviewModeDiv.append(newSmallView)

    if (currentStatus.previousPage){
        fullPageModeDiv.insertBefore(newFullPage,  currentStatus.pageArrayFullPage[newPageNumber-1])
        fullPageModeDiv.insertBefore( currentStatus.pageArrayFullPage[newPageNumber-1], newFullPage)
        overviewModeDiv.insertBefore(newSmallView, currentStatus.pageArraySmallView[newPageNumber-1])
        overviewModeDiv.insertBefore( currentStatus.pageArraySmallView[newPageNumber-1], newSmallView)
    }

    //
    updatePageNumberInNewOrder(currentStatus)
    // highlight and update the pageNumberInput
    let pageNumberInput = document.querySelector(".pageNumberInput")
    pageNumberInput.value = newPageNumber
    highlightCurrentPageInOverviewMode(newSmallView, newPageNumber, currentStatus)
}

//@auto-fold here
export function createNewPageEvent(currentStatus, fullPageModeDiv, overviewModeDiv, pageDummyContent, htmlObject?:HTMLElement|HTMLDivElement){
    // when click the new page button, a new page is created.

    // add new page fullPageMode
    let clickEventAction = function (){
          let [newPage, smallView] = createNewPage(currentStatus, fullPageModeDiv, overviewModeDiv)
          insertNewPage(currentStatus, newPage, smallView, fullPageModeDiv, overviewModeDiv)
    }


    return clickEventAction
}

function clickEventOfSmallPage(currentStatus, smallPage){
    // click
    smallPage.addEventListener("click", function(){
        let clickedPageNumber = smallPage.getAttribute("pageNumber")

        // the next page is the clicked page + 1
        currentStatus.newPageNumber = parseInt(clickedPageNumber)+1
        highlightCurrentPageInOverviewMode(smallPage, clickedPageNumber, currentStatus)

        for(let i = 1; i < currentStatus.pageArrayFullPage.length; i++){
            if (i < clickedPageNumber){
                // pages before the clicked page
                currentStatus.pageArrayFullPage[i].style.left = "-100vw"
            } else if (i == clickedPageNumber){
                currentStatus.pageArrayFullPage[i].style.left = "0"
            } else {
                currentStatus.pageArrayFullPage[i].style.left = "+100vw"
            }
        }


        updatePageController(currentStatus, clickedPageNumber)
    })
}


// extract and create data object do not directly save object to the database.
// What is saved to the database is controlled by the saveHTMLOBjectTODatabase function in the mainController file
