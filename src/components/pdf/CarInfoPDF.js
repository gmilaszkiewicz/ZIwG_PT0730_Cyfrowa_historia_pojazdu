import React from 'react'
import { Page, Text, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';

const getVehicleHistory = () => {
  return html2canvas(document.getElementById('carInfoTable'))
  .then((canvas) => {
    return canvas.toDataURL('image/png');
  })
}

export const CarInfoPDF = (param) => (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>
          {param.car.data.brand + ' ' + param.car.data.model}
        </Text>

        <Text style={styles.text}>
          Owner: 
        </Text>
        <Text style={styles.text}>
          E-mail: 
        </Text>

        <Text style={styles.subtitle}>
          Technical data:
        </Text>
        <Text style={styles.text}>
          Car type: {param.car.data.carType} 
        </Text>
        <Text style={styles.text}>
          Production year: {param.car.data.productionYear} 
        </Text>
        <Text style={styles.text}>
          Course: {param.car.data.course} KM
        </Text>
        <Text style={styles.text}>
          Engine capacity: {param.car.data.engineCapacity} cm3
        </Text>
        <Text style={styles.text}>
          Engine power: {param.car.data.enginePower} kW
        </Text>
        <Text style={styles.text}>
          Fuel type: {param.car.data.fuelType} 
        </Text>

        <Text style={styles.subtitle} break>
          Photos:
        </Text>
        {param.car.photos.map((photo,index) => {
          return (photo!== '')?
            <Image
              key={index}
              style={styles.image}
              src={photo}
            />:undefined
        })}

        <Text style={styles.subtitle} break>
          Vehicle history:
        </Text>
        {console.log(getVehicleHistory())}
        <Image
          style={styles.image}
          src={getVehicleHistory()}
        />

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  );
  
  Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
  });
  
  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      paddingTop:20,
      paddingBottom: 30,
      fontSize: 28,
      textAlign: 'center',
      fontFamily: 'Oswald'
    },
    subtitle: {
      textAlign: 'center',
      fontSize: 18,
      margin: 12,
      fontFamily: 'Oswald'
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: 'justify',
      fontFamily: 'Times-Roman'
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey',
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
  });  