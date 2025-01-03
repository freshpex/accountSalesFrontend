export function convertToPublicUrl(src) {
  const publicUrl = src.replace('/s3/', '/object/public/');
  return publicUrl;
}