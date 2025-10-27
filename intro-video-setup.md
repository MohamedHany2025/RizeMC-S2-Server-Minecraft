# Intro Video Implementation Guide

1. Place your intro video file at:
```
assest/intro.mp4
```

2. Add to HEAD section of index.html only (add right after the viewport meta tag):
```html
    <meta property="og:title" content="سيرفر RizeMC - الموسم الثاني">
    <meta property="og:description" content="عالم ما بعد الحرب العظيمة - اختر مصيرك واكتب تاريخك">
    <meta property="og:image" content="assest/IMG-20251022-WA0000.jpg">
    <meta name="theme-color" content="#ff4444">

    <!-- Shared styles -->
    <link rel="stylesheet" href="assets/common.css">
    <link rel="stylesheet" href="assets/intro.css">
```

3. Add to BODY tag of index.html only:
```html
<body class="index-page">
```

4. Add before closing BODY tag of index.html only:
```html
    <!-- Background music and intro video controllers -->
    <script src="intro.js"></script>
```

The new files I created will:
- Display an intro video overlay on the index page only
- Show a stylized skip button in the bottom right
- Remember if the intro was shown today (won't show again until tomorrow)
- Pause background music during intro video
- Resume background music after intro finishes or is skipped
- Work on both desktop and mobile
- Support keyboard shortcuts (ESC to skip)
- Auto-hide on video end

Files created:
1. assets/intro.css - Styles for video overlay and skip button
2. assets/intro.js - Video player logic and state management
3. assets/common.css - Shared styles for the site (already created)
4. assets/common.js - Shared music controller (already created)

Features:
- Video shows ONLY on index.html
- Skip button appears after 2 seconds
- Keyboard ESC key also skips
- Background music pauses during intro
- Shows once per day per browser
- Mobile-friendly design
- Smooth animations

Testing:
1. Open index.html - should show intro video
2. Click skip or press ESC - should fade out and start music
3. Refresh page - should NOT show intro again today
4. Open help.html - should NOT show intro
5. Wait until tomorrow - intro should show again on index.html

Note:
Make sure your intro video (assest/intro.mp4):
- Is properly compressed for web
- Has decent audio quality
- Is not too long (30-60 seconds recommended)
- Works in modern browsers (MP4/H.264)