const Logo = (props: any) => {
  const { renderDefault, title } = props;
  return (
    <div className="flex items-center space-x-2">
      <img
        className="rounded-full object-cover"
        alt=""
        src="https://techiesportfolio.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimg.149fb20c.jpeg&w=2048&q=75"
        width={50}
      />
      {renderDefault && <>{renderDefault(props)}</>}
    </div>
  );
};

export default Logo;
