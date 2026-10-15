import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/photoswipe.css';
import { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface GalleryImage {
    largeURL: string;
    width: number;
    height: number;
    thumbnailURL: string;
    title?: string;
    category?: string;
}

interface Props {
    galleryID: string;
    images: GalleryImage[];
}

const GallerySwipe = ({ galleryID, images }: Props) => {
    useEffect(() => {
        let lightbox: PhotoSwipeLightbox | null = new PhotoSwipeLightbox({
            gallery: '#' + galleryID,
            children: 'a',
            pswpModule: () => import('photoswipe'),
        });
        lightbox.init();

        return () => {
            lightbox?.destroy();
            lightbox = null;
        };
    }, [galleryID]);

    return (
        <div
            className="pswp-gallery grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            id={galleryID}
        >
            {images.map((image, index) => (
                <a
                    href={image.largeURL}
                    data-pswp-width={image.width}
                    data-pswp-height={image.height}
                    key={galleryID + '-' + index}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative bg-tertiary border border-quaternary hover:border-accent overflow-hidden transition-all duration-300 block cursor-pointer"
                >
                    <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-dark">
                        <img
                            src={image.thumbnailURL}
                            alt={image.title || ''}
                            className="w-full h-full object-cover object-center opacity-85 grayscale-80 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                            loading="lazy"
                        />

                        {/* Overlay degradado */}
                        <div className="absolute inset-0 bg-linear-to-t from-dark/95 via-dark/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

                        {/* Etiqueta de Categoría  */}
                        {image.category && (
                            <div className="absolute top-4 left-4">
                                <span className="text-[9px] font-mono uppercase tracking-[0.5em] font-bold text-accent bg-dark/90 border border-quaternary px-2.5 py-1">
                                    {image.category}
                                </span>
                            </div>
                        )}

                        {/* Botón de apertura */}
                        <div className="absolute top-4 right-4 w-8 h-8 bg-dark/80 border border-quaternary flex items-center justify-center text-light/60 group-hover:text-accent group-hover:border-accent transition-colors">
                            <ArrowUpRight className="w-4 h-4" />
                        </div>

                        {/* Información al pie de la foto */}
                        <div className="absolute bottom-4 left-4 right-4 p-4  group-hover:bg-accent-dark ">
                            {image.title && (
                                <h3 className="text-lg  font-bold tracking-[0.5em] transition-colors">
                                    {image.title}
                                </h3>
                            )}
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
};

export default GallerySwipe;

