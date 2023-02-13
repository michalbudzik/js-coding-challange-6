/*
    Question 3: Write a function that converts HEX to RGB. 
    Then Make that function autodect the formats so that if you enter HEX color format it returns RGB and if you enter RGB color format it returns HEX. 
    Bonus: Release this tool as a npm package.

    correct HEX formats: #ffffff, ffffff
    correct RGB formats: rgb(255, 255, 255), rgb(255,255,255)
*/

// Helper Function Converting any HEX to Decimal Value
function hexToDec(hex) {
    return parseInt(hex, 16);
}

// Helper Function Converting any Decimal to HEX Value
function decToHex(dec) {
    return dec.toString(16);
}

// Convert HEX color to RGB color
function convertHexToRGB(input) {
    try {
        // Handle Obvioulsy Wrong Input
        errMsg = 'Input is not a correct HEX color.';
        if (typeof input !== 'string' || input.length < 6 || input.length > 7 || (input.length === 7 && input.substring(0, 1) !== "#")) {
            throw new Error(errMsg);
        } else {
            // Output RGB String
            let output;
            // Buffer Variable to Modify Original Input 
            let preOutput = input;
            // Remove # from Color Value if it's there
            if (input.length === 7 && input.substring(0, 1) === "#") {
                preOutput = input.slice(1, input.length);
            }
            // Split Six Characters from Color Value to Three Pairs Representing R,G,B Color Values
            preOutput = preOutput.match(/.{2}/g)
            // Format Beginning of Output RGB String
            output = 'rgb(';
            preOutput.forEach(part => {
                // Throw Error if any of R, R, B Values is not Convertable to Decimal Value
                if (isNaN(hexToDec(part))) {
                    throw new Error(errMsg);
                }
                // Else Add Value to Output RGB String
                output += hexToDec(part) + ', ';
            });
            // Format End of Output RGB String
            output = output.substring(0, output.length - 2);
            output += ')';
            // Return Output RGB String
            return output;
        }
    } catch (err) {
        console.error(err.message);
        // Return Original Input if Conversion was Unsuccessful
        return input;
    }
}

// Convert RGB color to HEX color
function convertRGBToHex(input) {
    try {
        // Handle Obvioulsy Wrong Input
        errMsg = 'Input is not a correct RGB color.';
        if (typeof input !== 'string' || input.substring(0, 4) !== "rgb(" || input.slice(-1) !== ")") {
            throw new Error(errMsg);
        } else {
            // Output HEX String
            let output;
            // Buffer Variable to Modify Original Input 
            let preOutput = input;
            // Remove Beginning and End of Original Input RGB String
            preOutput = preOutput.slice(4, -1);
            // Split Original Input RGB String to Three Numbers
            preOutput = preOutput.split(",");
            // Format  Beginning of Output HEX String
            output = '#';
            preOutput.forEach(part => {
                // Trim Partial Number and Make Sure its Type is Number
                const partValue = part.trim() * 1;
                // Throw Error if any of R, R, B Values is not Correct Color Value
                if (!Number.isInteger(partValue) || partValue < 0 || partValue > 255) {
                    throw new Error(errMsg);
                }
                // Else Add Value to Output HEX String
                output += decToHex(partValue);
            });
            return output;
        }
    } catch (err) {
        console.error(err.message);
        // Return Original Input if Conversion was Unsuccessful
        return input;
    }
}

function switchHexRGB(input) {
    // Try to Convert Input to RGB Color
    let output = convertHexToRGB(input);  
    if (input === output) {
        // If Unsuccessful Convert Input to HEX Color
        output = convertRGBToHex(input);
        if (input === output) {
            // If Unsuccessful Return False
            return false;
        } else {
            // If Successful Return HEX Color
            return output;    
        }
    } else {
        // If Successful Return RGB Color
        return output;
    }
}

console.log(switchHexRGB(null));
console.log(switchHexRGB(undefined));
console.log(switchHexRGB(['1', 0]));
console.log(switchHexRGB({name : 'test'}));
console.log(switchHexRGB('0ffaaff'));
console.log(switchHexRGB('#ffaaffx'));
console.log(switchHexRGB('#ffaaff'));
console.log(switchHexRGB('aaaaff'));
console.log(switchHexRGB('rgb(sfsdfsdfs)'));
console.log(switchHexRGB('rgb(255, 255, 255)'));
console.log(switchHexRGB('rgb(120,34,76)'));
