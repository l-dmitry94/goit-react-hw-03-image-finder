import { Image, ImageItem } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ items, onToggleModal }) => {
    const { webformatURL, tags, largeImageURL } = items;

    return (
        <ImageItem onClick={() => onToggleModal(largeImageURL)}>
            <Image src={webformatURL} alt={tags} loading="lazy" />
        </ImageItem>
    );
};

export default ImageGalleryItem;
