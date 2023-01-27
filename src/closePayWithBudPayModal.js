export const closePaymentTransactionCallback = (result, config) => {
    try {
        if (result.status === 'success') {
            if (result.hasOwnProperty('callback_url') && result.callback_url && result.callback_url !== null && result.callback_url !== 'null') {
                // Redirect to callback url
                window.location.href = result.callback_url;
            } else {
                if (config.hasOwnProperty('callback_url') && config.callback_url && config.callback_url !== null && config.callback_url !== 'null') {
                    // Redirect to callback url
                    window.location.href = config.callback_url;
                } else {
                    if(config.hasOwnProperty('callback')){
                        config.callback(result)
                    }
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export default function closeBudPayPaymentModal(config) {
    try {
        console.log('I am here oo')
        // Remove Payment Modal Iframe
        if (document.body.contains(document.querySelector('#budpay-iframe-container'))) {
            document.querySelector('#budpay-iframe-container').remove();
            config.onClose();
        }
    } catch (error) {
        console.log(error);
    }
}