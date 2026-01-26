export interface FileProps {
  title: string;
  image: string;
  detail: string;
  handleClick: () => {};
}

export default function ContentFile(
  { title, image, detail, handleClick }: FileProps
) {
  return (
    <div onClick={handleClick}>
      {/* image here */}

      <p
        style={{
          fontSize: '1rem',
          textAlign: 'center'
        }}
        title={detail}
      >{title}</p>
    </div>
  );
}