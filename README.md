
## Features

### CV Conversion & Print Optimization
This landing page now includes a built-in CV converter that transforms the page into a curriculum vitae format optimized for A4 paper printing.

#### How to Use
1. Click the **"CV"** button in the top navigation bar
2. The page will switch to CV mode with:
   - Compact, print-friendly layout
   - Optimized font sizes for A4 paper
   - Adjusted spacing and margins
   - Removed non-essential elements (background images, gradients)
3. To return to normal view, click the **"Normal View"** button
4. To save as PDF:
   - In CV mode, press **Ctrl+P** (or **Cmd+P** on Mac)
   - Select "Save as PDF" in the print dialog
   - Choose your desired settings and save

#### Technical Details
- **A4 Dimensions**: 210mm × 297mm with 0.5" margins
- **Font Sizes**:
  - Headings: 14pt (bold)
  - Body text: 10pt
  - Optimized line spacing for readability
- **CSS Files**:
  - `static/css/cv-print.css` - Contains all CV and print styling
  - `static/css/main.css` - Updated with CV mode styles
- **JavaScript Files**:
  - `static/js/cv.js` - Handles CV mode toggle and state persistence
- **Browser Preference**: CV mode preference is saved in localStorage and persists across sessions

#### Print Tips
- Modern browsers (Chrome, Firefox, Safari, Edge) are recommended
- Disable headers/footers in print dialog for cleaner output
- Use "Margins: None" or "Minimal" for best layout
- Preview before printing to ensure proper page breaks

## Credit to
![Github Forks](https://img.shields.io/github/forks/senli1073/senli1073.github.io?style=flat)
![Github Stars](https://img.shields.io/github/stars/senli1073/senli1073.github.io?style=flat)
![License](https://img.shields.io/github/license/senli1073/senli1073.github.io)
![Last Commit](https://img.shields.io/github/last-commit/senli1073/senli1073.github.io)