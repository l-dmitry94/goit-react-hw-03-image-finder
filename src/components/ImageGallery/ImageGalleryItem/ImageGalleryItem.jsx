import { Image, ImageItem } from "./ImageGalleryItem.styled";

const ImageGalleryItem = ({ items }) => {
    const { webformatURL, tags } = items;

    return (
        <ImageItem>
            <Image src={webformatURL} alt={tags} loading="lazy"/>
        </ImageItem>
    );
};

export default ImageGalleryItem;
