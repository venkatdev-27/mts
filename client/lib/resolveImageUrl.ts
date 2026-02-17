const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const getApiOrigin = () => {
  try {
    return new URL(API_BASE_URL).origin;
  } catch {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return '';
  }
};

export const resolveImageUrl = (rawUrl?: string | null) => {
  if (!rawUrl) return '';

  const imageUrl = rawUrl.trim();
  if (!imageUrl) return '';

  if (imageUrl.startsWith('//')) {
    return `https:${imageUrl}`;
  }

  if (/^www\./i.test(imageUrl)) {
    return `https://${imageUrl}`;
  }

  if (
    /^https?:\/\//i.test(imageUrl) ||
    /^data:image\//i.test(imageUrl) ||
    /^blob:/i.test(imageUrl)
  ) {
    return imageUrl;
  }

  // Local filesystem paths cannot be rendered by browser clients.
  if (/^[a-zA-Z]:\\/.test(imageUrl)) {
    return '';
  }

  const apiOrigin = getApiOrigin();
  if (imageUrl.startsWith('/')) {
    return `${apiOrigin}${imageUrl}`;
  }

  return `${apiOrigin}/${imageUrl.replace(/^\/+/, '')}`;
};
