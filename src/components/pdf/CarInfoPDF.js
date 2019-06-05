import React, { Component } from 'react'
import { Page, Text, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';

export class CarInfoPDF extends Component {

  state = {
    tableInBase64: ""
  }

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms)); //tymczasowe rozwiazanie xD
  };
  getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  getVehicleHistory = async (tmp) => {
    (html2canvas(document.getElementById('carInfoTable'))
      .then((canvas) => {
        // console.log(canvas.toDataURL('image/png'))
        tmp = canvas.toDataURL('image/png');
        this.setState({
          tableInBase64: canvas.toDataURL('image/png')
        })
      }))
    await this.sleep(1500)
    // console.log(tmp)
    this.setState({
      tableInBase64: tmp
    })
    // return tmp
  }

  async componentDidMount() {
    // tableImage = await this.getVehicleHistory();
    let tmp = ""
    await this.getVehicleHistory(tmp)
  }

  render() {
    const selectedCar = this.props.car;
    const user = this.props.user;
    return (
      <Document>
        <Page style={styles.body}>
          <Text style={styles.title}>
            {selectedCar.data.brand + ' ' + selectedCar.data.model}
          </Text>

          <Text style={styles.text}>
            Owner: {(user.name)}
          </Text>
          <Text style={styles.text}>
            E-mail: {user.email}
          </Text>

          <Text style={styles.subtitle}>
            Technical data:
          </Text>
          <Text style={styles.text}>
            Car type: {selectedCar.data.carType}
          </Text>
          <Text style={styles.text}>
            Production year: {selectedCar.data.productionYear}
          </Text>
          <Text style={styles.text}>
            Course: {selectedCar.data.course} KM
          </Text>
          <Text style={styles.text}>
            Engine capacity: {selectedCar.data.engineCapacity} cm3
          </Text>
          <Text style={styles.text}>
            Engine power: {selectedCar.data.enginePower} kW
          </Text>
          <Text style={styles.text}>
            Fuel type: {selectedCar.data.fuelType}
          </Text>

          <Text style={styles.subtitle} break>
            Photos:
          </Text>
          {selectedCar.photos.map((photo, index) => {
            return (photo !== '') ?
              <Image
                key={index}
                style={styles.image}
                src={photo}
              /> : undefined
          })}

          <Text style={styles.subtitle} break>
            Vehicle history:
          </Text>
          
          {/* {console.log("state" , this.state.tableInBase64)} */}

          {!this.state.tableInBase64 === "" &&
            <Image
              style={styles.image}
              src={this.state.tableInBase64}
            />
          }

          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
            `${pageNumber} / ${totalPages}`
          )} fixed />
        </Page>
      </Document>
    )
  }
}

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
    paddingTop: 20,
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