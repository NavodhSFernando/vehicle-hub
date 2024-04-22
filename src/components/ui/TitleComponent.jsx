import React, { useEffect } from 'react'

// TitleComponent that sets the document title
const TitleComponent = ({ title, children }) => {
    useEffect(() => {
        document.title = title // Set the document title
    }, [title]) // This effect runs only if title changes

    return <>{children}</> // Render children without adding extra elements to the DOM
}

export default TitleComponent
