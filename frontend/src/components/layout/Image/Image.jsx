import './Image.css';

export default function Image({
  src,
  alt,
  width
}) {
  return (
    <img 
    src={src} 
    alt={alt} 
    className={`rouded_image ${width}`}
    />
  )
}