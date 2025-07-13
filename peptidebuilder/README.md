# Research Peptide Builder

A comprehensive web application for calculating dosing, cycle lengths, and costs for research peptides. Built with Next.js, React, and Tailwind CSS.

## ⚠️ Important Disclaimer

**These products are for research purposes only and are not intended for human consumption. This peptide builder is not a replacement for medical advice. Always consult your personal practitioner before making any medical decision.**

## Features

- **Peptide Builder**: Calculate precise dosing, cycle lengths, and costs
- **Product Catalog**: Browse comprehensive peptide database
- **Goal-Based Filtering**: Filter peptides by research goals (Skin Health, Mental Sharpness, Physical Strength, Weight Loss, Sleep, Recovery)
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark Theme**: Modern dark UI with purple accent colors
- **Accessibility**: ARIA labels and proper contrast ratios

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data**: Local JSON files (no database required)
- **Deployment**: Ready for DigitalOcean, Vercel, or any Node.js host

## Quick Start

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd peptide-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Project Structure

```
peptide-builder/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── builder/           # Peptide builder page
│   └── products/          # Products pages
├── components/            # Reusable React components
├── data/                  # JSON data files
│   └── peptides.json      # Peptide catalog
├── lib/                   # Utility functions
│   └── data.ts           # Data handling utilities
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

### Adding New Peptides

Edit `data/peptides.json` to add new peptides:

```json
{
  "slug": "new-peptide-5mg",
  "name": "New Peptide",
  "form": "5mg vial",
  "category": "Category",
  "goal": "Research Goal",
  "description": "Short description",
  "detailedDescription": "Detailed description",
  "recommendedDoseMcg": 250,
  "vialVolumeMg": 5,
  "priceUsd": 39.99,
  "dosingLogic": "Dosing information"
}
```

## Deployment

### DigitalOcean App Platform

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on DigitalOcean**
   - Go to DigitalOcean App Platform
   - Connect your GitHub repository
   - Select the `peptide-builder` directory
   - Set build command: `npm run build`
   - Set run command: `npm start`
   - Deploy

### DigitalOcean Droplet

1. **SSH into your droplet**
   ```bash
   ssh root@your-droplet-ip
   ```

2. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone and deploy**
   ```bash
   git clone <your-repo-url>
   cd peptide-builder
   npm install
   npm run build
   npm start
   ```

4. **Set up PM2 (recommended)**
   ```bash
   npm install -g pm2
   pm2 start npm --name "peptide-builder" -- start
   pm2 startup
   pm2 save
   ```

### Environment Variables

No environment variables are required for basic functionality. The application uses local JSON data.

## Customization

### Styling

The application uses Tailwind CSS with custom dark theme colors defined in `tailwind.config.js`:

- Background: `#121212`
- Cards: `#1E1E1E`
- Text: `#E0E0E0`
- Accent: `#BB86FC`

### Adding New Goals

1. Update `lib/data.ts` to add new goals to the `goals` array
2. Add corresponding peptides to `data/peptides.json`
3. Update the home page features section if needed

## Security Considerations

- All disclaimers are prominently displayed
- No user data is stored or transmitted
- Local JSON data only
- No authentication required

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for research purposes only. Please ensure compliance with local regulations regarding research peptides.

## Support

For technical support or questions about the application, please open an issue on GitHub.

---

**Remember**: This application is for research purposes only. Always follow proper laboratory safety protocols and consult with qualified professionals before conducting any research. 