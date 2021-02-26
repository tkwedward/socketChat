class PageController{
    constructor(svg){
        this.pageArray = [[svgSoul, 0]]
        this.currentPage = 0
        this.colorArray = ["#e4419a", "#4fc459", "#c7457b"]
        let searchedPage = this.searchPage(0)
        this.count = 0
    }

    getNextPage(){
        this.currentPage  += 1
        if (this.currentPage < this.pageArray .length){
            this.currentPage  += 1
            let newPageSVG = this.searchPage(this.currentPage)
            this.renderPage(newPageSVG)
        } else {
            console.log("this is the last page");
        }
    }

    getPreviousPage(){
        if (this.currentPage == 0){
            console.log("this is the last page");
        } else {
            this.currentPage  -= 1
            let newPageSVG = this.searchPage(this.currentPage)
            this.renderPage(newPageObject)
        }
    }

    addTouchEventToPage(svgHtmlObject){
          svgHtmlObject.addEventListener("touchstart", function(e){
              // e.preventDefault()
              let touchType = checkTouchType(e)
              if (touchType == "pen"){
                  e.preventDefault()

                  currentStatus.startTouchX = e.touches[0].pageX - currentStatus.svgOffsetLeft
                  currentStatus.startTouchY = e.touches[0].pageY -
                  currentStatus.svgOffsetTop

                  // touch X and Y
                  currentStatus.touchX = e.touches[0].pageX - currentStatus.svgOffsetLeft
                  currentStatus.touchY = e.touches[0].pageY -
                  currentStatus.svgOffsetTop

                  console.log(currentStatus);

                  currentStatus.drawObject.create()
              }
          }, true)

          svgHtmlObject.addEventListener("touchmove", function(e){
              // lastTouchX, lastTouchY
              // console.log(e.targetTouches[0].radiusX);
              let touchType = checkTouchType(e)
              if (touchType == "pen"){
                  e.preventDefault()
                  console.log(currentStatus);
                  currentStatus.lastTouchX = currentStatus.touchX
                  currentStatus.lastTouchY = currentStatus.touchY
                  currentStatus.touchX = e.touches[0].pageX - currentStatus.svgOffsetLeft
                  currentStatus.touchY = e.touches[0].pageY -
                  currentStatus.svgOffsetTop

                  // draw path
                  currentStatus.pathArray.push([currentStatus.touchX, currentStatus.touchY])

                  currentStatus.drawObject.draw(e)
              }
          }, true)

          svgHtmlObject.addEventListener("touchend", function(e){

              if (currentStatus.drawObject.up){
                console.log("touchleave");
                  currentStatus.drawObject.up()
              }
          })

    }

    addPage(){
        let newSVG = document.createElement("svg")
        let newSVGSoul = SVG()
        let nextPage = this.pageArray.length
        // newSVGSoul.node.style.background = "blue"
        newSVGSoul.node.style.background = this.colorArray[(this.count) % this.colorArray.length]
        this.count += 1
        newSVGSoul.node.style.position = "absolute"
        newSVGSoul.node.style.width = "100vw"
        newSVGSoul.node.style.height = "100vh"
        newSVGSoul.node.style.top = "0"
        newSVGSoul.node.style.left = "0"
        newSVGSoul.node.classList.add(`page_${nextPage}`)

        this.pageArray.push([newSVGSoul, nextPage])
        console.log(this.pageArray);
        currentStatus.layer = newSVGSoul
        this.addTouchEventToPage(newSVGSoul.node)
        this.renderPage(newSVGSoul)
    }

    renderPage(svgSoul){
        currentStatus.layer.node.remove()
        svgContainer.append(svgSoul.node)
    }

    searchPage(pageNum){
        let result
        for (let i=0; i < this.pageArray.length; i++){
            console.log(this.pageArray[i]);
            if (this.pageArray[i][1]==pageNum){
                result = this.pageArray[i][0]
                console.log(result);
                break
            }
        }
        return result
    }

    removePage(pageNum){

    }
}
