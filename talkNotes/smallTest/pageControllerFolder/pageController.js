"use strict";
//@auto-fold here
exports.__esModule = true;
exports.highlightCurrentPageInOverviewMode = exports.updatePageNumberInNewOrder = exports.updatePageController = exports.pageController = void 0;
function pageController(currentStatus, subPanelContainer) {
    var pageNavigator = document.createElement("div");
    pageNavigator.classList.add("pageNavigator");
    var pageNumberInput = document.createElement("input");
    pageNumberInput.classList.add("pageNumberInput");
    var leftButton = document.createElement("div");
    var rightButton = document.createElement("div");
    leftButton.innerHTML = "L";
    pageNumberInput.value = "1";
    pageNumberInput.style.margin = "0 auto";
    rightButton.innerHTML = "R";
    pageNavigator.append(leftButton, pageNumberInput, rightButton);
    subPanelContainer.append(pageNavigator);
    //@auto-fold here
    leftButton.addEventListener("click", function () {
        var totalPageNumber = currentStatus.pageArrayFullPage.length;
        var currentPageNumber = parseInt(pageNumberInput.value);
        if (currentPageNumber > 1) {
            var newPageNumber = currentPageNumber - 1;
            pageNumberInput.value = newPageNumber.toString();
            currentStatus.currentPage = currentStatus.pageArrayFullPage[newPageNumber];
            currentStatus.pageArrayFullPage[currentPageNumber].style.left = "+100%";
            currentStatus.pageArrayFullPage[newPageNumber].style.left = "0%";
        }
    });
    // turn to next page
    //@auto-fold here
    rightButton.addEventListener("click", function () {
        var totalPageNumber = currentStatus.pageArrayFullPage.length;
        var currentPageNumber = parseInt(pageNumberInput.value);
        if (currentPageNumber < totalPageNumber - 1) {
            var newPageNumber = currentPageNumber + 1;
            pageNumberInput.value = newPageNumber.toString();
            currentStatus.currentPage = currentStatus.pageArrayFullPage[newPageNumber];
            currentStatus.pageArrayFullPage[currentPageNumber].style.left = "-100%";
            currentStatus.pageArrayFullPage[newPageNumber].style.left = "0%";
        } // if currentpage > 0
    });
} // right Button
exports.pageController = pageController;
function updatePageController(currentStatus, newPageNumber) {
    var pageNumberInput = document.querySelector(".pageNumberInput");
    pageNumberInput.value = newPageNumber;
    currentStatus.currentPage = newPageNumber;
    currentStatus.previousPage = newPageNumber - 1;
    currentStatus.newPage = newPageNumber + 1;
}
exports.updatePageController = updatePageController;
function updatePageNumberInNewOrder(currentStatus) {
    for (var i = 1; i < currentStatus.pageArrayFullPage.length; i++) {
        currentStatus.pageArrayFullPage[i].setAttribute("pageNumber", i);
        currentStatus.pageArraySmallView[i].setAttribute("pageNumber", i);
    }
}
exports.updatePageNumberInNewOrder = updatePageNumberInNewOrder;
function highlightCurrentPageInOverviewMode(smallPageView, currentPageNumber, currentStatus) {
    for (var i = 1; i < currentStatus.pageArraySmallView.length; i++) {
        currentStatus.pageArraySmallView[i].style.border = "0px";
    }
    var currentPageHtml = currentStatus.pageArraySmallView[currentPageNumber];
    // smallPageView.parentNode.querySelector(`.divPageSmall[pageNumber='${currentPageNumber}']`)
    currentPageHtml.style.border = "3px red solid";
}
exports.highlightCurrentPageInOverviewMode = highlightCurrentPageInOverviewMode;
