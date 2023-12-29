import { Component } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import api from '../../services/pixabay-api';

class App extends Component {
    state = {
        images: [],
    };

    handleSubmit = async query => {
      console.log(query.search)
        const data = await api.fetchImages(query.search);
        console.log(data.hits)
        
        this.setState(({
          images: data.hits
        }))

    };
    render() {
        const { images } = this.state;

        return (
            <section>
                <Searchbar onSubmit={this.handleSubmit} />
                <ImageGallery items={images} />
            </section>
        );
    }
}

export default App;
