import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import claxed from '../.';

const Paragraph = claxed.p`
p-5
border
m-2
${({ color, weight, fontSize = 'base', underline }) => `
  ${underline && 'underline'}
  text-${color}-500
  font-${weight}
  text-${fontSize}
`}
}}
`;

const App = () => {
  return (
    <div>
      <Paragraph color="green" weight="bold" underline>
        Ciao Mondo
      </Paragraph>
      <Paragraph color="gray" weight="thin" fontSize="5xl">
        Ciao Mondo
      </Paragraph>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
