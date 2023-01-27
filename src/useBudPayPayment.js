import { VerifyRequiredDataInConfig, VerifyApiKeyData, VerifyAmountData, ValidateEmailAddress } from './configValidation';
import closeBudPayPaymentModal, { closePaymentTransactionCallback } from './closePayWithBudPayModal';
import { OpenSVGLoaderFuncBudPay, RemoveSVGLoaderFuncBudPay } from './assetsFunctions';

export default function useBudPayPayment(config) {

    const iFrameValidateAndReturnDataInput = () => {
        console.log('config', config)

        if (!config) {
            console.log('Error!. Please check our documentation for correct configurations.');
            return { status: false }
        }

        if (!VerifyRequiredDataInConfig(config)) {
            console.log('Set required field (Amount, Key, Email) data in the config');
            return { status: false }
        }

        const verifyDataIfValid = VerifyApiKeyData(config.api_key) && VerifyAmountData(config.amount) && ValidateEmailAddress(config.email);
        if (!verifyDataIfValid) {
            console.log('Check that you entered correct data in the config');
            return { status: false }
        }

        return {
            status: true,
            type: 'initializeTransaction',
            key: config.api_key || null,
            email: config.email || null,
            amount: config.amount || null,
            currency: config.currency || null,
            first_name: config.first_name || null,
            last_name: config.last_name || null,
            phone: config.phone || null,
            logo_url: config.logo_url || null,
            callback_url: config.callback_url || null,
            reference: config.reference || '' + Math.floor((Math.random() * 1000000000) + 1) + new Date().getSeconds() + new Date().getMilliseconds()
        }
    }


    // Create Payment Modal iFrame Function
    let createPaymentModalIFrame = () => {
        let iframeDiv = document.createElement("iframe");
        iframeDiv.setAttribute("id", "budpay-iframe-container");
        iframeDiv.setAttribute("style", "position:fixed;top:0;left:0;z-index:99999999999999;border:none;opacity:0;pointer-events:none;width:100%;height:100%;");
        iframeDiv.setAttribute("allowTransparency", "true");
        iframeDiv.setAttribute("width", "100%");
        iframeDiv.setAttribute("height", "100%");
        iframeDiv.setAttribute("allow", "clipboard-read; clipboard-write");
        iframeDiv.setAttribute('src', 'https://inlinepay.budpay.com'); 
        // iframeDiv.setAttribute('src', 'http://127.0.0.1:5500');
        return iframeDiv;
    }


    // load iframe to website body and send config data
    const loadIframeToWebsiteBody = () => {
        if (!iFrameValidateAndReturnDataInput().status) { console.log('Could not load Payment Modal. Error. Please try Again') }
        document.body.appendChild(OpenSVGLoaderFuncBudPay()); // Append SVG Loader
        document.body.appendChild(createPaymentModalIFrame()); // Append Iframe

        document.querySelector('iframe#budpay-iframe-container').onload = () => {
            RemoveSVGLoaderFuncBudPay(); // Remove SVG Loader

            let iframeSelector = document.querySelector('iframe#budpay-iframe-container');
            iframeSelector.style.opacity = "1";
            iframeSelector.style.pointerEvents = "auto";
            iframeSelector.contentWindow.postMessage(iFrameValidateAndReturnDataInput(), "*"); // Send Data to Child Iframe
        }
    }

    // Listen to events from iframe
    if (typeof window !== "undefined") {
        window.addEventListener('message', function (event) {
            if (!event.data) { return; }

            function safeJsonParse(str) {
                try {
                    return [null, JSON.parse(str)];
                } catch (err) { return [err] }
            }

            console.log(event.data)

            const [err, result] = safeJsonParse(event.data);
            if (!err) {
                if (result.type === 'closeTransaction') { closePaymentTransactionCallback(result, config) }
                if (result.type === 'cancelPayment') { closeBudPayPaymentModal(config) }
            }
        });
    }

    return loadIframeToWebsiteBody;
}