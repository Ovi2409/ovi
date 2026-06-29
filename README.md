# 💕 Romantic Date Invitation Website

A beautiful, modern, romantic date invitation website with a soft pink pastel theme, glassmorphism design, smooth animations, and Firebase Firestore integration.

## ✨ Features

- **6-Step Interactive Flow**: Guided date selection process
- **Beautiful UI**: Glassmorphism cards with soft pink pastel theme
- **Smooth Animations**: Heart animations, confetti on success, smooth transitions
- **Mobile Responsive**: Works perfectly on desktop and phone
- **Firebase Integration**: Saves submissions to Firestore
- **Admin Panel**: View and manage all date submissions
- **Search Functionality**: Filter submissions by date, time, food, or message
- **Delete Capability**: Remove submissions from the admin panel

## 📁 Project Structure

```
ovi/
├── index.html          # Main date invitation page
├── admin.html          # Admin panel for viewing submissions
├── style.css           # All styling with CSS variables
├── script.js           # Main application logic
├── admin.js            # Admin panel functionality
├── firebase.js         # Firebase configuration and operations
└── README.md           # This file
```

## 🚀 Quick Start

### 1. Clone or Download the Project

Download all files to your local machine or clone the repository.

### 2. Set Up Firebase

#### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter a project name (e.g., "date-invitation")
4. Follow the setup prompts (you can disable Google Analytics for this project)
5. Click **"Create project"**

#### Step 2: Enable Firestore Database

1. In your Firebase project, click **"Build"** in the left sidebar
2. Select **"Firestore Database"**
3. Click **"Create database"**
4. Choose a location (select the one closest to your users)
5. Select **"Start in test mode"** (allows read/write access for 30 days)
6. Click **"Enable"**

#### Step 3: Get Firebase Configuration

1. In your Firebase project, click the **gear icon** (Project Settings)
2. Scroll down to **"Your apps"** section
3. Click **"Web app"** (</> icon)
4. Give your app a name (e.g., "Date Invitation")
5. **Don't check** "Also set up Firebase Hosting for this app"
6. Click **"Register app"**
7. Copy the `firebaseConfig` object - it looks like this:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

#### Step 4: Update firebase.js

1. Open `firebase.js` in your code editor
2. Replace the placeholder `firebaseConfig` object with your actual configuration
3. Save the file

**Important**: Never commit your Firebase configuration with real API keys to public repositories. Use environment variables in production.

#### Step 5: Configure Firestore Security Rules (Optional but Recommended)

After testing, update your Firestore security rules to protect your data:

1. Go to Firebase Console → Firestore Database → Rules tab
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /dateSubmissions/{document=**} {
      allow read: if true;
      allow write: if true;
      // For production, consider adding authentication:
      // allow read, write: if request.auth != null;
    }
  }
}
```

### 3. Test Locally

1. Open `index.html` in your web browser
2. Test the complete flow:
   - Click "YES" to start
   - Select a date
   - Choose a time
   - Pick a food
   - Add an optional message
   - View the confirmation page
3. Open `admin.html` to view your submission

### 4. Deploy to Vercel

#### Step 1: Install Vercel CLI (Optional)

If you prefer using the command line:

```bash
npm install -g vercel
```

#### Step 2: Deploy via Vercel Website (Easiest Method)

1. Go to [Vercel](https://vercel.com/)
2. Sign up or log in
3. Click **"Add New..."** → **"Project"**
4. Import your project from:
   - GitHub (recommended)
   - GitLab
   - Bitbucket
   - Or upload the files manually

#### Step 3: Deploy via Vercel CLI

If using the CLI:

```bash
# Navigate to your project directory
cd ovi

# Login to Vercel
vercel login

# Deploy
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Link to existing project?** → No
- **Project name** → date-invitation (or your preferred name)
- **Directory** → . (current directory)
- **Override settings?** → No

#### Step 4: Configure Environment Variables (Recommended)

For production, it's best to use environment variables:

1. In Vercel, go to your project → **Settings** → **Environment Variables**
2. Add your Firebase config as individual variables:
   - `FIREBASE_API_KEY`
   - `FIREBASE_AUTH_DOMAIN`
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_STORAGE_BUCKET`
   - `FIREBASE_MESSAGING_SENDER_ID`
   - `FIREBASE_APP_ID`

3. Update `firebase.js` to use environment variables:

```javascript
const firebaseConfig = {
    apiKey: import.meta.env.FIREBASE_API_KEY || "YOUR_API_KEY",
    authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN || "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: import.meta.env.FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
    storageBucket: import.meta.env.FIREBASE_STORAGE_BUCKET || "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
    appId: import.meta.env.FIREBASE_APP_ID || "YOUR_APP_ID"
};
```

#### Step 5: Access Your Deployed Site

After deployment, Vercel will provide you with:
- A live URL (e.g., `https://date-invitation.vercel.app`)
- A custom domain option

## 🎨 Customization

### Change Colors

Edit CSS variables in `style.css`:

```css
:root {
    --primary-pink: #FFB6C1;    /* Main pink color */
    --soft-pink: #FFE4E9;       /* Background gradient start */
    --light-pink: #FFF0F3;      /* Background gradient middle */
    --white: #FFFFFF;           /* Card background */
    --text-dark: #4A4A4A;       /* Main text color */
    --text-light: #6B6B6B;      /* Secondary text color */
}
```

### Modify Time Options

Edit time buttons in `index.html` (Step 3 section):

```html
<button class="time-btn" data-time="12:00 PM">12:00 PM</button>
<!-- Add more times as needed -->
```

### Change Food Options

Edit food buttons in `index.html` (Step 4 section):

```html
<button class="food-btn" data-food="Pizza">🍕 Pizza</button>
<!-- Add more foods as needed -->
```

### Customize Messages

Edit text in `index.html`:
- Main title in Step 1
- Subtitles in each step
- Final message in Step 6

## 🔧 Troubleshooting

### Firebase Not Working

1. Check browser console for errors (F12 → Console)
2. Verify your Firebase configuration in `firebase.js`
3. Ensure Firestore is enabled in Firebase Console
4. Check Firestore security rules

### Submissions Not Saving

1. Verify Firebase configuration is correct
2. Check if Firestore is in test mode or has proper rules
3. Look for error messages in browser console

### Admin Panel Not Loading

1. Ensure `firebase.js` is properly configured
2. Check that Firestore database has the correct collection name (`dateSubmissions`)
3. Verify network connectivity

### Styling Issues

1. Clear browser cache
2. Ensure `style.css` is properly linked in HTML files
3. Check for CSS conflicts with other stylesheets

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 💡 Tips

- **Test thoroughly** before sharing the link
- **Consider adding authentication** to the admin panel for security
- **Customize the theme** to match your preferences
- **Add more food/time options** as needed
- **Use a custom domain** for a more professional look

## 🎉 Enjoy!

Create beautiful date invitations and make someone's day special! 💕

---

**Note**: This project uses Firebase Firestore, which has a generous free tier. For high-traffic applications, consider upgrading to a paid Firebase plan.
