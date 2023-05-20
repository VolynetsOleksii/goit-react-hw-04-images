import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Image, ImageItem } from './ImageGalleryItem.styled';
import { ModalImage } from 'components/Modal/Modal.styled';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <ImageItem onClick={() => toggleModal(largeImageURL)}>
        <Image src={webformatURL} alt={tags} />
        {showModal && (
          <Modal onClose={toggleModal}>
            <ModalImage src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </ImageItem>
    </>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
