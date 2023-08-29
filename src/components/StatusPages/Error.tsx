type Props = {
  code?:
    | [4, 0, 4]
    | [4, 0, 3]
    | [4, 0, 1]
    | [5, 0, 0]
    | [5, 0, 2]
    | [number, number, number]
    | undefined;
};

function Error({ code }: Props) {
  return (
    <div id="error-component">
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h3>Oops! Page not found</h3>
            <h1>
              <span>{code?.[0] || '4'}</span>
              <span>{code?.[1] || '0'}</span>
              <span>{code?.[2] || '4'}</span>
            </h1>
          </div>
          <h2>we are sorry, but the page you requested was not found</h2>
        </div>
      </div>
    </div>
  );
}

export default Error;
