# Deploy to GitHub - Manual Upload Instructions

Since git authentication isn't configured, here's how to upload manually:

## Step 1: Go to Your Repository
https://github.com/opamayo2/gymswap-thermometer

## Step 2: Upload Files via Web Interface

1. Click "uploading an existing file" link on the repository page
2. Drag and drop these files/folders:
   - `index.html`
   - `css` folder (with styles.css inside)
   - `js` folder (with all 4 .js files inside)
   - `assets` folder

3. In the commit message box, type: "Initial commit - GymSwap Thermometer"
4. Click "Commit changes"

## Step 3: Enable GitHub Pages

1. Go to Settings in your repository
2. Click "Pages" in the left sidebar
3. Under "Source", select: **main** branch
4. Under "Folder", select: **/ (root)**
5. Click "Save"

## Step 4: Wait 2-3 Minutes

GitHub will build your site. Once ready, it will be live at:
**https://opamayo2.github.io/gymswap-thermometer**

## Alternative: Use GitHub Desktop

1. Download: https://desktop.github.com
2. Sign in to GitHub
3. File → Add Local Repository
4. Select: /Users/oliverpearson/Downloads/GymSwap Thermometer
5. Click "Publish repository"
6. Follow Step 3 above to enable GitHub Pages

That's it! Your GymSwap Thermometer will be live on the web!
