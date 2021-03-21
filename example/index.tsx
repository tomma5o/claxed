import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import claxed from '../.';
import style from './style.module.css';

const Paragraph = claxed.p`
${style.pippo}
  p-5
  border
  m-2
  ${({ color, weight, fontSize = 'base', underline }) => `
    ${style[color]}
    ${underline && 'underline'}
    text-green-300
    font-${weight}
    text-${fontSize}
  `}
  }}
`;

const ParagraphPurple = claxed(Paragraph)`
  text-yellow-500
`;

const App = () => {
  return (
    <div>
      {/* <Paragraph color="red" weight="bold" underline>
        Ciao Mondo
      </Paragraph> */}
      <ParagraphPurple color="blue" weight="thin" fontSize="5xl">
        Ciao Mondo
      </ParagraphPurple>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
