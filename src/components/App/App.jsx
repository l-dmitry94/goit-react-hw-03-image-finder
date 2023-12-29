import { Component } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';

class App extends Component {
    state = {
        query: '',
    };

    handleSubmit = async query => {
        if (!query.search.trim()) return;

        this.setState({query: query.search});

    };
    render() {
        const { query } = this.state;

        return (
            <section>
                <Searchbar onSubmit={this.handleSubmit} />
                <ImageGallery query={query}/> 
            </section>
        );
    }
}

export default App;