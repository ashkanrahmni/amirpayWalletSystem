
exports.formatNumber = (number, decimals = 0) => {
    try {
        // تبدیل ورودی به عدد
        const num = Number(number);
        
        if (isNaN(num)) {
            return '0';
        }

        // گرد کردن اعداد اعشاری
        const roundedNum = Number(Math.round(num + 'e' + decimals) + 'e-' + decimals);
        
        // تبدیل به رشته و جدا کردن بخش اعشار
        const [integerPart, decimalPart = ''] = roundedNum.toString().split('.');
        
        // اضافه کردن جداکننده هزارگان
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        
        // ترکیب بخش صحیح و اعشار
        return decimals > 0 ? 
            `${formattedInteger}.${decimalPart.padEnd(decimals, '0')}` : 
            formattedInteger;

    } catch (error) {
        console.error('خطا در فرمت‌بندی عدد:', error);
        return '0';
    }
};
exports.toPersianNumbers = (str) => {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return str.toString().replace(/[0-9]/g, (d) => persianNumbers[d]);
};

/**
 * فرمت‌بندی قیمت با واحد پول
 * @param {number|string} price - مبلغ
 * @param {string} currency - واحد پول (پیش‌فرض: 'تومان')
 * @returns {string} قیمت فرمت‌شده با واحد پول
 */
exports.formatPrice = (price, currency = 'تومان') => {
    const formattedNumber = exports.formatNumber(price);
    return `${formattedNumber} ${currency}`;
};