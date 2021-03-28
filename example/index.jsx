import * as React from 'react';
import * as ReactDOM from 'react-dom';
import claxed from '../dist/claxed.cjs';
import style from './style.module.css';

const Paragrapho = claxed.p`
${style.pippo}
  p-5
  border
  m-2
  ${({ color, weight, fontSize = 'base', underline }) => `
    ${style[color]}
    ${underline && 'underline'}
    font-${weight}
    text-${fontSize}
    text-red-500
    bg-blue-100
  `}
`;

const Paragraph = claxed(Paragrapho)`
  text-orange-500
`;

class Title extends React.Component {
  render() {
    return <h1 {...this.props}>{this.props.label}</h1>;
  }
}

const StyledTitle = claxed(Title)`
  text-green-300
  p-5
  m-2
`;

const ReStyledTitle = claxed(StyledTitle)`
  bg-blue-500
`;

const App = () => {
  return (
    <div>
      <ReStyledTitle label="Super Titolo" />

      <Paragraph className="MiaClasse" color="red" weight="thin" fontSize="xl">
        Paragrafo Blu
      </Paragraph>

      {/* <ParagraphPurple color="blue" weight="thin" fontSize="5xl">
        Ciao Mondo
      </ParagraphPurple> */}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
