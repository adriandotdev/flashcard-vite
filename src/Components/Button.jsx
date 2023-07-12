import React from 'react'

function Button({ children, className, text, handler, disabled }) {
    return (
        <>
            <button disabled={disabled} onClick={handler} className={className}>{children}</button>
        </>
    )
}

export default Button
