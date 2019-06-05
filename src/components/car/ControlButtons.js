import React from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { CarInfoPDF } from './../pdf/CarInfoPDF'  
import { ShareButton, SellCarButton } from './ShareButton'

export const ControlButtons = ({car, user, handleClickSaleCar}) => {
    return(
        <div>
            <PDFDownloadLink document={<CarInfoPDF car = {car} user={user} />} fileName="somename.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <ShareButton />)}
            </PDFDownloadLink>
            <SellCarButton handleClickSaleCar={(event) => handleClickSaleCar(event)}/>
        </div>
    )
}