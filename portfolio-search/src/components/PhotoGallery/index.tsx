import React, { useState, useEffect } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import {
  GalleryContainer,
  Header,
  BackButton,
  Title,
  PhotoCount,
  PhotoGrid,
  PhotoItem,
  PhotoImage,
  PhotoOverlay,
  MobileCaption,
  Lightbox,
  LightboxOverlay,
  LightboxContent,
  LightboxImage,
  LightboxCaption,
  CloseButton,
  PrevButton,
  NextButton
} from './styles';

interface PhotoGalleryItem {
  caption: string;
  filename: string;
}

interface PhotoGalleryProps {
  photos: PhotoGalleryItem[];
  contentId: string;
  title: string;
  onBack: () => void;
}

interface ImageDimensions {
  width: number;
  height: number;
  orientation: 'landscape' | 'portrait' | 'square';
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  contentId,
  title,
  onBack
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [imageDimensions, setImageDimensions] = useState<Map<string, ImageDimensions>>(new Map());

  const getImagePath = (filename: string) => {
    return `/content/${contentId}/${filename}`;
  };

  const determineOrientation = (width: number, height: number): 'landscape' | 'portrait' | 'square' => {
    const ratio = width / height;
    if (Math.abs(ratio - 1) < 0.1) return 'square';
    return ratio > 1 ? 'landscape' : 'portrait';
  };

  const loadImageDimensions = (filename: string) => {
    if (imageDimensions.has(filename)) return;

    const img = new Image();
    img.onload = () => {
      const orientation = determineOrientation(img.naturalWidth, img.naturalHeight);
      setImageDimensions(prev => new Map(prev.set(filename, {
        width: img.naturalWidth,
        height: img.naturalHeight,
        orientation
      })));
    };
    img.src = getImagePath(filename);
  };

  useEffect(() => {
    photos.forEach(photo => {
      loadImageDimensions(photo.filename);
    });
  }, [photos]);

  const getImageOrientation = (filename: string): string => {
    const dims = imageDimensions.get(filename);
    return dims?.orientation || 'square';
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const goToPrevious = () => {
    if (lightboxIndex !== null) {
      const newIndex = lightboxIndex > 0 ? lightboxIndex - 1 : photos.length - 1;
      setLightboxIndex(newIndex);
    }
  };

  const goToNext = () => {
    if (lightboxIndex !== null) {
      const newIndex = lightboxIndex < photos.length - 1 ? lightboxIndex + 1 : 0;
      setLightboxIndex(newIndex);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (lightboxIndex !== null) {
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    }
  };

  return (
    <GalleryContainer onKeyDown={handleKeyDown} tabIndex={0}>
      <Header>
        <BackButton onClick={onBack}>
          <ArrowLeft size={20} />
          Back
        </BackButton>
        <div>
          <Title>Photo Gallery - {title}</Title>
          <PhotoCount>{photos.length} {photos.length === 1 ? 'photo' : 'photos'}</PhotoCount>
        </div>
      </Header>

      <PhotoGrid>
        {photos.map((photo, index) => (
          <PhotoItem key={index} onClick={() => openLightbox(index)}>
            <PhotoImage
              src={getImagePath(photo.filename)}
              alt={photo.caption}
              loading="lazy"
              data-orientation={getImageOrientation(photo.filename)}
              onLoad={() => loadImageDimensions(photo.filename)}
            />
            <PhotoOverlay className="overlay">
              <span>{photo.caption}</span>
            </PhotoOverlay>
            <MobileCaption>{photo.caption}</MobileCaption>
          </PhotoItem>
        ))}
      </PhotoGrid>

      {lightboxIndex !== null && (
        <Lightbox>
          <LightboxOverlay onClick={closeLightbox} />
          <LightboxContent>
            <CloseButton onClick={closeLightbox}>
              <X size={24} />
            </CloseButton>
            
            {photos.length > 1 && (
              <>
                <PrevButton onClick={goToPrevious}>
                  <ArrowLeft size={24} />
                </PrevButton>
                <NextButton onClick={goToNext}>
                  <ArrowLeft size={24} style={{ transform: 'rotate(180deg)' }} />
                </NextButton>
              </>
            )}

            <LightboxImage
              src={getImagePath(photos[lightboxIndex].filename)}
              alt={photos[lightboxIndex].caption}
            />
            <LightboxCaption>
              {photos[lightboxIndex].caption}
            </LightboxCaption>
          </LightboxContent>
        </Lightbox>
      )}
    </GalleryContainer>
  );
};

export default PhotoGallery;