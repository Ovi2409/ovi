# 🌸 Romantic Dating Proposal Website 🌸

A beautiful, premium, and fully responsive romantic dating proposal website with cute panda theme, glassmorphism design, and smooth animations.

## ✨ Features

- **Soft Pink Gradient Background** - Romantic and aesthetic color scheme
- **Glassmorphism Cards** - Modern frosted glass UI design
- **Cute Panda Theme** - Adorable panda decorations and animations
- **Flying NO Button** - The NO button runs away when you try to click it! 😄
- **Panda Gate Animation** - Beautiful transition animation between pages
- **Date & Time Selection** - Interactive calendar and time chips
- **Food Selection Cards** - Choose from 8 different cuisines
- **Cute Message Input** - Leave a sweet message
- **EmailJS Integration** - Send the date details via email
- **Floating Hearts** - Continuous heart animation in background
- **Confetti Celebration** - Colorful confetti on completion
- **Background Music** - Romantic piano music with mute button
- **Fully Responsive** - Works perfectly on mobile and desktop
- **Smooth Page Transitions** - Elegant animations between pages

## 📁 Project Structure

```
foryou/
├── index.html          # Main HTML file with all pages
├── styles.css          # Custom CSS styles and animations
├── script.js           # JavaScript functionality
├── README.md           # Project documentation
└── .gitignore          # Git ignore file
```

## 🚀 How to Use

### Local Development

1. Clone or download the project
2. Open `index.html` in a web browser
3. That's it! No build process required

### GitHub Pages Deployment

1. Create a new GitHub repository
2. Upload all files to the repository
3. Go to repository Settings → Pages
4. Select the main branch as source
5. Your site will be live at `https://yourusername.github.io/repository-name`

## ⚙️ EmailJS Setup

To enable email functionality, you need to configure EmailJS:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a new email service
3. Create an email template with these variables:
   - `{{date}}` - Selected date
   - `{{time}}` - Selected time
   - `{{food}}` - Selected food
   - `{{message}}` - Cute message
4. Update the following in `script.js`:
   - Replace `YOUR_EMAILJS_PUBLIC_KEY` with your public key
   - Replace `YOUR_EMAILJS_SERVICE_ID` with your service ID
   - Replace `YOUR_EMAILJS_TEMPLATE_ID` with your template ID

```javascript
emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");

await emailjs.send(
    'YOUR_EMAILJS_SERVICE_ID',
    'YOUR_EMAILJS_TEMPLATE_ID',
    templateParams
);
```

## 🎨 Customization

### Colors
Edit the gradient in `styles.css`:
```css
body {
    background: linear-gradient(135deg, #ffd1dc 0%, #ffb6c1 50%, #ffc0cb 100%);
}
```

### Music
Replace the audio source in `index.html`:
```html
<audio id="bgMusic" loop>
    <source src="YOUR_MUSIC_URL.mp3" type="audio/mpeg">
</audio>
```

### Email Destination
Change the email in `script.js`:
```javascript
const templateParams = {
    to_email: 'your-email@example.com',
    // ...
};
```

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎯 Page Flow

1. **Page 1**: "Will you go on a date with me?" with YES/NO buttons
2. **Page 2**: Date and time selection
3. **Page 3**: Food preference selection
4. **Page 4**: Cute message input
5. **Final Page**: Summary with confetti celebration

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom animations and glassmorphism
- **JavaScript (ES6+)** - Interactive functionality
- **Tailwind CSS** - Utility-first styling (via CDN)
- **EmailJS** - Email service integration
- **Google Fonts** - Quicksand and Pacifico fonts

## 📝 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Animation Details

- **Floating Hearts**: Continuous background animation
- **Flying Button**: NO button escapes cursor
- **Gate Animation**: Panda walks through magical gate
- **Confetti**: Colorful celebration on completion
- **Page Transitions**: Smooth fade and scale effects
- **Hover Effects**: Button and card interactions

## 📄 License

This project is open source and available for personal use.

## 💝 Usage Tips

1. **First Interaction**: Click YES to start the music
2. **Mute Button**: Use the speaker icon in top-right to toggle music
3. **Date Selection**: Only future dates can be selected
4. **Single Selection**: Only one food option can be chosen
5. **Email**: Requires EmailJS configuration to send emails

## 🐼 Theme Elements

- Panda emoji decorations
- Pink and rose color palette
- Heart and flower emojis
- Soft rounded corners
- Elegant shadows
- Glass-like transparency

## 🎉 Enjoy!

This website is designed to create a memorable and romantic experience. Feel free to customize it to make it even more special! 💕

---

Made with ❤️ for special moments
