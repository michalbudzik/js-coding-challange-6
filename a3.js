/*
    Question 3: Write a function that converts HEX to RGB. 
    Then Make that function autodect the formats so that if you enter HEX color format it returns RGB and if you enter RGB color format it returns HEX. 
    Bonus: Release this tool as a npm package.

    correct HEX formats: #ffffff, ffffff
    correct RGB formats: rgb(255, 255, 255), rgb(255,255,255)
*/

function hexToDec(hex) {
    return parseInt(hex, 16);
}

function decToHex(dec) {
    return dec.toString(16);
}

function convertHexToRGB(input) {
    try {
        errMsg = 'Input is not a correct HEX color.';
        if (typeof input !== 'string' || input.length < 6 || input.length > 7 || (input.length === 7 && input.substring(0, 1) !== "#")) {
            throw new Error(errMsg);
        } else {
            let output;
            let preOutput = input;
            if (input.length === 7 && input.substring(0, 1) === "#") {
                preOutput = input.slice(1, input.length);
            }
            preOutput = preOutput.match(/.{2}/g)
            output = 'rgb(';
            preOutput.forEach(part => {
                if (isNaN(hexToDec(part))) {
                    throw new Error(errMsg);
                }
                output += hexToDec(part) + ', ';
            });
            output = output.substring(0, output.length - 2);
            output += ')';
            return output;
        }
    } catch (err) {
        console.error(err.message);
        return input;
    }
}

function convertRGBToHex(input) {
    try {
        errMsg = 'Input is not a correct RGB color.';
        if (typeof input !== 'string' || input.substring(0, 4) !== "rgb(" || input.slice(-1) !== ")") {
            throw new Error(errMsg);
        } else {
            let output;
            let preOutput = input.slice(4, -1);
            preOutput = preOutput.split(",");
            output = '#';
            preOutput.forEach(part => {
                const partValue = part.trim() * 1;
                if (!Number.isInteger(partValue) || partValue < 0 || partValue > 255) {
                    throw new Error(errMsg);
                }
                output += decToHex(partValue);
            });
            return output;
        }
    } catch (err) {
        console.error(err.message);
        return input;
    }
}

function switchHexRGB(input) {
    const output = convertHexToRGB(input); 
    if (input === output) {
        return convertRGBToHex(input)
    } else {
        return output;
    }
}

// console.log(convertHexToRGB(null));
// console.log(convertHexToRGB(undefined));
// console.log(convertHexToRGB(['1', 0]));
// console.log(convertHexToRGB({name : 'test'}));
// console.log(convertHexToRGB('0ffaaff'));
// console.log(convertHexToRGB('#ffaaffx'));
// console.log(convertHexToRGB('#ffaaff'));
// console.log(convertHexToRGB('aaaaff'));

// console.log(convertRGBToHex(null));
// console.log(convertRGBToHex(undefined));
// console.log(convertRGBToHex(['1', 0]));
// console.log(convertRGBToHex({ name: 'test' }));
// console.log(convertRGBToHex('rgbxsfdfsdfsdf'));
// console.log(convertRGBToHex('rgb(sfsdfsdfs'));

console.log(switchHexRGB('rgb(sfsdfsdfs)'));
console.log(switchHexRGB('rgb(255, 255, 255)'));
console.log(switchHexRGB('rgb(120,34,76)'));
console.log(switchHexRGB('#ffaaffx'));
console.log(switchHexRGB('#ffaaff'));
console.log(switchHexRGB('aaaaff'));
