/**
 * Define a function, `cssquery`, which takes a CSS descendant selector string
 * `s` and returns an array of elements found in the document that match it.
 *
 * Don't use `document.querySelectorAll` or jQuery. Build the algorithm yourself
 * using:
 * - `document.getElementsByTagName`
 * - `document.getElementsByClassName`
 * - `document.getElementById`
 *
 * This isn't a memory test. If you need to search the web to find a particular
 * property or method signature - go ahead.
 *
 * Good luck!
 *
 *        |
 *     \  +
 *    __G//*=.
 *   (af)(/.\|
 *    \/>' (_--.
 *  _=/ b  ,^\
 * ~~ \)-'   '
 *   / |
 *  '  '
 */
var ANCESTOR = 0;
var DESCENDANT = 1;
var CLASS_TYPE = '.';
var ID_TYPE = '#';
var TAG_TYPE = 't';
var UNIVERSAL = '*';

/* definition of descendant selector taken from mdn:
   https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_selectors
*/
var cssquery = window.cssquery = function(s) {

    // descendant queries take two selectors split 
    // by 1 or more space, new lines or tab
    var trim_str = ".cool *".trim();  
    var split_str = trim_str.split(" ");
    split_str = split_str.filter(remove_spaces);

    // descendant query should take 2 or more selectors
    if (split_str.length < 2){
        return [];
    }
     
    var ancestor = split_str[ANCESTOR];
    var descendant = [];
    var ancestor_type = match_ancestor_type(ancestor);

    var match_vals = query_by_type(ancestor, ancestor_type);
    var match_list = [];
    var result_arr = [];

    var amt_descendant = 0;
    var match_count = 0;
    var is_universal = false;

    for (var i=0; i<split_str.length-1; i++){
        
        descendant[i] = split_str[i+1];
        if (descendant[i] == UNIVERSAL){
            is_universal = true;
        }
        alert("Descendant "+descendant[i]);
        amt_descendant++;
    }

    if (ancestor_type == ID_TYPE){
       match_list = match_vals.children;
       
       for (var i=0; i<match_list.length; i++) {
          // push every value if universal selector is input
          if (is_universal){
             result_arr.push(match_list[i]);
             console.log(result_arr);
             return result_arr;
          }
          else if (match_list[i].tagName == descendant[0].toUpperCase()){
             console.log(match_list[i]);
             result_arr.push(match_list[i]);
          }
       }
    }
    else{   // Class type or Tag type

        // Get children from nodelist
        for (var i=0; i<match_vals.length; i++){
            match_list[i] = match_vals[i].children;

            for (var j=0; j<match_list[i].length; j++){
                // '*' selector push all to result
                if (is_universal){
                     result_arr.push(match_list[i][j]);
                     continue;  // must add all child instances 
                }
                else if (match_list[i][j].tagName == descendant[0].toUpperCase()){
                    result_arr.push(match_list[i][j]); 
                }   
            }
        }
    }
    
    console.log(result_arr);
    return result_arr;
};

function remove_spaces(value) {
    return value != '';
}

function match_ancestor_type(ancestor) {
    var first_char = ancestor.charAt(0);
    switch(first_char) {
        case CLASS_TYPE:
            return CLASS_TYPE; 
            break;
        case ID_TYPE:
            return ID_TYPE;
            break;
        default:
            // Tag element
            return TAG_TYPE;
            break;
    }
}

function query_by_type(ancestor, a_type) {
    switch(a_type) {
        case CLASS_TYPE:
            // remove '.'
            ancestor = ancestor.substring(1);
            return document.getElementsByClassName(ancestor);
            break;
        case ID_TYPE:
            // remove '#'
            ancestor = ancestor.substring(1);
            return document.getElementById(ancestor);
            break;
        case TAG_TYPE:
            return document.getElementsByTagName(ancestor);
            break;
    }
}

// execute code on page load, for testing purposes
document.addEventListener("DOMContentLoaded", cssquery, false);
