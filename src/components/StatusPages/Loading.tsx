import React from 'react';

import "./style.scss";

type IProps = {
  style?: React.CSSProperties;
};

function Loading({ style = {} }: IProps) {
  return (
    <section style={{ ...style }} id="loading-component">
      <ul className="ul">
        <li className="li li-1"></li>
        <li className="li li-2"></li>
        <li className="li li-3"></li>
        <li className="li li-4"></li>
        <li className="li li-5"></li>
        <li className="li li-6"></li>
      </ul>
    </section>
  );
}

export default Loading;
