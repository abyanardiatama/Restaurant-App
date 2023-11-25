const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, '../public');
const destination = path.resolve(__dirname, 'dist');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

fs.readdirSync(target).forEach((image) => {
  // mengubah ukuran gambar dengan lebar 800px, dengan prefix -large.jpg
//   sharp(`${target}/${image}`)
//     .resize(800)
//     .toFile(path.resolve(__dirname, `${destination}/${image.split('.')
//       .slice(0, -1)
//       .join('.')}-large.jpg`));

  // mengubah ukuran gambar dengan lebar 480px, dengan prefix -small.jpg
  //   sharp(`${target}/${image}`)
  //     .resize(480)
  //     .toFile(path.resolve(__dirname, `${destination}/${image.split('.')
  //       .slice(0, -1)
  //       .join('.')}-small.jpg`));
  const imagePath = path.resolve(target, image);

  // Check if the file is an image (supported format)
  if (image.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
    // Resize the image and save with -large.jpg prefix
    sharp(imagePath)
      .resize(800)
      .toFile(path.resolve(destination, `${path.parse(image).name}-large.jpg`));

    // Resize the image and save with -small.jpg prefix
    sharp(imagePath)
      .resize(480)
      .toFile(path.resolve(destination, `${path.parse(image).name}-small.jpg`));
  }
});
