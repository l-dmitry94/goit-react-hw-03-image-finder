import { Component } from 'react';
import { ImageGalleryList } from './ImageGallery.styled';
import ImageGalleryItem from './ImageGalleryItem';
import api from 'services/pixabay-api';

class ImageGallery extends Component {
    state = {
        images: [],
    };

    componentDidUpdate = async (prevProps, _) => {
        const prevQuery = prevProps.query;
        const currentQuery = this.props.query

        if(prevQuery !== currentQuery) {
            const data = await api.fetchImages(currentQuery)
            this.setState({images: data.hits})
        }
    }
    

    render() {
        const { images } = this.state;

        return (
            <ImageGalleryList>
                {images.map(({ id, ...args }) => (
                    <ImageGalleryItem key={id} items={args} />
                ))}
            </ImageGalleryList>
        );
    }
}

export default ImageGallery;
