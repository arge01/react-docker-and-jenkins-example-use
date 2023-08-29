import config from "@/constants/config";

type Props = {
  footer?: boolean;
};

function Footer({ footer = true }: Props) {
  return (
    <>
      {footer && (
        <footer className="footer">
          <div className="container-fluid">
            <div className="row text-muted">
              <div className="col-6 text-start">
                <p className="mb-0">
                  <a
                    className="text-muted"
                    href="https://adminkit.io/"
                    target="_blank"
                  >
                    <strong>{config.desc}</strong>
                  </a>{' '}
                  -{' '}
                  <a
                    className="text-muted"
                    href={config.author_link}
                    target="_blank"
                  >
                    <strong>{config.author}</strong>
                  </a>{' '}
                  &copy;
                </p>
              </div>
              <div className="col-6 text-end">
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <a
                      className="text-muted"
                      href={config.author_link}
                      target="_blank"
                    >
                      Support
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      className="text-muted"
                      href="/informations"
                    >
                      Help Center
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      className="text-muted"
                      href={config.author_link}
                      target="_blank"
                    >
                      Privacy
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      className="text-muted"
                      href={config.author_link}
                      target="_blank"
                    >
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}

export default Footer;
