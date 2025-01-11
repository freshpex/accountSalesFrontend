export default function Picture({ src, alt, extraClasses }) {
    return (
        <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover ${extraClasses}`}
        />
    );
}
