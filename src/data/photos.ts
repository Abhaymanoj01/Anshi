/**
 * HOW TO ADD YOUR OWN PHOTOS:
 * 
 * 1. Place your photo files inside the `public/photos/` folder.
 * 2. Update the `CUSTOM_PHOTOS` array below with the exact file names and captions.
 *    For example, if you add a picture named "trip.jpg", put { src: "/photos/trip.jpg", caption: "Our trip" }
 * 
 * Note: If you don't have exactly 42 photos, you can add more or remove some from the list.
 */

const actualFiles = [
  "pic1.jpeg", "pic2.jpeg", "pic3.jpeg", "pic4.jpeg", "pic5.jpeg",
  "pic6.jpeg", "pic7.jpeg", "pic8.jpeg", "pic9.jpeg", "pic10.jpeg",
  "pic11.jpeg", "pic12.jpeg", "pic13.jpeg", "pic14.jpeg", "pic15.jpeg",
  "pic16.jpeg", "pic17.jpeg", "pic18.jpeg", "pic19.jpeg", "pic20.jpeg",
  "pic21.jpeg", "pic22.jpeg", "pic23.jpeg", "pic24.jpeg", "pic25.jpeg",
  "pic26.jpeg", "pic28.jpeg", "pic29.jpeg", "pic30.jpeg", "pic31.jpeg",
  "pic32.jpeg", "pic34.jpeg", "pic35.jpeg", "pic36.png", "pic37.png"
];

export const PHOTOS = actualFiles.map(name => ({
  src: `/photos/${name}`,
  caption: `A beautiful memory ✨`
}));
