═══START═══

<div align="center">

# دلائل الخيرات

# Dalāʾil al-Khayrāt

**Waymarks of Benefits · Guide to Goodness**

صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ

</div>

---

A mobile companion to the timeless manual of blessings upon the Prophet Muhammad ﷺ, composed by **Imam al-Jazuli** in 15th-century Morocco and recited across the Islamic world for over five centuries.

Built with love, and dedicated as **Ṣadaqah Jāriyah** (ongoing charity) for the soul of **Ismail Ahmed** — إسماعيل أحمد.

---

## 📲 Download

<div align="center">

### [**Download for Android**](https://github.com/AbdulHamid172/dalaailul-kheirat-app/releases/latest)

_Android 8.0+ · ~98 MB · no ads, no tracking, no account_

</div>

**Installation:**

1. Tap the download link above
2. Tap the `.apk` file when it finishes downloading
3. If prompted, allow **"install from unknown sources"** (standard for any app distributed outside Play Store)
4. Tap **Install** → **Open**

> **iOS** — Coming soon. Requires an Apple Developer Program membership for distribution.

---

## ✨ What's inside

- **The Eight Days** — the complete Dalāʾil cycle, arranged for daily recitation from Monday to the following Monday
- **The Blessed Rawda** — the description of the Prophet's ﷺ resting place and that of his two companions, Abu Bakr and Umar (may Allah be pleased with them)
- **The Names** — 99 Names of Allah **جَلَّ جَلَالُهُ** and 201 Names of the Prophet ﷺ, each searchable by Arabic, transliteration, or meaning
- **Opening supplications** — the Dua of Intention (_niyyah_), the Opening Dua, and the Dua of Completion
- **A guided recitation flow** — the "Continue" button on every screen walks you through the full sequence: **Intention → Opening → Names → Day 1 → … → Day 8 → Completion**

---

## 🕌 The recitation order

The app follows the traditional sequence:

Any day can be opened directly from the **Chapters** tab — the app guides but does not gate. Completed days are checked; the next one is highlighted in gold.

---

## 🎨 Design

- **Amiri** Arabic typeface (traditional Naskh calligraphy)
- Warm parchment palette — cream, gold, deep brown — inspired by classical manuscripts
- Full RTL rendering with adjustable Arabic font size (S / M / L / XL)
- Bookmarks save across sessions
- No network calls. No analytics. No accounts. Everything is on-device.

---

## 🛠️ Built with

|                                                                             |                                        |
| --------------------------------------------------------------------------- | -------------------------------------- |
| [Expo](https://expo.dev) SDK 58                                             | React Native framework + build tooling |
| [Expo Router](https://docs.expo.dev/router/introduction/)                   | File-based routing                     |
| [React Native](https://reactnative.dev) 0.88                                | Cross-platform mobile                  |
| [Amiri](https://github.com/aliftype/amiri)                                  | Arabic typeface                        |
| [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) | Local persistence                      |

---

## 👨‍💻 For developers

```bash
git clone https://github.com/AbdulHamid172/dalaailul-kheirat-app.git
cd dalaailul-kheirat-app
npm install
npx expo start
```

app/
(tabs)/ # bottom-tab routes: Home, Chapters, Bookmarks, Settings
duas/ # intention, opening, completion
reader/[id].tsx # chapter reader (days 1–8 + Rawda)
names.tsx # 99 Names of Allah + 201 Names of the Prophet
\_layout.tsx # Stack root

components/ # ChapterCard, ArabicText, Header
constants/ # Colors, Typography
data/ # chapters + passages + names (JSON)
utils/storage.ts # AsyncStorage helpers
docs/ # GitHub Pages landing page
