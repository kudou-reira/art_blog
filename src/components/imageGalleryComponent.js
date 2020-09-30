import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

export default function ImageGallery(props) {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };
    
    const navButtonStyles = base => ({
        ...base,
        backgroundColor: 'white',
        boxShadow: '0 1px 6px rgba(0, 0, 0, 0.18)',
        color: 'black',
      
        '&:hover, &:active': {
          backgroundColor: 'white',
          color: 'green',
          opacity: 1,
        },
        '&:active': {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.14)',
          transform: 'scale(0.96)',
        },
    });

    return (
        <div>
            <Gallery photos={props.photos} onClick={openLightbox} />
            <ModalGateway>
                {viewerIsOpen ? (
                <Modal onClose={closeLightbox}>
                    <Carousel
                        currentIndex={currentImage}
                        views={props.photos.map(x => ({
                            ...x,
                            srcset: x.srcSet,
                            caption: x.title,
                        }))}
                        styles={{
                            view: base => ({
                              ...base,
                              alignItems: 'center',
                              display: 'flex ',
                              height: 'calc(100vh - 54px)',
                              justifyContent: 'center',
                              '& > img': {
                                maxHeight: 'calc(100vh - 94px)',
                              },
                            }),
                            navigationPrev: navButtonStyles,
                            navigationNext: navButtonStyles,
                        }}
                    />
                </Modal>
                ) : null}
            </ModalGateway>
      </div>
  );
}