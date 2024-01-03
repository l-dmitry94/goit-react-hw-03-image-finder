import { Component } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import { ToastContainer, toast } from 'react-toastify';

class App extends Component {
    state = {
        query: '',
    };

    handleSubmit = query => {
        if (!query.search.length) {
            toast.warning('Please enter the query');
            return;
        }
        this.setState({ query: query.search });
    };

    render() {
        const { query } = this.state;

        return (
            <section>
                <Searchbar onSubmit={this.handleSubmit} />
                <ImageGallery query={query} />
                <ToastContainer autoClose={3000} />
            </section>
        );
    }
}

export default App;
