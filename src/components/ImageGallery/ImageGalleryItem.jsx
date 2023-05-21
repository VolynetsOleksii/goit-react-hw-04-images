import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Image, ImageItem } from './ImageGalleryItem.styled';
import { ModalImage } from 'components/Modal/Modal.styled';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ImageItem onClick={() => setShowModal(true)}>
        <Image src={webformatURL} alt={tags} />
      </ImageItem>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ModalImage src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
