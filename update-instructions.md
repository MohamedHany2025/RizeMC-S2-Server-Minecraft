## سجل التحديثات (Changelog)

> هذا الملف يُعرض من خلال زر "عرض التحديثات 🚀" في أسفل الصفحة (الفوتر) أو عبر الزر العائم.

التحديثات الأخيرة التي أُضيفت للموقع (ملفّات ومكانها):

- `assets/intro.css` — أنماط نافذة الانترو (overlay) وزر التخطي.
- `assets/intro.js` — منطق عرض الانترو:
  - يعرض واجهة ترحيبية تحتوي رابط فيديو يوتيوب (fallback) أو iframe عندما يسمح التضمين.
  - يظهر فقط في `index.html` (يعمل عندما يحتوي `<body>` على `class="index-page"`).
  - يظهر مرة واحدة في اليوم لكل متصفح (يُخزن تاريخ العرض في localStorage).
  - يوقف الموسيقى الخلفية أثناء العرض ويُعيد تشغيلها بعد الانتهاء أو التخطي.
  - يتوفر زر "تخطي" يظهر بعد 3 ثواني ويمكن الضغط على ESC للتخطي.

- `assets/update-popup.css` — أنماط النافذة المنبثقة (overlay) لعرض محتوى هذا الملف، وزر العرض العائم، وزر الفوتر.
- `assets/update-popup.js` — ينشئ:
  - زر عرض التحديثات العائم (أسفل يمين) ما لم يوجد زر مخصّص في الفوتر.
  - يدعم استخدام زر الفوتر إذا وُجد (`#updates-footer-button` أو `.updates-footer-btn`).
  - يجلب محتوى `update-instructions.md` عبر `fetch()` ويحوّله إلى HTML بسيط.
  - يوفر إغلاق بالنقر خارج الصندوق، زر إغلاق، وصوتيات صغيرة عند الفتح/الإغلاق.

- `assets/common.css` / `assets/common.js` — أنماط ووظيفية مشتركة (الموسيقى الخلفية، أزرار مشتركة، إلخ).
- `index.html` — تغييرات واجهة المستخدم:
  - أضفت `class="index-page"` إلى `<body>` لتمكين الانترو فقط على الصفحة الرئيسية.
  - أضفت زرًا في الفوتر: `<button id="updates-footer-button" class="updates-footer-btn">عرض التحديثات 🚀</button>` ليفتح نافذة التحديثات.
  - أضفت روابط إلى `assets/intro.css` و `assets/common.css`، ثم تُحمّل السكربتات `assets/intro.js`, `assets/common.js`, و `assets/update-popup.js`.

### سلوك زر "عرض التحديثات" الآن

- عند النقر على زر الفوتر أو الزر العائم:
  1. تُفتح نافذة منبثقة (overlay) مظللة تحتوي عنوانًا ومحتوى `update-instructions.md` بعد تحويله من Markdown إلى HTML.
  2. يمكن إغلاق النافذة بزر (×) أو بالضغط خارجها أو بالضغط على ESC.

### كيف تضمن أن المحتوى يظهر (ملاحظة مهمة عن fetch)

- إذا فتحت الملفات مباشرة باستخدام بروتوكول `file://`، بعض المتصفحات تمنع `fetch()` لملفات محلية — لذلك قد لا تُحمَل `update-instructions.md` ويظهر المحتوى فارغًا.
- الحل المفضل: شغّل خادم محلي ثم افتح الموقع عبر `http://localhost:8000`:

  PowerShell (من مجلد المشروع):
  ```powershell
  python -m http.server 8000
  ```

  ثم افتح: `http://localhost:8000`

- بديل: أستطيع إضافة "fallback" داخل `assets/update-popup.js` بحيث إذا فشل `fetch()` يُعرض نص مضمّن مباشرة (أخبرني إن تريدني أطبّق ذلك).

### اختبار سريع (Manual QA)

1. شغّل خادم محلي (أو افتح الملف عبر خادم).  
2. افتح `index.html`.  
3. انزل للفوتر وانقر على "عرض التحديثات 🚀" — يجب أن تظهر نافذة تحتوي سجلّ التحديثات أعلاه.  
4. جرّب إغلاقها بالنقر على × أو الضغط على ESC أو النقر خارج النافذة.

### تعديلات مقترحة إضافية (أطبّق أيّها إن رغبت)

- Auto-open once-per-day: أضبط `assets/update-popup.js` ليفتح تلقائيًا عند أول زيارة يومية.
- Fallback: تضمين نسخة من `update-instructions.md` داخل `assets/update-popup.js` إذا فشل `fetch()`.
- عرض تغييرات Git: لو تريد، أستطيع توليد changelog ديناميكي من تاريخ Git (يتطلب أن يكون المشروع مخزّنًا في Git على الجهاز)، أو تكتب ملخّص التغييرات يدويًا داخل الملف.

هل تريد أن أفعّل أيّ من الخيارات التالية الآن؟

- (أ) أضيف auto-open مرة واحدة يوميًا.
- (ب) أضيف fallback للمحتوى المضمّن لو احتجنا (مهم عند فتح بالـ file://).
- (ج) أغيّر نص السجل ليشمل تفاصيل إضافية (مثلاً: أسماء الفروع، أو الوصلات لملفات مُعدّلة).

أكتب رقم الخيار أو قل "تمام" لو كل شيء جاهز.
# Changes to implement:

1. Add to head section of each HTML file:
```html
<link rel="stylesheet" href="assets/common.css">
<link rel="stylesheet" href="assets/update-popup.css">
```

2. Replace each page's footer with:
```html
<!-- الحقوق -->
<footer style="text-align: center; padding: 1rem; margin-top: 2rem; border-top: 1px solid rgba(255, 255, 255, 0.2); color: #aaa; font-size: 0.9rem;">
    جميع الحقوق محفوظة © 2025 تصميم وتطوير <a href="https://www.facebook.com/xspeedo.gaming.2025#" class="abtn" target="_blank">Mohamed Hany</a>
    <br>
    <div style="margin-top: 0.5rem">
        بواسطة فريق <a href="https://mohamedhany2025.github.io/Your-Site-Pro/" class="abtn" target="_blank">Your-Site-Pro</a>
        <br>المصمم الأكبر والموقع الرسمي
    </div>
</footer>
```

3. Replace each page's inline music script with:
```html
<!-- Background music controller -->
<script src="assets/common.js"></script>
<!-- Update popup system -->
<script src="assets/update-popup.js"></script>
```

4. Ensure all pages have these meta tags in head:
```html
<meta property="og:title" content="سيرفر RizeMC - الموسم الثاني">
<meta property="og:description" content="عالم ما بعد الحرب العظيمة - اختر مصيرك واكتب تاريخك">
<meta property="og:image" content="assest/IMG-20251022-WA0000.jpg">
<meta name="theme-color" content="#ff4444">
```

Files to update:
- index.html
- help.html
- README.html
- index_new.html

The assets/common.js file has already been created with the new music controller that:
- Syncs music state between pages
- Forces looping to always be on
- Remembers playback position when switching pages
- Uses shared localStorage keys for state management

Notes:
- Make sure assets/common.js exists before updating the HTML files
- Backup files before making changes
- Test music continuity by opening multiple pages