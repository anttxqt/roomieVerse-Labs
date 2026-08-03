const fs = require('fs');
const files = [
  'src/pages/our-team.astro',
  'src/pages/en/our-team.astro',
  'src/pages/ar/our-team.astro'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Replace article alignment
  content = content.replaceAll(
    '<article style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; padding: 40px; background: #f5f5f7; border-radius: 32px; gap: 40px;">',
    '<article style="display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; padding: 40px; background: #f5f5f7; border-radius: 32px; gap: 40px;">'
  );

  // Replace left container alignment
  content = content.replaceAll(
    '<div style="display: flex; align-items: center; gap: 32px; flex: 1; min-width: 280px;">',
    '<div style="display: flex; align-items: flex-start; gap: 32px; flex: 1; min-width: 280px;">'
  );

  // Replace avatar size
  content = content.replaceAll(
    '<div style="width: 140px; height: 140px; border-radius: 50%; background: #e5e5ea; flex-shrink: 0; overflow: hidden; display: flex; align-items: center; justify-content: center;">',
    '<div style="width: 110px; height: 110px; border-radius: 50%; background: #e5e5ea; flex-shrink: 0; overflow: hidden; display: flex; align-items: center; justify-content: center;">'
  );

  // Replace Name container and h3
  content = content.replaceAll(
    '<div>\n              <h3 style="margin-bottom: 4px; font-size: 2rem; color: var(--ink);">',
    '<div style="display: flex; flex-direction: column; gap: 16px; padding-top: 6px;">\n              <h3 style="margin: 0; font-size: 2rem; color: var(--ink); line-height: 1;">'
  );

  // Replace username p
  content = content.replaceAll(
    '<p style="color: var(--muted); font-size: 1.1rem; margin-bottom: 12px;">',
    '<p style="margin: 0; color: var(--muted); font-size: 1.1rem; line-height: 1;">'
  );

  // Replace social links div
  content = content.replaceAll(
    '<div style="display: flex; gap: 12px; color: var(--muted);">',
    '<div style="display: flex; gap: 12px; color: var(--muted); line-height: 1;">'
  );

  // Replace Role block container
  content = content.replaceAll(
    '<div style="flex: 1.5; min-width: 280px; text-align: start;">',
    '<div style="flex: 1.5; min-width: 280px; text-align: start; display: flex; flex-direction: column; gap: 16px; padding-top: 6px;">'
  );

  // Replace Role p
  content = content.replaceAll(
    '<p style="color: var(--blue); font-weight: 600; font-size: 1.2rem; margin-bottom: 12px;">',
    '<p style="margin: 0; color: var(--blue); font-weight: 600; font-size: 1.2rem; line-height: 1;">'
  );

  // Replace Description p
  content = content.replaceAll(
    '<p style="color: var(--muted); font-size: 1.05rem; line-height: 1.6;">',
    '<p style="margin: 0; color: var(--muted); font-size: 1.05rem; line-height: 1.6;">'
  );

  fs.writeFileSync(file, content);
}
console.log("Done");
