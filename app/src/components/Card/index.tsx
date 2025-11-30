type Props = {
  title?: string | undefined;
  children: JSX.Element | Array<JSX.Element>;
  className?: string;
};

function Card({ title, children, className }: Props) {
  return (
    <div className={`card flex-fill ${className ? className : ''}`}>
      {title && (
        <div className="card-header">
          <h5 className="card-title mb-0">{title}</h5>
        </div>
      )}
      <div className="card-body d-flex w-100">{children}</div>
    </div>
  );
}

export default Card;
