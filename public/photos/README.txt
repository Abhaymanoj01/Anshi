To add your own photos to the website:

1. Copy your image files (like .jpg or .png) into this folder (`public/photos/`).
2. Make sure they have simple names like `1.jpg`, `2.jpg`, or `trip.jpg`.
3. Open the file `src/data/photos.ts` in your code editor.
4. Update the `CUSTOM_PHOTOS` array to match your file names and add captions!

Example:
If you put a file named `goa-trip.jpg` in this folder, your code in `src/data/photos.ts` should look like this:

const CUSTOM_PHOTOS = [
  { src: "/photos/goa-trip.jpg", caption: "Our amazing Goa trip 🌴" },
  // ... other photos
];
