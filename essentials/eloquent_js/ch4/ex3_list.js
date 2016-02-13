function arrayToList(arr){
  var list = [];
  var prev_list = null; 

   for (var i=arr.length-1; i>=0; i--){
     // create new object
     var obj = {};
     obj.value = arr[i];
     obj.rest = prev_list;
     list.push(obj);
     // set reference to previous object
     prev_list = obj; 
   }
  
   return list.pop();
}

function listToArray(list){
  var arr = [];
  for (var node = list; node ; node = node.rest){
    arr.push(node.value);
  }

  return arr;
}

console.log(arrayToList([10,20,30]));
console.log(listToArray(arrayToList([10,20,30])));
