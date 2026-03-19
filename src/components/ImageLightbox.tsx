import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';

type ActiveImage = { src: string; alt: string } | null;

export default function ImageLightbox() {
  const [active, setActive] = useState<ActiveImage>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const img = target?.closest('article img') as HTMLImageElement | null;
      if (!img) return;
      setActive({ src: img.src, alt: img.alt || '' });
    };

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <Dialog.Root open={!!active} onOpenChange={(open) => !open && setActive(null)}>
      <Dialog.Portal>
        <Dialog.Overlay className="image-lightbox-overlay" />
        <Dialog.Content className="image-lightbox-content" aria-label="Expanded documentation image">
          {active ? <img className="image-lightbox__img" src={active.src} alt={active.alt} /> : null}
          <Dialog.Close className="image-lightbox__close" aria-label="Close image zoom">
            x
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
