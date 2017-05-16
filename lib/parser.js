
var pathRange = /^\[([0-9]+\-[0-9]+)\]$/

function traverse(currentDestructure, obj){
  if(!obj || typeof(obj) === "string" || typeof(obj) === "number" || typeof(obj) === "boolean"){
    return obj;
  }
  var currentPaths = [];
  var currentPluck = {};
  for(var i in currentDestructure){
    if(pathRange.test(i)){
      var match = pathRange.exec(i);
      var ranges = match[1].split("-").map((inte) => {return parseInt(inte)});
      for(var j = ranges[0]; j <= ranges[1]; j++ ){
        currentPaths.push(j);
      }
    }else {
      currentPaths.push(i);
    }
  }

  for(var i = 0; i < currentPaths.length; i++){
    if(typeof(currentDestructure[currentPaths[i]]) === "object"){
      currentPluck[currentPaths[i]] = traverse(currentDestructure[currentPaths[i]], obj[currentPaths[i]])
    } else {
      currentPluck[currentPaths[i]] = obj[currentPaths[i]];
    }
    if(currentPluck[currentPaths[i]] === undefined){
      delete currentPluck[currentPaths[i]];
    }
  }

  return currentPluck;
}

/*
var t = {
  a : {
    "[1-10]": 1
  }, b :{

  }
}

var s = {
  a: [0,1,2,3,4,5],
  b: {
    g: "K",
    c: {
      d: "E"
    }
  }
}
*/

module.exports = traverse;
