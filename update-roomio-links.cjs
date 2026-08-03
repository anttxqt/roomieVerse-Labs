const fs = require('fs');

const files = [
  'src/pages/roomio.astro',
  'src/pages/en/roomio.astro',
  'src/pages/ar/roomio.astro'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Replace "Thử ngay" link
  content = content.replace(
    /href="https:\/\/roomio\.vn"(.*?)Thử ngay/g,
    'href="https://roomio.roomieverse.me"$1Thử ngay'
  );
  content = content.replace(
    /href="https:\/\/roomio\.vn"(.*?)Try now/g,
    'href="https://roomio.roomieverse.me"$1Try now'
  );
  content = content.replace(
    /href="https:\/\/roomio\.vn"(.*?)جرب الآن/g,
    'href="https://roomio.roomieverse.me"$1جرب الآن'
  );
  // Actually, wait, let me check what the text was in EN and AR for "Thử ngay" and "Bản dùng thử".
  // EN: Thử ngay -> Try Now ? Let's check EN/AR in the code.
  
  // Just blindly replace href="https://roomio.vn" because it's the only one
  content = content.replaceAll('href="https://roomio.vn"', 'href="https://roomio.roomieverse.me"');

  // Replace "Bản dùng thử" / "View Demo" / "عرض تجريبي"
  // It's the <a> tag immediately following the roomio.roomieverse.me one in the carousel.
  // The carousel buttons are inside <div style="display: flex; gap: 20px; align-items: center; justify-content: center; flex-wrap: wrap;">
  content = content.replaceAll(
    /<a href="#" class="cta-btn" style="--hover-bg: #1d1d1f; border: 1px solid #1d1d1f; color: #1d1d1f;"(.*?)>/g,
    '<a href="https://roomiodemo.roomieverse.me" target="_blank" class="cta-btn" style="--hover-bg: #1d1d1f; border: 1px solid #1d1d1f; color: #1d1d1f;"$1>'
  );

  fs.writeFileSync(file, content);
}
console.log("Updated links");
