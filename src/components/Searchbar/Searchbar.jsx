import { Formik } from 'formik';
import { FaSearch } from 'react-icons/fa';
import {
    Header,
    SearchButton,
    SearchForm,
    SearchInput,
} from './Searchbar.styled';
import { IconContext } from 'react-icons';

const initialValues = {
    search: '',
};

const Searchbar = ({ onSubmit }) => {
    const handleSubmit = (values, { resetForm }) => {
        onSubmit(values);
        resetForm();
    };

    return (
        <Header>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <SearchForm>
                        <SearchButton type="submit" disabled={isSubmitting}>
                            <IconContext.Provider value={{ size: 18 }}>
                                <FaSearch />
                            </IconContext.Provider>
                        </SearchButton>

                        <SearchInput
                            type="text"
                            name="search"
                            autoComplete="off"
                            autoFocus
                            placeholder="Search images and photos"
                        />
                    </SearchForm>
                )}
            </Formik>
        </Header>
    );
};

export default Searchbar;
