import type { ProductVisual } from '../types';

export function SmartImage({ asset, className = '', priority = false }: { asset: ProductVisual; className?: string; priority?: boolean }) {
  return (
    <img
      src={asset.src}
      alt={asset.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      sizes="(max-width: 768px) 100vw, 50vw"
      className={`${className} ${asset.fit === 'contain' ? 'object-contain' : 'object-cover'}`}
    />
  );
}
