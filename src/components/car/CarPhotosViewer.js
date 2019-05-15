import React, {Component} from 'react'
import {Dialog} from '@material-ui/core'
import {Carousel} from 'react-responsive-carousel'
import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
import {Slide} from 'material-auto-rotating-carousel'
import { red } from '@material-ui/core/colors'


class CarPhotoViewer extends Component{

    render(){
        const { classes } = this.props;

        return(
            <div style={{ position: 'relative', width: '100%', height: 500 }}>
                <AutoRotatingCarousel
                    open={this.props.isOpened}
                    onClose={() => this.props.handleOnClose()}
                    style={{ position: 'absolute' }}
                    autoplay={false}
                    landscape={true}
                >
                {this.props.car.photos.map( (photo, index) => (
                    <Slide
                    media={<img src={photo} />}
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