import { Component } from 'react';
import api from '../../services/pixabay-api';
import { ImageGalleryList } from './ImageGallery.styled';
import ImageGalleryItem from './ImageGalleryItem';

class ImageGallery extends Component {
    state = {
        images: [],
    };
    componentDidUpdate = async (prevProps, _) => {
        const prevQuery = prevProps.query;
        const nextQuery = this.props.query;

        if (prevQuery !== nextQuery) {
            try {
                const data = await api.fetchImages(nextQuery);
                this.setState({
                    images: data.hits,
                });
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        }
    };

    render() {
        const { images } = this.state;
        console.log(images);
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
