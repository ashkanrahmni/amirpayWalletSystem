
const Kavenegar = require('kavenegar');
const { generateFiveLengthNumberCode } = require('./RandomNumber');
const api = Kavenegar.KavenegarApi({
    apikey: '7167457050423936767348455667563575324177526E2B4168427354784C7841784A4C574C794A6C534F4D3D'
});

function sendSMS(receptor,number) {
    return new Promise((resolve, reject) => {
        api.VerifyLookup({
            token: number,
            template: "verify-app-ttwt",
            receptor: receptor
        }, function(response, status) {
            if (status === 200) {
                resolve(response);
            } else {
                reject(new Error('Failed to send SMS'));
            }
        });
    });
}

module.exports = {
    sendSMS
};
