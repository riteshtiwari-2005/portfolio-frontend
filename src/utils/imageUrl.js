export function toDisplayImageUrl(url = '') {
  if (!url) return '';

  try {
    const parsed = new URL(url);
    const isGoogleDrive = parsed.hostname === 'drive.google.com';

    if (!isGoogleDrive) {
      return url;
    }

    let fileId = '';
    const pathMatch = parsed.pathname.match(/\/file\/d\/([^/]+)/);
    if (pathMatch?.[1]) {
      fileId = pathMatch[1];
    }

    if (!fileId) {
      fileId = parsed.searchParams.get('id') || '';
    }

    if (!fileId) {
      return url;
    }

    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
  } catch {
    return url;
  }
}