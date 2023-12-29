import { ImageGalleryList } from "./ImageGallery.styled";
import ImageGalleryItem from "./ImageGalleryItem";

const ImageGallery = ({items}) => {
    return <ImageGalleryList>
        {items.map(({id, ...args}) => (
            <ImageGalleryItem key={id} items={args} />
        ))}
    </ImageGalleryList>;
};

export default ImageGallery;
