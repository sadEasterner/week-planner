
export const generateTimeString = (str: any) => {
    let charList = Array.from(str);
    charList.length === 4 ? charList.splice(2, 0, ':') : charList.splice(1, 0, ':');

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

// Randome color generator wit opacity of 50 
export const randomColor = () => {
    var letters: string = '0123456789ABCDEF';
    var color: string = "";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return `#${color}50`;
};
 
// function to render day titles in different day titles in different langs 
export const convertDaytoString = (dayId: number, to: string ) => {
    if (to === "Pr"){
        switch(dayId){
            case 0: 
                return "شنبه";
            case 1: 
                return "یک‌شنبه";
            case 2: 
                return"دوشنبه";
            case 3: 
                return"سه‌شنبه";
            case 4: 
                return"چهارشنبه";
            case 5: 
                return"پنج‌شنبه";
            case 6: 
                return"جمعه";
        }
    }
    if (to === "en"){
        switch(dayId){
            case 0: 
                return "Saturday ";
            case 1: 
                return "Sunday";
            case 2: 
                return"Monday";
            case 3: 
                return"Tuesday";
            case 4: 
                return"Wednesday";
            case 5: 
                return"Thursday";
            case 6: 
                return"Friday";
        }
    }
}; 