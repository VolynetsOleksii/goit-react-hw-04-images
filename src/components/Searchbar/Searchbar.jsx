import { useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Button, Form, Input, Wrapper } from './Searchbar.styled';


export const  Searchbar = ({ onSubmit }) => {

   const [searchItem, setSearchItem] = useState('');
   

    const handleSearchChange = event => {
        setSearchItem(event.currentTarget.value.toLowerCase());
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (searchItem.trim() === '') {
            toast.error('Enter something!');
            setSearchItem('');
            return;
        }
        onSubmit(searchItem);
        setSearchItem('');
    }


    
    return (
        <Wrapper>
            <Form onSubmit={handleSubmit}>
                <Button type="submit">
                    <FcSearch size={18}/> 
                </Button>

                <Input
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={searchItem}
                    onChange={handleSearchChange}
                />
            </Form>
        </Wrapper>
    );

};

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };