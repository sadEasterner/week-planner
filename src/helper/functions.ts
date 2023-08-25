
export const generateTimeString = (str: string) => {
    let charList = Array.from(str);
    charList.length === 4 ? charList.splice(2, 0, ' : ') : charList.splice(1, 0, ' : ');

    let newString = charList + "";
    return newString.replace(/,/g, ''); 
};
// convert english numbers to persian numbers 
export const toPersianNumber = (inputString: string) => {
    const persianNumbers: { [key: string]: string } = {
        '0': '۰',
        '1': '۱',
        '2': '۲',
        '3': '۳',
        '4': '۴',
        '5': '۵',
        '6': '۶',
        '7': '۷',
        '8': '۸',
        '9': '۹'
    };

    return inputString.replace(/[0-9]/g, match => persianNumbers[match]);
};
