export const VerifyRequiredDataInConfig = (config) => {
    let verifyFlag = false;
    // API Key
    if(config.hasOwnProperty('api_key')) {
        verifyFlag = true;
    } else { verifyFlag = false; console.log('Please enter test or live public key (api_key) into config. Required!'); return verifyFlag; }

    // Amount
    if(config.hasOwnProperty('amount')) {
        verifyFlag = true;
    } else { verifyFlag = false; console.log('Please enter (amount) key into config. Required!'); return verifyFlag; }

    // Currency
    if(config.hasOwnProperty('currency')) {
        verifyFlag = true;
    } else { verifyFlag = false; console.log('Please enter (currency) key into config. Required!'); return verifyFlag; }

    // Email
    if(config.hasOwnProperty('email')) {
        verifyFlag = true;
    } else { verifyFlag = false; console.log('Please enter email key into config. Required!'); return verifyFlag; }

    return verifyFlag;
};


// Validate API Key Function
export const VerifyApiKeyData = (value) => {
    let verifyData = (value !== '') && (value !== NaN) && (value !== 'undefined') && (value !== null);
    if (!verifyData) { console.log('Please enter test or live public key into config'); return false; }
    return value;
}

// Validate Amount Function
export const VerifyAmountData = (value) => {
    let verifyData = (value !== '') && (value !== NaN) && (value !== 'undefined') && (value !== null);
    if (!verifyData) { console.log('Please enter amount or current amount type (number)'); return false; }
    return value;
}

// Email Regex Function
export const ValidateEmailAddress = (value) => {
    let verifyEmailData = (value !== '') && (value !== NaN) && (value !== 'undefined') && (value !== null)
    if (!verifyEmailData) { console.log('Please enter email key into config'); return false; }

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!value.match(emailRegex)) { console.log('Please enter valid email address'); return false; }
    return value;
}