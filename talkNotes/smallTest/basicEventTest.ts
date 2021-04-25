
//
//
// function renderLatex(latexMotherCell, latexChildCell){
//
//      function findPattern(pattern){
//         let motherText = latexMotherCell.innerHTML.match(pattern)
//         let newMotherHTML = latexMotherCell.innerHTML
//         if (motherText){
//
//             motherText.forEach(p=>{
//                 let beforePattern = p
//                 p = p.slice(2, p.length-2);
//                 p = p.split("@").join("\\").split("##").join("$$")
//                 // console.log(beforePattern);
//                  MathJax.tex2svgPromise(p, {em: 12, ex: 6, display: false})
//                   .then((html) => {
//
//                       // console.log(html.outerHTML);
//                       newMotherHTML=  newMotherHTML.replace(beforePattern, html.outerHTML)
//                       // console.log(newMotherHTML);
//                       latexChildCell.innerHTML = newMotherHTML
//                   });
//             })
//         } else{
//             latexChildCell.innerHTML = newMotherHTML
//         }
//     }//findPattern
//
//
//     let pattern1 = /@[(](.*?)@[)]/g
//     let pattern2 = /##(.*?)##/g
//
//
//     findPattern(pattern1)
//     findPattern(pattern2)
//
// }// renderLatex
//
//
//
//
//
// let latexOutput = document.querySelector(".latexOutput")
// let latexInput = document.querySelector(".latexInput")
// latexInput.addEventListener("input", (e)=>{
//     renderLatex(latexInput, latexOutput)
// })
