/* TourPlanner - shared script: language, demo login, trips (stored in the browser) */
(function () {
  'use strict';

  /* ---------- Storage (localStorage with in-memory fallback) ---------- */
  var mem = {};
  function sGet(k, d) {
    try { var v = localStorage.getItem(k); return v === null ? (k in mem ? mem[k] : d) : JSON.parse(v); }
    catch (e) { return k in mem ? mem[k] : d; }
  }
  function sSet(k, v) { mem[k] = v; try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  /* ---------- Translations ---------- */
  var I18N = {
    en: {
      navHome: 'Home', navAbout: 'About Us', navDest: 'Destinations', navContact: 'Contact Us',
      navLogin: 'Login / Sign Up', navDashboard: 'Dashboard', navTrips: 'My Trips', navAdd: 'Add Trip', navLogout: 'Logout',
      heroTitle: 'Plan your perfect trip to Cambodia',
      heroSub: 'Discover destinations, build itineraries and keep all your trips in one place.',
      btnExplore: 'Explore Destinations', btnStart: 'Start Planning',
      featured: 'Popular Destinations', viewAll: 'View all',
      whyTitle: 'Why plan with us',
      why1t: 'Local knowledge', why1d: 'Tips on the best time to go and what to see.',
      why2t: 'Easy itineraries', why2d: 'Write your plan day by day and edit it any time.',
      why3t: 'Budget tracking', why3d: 'Set a budget for every trip and see your totals.',
      ctaTitle: 'Ready for your next adventure?', ctaSub: 'Create a free account and plan your first trip today.',
      btnSignup: 'Sign Up Free',
      aboutTitle: 'About Us', aboutSub: 'We help travelers plan trips that are simple and memorable.',
      missionT: 'Our mission',
      missionD: 'To make planning a trip to Cambodia easy for everyone, whether you are a local explorer or a visitor from abroad.',
      storyT: 'Our story',
      storyD: 'We started as a small group of travel lovers who were tired of messy notes and scattered bookmarks. So we built one place to find destinations and keep every plan.',
      destTitle: 'Explore Destinations', destSub: 'Find your next stop in Cambodia.',
      searchPh: 'Search destinations...', noResults: 'No destinations found.',
      details: 'View details', bestTime: 'Best time to visit', highlights: 'Highlights',
      suggested: 'Suggested stay', days: 'days', region: 'Region', planThis: 'Plan this trip', back: '← Back',
      contactTitle: 'Contact Us', contactSub: 'Questions? Send us a message and we will reply soon.',
      fName: 'Full name', fEmail: 'Email', fPhone: 'Phone (optional)', fSubject: 'Subject', fMessage: 'Message',
      send: 'Send message', sentOk: 'Thank you! Your message has been saved.',
      contactInfo: 'Our office', address: 'Phnom Penh, Cambodia',
      loginTitle: 'Welcome back', signupTitle: 'Create your account',
      tabLogin: 'Login', tabSignup: 'Sign Up', fPass: 'Password', fConfirm: 'Confirm password',
      errInvalid: 'Wrong email or password.', errExists: 'This email is already registered.',
      errMatch: 'Passwords do not match.', errShort: 'Password must be at least 6 characters.',
      errRequired: 'Please fill in all required fields.',
      welcome: 'Welcome back,', statTotal: 'Total trips', statUp: 'Upcoming trips', statBudget: 'Total budget',
      nextTrip: 'Next trip', recent: 'Recent trips', noTrips: 'You have no trips yet.',
      createFirst: 'Create your first trip', noUpcoming: 'No upcoming trips.',
      tripsTitle: 'My Trips', filterAll: 'All', sUpcoming: 'Upcoming', sOngoing: 'Ongoing', sDone: 'Completed',
      view: 'View', edit: 'Edit', del: 'Delete', confirmDel: 'Delete this trip? This cannot be undone.',
      addTitle: 'Add Trip', editTitle: 'Edit Trip',
      fTitle: 'Trip name', fDest: 'Destination', fStart: 'Start date', fEnd: 'End date',
      fTravelers: 'Travelers', fBudget: 'Budget (USD)', fNotes: 'Notes', fItin: 'Itinerary',
      itinHint: 'One activity per line, e.g. Day 1: Visit Angkor Wat',
      save: 'Save trip', cancel: 'Cancel', errDates: 'End date must be on or after the start date.',
      tripDetails: 'Trip Details', duration: 'Duration', notFound: 'Not found.',
      noItin: 'No itinerary yet.', status: 'Status', rights: '© 2026 TourPlanner. All rights reserved.'
    },
    km: {
      navHome: 'ទំព័រដើម', navAbout: 'អំពីយើង', navDest: 'ទិសដៅ', navContact: 'ទាក់ទងយើង',
      navLogin: 'ចូល / ចុះឈ្មោះ', navDashboard: 'ផ្ទាំងគ្រប់គ្រង', navTrips: 'ដំណើរកម្សាន្តរបស់ខ្ញុំ', navAdd: 'បន្ថែមដំណើរកម្សាន្ត', navLogout: 'ចាកចេញ',
      heroTitle: 'រៀបចំដំណើរកម្សាន្តដ៏ល្អឥតខ្ចោះរបស់អ្នកទៅកាន់កម្ពុជា',
      heroSub: 'ស្វែងរកទិសដៅ បង្កើតកម្មវិធីធ្វើដំណើរ និងរក្សាទុកដំណើរកម្សាន្តទាំងអស់របស់អ្នកនៅកន្លែងតែមួយ។',
      btnExplore: 'ស្វែងរកទិសដៅ', btnStart: 'ចាប់ផ្តើមរៀបចំ',
      featured: 'ទិសដៅពេញនិយម', viewAll: 'មើលទាំងអស់',
      whyTitle: 'ហេតុអ្វីត្រូវរៀបចំជាមួយយើង',
      why1t: 'ចំណេះដឹងក្នុងស្រុក', why1d: 'ដំបូន្មានអំពីពេលវេលាល្អបំផុត និងកន្លែងគួរទស្សនា។',
      why2t: 'កម្មវិធីធ្វើដំណើរងាយស្រួល', why2d: 'សរសេរផែនការរបស់អ្នកជាថ្ងៃៗ ហើយកែប្រែបានគ្រប់ពេល។',
      why3t: 'តាមដានថវិកា', why3d: 'កំណត់ថវិកាសម្រាប់ដំណើរនីមួយៗ ហើយមើលចំនួនសរុប។',
      ctaTitle: 'ត្រៀមខ្លួនសម្រាប់ដំណើរផ្សងព្រេងបន្ទាប់ហើយឬនៅ?', ctaSub: 'បង្កើតគណនីឥតគិតថ្លៃ ហើយរៀបចំដំណើរកម្សាន្តដំបូងរបស់អ្នកថ្ងៃនេះ។',
      btnSignup: 'ចុះឈ្មោះឥតគិតថ្លៃ',
      aboutTitle: 'អំពីយើង', aboutSub: 'យើងជួយអ្នកធ្វើដំណើររៀបចំដំណើរកម្សាន្តដែលសាមញ្ញ និងគួរឱ្យចងចាំ។',
      missionT: 'បេសកកម្មរបស់យើង',
      missionD: 'ធ្វើឱ្យការរៀបចំដំណើរកម្សាន្តទៅកាន់កម្ពុជាងាយស្រួលសម្រាប់គ្រប់គ្នា ទោះជាអ្នកស្រុក ឬភ្ញៀវមកពីបរទេស។',
      storyT: 'រឿងរ៉ាវរបស់យើង',
      storyD: 'យើងចាប់ផ្តើមពីក្រុមតូចនៃអ្នកស្រឡាញ់ការធ្វើដំណើរ ដែលនឿយណាយនឹងកំណត់ចំណាំរាយប៉ាយ។ ដូច្នេះយើងបង្កើតកន្លែងតែមួយសម្រាប់ស្វែងរកទិសដៅ និងរក្សាទុកផែនការទាំងអស់។',
      destTitle: 'ស្វែងរកទិសដៅ', destSub: 'ស្វែងរកកន្លែងបន្ទាប់របស់អ្នកនៅកម្ពុជា។',
      searchPh: 'ស្វែងរកទិសដៅ...', noResults: 'រកមិនឃើញទិសដៅទេ។',
      details: 'មើលព័ត៌មានលម្អិត', bestTime: 'ពេលវេលាល្អបំផុតក្នុងការទស្សនា', highlights: 'ចំណុចសំខាន់ៗ',
      suggested: 'រយៈពេលស្នាក់នៅដែលណែនាំ', days: 'ថ្ងៃ', region: 'តំបន់', planThis: 'រៀបចំដំណើរនេះ', back: '← ត្រឡប់ក្រោយ',
      contactTitle: 'ទាក់ទងយើង', contactSub: 'មានសំណួរ? សូមផ្ញើសារមកយើង យើងនឹងឆ្លើយតបឆាប់ៗ។',
      fName: 'ឈ្មោះពេញ', fEmail: 'អ៊ីមែល', fPhone: 'ទូរស័ព្ទ (មិនបង្ខំ)', fSubject: 'ប្រធានបទ', fMessage: 'សារ',
      send: 'ផ្ញើសារ', sentOk: 'សូមអរគុណ! សាររបស់អ្នកត្រូវបានរក្សាទុក។',
      contactInfo: 'ការិយាល័យរបស់យើង', address: 'ភ្នំពេញ ប្រទេសកម្ពុជា',
      loginTitle: 'សូមស្វាគមន៍ការត្រឡប់មកវិញ', signupTitle: 'បង្កើតគណនីរបស់អ្នក',
      tabLogin: 'ចូលគណនី', tabSignup: 'ចុះឈ្មោះ', fPass: 'ពាក្យសម្ងាត់', fConfirm: 'បញ្ជាក់ពាក្យសម្ងាត់',
      errInvalid: 'អ៊ីមែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ។', errExists: 'អ៊ីមែលនេះបានចុះឈ្មោះរួចហើយ។',
      errMatch: 'ពាក្យសម្ងាត់មិនដូចគ្នាទេ។', errShort: 'ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិច ៦ តួអក្សរ។',
      errRequired: 'សូមបំពេញព័ត៌មានដែលត្រូវការទាំងអស់។',
      welcome: 'សូមស្វាគមន៍ការត្រឡប់មកវិញ,', statTotal: 'ដំណើរកម្សាន្តសរុប', statUp: 'ដំណើរខាងមុខ', statBudget: 'ថវិកាសរុប',
      nextTrip: 'ដំណើរបន្ទាប់', recent: 'ដំណើរថ្មីៗ', noTrips: 'អ្នកមិនទាន់មានដំណើរកម្សាន្តនៅឡើយទេ។',
      createFirst: 'បង្កើតដំណើរដំបូងរបស់អ្នក', noUpcoming: 'គ្មានដំណើរខាងមុខទេ។',
      tripsTitle: 'ដំណើរកម្សាន្តរបស់ខ្ញុំ', filterAll: 'ទាំងអស់', sUpcoming: 'ខាងមុខ', sOngoing: 'កំពុងដំណើរការ', sDone: 'បានបញ្ចប់',
      view: 'មើល', edit: 'កែប្រែ', del: 'លុប', confirmDel: 'លុបដំណើរនេះ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។',
      addTitle: 'បន្ថែមដំណើរកម្សាន្ត', editTitle: 'កែប្រែដំណើរកម្សាន្ត',
      fTitle: 'ឈ្មោះដំណើរ', fDest: 'ទិសដៅ', fStart: 'ថ្ងៃចាប់ផ្តើម', fEnd: 'ថ្ងៃបញ្ចប់',
      fTravelers: 'អ្នកធ្វើដំណើរ', fBudget: 'ថវិកា (ដុល្លារ)', fNotes: 'កំណត់ចំណាំ', fItin: 'កម្មវិធីធ្វើដំណើរ',
      itinHint: 'មួយសកម្មភាពក្នុងមួយបន្ទាត់ ឧទាហរណ៍ ថ្ងៃទី ១៖ ទស្សនាអង្គរវត្ត',
      save: 'រក្សាទុកដំណើរ', cancel: 'បោះបង់', errDates: 'ថ្ងៃបញ្ចប់ត្រូវនៅក្រោយ ឬស្មើថ្ងៃចាប់ផ្តើម។',
      tripDetails: 'ព័ត៌មានលម្អិតនៃដំណើរកម្សាន្ត', duration: 'រយៈពេល', notFound: 'រកមិនឃើញទេ។',
      noItin: 'មិនទាន់មានកម្មវិធីធ្វើដំណើរទេ។', status: 'ស្ថានភាព', rights: '© ២០២៦ TourPlanner។ រក្សាសិទ្ធិគ្រប់យ៉ាង។'
    }
  };

  /* ---------- Destinations ---------- */
  var DESTS = [
    { id: 'siem-reap', emoji: '🛕', grad: 'linear-gradient(135deg,#f59e0b,#b45309)', days: '3-4',
      name: { en: 'Siem Reap & Angkor', km: 'សៀមរាប និងអង្គរ' },
      region: { en: 'North-west', km: 'ភាគពាយ័ព្យ' },
      desc: { en: 'Home of Angkor Wat and the temples of the Angkor Archaeological Park, a UNESCO World Heritage Site.',
              km: 'ទីតាំងនៃប្រាសាទអង្គរវត្ត និងប្រាសាទនានាក្នុងឧទ្យានបុរាណវិទ្យាអង្គរ ដែលជាបេតិកភណ្ឌពិភពលោករបស់អ៊ុយណេស្កូ។' },
      best: { en: 'November to March (cooler and drier)', km: 'ខែវិច្ឆិកា ដល់ខែមីនា (ត្រជាក់ និងស្ងួតជាង)' },
      hl: { en: ['Angkor Wat at sunrise', 'Bayon Temple', 'Ta Prohm', 'Night market and Pub Street'],
            km: ['ព្រះអាទិត្យរះនៅអង្គរវត្ត', 'ប្រាសាទបាយ័ន', 'ប្រាសាទតាព្រហ្ម', 'ផ្សារយប់ និងផ្លូវបារ'] } },
    { id: 'phnom-penh', emoji: '🏙️', grad: 'linear-gradient(135deg,#3b82f6,#1e3a8a)', days: '2-3',
      name: { en: 'Phnom Penh', km: 'ភ្នំពេញ' },
      region: { en: 'Central', km: 'កណ្តាល' },
      desc: { en: 'The capital city, where the Mekong and Tonle Sap rivers meet, with palaces, museums and lively markets.',
              km: 'រាជធានី ដែលទន្លេមេគង្គ និងទន្លេសាបជួបគ្នា មានព្រះបរមរាជវាំង សារមន្ទីរ និងផ្សារដ៏មានជីវិតជីវ៉ា។' },
      best: { en: 'November to February', km: 'ខែវិច្ឆិកា ដល់ខែកុម្ភៈ' },
      hl: { en: ['Royal Palace and Silver Pagoda', 'National Museum', 'Central Market', 'Riverside promenade'],
            km: ['ព្រះបរមរាជវាំង និងវត្តព្រះកែវ', 'សារមន្ទីរជាតិ', 'ផ្សារកណ្តាល', 'មាត់ទន្លេ'] } },
    { id: 'kampot', emoji: '🌶️', grad: 'linear-gradient(135deg,#10b981,#065f46)', days: '2-3',
      name: { en: 'Kampot', km: 'កំពត' },
      region: { en: 'South', km: 'ភាគខាងត្បូង' },
      desc: { en: 'A relaxed riverside town near Bokor Mountain, known for its pepper farms and old French-era buildings.',
              km: 'ទីក្រុងស្ងប់ស្ងាត់មាត់ទន្លេ ជិតភ្នំបូកគោ ល្បីខាងចម្ការម្រេច និងអគារបែបបារាំងចាស់ៗ។' },
      best: { en: 'November to April', km: 'ខែវិច្ឆិកា ដល់ខែមេសា' },
      hl: { en: ['Bokor Mountain', 'Pepper farm visit', 'Kampot River sunset cruise', 'Caves near town'],
            km: ['ភ្នំបូកគោ', 'ទស្សនាចម្ការម្រេច', 'ជិះទូកមើលថ្ងៃលិចលើទន្លេកំពត', 'ល្អាងក្បែរទីក្រុង'] } },
    { id: 'koh-rong', emoji: '🏝️', grad: 'linear-gradient(135deg,#06b6d4,#0e7490)', days: '3-5',
      name: { en: 'Koh Rong', km: 'កោះរ៉ុង' },
      region: { en: 'Coast', km: 'ឆ្នេរសមុទ្រ' },
      desc: { en: 'An island with white-sand beaches and clear water, good for swimming, snorkeling and slow days by the sea.',
              km: 'កោះដែលមានឆ្នេរខ្សាច់ស និងទឹកថ្លា សមស្របសម្រាប់ហែលទឹក មុជទឹកមើលផ្កាថ្ម និងសម្រាកនៅមាត់សមុទ្រ។' },
      best: { en: 'November to May (dry season)', km: 'ខែវិច្ឆិកា ដល់ខែឧសភា (រដូវប្រាំង)' },
      hl: { en: ['Long beaches', 'Snorkeling', 'Kayaking', 'Sunset views'],
            km: ['ឆ្នេរសមុទ្រវែងៗ', 'មុជទឹកមើលផ្កាថ្ម', 'ចែវទូកកាយ៉ាក់', 'ទិដ្ឋភាពថ្ងៃលិច'] } },
    { id: 'mondulkiri', emoji: '🌄', grad: 'linear-gradient(135deg,#84cc16,#3f6212)', days: '2-3',
      name: { en: 'Mondulkiri', km: 'មណ្ឌលគិរី' },
      region: { en: 'East', km: 'ភាគខាងកើត' },
      desc: { en: 'A province of rolling hills, waterfalls and forests, with a cooler climate and ethical elephant experiences.',
              km: 'ខេត្តដែលមានភ្នំរលក ទឹកធ្លាក់ និងព្រៃឈើ អាកាសធាតុត្រជាក់ជាង និងមានកម្មវិធីជួបដំរីដោយការថែរក្សា។' },
      best: { en: 'November to February', km: 'ខែវិច្ឆិកា ដល់ខែកុម្ភៈ' },
      hl: { en: ['Bou Sra Waterfall', 'Elephant sanctuary visit', 'Pine-covered hills', 'Local ethnic culture'],
            km: ['ទឹកជ្រោះបូស្រា', 'ទស្សនាទីអភិរក្សដំរី', 'ភ្នំដើមស្រល់', 'វប្បធម៌ជនជាតិភាគតិច'] } },
    { id: 'battambang', emoji: '🚂', grad: 'linear-gradient(135deg,#ec4899,#9d174d)', days: '2',
      name: { en: 'Battambang', km: 'បាត់ដំបង' },
      region: { en: 'North-west', km: 'ភាគពាយ័ព្យ' },
      desc: { en: 'A charming provincial city with French colonial architecture, art scene and countryside sights.',
              km: 'ទីរួមខេត្តដ៏មានមន្តស្នេហ៍ មានស្ថាបត្យកម្មបារាំង សិល្បៈ និងទិដ្ឋភាពជនបទ។' },
      best: { en: 'November to February', km: 'ខែវិច្ឆិកា ដល់ខែកុម្ភៈ' },
      hl: { en: ['Bamboo train', 'Phnom Sampov and the bat caves', 'Old town architecture', 'Local art spaces'],
            km: ['រថភ្លើងឫស្សី', 'ភ្នំសំពៅ និងល្អាងប្រចៀវ', 'ស្ថាបត្យកម្មទីក្រុងចាស់', 'កន្លែងសិល្បៈក្នុងស្រុក'] } }
  ];

  /* ---------- Helpers ---------- */
  var LANG = sGet('lang', 'en');
  if (!I18N[LANG]) LANG = 'en';

  function t(k) { return (I18N[LANG] && I18N[LANG][k]) || I18N.en[k] || k; }
  function pick(o) { return o ? (o[LANG] || o.en) : ''; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function today() { var d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function fmtDate(s) {
    if (!s) return '';
    var d = new Date(s + 'T00:00:00');
    try { return d.toLocaleDateString(LANG === 'km' ? 'km-KH' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); }
    catch (e) { return s; }
  }
  function money(n) { return '$' + (Number(n) || 0).toLocaleString('en-US'); }
  function numDays(a, b) { return Math.round((new Date(b) - new Date(a)) / 864e5) + 1; }
  function destById(id) { for (var i = 0; i < DESTS.length; i++) if (DESTS[i].id === id) return DESTS[i]; return null; }
  function params() { return new URLSearchParams(location.search); }
  function safeNext(s) { return s && /^[a-z-]+\.html(\?[\w=&%.\-]*)?$/i.test(s) ? s : ''; }

  /* ---------- Auth (demo only: data stays in this browser) ---------- */
  function user() {
    var email = sGet('tp_session', null);
    if (!email) return null;
    var users = sGet('tp_users', []);
    for (var i = 0; i < users.length; i++) if (users[i].email === email) return users[i];
    return null;
  }
  function signup(name, email, pass, confirm) {
    name = (name || '').trim(); email = (email || '').trim().toLowerCase();
    if (!name || !email || !pass) return { error: 'errRequired' };
    if (pass.length < 6) return { error: 'errShort' };
    if (pass !== confirm) return { error: 'errMatch' };
    var users = sGet('tp_users', []);
    for (var i = 0; i < users.length; i++) if (users[i].email === email) return { error: 'errExists' };
    users.push({ name: name, email: email, pass: pass });
    sSet('tp_users', users); sSet('tp_session', email);
    return { ok: true };
  }
  function login(email, pass) {
    email = (email || '').trim().toLowerCase();
    var users = sGet('tp_users', []);
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === email && users[i].pass === pass) { sSet('tp_session', email); return { ok: true }; }
    }
    return { error: 'errInvalid' };
  }
  function logout() { sSet('tp_session', null); location.href = 'index.html'; }

  /* ---------- Trips ---------- */
  function tripsKey() { var u = user(); return 'tp_trips_' + (u ? u.email : 'guest'); }
  function allTrips() { return sGet(tripsKey(), []); }
  function getTrip(id) { var l = allTrips(); for (var i = 0; i < l.length; i++) if (l[i].id === id) return l[i]; return null; }
  function saveTrip(trip) {
    var l = allTrips(), found = false;
    for (var i = 0; i < l.length; i++) if (l[i].id === trip.id) { l[i] = trip; found = true; }
    if (!found) l.push(trip);
    sSet(tripsKey(), l);
  }
  function newId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function deleteTrip(id) { sSet(tripsKey(), allTrips().filter(function (x) { return x.id !== id; })); }
  function tripStatus(tr) {
    var n = today();
    if (tr.end < n) return 'done';
    if (tr.start > n) return 'upcoming';
    return 'ongoing';
  }
  function statusLabel(s) { return t(s === 'done' ? 'sDone' : s === 'ongoing' ? 'sOngoing' : 'sUpcoming'); }
  function badge(s) { return '<span class="badge badge-' + s + '">' + esc(statusLabel(s)) + '</span>'; }

  /* ---------- Shared HTML pieces ---------- */
  function destCard(d) {
    return '<a class="card" href="destination.html?id=' + d.id + '">' +
      '<div class="dest-img" style="background:' + d.grad + '">' + d.emoji + '</div>' +
      '<div class="card-body"><h3>' + esc(pick(d.name)) + '</h3>' +
      '<p class="muted">' + esc(pick(d.region)) + '</p>' +
      '<p>' + esc(pick(d.desc)) + '</p>' +
      '<span class="link-more">' + esc(t('details')) + ' →</span></div></a>';
  }
  function tripCard(tr) {
    var d = destById(tr.dest), s = tripStatus(tr);
    return '<div class="card trip-card"><div class="dest-img" style="height:90px;background:' + (d ? d.grad : '#94a3b8') + '">' + (d ? d.emoji : '🧳') + '</div>' +
      '<div class="card-body"><div>' + badge(s) + '</div>' +
      '<h3>' + esc(tr.title) + '</h3>' +
      '<div class="trip-meta">' + esc(d ? pick(d.name) : '') + '</div>' +
      '<div class="trip-meta">' + fmtDate(tr.start) + ' – ' + fmtDate(tr.end) + '</div>' +
      '<div class="trip-meta">' + money(tr.budget) + '</div>' +
      '<div class="card-actions">' +
      '<a class="btn btn-primary btn-sm" href="trip.html?id=' + tr.id + '">' + esc(t('view')) + '</a>' +
      '<a class="btn btn-outline btn-sm" href="trip-form.html?id=' + tr.id + '">' + esc(t('edit')) + '</a>' +
      '<button class="btn btn-danger btn-sm" data-del="' + tr.id + '">' + esc(t('del')) + '</button>' +
      '</div></div></div>';
  }

  /* ---------- Header / footer ---------- */
  function renderHeader() {
    var host = document.getElementById('site-header');
    if (!host) return;
    var u = user(), page = document.body.dataset.page || '';
    var links = [['index.html', 'navHome', 'home'], ['about.html', 'navAbout', 'about'],
                 ['destinations.html', 'navDest', 'destinations'], ['contact.html', 'navContact', 'contact']];
    var nav = links.map(function (l) {
      var on = page === l[2] || (l[2] === 'destinations' && page === 'destination');
      return '<a href="' + l[0] + '"' + (on ? ' class="active"' : '') + '>' + esc(t(l[1])) + '</a>';
    }).join('');
    var right = '<div class="lang-switch" role="group" aria-label="Language">' +
      '<button class="lang-btn' + (LANG === 'en' ? ' active' : '') + '" data-lang="en">English</button>' +
      '<button class="lang-btn' + (LANG === 'km' ? ' active' : '') + '" data-lang="km">ខ្មែរ</button></div>';
    if (u) {
      right += '<a class="btn btn-outline btn-sm" href="dashboard.html">' + esc(t('navDashboard')) + '</a>' +
               '<button class="btn btn-primary btn-sm" id="logout-btn">' + esc(t('navLogout')) + '</button>';
    } else {
      right += '<a class="btn btn-primary btn-sm" href="login.html">' + esc(t('navLogin')) + '</a>';
    }
    var html = '<header class="site-header"><div class="wrap nav">' +
      '<a class="brand" href="index.html">🧭 TourPlanner</a>' +
      '<button class="menu-btn" id="menu-btn" aria-label="Menu">☰</button>' +
      '<nav id="mainnav">' + nav + '</nav><div class="nav-right">' + right + '</div></div>';
    if (u && document.body.dataset.area === 'user') {
      var sub = [['dashboard.html', 'navDashboard', ['dashboard']], ['trips.html', 'navTrips', ['trips', 'trip', 'edit']], ['trip-form.html', 'navAdd', ['add']]];
      html += '<div class="subnav"><div class="wrap">' + sub.map(function (s) {
        return '<a href="' + s[0] + '"' + (s[2].indexOf(page) > -1 ? ' class="active"' : '') + '>' + esc(t(s[1])) + '</a>';
      }).join('') + '</div></div>';
    }
    html += '</header>';
    host.innerHTML = html;

    Array.prototype.forEach.call(host.querySelectorAll('.lang-btn'), function (b) {
      b.addEventListener('click', function () { setLang(b.dataset.lang); });
    });
    var lo = document.getElementById('logout-btn'); if (lo) lo.addEventListener('click', logout);
    var mb = document.getElementById('menu-btn');
    if (mb) mb.addEventListener('click', function () { document.getElementById('mainnav').classList.toggle('open'); });
  }
  function renderFooter() {
    var host = document.getElementById('site-footer');
    if (host) host.innerHTML = '<footer class="site-footer">' + esc(t('rights')) + '</footer>';
  }

  function applyI18n() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n]'), function (el) { el.textContent = t(el.dataset.i18n); });
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-ph]'), function (el) { el.placeholder = t(el.dataset.i18nPh); });
    if (document.body.dataset.title) document.title = t(document.body.dataset.title) + ' | TourPlanner';
  }

  function refresh() {
    document.documentElement.lang = LANG;
    renderHeader(); renderFooter();
    if (typeof window.render === 'function') window.render();
    applyI18n();
  }
  function setLang(l) { LANG = l; sSet('lang', l); refresh(); }

  function init() {
    var b = document.body, u = user();
    if (b.dataset.auth === 'required' && !u) {
      var here = location.pathname.split('/').pop() + location.search;
      location.replace('login.html?next=' + encodeURIComponent(here));
      return;
    }
    if (b.dataset.auth === 'guest' && u) { location.replace(safeNext(params().get('next')) || 'dashboard.html'); return; }
    refresh();
  }

  window.TP = {
    t: t, pick: pick, esc: esc, DESTS: DESTS, destById: destById, destCard: destCard, tripCard: tripCard,
    user: user, signup: signup, login: login, logout: logout,
    allTrips: allTrips, getTrip: getTrip, saveTrip: saveTrip, deleteTrip: deleteTrip, newId: newId,
    tripStatus: tripStatus, badge: badge, fmtDate: fmtDate, money: money, numDays: numDays, today: today,
    params: params, safeNext: safeNext, applyI18n: applyI18n, init: init, store: { get: sGet, set: sSet }
  };
})();
