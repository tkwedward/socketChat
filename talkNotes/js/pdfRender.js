let addPageButton = document.querySelector("#addPage")
addPageButton.addEventListener("click", function(){
    // create button SubFunctions
    pageController.addPage()
})

let canvas = document.querySelector(".pdfCanvas")
let ctx = canvas.getContext("2d")


let pdfState = {
  context: ctx,
  pdf: null,
  currentPage:1,
  zoom: 1.5,
  viewport: null
}

let filePath = "pdf/Designing Data Intensive Applications.pdf"

pdfjsLib.getDocument(filePath)
      .promise.then(pdf=>{

        pdfState.pdf = pdf
        render()

      })

function render(){
      pdfState.pdf.getPage(pdfState.currentPage).then(page=>{
          let viewport = page.getViewport({
            scale: pdfState.zoom
          })
          pdfState.viewport = viewport

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          var renderContext = {
              canvasContext: pdfState.context,
              viewport: pdfState.viewport,
          };
          page.render(renderContext)
          return page.getTextContent()
      }).then(textContent => {
        console.log(textContent);

        let imageData = canvas.toDataURL()
        let canvasHeight = canvas.height
        svgDim = svgHtmlObject.getClientRects()[0]
        console.log(svgHtmlObject);
        // svgHtmlObject.height = canvasHeight

        // currentStatus.svgOffsetTop = svgDim.height
        svgSoul.size("100vw", canvasHeight+"px")
        // currentStatus.svgOffsetLeft += canvas.width

        // textLayer = new TextLayerBuilder(textLayerDiv, pdfState.currentPage)

        // textLayer.setTextContent(textContent)
        // textLayer.appendText()
        // textLayer.renderLayer()
        // console.log(textLayer);
      })
}

let backButton = document.getElementById("go_previous")
backButton.addEventListener("click", e=>{
    if(pdfState.pdf == null || pdfState.currentPage == 1) return;

    pdfState.currentPage -= 1;
    document.getElementById("current_page").value = pdfState.currentPage

    render()

})

let nextButton = document.getElementById("go_next")
nextButton.addEventListener("click", e=>{
    if(pdfState.pdf == null || pdfState.currentPage > pdfState.pdf._pdfInfo.numPages) return;
    console.log("goToNextPage");
    pdfState.currentPage +=  1;

    document.getElementById("current_page").value = pdfState.currentPage
    render()
})

let currentPageInput = document.getElementById("current_page")
currentPageInput.addEventListener("keypress", e =>{
  if(pdfState.pdf == null) return;

  var code = (e.keyCode ? e.keyCode: e.which)
  if (code == 13) {
      var desiredPage = currentPageInput.value
      console.log(desiredPage);

      if (desiredPage >= 1 && desiredPage <= pdfState.pdf._pdfInfo.numPages){
        pdfState.currentPage = parseInt(desiredPage)
        currentPageInput.value = pdfState.currentPage
        render()
      }
  }
})
