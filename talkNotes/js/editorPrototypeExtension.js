let div = document.createElement("div").__proto__

console.log(div);

div.appendBefore = function (element){
  element.parentNode.insertBefore(this, element);
}

div.appendAfter = function (element){
  element.parentNode.insertBefore(this, element.nextSibling);
}

div.tellMe = function(){
    console.log("hello world");
}
