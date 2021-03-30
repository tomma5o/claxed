<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

</div>
<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/tomma5o/claxed">
    <img src="images/claxed_logo.png" alt="Claxed">
  </a>
  <p align="center">
    Classes with the same style of Styled-Components 🚀
    <br />
    <a href="https://github.com/tomma5o/claxed">View Demo</a>
    ·
    <a href="https://github.com/tomma5o/claxed/issues">Report Bug</a>
    ·
    <a href="https://github.com/tomma5o/claxed/issues">Request Feature</a>
  </p>
</p>

<!-- ABOUT THE PROJECT -->

## About The Project

The idea is born while using [tailwind CSS](https://tailwindcss.com/) which is very helpful in giving us all the CSS classes for sizes, colors, spacings, but sometimes can be messy if you have a lot of classes to type inside the component. And not to mention when you want a conditional class based on a prop 💆‍♂️

With claxed, heavily inspired by [styled-components](https://styled-components.com/), we can keep our DOM a little bit cleaner with the help of some utilities like props interpolation inside the template string.

<!-- GETTING STARTED -->

### Installation

```sh
npm install claxed
```

or

```sh
yarn add claxed
```

<!-- USAGE EXAMPLES -->

## Usage

If you know styled-components this might be already familiar to you. The difference is that whatever you type within the template string will be printed in the html `class` attribute of the component. In the following example every row is a CSS class.

```js
const Button = claxed.button`
  px-3
  py-2
`;
```

Or you can conditionally add a class:

```js
const ButtonRed = claxed(Button)`
  ${({ border }) => border && 'border'}
  text-red-500
`;

const App = () => (
  <div>
    <Button>Click me</Button>
    <ButtonRed border>Click me</ButtonRed>
  </div>
);

// Note: All the falsy values are stripped from the output
```

## Roadmap

See the [open issues](https://github.com/tomma5o/claxed/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place form where to learn, be inspired, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## FAQ

<details>
  <summary>Why sometimes it doesn't work if I override a class?</summary>
  <p>This happens because is not important where you declared a class, but is the ordering in declaration of the lib that gives it the priority</p>
</details>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Tommaso Poletti - [@Tomma5o](https://twitter.com/tomma5o)

Project Link: [https://github.com/tomma5o/claxed](https://github.com/tomma5o/claxed)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/tomma5o/claxed.svg?style=for-the-badge
[contributors-url]: https://github.com/tomma5o/claxed/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/tomma5o/claxed.svg?style=for-the-badge
[forks-url]: https://github.com/tomma5o/claxed/network/members
[stars-shield]: https://img.shields.io/github/stars/tomma5o/claxed.svg?style=for-the-badge
[stars-url]: https://github.com/tomma5o/claxed/stargazers
[issues-shield]: https://img.shields.io/github/issues/tomma5o/claxed.svg?style=for-the-badge
[issues-url]: https://github.com/tomma5o/claxed/issues
[license-shield]: https://img.shields.io/github/license/tomma5o/claxed.svg?style=for-the-badge
[license-url]: https://github.com/tomma5o/claxed/blob/master/LICENSE.txt
[product-screenshot]: images/screenshot.png
