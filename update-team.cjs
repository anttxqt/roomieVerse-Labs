const fs = require('fs');

const files = [
  'src/pages/our-team.astro',
  'src/pages/en/our-team.astro',
  'src/pages/ar/our-team.astro'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  const member1Start = content.indexOf('<!-- Member 1 -->');
  const member2Start = content.indexOf('<!-- Member 2 -->');
  let member1Block = content.substring(member1Start, member2Start);

  // Name
  member1Block = member1Block.replace('>Antt</h3>', '>An T. Tran</h3>');
  
  // Role
  member1Block = member1Block.replace(
    '<p style="margin: 0; color: var(--blue); font-weight: 600; font-size: 1.2rem; line-height: 1;">Founder & CEO</p>',
    '<p style="margin: 0; color: var(--blue); font-weight: 600; font-size: 1.2rem; line-height: 1;">Founder & Full-stack Developer</p>'
  );

  // Description
  member1Block = member1Block.replace(
    /<p style="margin: 0; color: var\(--muted\); font-size: 1.05rem; line-height: 1.6;">[\s\S]*?<\/p>/,
    '<p style="margin: 0; color: var(--muted); font-size: 1.05rem; line-height: 1.6;">\n              Also a Product Management & Product Owner & Market Researcher...\n            </p>'
  );

  // Links
  member1Block = member1Block.replace(
    /<a href="#" style="color: inherit; text-decoration: none;">X<\/a>\s*<a href="#" style="color: inherit; text-decoration: none;">LinkedIn<\/a>/,
    '<a href="https://x.com/2uehi" target="_blank" style="color: inherit; text-decoration: none;">X (@2uehi)</a>'
  );

  // For EN and AR pages, the Role might be translated in member1? 
  // Wait, in my previous script, I replaced the roles without caring about translation?
  // No, the user provided exact roles for the first card. Let's make sure it replaces the role even if translated.
  member1Block = member1Block.replace(
    /<p style="margin: 0; color: var\(--blue\); font-weight: 600; font-size: 1.2rem; line-height: 1;">.*?<\/p>/,
    '<p style="margin: 0; color: var(--blue); font-weight: 600; font-size: 1.2rem; line-height: 1;">Founder & Full-stack Developer</p>'
  );

  const member3Start = content.indexOf('<!-- Member 3 -->');
  const member3End = content.indexOf('</article>', member3Start) + 10;
  
  // Also there might be a lot of spaces/newlines between member 2 end and member 3 start, we don't care, it will be kept.
  // We just remove member3 block
  const newContent = content.substring(0, member1Start) + member1Block + content.substring(member2Start, member3Start) + content.substring(member3End);
  
  fs.writeFileSync(file, newContent);
}
console.log("Updated team files");
