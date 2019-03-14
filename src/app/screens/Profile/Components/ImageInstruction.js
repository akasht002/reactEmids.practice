import React from 'react'

export const ImageInstruction = () => {
    return (
        <div className={'col-md-8'}>
            <ul className={'UploadedImageLimitation'}>
                <li>1. Click on the Change Photo Button. </li>
                <li>2. Select the image from your desktop/gallery.</li>
                <li>3. Click and drag the cursor across the image to crop.</li>
                {/* <li className="pd-10"><strong>Note:</strong>&nbsp;Image should not exceed 2 MB either a PNG/JPEG/JPG format</li> */}
            </ul>
        </div>
    )
}