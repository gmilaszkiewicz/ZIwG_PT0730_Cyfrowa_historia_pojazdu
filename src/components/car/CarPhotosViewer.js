import React, {Component} from 'react'
import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
import {Slide} from 'material-auto-rotating-carousel'

class CarPhotoViewer extends Component{

    render(){
        return(
            <div style={{ position: 'relative', width: '100%', height: 500 }}>
                <AutoRotatingCarousel
                    open={this.props.isOpened}
                    onClose={() => this.props.handleOnClose()}
                    style={{ position: 'absolute' }}
                    autoplay={false}
                    landscape={true}
                >
                {this.props.car.photos.filter((photo, index) => {return photo!==""}).map( (photo, index) => (
                    <Slide
                        media={<img src={photo} alt="my car" />}
                        mediaBackgroundStyle={{ backgroundColor: "#424242" }}
                        style={{ backgroundColor: "#424242" }}
                    />
                ))}
                </AutoRotatingCarousel>
            </div>
        );
    }
}

export default CarPhotoViewer;