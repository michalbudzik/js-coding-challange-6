/*
  Question 2: Write a javascript function that takes an array of numbers and a target number. 
  The function should find two different numbers in the array that, when added together, give the target number. 
  For example: answer([1,2,3], 4) should return [1,3]
*/

function findSumParts(arr, num) {
    // return error if arr is not an array or num is not a number
    if (!Array.isArray(arr) || typeof num !== 'number') {
        throw new Error('First input must be an array, second a number.');
    }
    try {
        return arr
            // slice to make a copy and prevent modifying original input
            .slice(0)
            .reduce((acc, item, index, array) => {
                // check if next elements of array contain value of (num - current item)
                if (arr.includes(num - item, index + 1)) {
                    // push current item and found next item to accumulator array
                    acc.push(item, arr[arr.indexOf(num - item, index + 1)]);
                    // clear the array to break out of reduce loop
                    array.splice(0, array.length);
                }
                return acc;
            }, []);
    } catch (err) {
        // Return error if inputs are wrong
        return 'Something went wrong: ' + err;
    }
}

console.log(findSumParts(null));
console.log(findSumParts(undefined));
console.log(findSumParts('test'));
console.log(findSumParts(0));
console.log(findSumParts({ name: 'test' }));
console.log(findSumParts([1, 2, 3, 4], [1, 2]));
console.log(findSumParts([{ name: 1 }, ['test', 1], null, undefined, 2, 5, 7, 8, 1, 2, 2, 3, 3], 4));