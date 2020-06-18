# @jalik/react-lightbox

![GitHub package.json version](https://img.shields.io/github/package-json/v/jalik/react-lightbox.svg)
![GitHub](https://img.shields.io/github/license/jalik/react-lightbox.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/jalik/react-lightbox.svg)
[![GitHub issues](https://img.shields.io/github/issues/jalik/react-lightbox.svg)](https://github.com/jalik/react-lightbox/issues)
![npm](https://img.shields.io/npm/dt/@jalik/react-lightbox.svg)

# Quick start

This example allows to open any clicked images in `LightBoxWrapper` tags.

```js
import { LightBoxProvider, LightBoxWrapper } from '@jalik/react-lightbox';

const images = [
  {alt: 'dogs', src: '/relative/images/dogs.jpg'},
  {alt: 'cats', src: 'http://localhost/images/cats.jpg'},
];

function App() {
  return (
    <LightBoxProvider
      duration={3000}
      loop
    >
      <div>
        <h1>Images</h1>
        <LightBoxWrapper items={images}>
          {images.map((image) => (
            <img src={image.src} alt={image.alt} />
          ))}
        </LightBoxWrapper>
      </div>
    </LightBoxProvider>
  );
}
```

## Changelog

History of releases is in the [changelog](./CHANGELOG.md).

## License

The code is released under the [MIT License](http://www.opensource.org/licenses/MIT).
