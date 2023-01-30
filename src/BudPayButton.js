import React from "react";
import useBudPayPayment from "./useBudPayPayment"
export default function BudPayButton(config) {
    const handleBudPayPayment = useBudPayPayment(config);
    
    // Button Styles
    let buttonStyles = {
        border: 'none', background: '#5018cd',
        color: '#ffffff', borderRadius: '6px',
        margin: '1rem', cursor: 'pointer'
    }
    let smallButtonStyles = {
        ...buttonStyles,
        padding: '8px 16px', fontWeight: 500
    }
    let mediumButtonStyles = {
        ...buttonStyles,
        padding: '16px 24px', fontWeight: 600
    }
    let largeButtonStyles = {
        ...buttonStyles,
        padding: '22px 32px', fontWeight: 600
    }

    // Select Button size from params or default
    const selectActiveButtonSize = () => {
        if (config.btnSize) {
            if (config.btnSize == 'small') return smallButtonStyles;
            if (config.btnSize == 'medium') return mediumButtonStyles;
            if (config.btnSize == 'large') return largeButtonStyles;
        } else {
            return mediumButtonStyles;
        }
    }

    return (
        <div>
            <button onClick={ () => handleBudPayPayment() } style={selectActiveButtonSize()}>{config.text}</button>
        </div>
    )
}