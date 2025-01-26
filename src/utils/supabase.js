export function convertToPublicUrl(src) {
  if (!src || typeof src !== "string") return "";
  if (!src.includes("supabase")) return src;
  return src.replace("/s3/", "/object/public/");
}
