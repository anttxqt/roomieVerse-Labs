const fs = require('fs');
const path = require('path');

const roomieverseReplacements = [
  {
    target: '<span style="color: #fff; font-weight: bold; opacity: 0.2; font-size: 1rem; text-align: center;">[ Badge ]</span>',
    vi: '<h3 style="margin: 0; font-size: 1.2rem;">Gắn kết</h3>',
    en: '<h3 style="margin: 0; font-size: 1.2rem;">Connected</h3>',
    ar: '<h3 style="margin: 0; font-size: 1.2rem;">مترابط</h3>'
  },
  {
    target: '<span style="color: #fff; font-weight: bold; opacity: 0.2; font-size: 1rem; text-align: center;">[ Feature ]</span>',
    vi: '<h3 style="margin: 0; font-size: 1.2rem;">Xác thực danh tính</h3>',
    en: '<h3 style="margin: 0; font-size: 1.2rem;">ID Verified</h3>',
    ar: '<h3 style="margin: 0; font-size: 1.2rem;">هوية موثقة</h3>'
  },
  {
    target: '<span style="color: #fff; font-weight: bold; opacity: 0.2; font-size: 1.5rem;">[ Roommate matching illustration ]</span>',
    vi: '<h3 style="margin: 0; font-size: 1.5rem;">Ghép phòng dựa trên thói quen</h3>',
    en: '<h3 style="margin: 0; font-size: 1.5rem;">Matching based on habits</h3>',
    ar: '<h3 style="margin: 0; font-size: 1.5rem;">مطابقة بناءً على العادات</h3>'
  },
  {
    target: '<span style="color: #fff; font-weight: bold; opacity: 0.2; font-size: 1.2rem; text-align: center;">[ Community ]</span>',
    vi: '<h3 style="margin: 0; font-size: 1.2rem;">Cộng đồng văn minh</h3>',
    en: '<h3 style="margin: 0; font-size: 1.2rem;">Civilized Community</h3>',
    ar: '<h3 style="margin: 0; font-size: 1.2rem;">مجتمع راقٍ</h3>'
  },
  {
    target: '<span style="color: #fff; font-weight: bold; opacity: 0.2; font-size: 1.5rem;">[ Làm việc trực tiếp với chủ nhà ]</span>',
    vi: '<h3 style="margin: 0; font-size: 1.5rem;">Kết nối trực tiếp, không qua trung gian</h3>',
    en: '<h3 style="margin: 0; font-size: 1.5rem;">Direct connection, no middlemen</h3>',
    ar: '<h3 style="margin: 0; font-size: 1.5rem;">اتصال مباشر بدون وسطاء</h3>'
  },
  {
    target: '[ Content for roomibase ]',
    vi: 'Nền tảng tìm kiếm phòng trọ, căn hộ trực tiếp từ chủ nhà, an toàn và minh bạch.',
    en: 'A platform to find rooms and apartments directly from landlords, safely and transparently.',
    ar: 'منصة للعثور على الغرف والشقق مباشرة من الملاك، بأمان وشفافية.'
  },
  {
    target: '[ Content for roomieverse ]',
    vi: 'Mạng xã hội tìm bạn cùng phòng dựa trên thói quen, tạo nên một cộng đồng gắn kết.',
    en: 'A social network for finding roommates based on habits, creating a connected community.',
    ar: 'شبكة اجتماعية للعثور على شركاء السكن بناءً على العادات، لخلق مجتمع مترابط.'
  }
];

const roomioReplacements = [
  {
    target: '<span style="color: #1d1d1f; font-weight: bold; opacity: 0.4; font-size: 1.2rem; text-align: center; margin-bottom: 20px;">[ Báo cáo ]</span>',
    vi: '<span style="color: #1d1d1f; font-weight: bold; font-size: 1.2rem; text-align: center; margin-bottom: 20px;">Báo cáo trực quan</span>',
    en: '<span style="color: #1d1d1f; font-weight: bold; font-size: 1.2rem; text-align: center; margin-bottom: 20px;">Visual Reports</span>',
    ar: '<span style="color: #1d1d1f; font-weight: bold; font-size: 1.2rem; text-align: center; margin-bottom: 20px;">تقارير مرئية</span>'
  },
  {
    target: '<span style="color: #1d1d1f; font-weight: bold; opacity: 0.3; font-size: 1.5rem;">[ Ảnh minh họa Dashboard hoặc Mobile App ]</span>',
    vi: '<h3 style="color: #1d1d1f; margin: 0; font-size: 1.5rem;">Quản lý tập trung trên một Dashboard</h3>',
    en: '<h3 style="color: #1d1d1f; margin: 0; font-size: 1.5rem;">Centralized Management Dashboard</h3>',
    ar: '<h3 style="color: #1d1d1f; margin: 0; font-size: 1.5rem;">لوحة تحكم مركزية</h3>'
  },
  {
    target: '<span style="color: #1d1d1f; font-weight: bold; opacity: 0.4; font-size: 1.2rem; text-align: center; margin-bottom: 20px;">[ Thống kê ]</span>',
    vi: '<span style="color: #1d1d1f; font-weight: bold; font-size: 1.2rem; text-align: center; margin-bottom: 20px;">Tình trạng phòng</span>',
    en: '<span style="color: #1d1d1f; font-weight: bold; font-size: 1.2rem; text-align: center; margin-bottom: 20px;">Room Status</span>',
    ar: '<span style="color: #1d1d1f; font-weight: bold; font-size: 1.2rem; text-align: center; margin-bottom: 20px;">حالة الغرف</span>'
  },
  {
    target: '[ Tính năng 1 ]',
    vi: 'Camera AI',
    en: 'AI Camera',
    ar: 'كاميرا الذكاء الاصطناعي'
  },
  {
    target: '[ Tính năng 2 ]',
    vi: 'Thanh toán QR',
    en: 'QR Payments',
    ar: 'مدفوعات QR'
  },
  {
    target: '<span style="color: #1d1d1f; font-weight: bold; opacity: 0.3; font-size: 1.5rem;">[ Ảnh minh họa tính năng ]</span>',
    vi: '<h3 style="color: #1d1d1f; margin: 0; font-size: 1.5rem;">Giao tiếp với khách thuê trực tiếp trên ứng dụng</h3>',
    en: '<h3 style="color: #1d1d1f; margin: 0; font-size: 1.5rem;">Communicate with tenants directly in-app</h3>',
    ar: '<h3 style="color: #1d1d1f; margin: 0; font-size: 1.5rem;">التواصل المباشر مع المستأجرين عبر التطبيق</h3>'
  },
  {
    target: '<span style="color: #1d1d1f; font-weight: bold; opacity: 0.4; font-size: 1.2rem; text-align: center; margin-bottom: 20px;">[ Thống kê 5 ]</span>',
    vi: '<span style="color: #1d1d1f; font-weight: bold; font-size: 1.2rem; text-align: center; margin-bottom: 20px;">Lịch sử bảo trì</span>',
    en: '<span style="color: #1d1d1f; font-weight: bold; font-size: 1.2rem; text-align: center; margin-bottom: 20px;">Maintenance Logs</span>',
    ar: '<span style="color: #1d1d1f; font-weight: bold; font-size: 1.2rem; text-align: center; margin-bottom: 20px;">سجلات الصيانة</span>'
  }
];

function processFiles(files, replacements) {
  for (const { lang, path } of files) {
    if (fs.existsSync(path)) {
      let content = fs.readFileSync(path, 'utf8');
      for (const r of replacements) {
        content = content.replaceAll(r.target, r[lang]);
      }
      fs.writeFileSync(path, content);
    }
  }
}

const roomieverseFiles = [
  { lang: 'vi', path: 'src/pages/roomieverse.astro' },
  { lang: 'en', path: 'src/pages/en/roomieverse.astro' },
  { lang: 'ar', path: 'src/pages/ar/roomieverse.astro' }
];

const roomioFiles = [
  { lang: 'vi', path: 'src/pages/roomio.astro' },
  { lang: 'en', path: 'src/pages/en/roomio.astro' },
  { lang: 'ar', path: 'src/pages/ar/roomio.astro' }
];

processFiles(roomieverseFiles, roomieverseReplacements);
processFiles(roomioFiles, roomioReplacements);

console.log("Replaced carousel placeholders successfully!");
