chrome.commands.onCommand.addListener((command) => {
    if (command === 'switch_layout') {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (tabs.length > 0) {
                const activeTab = tabs[0];

                if (activeTab.url?.startsWith("chrome://")) return undefined;

                chrome.scripting.executeScript({
                    target: {tabId: activeTab.id},
                    function: commandAction,
                });
            }
        });
    }
});


function commandAction() {
    let selection = window.getSelection();
    let desiredElement = selection.focusNode;
    const children = desiredElement.children;
    for (let i = 0; i < children.length; i++)
    {
        if (children[i].tagName === 'INPUT' || children[i].tagName === 'TEXTAREA') {
            let englishAlphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let russianAlphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
            let ru_eng = {    'ё': '`',    '1': '1',    '2': '2',    '3': '3',    '4': '4',    '5': '5',    '6': '6',    '7': '7',    '8': '8',    '9': '9',    '0': '0',    '-': '-',    '=': '=',    'й': 'q',    'ц': 'w',    'у': 'e',    'к': 'r',    'е': 't',    'н': 'y',    'г': 'u',    'ш': 'i',    'щ': 'o',    'з': 'p',    'х': '[',    'ъ': ']',    '\\': '\\',    'ф': 'a',    'ы': 's',    'в': 'd',    'а': 'f',    'п': 'g',    'р': 'h',    'о': 'j',    'л': 'k',    'д': 'l',    'ж': ';',    'э': '\'',    'я': 'z',    'ч': 'x',    'с': 'c',    'м': 'v',    'и': 'b',    'т': 'n',    'ь': 'm',    'б': ',',    'ю': '.',    '.': '/',    'Ё': '~',    '!': '!',    '"': '@',    '№': '#',    ';': '$',    '%': '%',    ':': '^',    '?': '&',    '*': '*',    '(': '(',    ')': ')',    '_': '_',    '+': '+',    'Й': 'Q',    'Ц': 'W',    'У': 'E',    'К': 'R',    'Е': 'T',    'Н': 'Y',    'Г': 'U',    'Ш': 'I',    'Щ': 'O',    'З': 'P',    'Х': '{',    'Ъ': '}',    '/': '|',    'Ф': 'A',    'Ы': 'S',    'В': 'D',    'А': 'F',    'П': 'G',    'Р': 'H',    'О': 'J',    'Л': 'K',    'Д': 'L',    'Ж': ':',    'Э': '"',    'Я': 'Z',    'Ч': 'X',    'С': 'C',    'М': 'V',    'И': 'B',    'Т': 'N',    'Ь': 'M',    'Б': '<',    'Ю': '>',    ',': '?',};
            let eng_ru = {    '`': 'ё',    '1': '1',    '2': '2',    '3': '3',    '4': '4',    '5': '5',    '6': '6',    '7': '7',    '8': '8',    '9': '9',    '0': '0',    '-': '-',    '=': '=',    'q': 'й',    'w': 'ц',    'e': 'у',    'r': 'к',    't': 'е',    'y': 'н',    'u': 'г',    'i': 'ш',    'o': 'щ',    'p': 'з',    '[': 'х',    ']': 'ъ',    '\\': '\\',    'a': 'ф',    's': 'ы',    'd': 'в',    'f': 'а',    'g': 'п',    'h': 'р',    'j': 'о',    'k': 'л',    'l': 'д',    ';': 'ж',    '\'': 'э',    'z': 'я',    'x': 'ч',    'c': 'с',    'v': 'м',    'b': 'и',    'n': 'т',    'm': 'ь',    ',': 'б',    '.': 'ю',    '/': '.',    '~': 'Ё',    '!': '!',    '@': '"',    '#': '№',    '$': ';',    '%': '%',    '^': ':',    '&': '?',    '*': '*',    '(': '(',    ')': ')',    '_': '_',    '+': '+',    'Q': 'Й',    'W': 'Ц',    'E': 'У',    'R': 'К',    'T': 'Е',    'Y': 'Н',    'U': 'Г',    'I': 'Ш',    'O': 'Щ',    'P': 'З',    '{': 'Х',    '}': 'Ъ',    '|': '/',    'A': 'Ф',    'S': 'Ы',    'D': 'В',    'F': 'А',    'G': 'П',    'H': 'Р',    'J': 'О',    'K': 'Л',    'L': 'Д',    ':': 'Ж',    '"': 'Э',    'Z': 'Я',    'X': 'Ч',    'C': 'С',    'V': 'М',    'B': 'И',    'N': 'Т',    'M': 'Ь',    '<': 'Б',    '>': 'Ю',    '?': ',',};

            if (Array.from(englishAlphabet).some(char => children[i].value.includes(char))) {
                let result = '';
                for (let j = 0; j < children[i].value.length; j++) {

                    if (children[i].value[j] in eng_ru) {
                        result += eng_ru[children[i].value[j]];
                    }
                    else {
                        result += children[i].value[j];
                    }
                }
                children[i].value = result;
            }
            else if (Array.from(russianAlphabet).some(char => children[i].value.includes(char))) {
                let result = '';
                for (let j = 0; j < children[i].value.length; j++) {

                    if (children[i].value[j] in ru_eng) {
                        result += ru_eng[children[i].value[j]];
                    }
                    else {
                        result += children[i].value[j];
                    }
                }
                children[i].value = result;
            }
        }
    }
}