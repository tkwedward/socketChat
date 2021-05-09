import {mainController} from "./constructInitialCondition"
import * as GreatNoteDataClass from "./GreatNoteClass/GreatNoteDataClass"
import * as GreatNoteSvgDataClass from "./GreatNoteClass/GreatNoteSVGDataClass"
import {socket} from "./socketFunction"
import {highlightCurrentPageInOverviewMode} from "./pageControllerFolder/pageController"
// import {pageController, updatePageController, updatePageNumberInNewOrder, highlightCurrentPageInOverviewMode} from "./pageControllerFolder/pageController"

//@auto-fold here
export function createSubPanel(name:string, first:boolean){
    let subPanelTemplate = <HTMLTemplateElement>document.querySelector("#subPanelTemplate")
    let subPanel = document.importNode(subPanelTemplate.content, true)
    let subPanelNavbarTitle = subPanel.querySelector(`.subPanelTitle`)
    subPanelNavbarTitle.innerHTML = `${name}`
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
        Array.from(subPanelArray).forEach(p =>{
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

export function createNewPage(pageController, fullPageModeDiv:HTMLDivElement, overviewModeDiv:HTMLDivElement, fullPageData?, overviewPageData?, saveToDatabase=true){
    let newPage = GreatNoteDataClass.GNContainerDiv({name: "fullPage", arrayID: mainController.mainDocArray["mainArray_pageFull"], insertPosition: false, dataPointer: false, saveToDatabase: saveToDatabase, specialCreationMessage: "createNewFullPageObject"})

    newPage.classList.add("divPage", "fullPage")
    newPage._dataStructure = ["innerText"]
    newPage._styleStructure = ["background", "width", "height"]
    // newPage.style.width = `${pageController.fullPageSize[0]}px`
    // newPage.style.height = `${pageController.fullPageSize[1]}px`

    let newPageAccesssPointer = saveToDatabase? newPage.getAccessPointer(): false // to avoid error when saveToDatabase is false and you cannot get the accessPointer of the new pagge
    let smallView = GreatNoteDataClass.GNContainerDiv({name: "overviewPage", arrayID: mainController.mainDocArray["mainArray_pageOverview"], insertPosition: false, dataPointer: newPageAccesssPointer, saveToDatabase: saveToDatabase, specialCreationMessage: "createNewOverviewPageObject"})
    smallView.classList.add("divPageSmall")
    smallView._dataStructure = ["innerText"]
    smallView._styleStructure = ["background", "width", "height"]
    smallView.style.background = "pink"
    smallView.style.width = `${pageController.overviewPageSize[0]}px`
    smallView.style.height = `${pageController.overviewPageSize[1]}px`

    // ==========================
    // add events to smallView
    // ==========================
    // smallViewDescription.innerText = `${pkmDatabase[dummyNumber].name}`

    // ==========================
    // add events to smallView
    // ==========================
    addEventToNewPage(pageController, newPage)
    clickEventOfSmallPage(pageController, smallView)

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

export function fillInNewPageDataContent(newPage, fullPageData){
    newPage.initializeHTMLObjectFromData(fullPageData)
    newPage.innerText = fullPageData.data.innerText
}

export function fillInSmallViewDataContent(smallView, overviewPageData){
    smallView.initializeHTMLObjectFromData(overviewPageData)
    let smallViewDescription = smallView.querySelector(".smallViewDescription")
    // smallViewDescription.innerText = overviewPageData.data.innerText
}


export function addEventToNewPage(pageController, newPage){
    newPage.addEventListener("click", function(e){
      if (newPage.contains(e.target)){
          if (pageController.selectedObject) pageController.selectedObject.classList.remove("selectedObject")
          pageController.selectedObject = e.target
          e.target.classList.add("selectedObject")
      }

    })
}

export function insertNewPage(pageController, newFullPage, newSmallView, fullPageModeDiv, overviewModeDiv){
    pageController.addPage(newFullPage, newSmallView)

    // ==========================
    // appending new pages to the fullPageModeDiv and overviewModeDiv
    //==========================
    // newFullPage.setAttribute("pageNumber", newPageNumber)
    fullPageModeDiv.append(newFullPage)

    // newSmallView.setAttribute("pageNumber", newPageNumber)
    overviewModeDiv.append(newSmallView)

    // highlight and update the pageNumberInput
    let pageNumberInput = <HTMLInputElement> document.querySelector(".pageNumberInput")
    pageNumberInput.value = pageController.currentPage.pageNumber
    // highlightCurrentPageInOverviewMode(newSmallView, pageController)
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
                currentStatus.pageArrayFullPage[i].style.left = "-200%"
            } else if (i == clickedPageNumber){
                currentStatus.pageArrayFullPage[i].style.left = "0"
            } else {
                currentStatus.pageArrayFullPage[i].style.left = "+200vw"
            }
        }


        // updatePageController(currentStatus, clickedPageNumber)
    })
}


// extract and create data object do not directly save object to the database.
// What is saved to the database is controlled by the saveHTMLOBjectTODatabase function in the mainController file
