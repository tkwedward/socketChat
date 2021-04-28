"use strict";
exports.__esModule = true;
exports.highlightCurrentPageInOverviewMode = exports.pageControllerHTMLObject = exports.initializePageController = void 0;
function initializePageController() {
    var startPage = { "previous": null, "next": null, pageNumber: 0 };
    var endPage = { "previous": startPage, "next": null, pageNumber: 1 };
    startPage.next = endPage;
    var pageController = {
        "startPage": startPage,
        "endPage": endPage,
        "currentPage": startPage,
        "EventReceiver": document.createElement("span"),
        "totalPageNumber": 0,
        "fullPageSize": [1187, 720],
        "overviewPageSize": [237.4, 144],
        "selectedObject": null
    };
    pageController.updatePageNumber = function (initialPage) {
        if (initialPage === void 0) { initialPage = pageController.startPage; }
        var _currentPageNumber = initialPage.pageNumber;
        var _currentPage = initialPage;
        while (_currentPage) {
            _currentPage.pageNumber = _currentPageNumber;
            _currentPageNumber += 1;
            _currentPage = _currentPage.next;
        }
    };
    pageController.addPage = function (fullPageHTMLObject, smallViewHTMLObject) {
        var newPage = { pageNumber: -1, previous: null, next: null, fullPageHTMLObject: null, smallViewHTMLObject: null };
        var alpha = pageController.currentPage;
        var beta = pageController.currentPage.next;
        newPage.previous = alpha;
        newPage.next = beta;
        alpha.next = newPage;
        beta.previous = newPage;
        pageController.currentPage = newPage;
        newPage.fullPageHTMLObject = fullPageHTMLObject;
        newPage.smallViewHTMLObject = smallViewHTMLObject;
        newPage.fullPageHTMLObject.style.left = "0%";
        if (alpha.fullPageHTMLObject) {
            alpha.fullPageHTMLObject.style.left = "-100%";
        }
        pageController.updatePageNumber(alpha);
        pageController.totalPageNumber += 1;
    };
    pageController.getPage = function (pageNumber) {
        var _currentPage = pageController.startPage;
        while (_currentPage) {
            if (_currentPage.pageNumber == pageNumber)
                break;
            _currentPage = _currentPage.next;
        }
        return _currentPage;
    };
    pageController.goToPage = function (pageNumber) {
        var _targetPage = pageController.getPage(pageNumber);
        console.log(_targetPage);
        _targetPage.fullPageHTMLObject.style.left = "0%";
        // set the position of the page according to the position relative to the targetPage
        pageController.currentPage.fullPageHTMLObject.style.left = (_targetPage.pageNumber > pageController.currentPage.pageNumber) ? "-100%" : "+100%";
        pageController.currentPage = _targetPage;
    };
    pageController.printAllPage = function () {
        var array = [];
        var _currentPage = pageController.startPage;
        while (_currentPage) {
            array.push(_currentPage);
            _currentPage = _currentPage.next;
        }
        console.log(array);
    };
    pageController.transvereList = function (action) {
        var _currentPage = pageController.startPage;
        while (_currentPage) {
            action(_currentPage);
            _currentPage = _currentPage.next;
        }
    };
    pageController.EventReceiver.addEventListener("goToPageEvent", function (e) {
        pageController.goToPage(e["detail"].pageNumber);
        // console.log(pageController.currentPage.pageNumber)
    });
    return pageController;
}
exports.initializePageController = initializePageController;
//@auto-fold here
function pageControllerHTMLObject(pageController, subPanelContainer) {
    var pageNavigator = document.createElement("div");
    pageNavigator.classList.add("pageNavigator");
    var pageNumberInput = document.createElement("input");
    pageNumberInput.classList.add("pageNumberInput");
    pageNumberInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            var goToPageEvent = new CustomEvent("goToPageEvent", { 'detail': { pageNumber: parseInt(pageNumberInput.value) } });
            pageController.EventReceiver.dispatchEvent(goToPageEvent);
        }
    });
    var leftButton = document.createElement("div");
    var rightButton = document.createElement("div");
    leftButton.innerHTML = "L";
    pageNumberInput.value = "1";
    pageNumberInput.style.margin = "0 auto";
    rightButton.innerHTML = "R";
    pageNavigator.append(leftButton, pageNumberInput, rightButton);
    subPanelContainer.append(pageNavigator);
    //@auto-fold here
    function leftButtonClickEvent() {
        if (pageController.currentPage.pageNumber > 1) {
            pageController.currentPage.fullPageHTMLObject.style.left = "+100%";
            // show the new page
            pageController.currentPage = pageController.currentPage.previous;
            pageController.currentPage.fullPageHTMLObject.style.left = "0%";
            pageNumberInput.value = pageController.currentPage.pageNumber;
        }
    }
    leftButton.addEventListener("click", leftButtonClickEvent);
    leftButton.addEventListener("touchstart", leftButtonClickEvent);
    // turn to next page
    //@auto-fold here
    function rightButtonClickEvent() {
        if (pageController.currentPage.pageNumber < pageController.totalPageNumber) {
            pageController.currentPage.fullPageHTMLObject.style.left = "-100%";
            // show the new page
            pageController.currentPage = pageController.currentPage.next;
            pageController.currentPage.fullPageHTMLObject.style.left = "0%";
            pageNumberInput.value = pageController.currentPage.pageNumber;
        }
    }
    rightButton.addEventListener("click", rightButtonClickEvent);
} // right Button
exports.pageControllerHTMLObject = pageControllerHTMLObject;
function highlightCurrentPageInOverviewMode(smallPageView, currentPageNumber, currentStatus) {
    // for (let i = 1; i < currentStatus.pageArraySmallView.length; i++){
    //     currentStatus.pageArraySmallView[i].style.border = "0px"
    // }
    // let currentPageHtml = currentStatus.pageArraySmallView[currentPageNumber]
    //  // smallPageView.parentNode.querySelector(`.divPageSmall[pageNumber='${currentPageNumber}']`)
    // currentPageHtml.style.border = "3px red solid"
}
exports.highlightCurrentPageInOverviewMode = highlightCurrentPageInOverviewMode;
