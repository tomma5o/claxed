import { render } from '@testing-library/react';
import claxed from '../src';

test('Simple Claxed Component: Class Checks', () => {
  const ClaxedButton = claxed.button`mb-2`;
  const { getByTestId } = render(<ClaxedButton data-testid="button" />);

  const Button = getByTestId('button');

  expect(Button.classList.contains('mb-2')).toBe(true);
});

test('Simple Claxed Component: Class Merge Checks', () => {
  const ClaxedButton = claxed.button`mb-2`;
  const { getByTestId } = render(
    <ClaxedButton className="border" data-testid="button" />
  );

  const Button = getByTestId('button');

  expect(
    Button.classList.contains('mb-2') && Button.classList.contains('border')
  ).toBe(true);
});

test('Decorated Claxed Component: Class Checks', () => {
  const ClaxedButton = claxed.button`mb-2`;
  const DecoratedButton = claxed(ClaxedButton)`mt-5`;
  const { getByTestId } = render(<DecoratedButton data-testid="button" />);

  const Button = getByTestId('button');
  const classesButton = checkClassesExist(Button);

  expect(classesButton.includesAll('mb-2', 'mt-5')).toBe(true);
});

/*
TODO: TEST
  - check with func comp
  - check with class comp
  - checks with prop interpolations
  - check html attributes exists
*/

// UTILS
function checkClassesExist(element: Element) {
  const classesArray = Array.from(element.classList);
  return {
    includesAll(...classes: string[]) {
      const existingClasses = classes.filter((e) => classesArray.includes(e));
      return existingClasses.length === classes.length;
    },
  };
}
