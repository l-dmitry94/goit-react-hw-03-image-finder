import { Component } from 'react';
import { ImageGalleryList } from './ImageGallery.styled';
import ImageGalleryItem from './ImageGalleryItem';
import Button from 'components/Button';
import { fetchImages } from 'services/pixabay-api';

class ImageGallery extends Component {
    state = {
        images: [],
        page: 1,
    };

    componentDidUpdate = async (prevProps, _) => {
        const { page } = this.state;

        const prevQuery = prevProps.query;
        const currentQuery = this.props.query;

        if (prevQuery !== currentQuery) {
            try {
                const data = await fetchImages(currentQuery, page);
                this.setState(prevState => ({
                    images: data.hits,
                    page: prevState.page + 1,
                }));
            } catch (error) {
                console.log(error);
            }
        }
    };

    LoadMore = async () => {
        const { page } = this.state;
        const currentQuery = this.props.query;

        const data = await fetchImages(currentQuery, page);

        this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            page: prevState.page + 1,
        }));
    };

    render() {
        const { images } = this.state;

        const items = images.map(({ id, ...args }) => (
            <ImageGalleryItem key={id} items={args} />
        ));

        return (
            <>
                <ImageGalleryList>{items}</ImageGalleryList>

                {images.length > 0 && (
                    <Button
                        onLoadMore={this.LoadMore}
                        type="button"
                        text="Load more"
                    />
                )}
            </>
        );
    }
}

export default ImageGallery;
