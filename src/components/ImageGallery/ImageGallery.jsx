import { Component } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { ImageGalleryList } from './ImageGallery.styled';
import ImageGalleryItem from './ImageGalleryItem';
import Button from 'components/Button';
import { fetchImages } from 'services/pixabay-api';
import Modal from 'components/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const per_page = 12;

class ImageGallery extends Component {
    state = {
        images: [],
        page: 1,
        isHiddenButton: false,
        isLoading: false,
        largeImage: null,
        showModal: false,
    };

    componentDidUpdate = async (prevProps, _) => {
        const prevQuery = prevProps.query;
        const currentQuery = this.props.query;

        if (prevQuery !== currentQuery) {
            this.setState({ isLoading: true });

            try {
                const data = await fetchImages(currentQuery, 1, per_page);

                if (!data.hits.length) {
                    toast.error('Nothing found, try again');
                    return;
                }

                toast.success(`We found ${data.totalHits} images`);

                this.setState({
                    images: data.hits,
                    page: 1,
                    isHiddenButton: false,
                });

                if (1 === Math.ceil(data.totalHits / per_page)) {
                    this.setState({ isHiddenButton: true });
                }
            } catch (error) {
                console.log(error);
            } finally {
                this.setState({ isLoading: false });
            }
        }
    };

    LoadMore = async () => {
        const { page } = this.state;
        const currentQuery = this.props.query;
        const nextPage = page + 1;

        try {
            this.setState({ isLoading: true });

            const data = await fetchImages(currentQuery, nextPage, per_page);

            this.setState(prevState => ({
                images: [...prevState.images, ...data.hits],
                page: nextPage,
            }));

            if (nextPage === Math.ceil(data.totalHits / per_page)) {
                this.setState({ isHiddenButton: true });
                toast.info('There are no more images');
            }

            window.scroll({
                top: document.body.offsetHeight,
                left: 0,
                behavior: 'smooth',
            });

        } catch (error) {
            console.log(error);
        } finally {
            this.setState({ isLoading: false });
        }
    };

    showModal = url => {
        this.setState({
            largeImage: url,
            showModal: true,
        });
    };

    closeModal = () => {
        this.setState({
            showModal: false,
        });
    };

    render() {
        const { images, isHiddenButton, isLoading, showModal, largeImage } =
            this.state;

        const items = images.map(({ id, ...args }) => (
            <ImageGalleryItem
                key={id}
                items={args}
                onToggleModal={this.showModal}
            />
        ));

        return (
            <>
                <ImageGalleryList id="imageGalleryList">
                    {items}
                </ImageGalleryList>

                {isLoading && (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <InfinitySpin
                            visible={true}
                            width="200"
                            color="#83182b"
                            ariaLabel="infinity-spin-loading"
                        />
                    </div>
                )}

                {images.length > 0 && !isHiddenButton && (
                    <Button
                        onLoadMore={this.LoadMore}
                        type="button"
                        text="Load more"
                    />
                )}

                {showModal && (
                    <Modal url={largeImage} onClose={this.closeModal} />
                )}
            </>
        );
    }
}

export default ImageGallery;
