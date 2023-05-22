import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { pixabaySerch } from './PixabaySerch/PixabaySerch';
import Loader from './Loader/Loader';
import { ButtonLoadMore } from './Button/Button';

export const App = () => {
  const [searchItem, setSearchItem] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (searchItem === '') {
      return;
    }
    setIsLoading(true);

    pixabaySerch(searchItem, page)
      .then(({ totalHits, hits }) => {
        const onlyNeedValues = hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );
        if (totalHits === 0) {
          toast.warn(
            'Sorry, nothing was found for your request, try something else'
          );
          setIsLoading(false);
          setIsError(true);
          return;
        }
        if (page === 1 && hits.length > 1) {
          toast.success('Hooray! We found what you were looking for');
        }

        setItems(prevState => [...prevState, ...onlyNeedValues]);

        setIsLoading(false);
        setIsError(false);
        setTotal(hits.length);
      })
      .catch(isError => {
        toast.error('Oops, something went wrong, please try again');
        setIsError(isError.message);
        setIsLoading(false);
      });
  }, [searchItem, page]);

  const handleFormSubmit = search => {
    if (searchItem === search.trim()) {
      return toast.info(
        'It looks like there are already pictures found for your request, please check if this wil be a new search'
      );
    }
    setSearchItem(search);
    setItems([]);
    setPage(1);
    setIsLoading(false);
  };

  const ClickLoadMoreBtn = () => setPage(prevState => prevState + 1);

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      {isLoading ? <Loader /> : <ImageGallery allItems={items} />}
      {isError && <p>'Oops, something went wrong! Please, try again'</p>}
      {total >= 12 && <ButtonLoadMore onClick={ClickLoadMoreBtn} />}
      <ToastContainer autoClose={3000} />
    </div>
  );
};
