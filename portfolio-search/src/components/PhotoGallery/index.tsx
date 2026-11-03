import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Lightbox from '../Lightbox';
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
  MobileCaption
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

  return (
    <GalleryContainer>
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
          <PhotoItem key={index} onClick={() => setLightboxIndex(index)}>
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
        <Lightbox
          items={photos.map(photo => ({ src: getImagePath(photo.filename), caption: photo.caption }))}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />
      )}
    </GalleryContainer>
  );
};

export default PhotoGallery;