

// Prompt the user to input a word first (Partie 1)
what_are_words_worth();

// Then prompt the user to input a sentence for word count (Partie 2)
var sentence = prompt("Enter a sentence to count the words:");

// Call the function and get the word count
var numberOfWords = count_words(sentence);

// Show the number of words in the sentence
alert("The number of words in the sentence is: " + numberOfWords);



// Function to ask the user for a word and confirm its length
function what_are_words_worth() {
    let str = prompt('Entrez un mot');  // Prompt user to input a word
    let result = confirm('la longueur de votre mot est-elle de ' + str.length + ' lettres ?');  // Confirm the length of the word
    return result;  // Return the confirmation result (true or false)
}

// Function to count the number of words in a string by counting spaces and adding 1
function count_words(string_of_words) {
    let count_space = 0;  // Variable to store the number of spaces (words are separated by spaces)
    for (let i = 0; i < string_of_words.length; ++i) {  // Loop through each character in the string
        if (string_of_words.charAt(i) === " ") {  // Check if the current character is a space
            ++count_space;  // Increment space count
        }
    }
    return count_space + 1;  // Return the number of words (spaces + 1)
}

// Function to count occurrences of a specific letter in a string and adds 1 for the word count
function count_words_by(string_of_words, letter) {
    let count_letter = 0;  // Variable to store the number of occurrences of the specified letter
    for (let i = 0; i < string_of_words.length; ++i) {  // Loop through each character in the string
        if (string_of_words.charAt(i) === letter) {  // Check if the current character matches the specified letter
            ++count_letter;  // Increment the letter count
        }
    }
    return count_letter + 1;  // Return the count of the letter + 1 (for the word count)
}

// Function to check if a character is a vowel
function is_a_vowel(letter) {
    const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];  // Array of vowels
    for (let i = 0; i < vowels.length; ++i) {  // Loop through the vowels array
        if (letter === vowels[i]) {  // If the letter matches a vowel
            return true;  // Return true if the letter is a vowel
        }
    }
    return false;  // Return false if the letter is not a vowel
}

// Function to count the number of vowels in a string
function count_vowels(string_of_words) {
    let count = 0;  // Variable to store the vowel count
    for (let i = 0; i < string_of_words.length; ++i) {  // Loop through each character in the string
        if (is_a_vowel(string_of_words.charAt(i))) {  // Check if the current character is a vowel
            ++count;  // Increment the vowel count
        }
    }
    return count;  // Return the total number of vowels
}

// Function to count the number of consonants in a string (length - vowels - words)
function count_consonants(string_of_words) {
    return string_of_words.length - count_vowels(string_of_words) - count_words(string_of_words) + 1;  // Subtract vowels and word count from the string length
}

// Function to remove all instances of a specific character from a string
function remove(string_of_words, caracter) {
    let altered_string = "";  // Variable to store the modified string
    for (let i = 0; i < string_of_words.length; ++i) {  // Loop through each character in the string
        if (string_of_words[i] !== caracter) {  // Check if the current character is not the one to be removed
            altered_string += string_of_words[i];  // Add the character to the modified string
        }
    }
    return altered_string;  // Return the altered string
}


// Function to remove multiple characters from a string
function remove_strings(string_of_words, caracters) {
    let altered_string = "";  // Variable to store the modified string
    for (let i = 0; i < string_of_words.length; ++i) {  // Loop through each character in the input string
        let contains_caracters = false;  // Flag to check if the current character is one of the characters to remove
        for (let j = 0; j < caracters.length; ++j) {  // Loop through the array of characters to remove
            if (string_of_words[i] === caracters[j]) {  // If the character matches one to remove
                contains_caracters = true;  // Set the flag to true
                break;  // Exit the inner loop once the match is found
            }
        }
        if (!contains_caracters) {  // If the character is not to be removed
            altered_string += string_of_words[i];  // Add the character to the modified string
        }
    }
    return altered_string;  // Return the modified string without the removed characters
}

// Function to apply Caesar cipher encryption to a string
function crypto(to_crypt, offset) {
    let crypted = "";  // Variable to store the encrypted string
    for (let i = 0; i < to_crypt.length; ++i) {  // Loop through each character in the input string
        let charCode = to_crypt.charCodeAt(i);  // Get the character code of the current character
        let newCharCode;  // Variable to store the new character code after shifting

        // Encrypt uppercase letters
        if (charCode >= 65 && charCode <= 90) {
            newCharCode = ((charCode - 65 + offset) % 26) + 65;
        }
        // Encrypt lowercase letters
        else if (charCode >= 97 && charCode <= 122) {
            newCharCode = ((charCode - 97 + offset) % 26) + 97;
        }
        // If the character is not a letter, add it unchanged
        else {
            crypted += to_crypt.charAt(i);
            continue;
        }

        // Convert the new character code into a letter
        for (let j = 0; j <= 65535; ++j) {
            if (j === newCharCode) {
                crypted += String.fromCharCode(j);  // Add the encrypted character to the result
                break;
            }
        }
    }
    return crypted;  // Return the encrypted string
}

// Function to decrypt a Caesar cipher encrypted string using the given offset
function decrypt(to_decrypt, offset) {
    return to_decrypt.split('').map(char => {
        let charCode = char.charCodeAt(0);  // Get the character code of the current character
        let newCharCode;  // Variable to store the new character code after shifting back

        // Decrypt uppercase letters
        if (charCode >= 65 && charCode <= 90) {
            newCharCode = ((charCode - 65 - offset + 26) % 26) + 65;
        }
        // Decrypt lowercase letters
        else if (charCode >= 97 && charCode <= 122) {
            newCharCode = ((charCode - 97 - offset + 26) % 26) + 97;
        }
        // If the character is not a letter, return it unchanged
        else {
            return char;
        }

        // Convert the new character code back into a letter
        for (let j = 0; j <= 65535; ++j) {
            if (j === newCharCode) {
                return String.fromCharCode(j);  // Return the decrypted character
            }
        }
    }).join('');  // Join the decrypted characters and return the result
}

// Function to try all possible Caesar cipher keys (0 to 25) and print the results for each key
function enigma(crypted_string) {
    for (let key = 0; key < 26; key++) {
        console.log(`Key ${key}: ${decrypt(crypted_string, key)}`);  // Try each key and print the decrypted string
    }
}
