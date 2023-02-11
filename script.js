/*
  Question 1: Clean the room function: given an input of [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20], 
  make a function that organizes these into individual array that is ordered. 
  For example answer(ArrayFromAbove) should return: [[1,1,1,1],[2,2,2], 4,5,10,[20,20], 391, 392,591]. 
  Bonus: Make it so it organizes strings differently from number types. i.e. [1, "2", "3", 2] should return [[1,2], ["2", "3"]]
*/

const disArray = [1, 2, 4, 51, "51", 591, null, {name: 1}, ['x', 1], undefined, 392, 391, "aaa", 2, 5, 0, 10, 2, 1, 1, 1, "test", "20", "zzz", "bbb", 20];

function sortArray(arr) {
  return arr
    // filter out all but numer or strings with numbers 
    .filter(item => (typeof item === "string" || typeof item === "number") && !isNaN(item))
    // sort values from lowest to highest
    .sort((a, b) => typeof a === 'string' && a == b ? 1 : a - b)
    // group repeating values into arrays and leave the rest as single items  
    .reduce((acc, item, index, array) => {
      if (item !== array[index - 1]) {
        if (item !== array[index + 1]) {
          // if previous and next values are different push item to accumulator as single item
          acc.push(item);  
        } else {
          // if only previous value is different push item to accumulator as an array
          acc.push([item]);
        }
      } else {
        // if previous value is the same push to accumulator's last item aray
        acc[acc.length - 1].push(item);
      }
      return acc;
    }, []);
}

console.log(sortArray(disArray));
