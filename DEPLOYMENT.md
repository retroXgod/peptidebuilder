# Deployment Guide

This guide provides step-by-step instructions for deploying the Research Peptide Builder to various platforms.

## Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager
- Git repository access
- DigitalOcean account (for DigitalOcean deployment)

## Option 1: DigitalOcean App Platform (Recommended)

### Step 1: Prepare Your Repository

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to DigitalOcean App Platform**
   - Log into your DigitalOcean account
   - Navigate to App Platform
   - Click "Create App"
   - Choose "GitHub" as source
   - Connect your GitHub account
   - Select your repository

3. **Configure App Settings**
   - **Source Directory**: `peptide-builder` (if repo contains multiple projects)
   - **Build Command**: `npm run build`
   - **Run Command**: `npm start`
   - **Environment**: Node.js

4. **Deploy**
   - Click "Create Resources"
   - Wait for build and deployment to complete
   - Your app will be available at the provided URL

## Option 2: DigitalOcean Droplet

### Step 1: Create a Droplet

1. **Create Droplet**
   - Choose Ubuntu 22.04 LTS
   - Select your preferred plan (Basic $6/month minimum)
   - Choose datacenter region
   - Add SSH key or create password
   - Create droplet

### Step 2: Connect and Setup

1. **SSH into your droplet**
   ```bash
   ssh root@your-droplet-ip
   ```

2. **Update system**
   ```bash
   apt update && apt upgrade -y
   ```

3. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   apt-get install -y nodejs
   ```

4. **Install PM2 (Process Manager)**
   ```bash
   npm install -g pm2
   ```

### Step 3: Deploy Application

1. **Clone repository**
   ```bash
   git clone <your-github-repo-url>
   cd peptide-builder
   ```

2. **Install dependencies and build**
   ```bash
   npm install
   npm run build
   ```

3. **Start with PM2**
   ```bash
   pm2 start npm --name "peptide-builder" -- start
   pm2 startup
   pm2 save
   ```

4. **Configure firewall**
   ```bash
   ufw allow 3000
   ufw enable
   ```

### Step 4: Setup Nginx (Optional but Recommended)

1. **Install Nginx**
   ```bash
   apt install nginx -y
   ```

2. **Create Nginx configuration**
   ```bash
   nano /etc/nginx/sites-available/peptide-builder
   ```

3. **Add configuration**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **Enable site**
   ```bash
   ln -s /etc/nginx/sites-available/peptide-builder /etc/nginx/sites-enabled/
   nginx -t
   systemctl restart nginx
   ```

5. **Configure firewall for HTTP**
   ```bash
   ufw allow 80
   ufw allow 443
   ```

## Option 3: Docker Deployment

### Step 1: Build Docker Image

1. **Build image**
   ```bash
   docker build -t peptide-builder .
   ```

2. **Run container**
   ```bash
   docker run -d -p 3000:3000 --name peptide-builder-app peptide-builder
   ```

### Step 2: Docker Compose (Recommended)

1. **Create docker-compose.yml**
   ```yaml
   version: '3.8'
   services:
     peptide-builder:
       build: .
       ports:
         - "3000:3000"
       restart: unless-stopped
       environment:
         - NODE_ENV=production
   ```

2. **Deploy**
   ```bash
   docker-compose up -d
   ```

## Option 4: Vercel (Alternative)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

## Environment Variables

No environment variables are required for basic functionality. The application uses local JSON data.

## SSL/HTTPS Setup

### Let's Encrypt (Recommended)

1. **Install Certbot**
   ```bash
   apt install certbot python3-certbot-nginx -y
   ```

2. **Obtain certificate**
   ```bash
   certbot --nginx -d your-domain.com
   ```

3. **Auto-renewal**
   ```bash
   crontab -e
   # Add: 0 12 * * * /usr/bin/certbot renew --quiet
   ```

## Monitoring and Maintenance

### PM2 Commands

```bash
# View logs
pm2 logs peptide-builder

# Restart application
pm2 restart peptide-builder

# Monitor processes
pm2 monit

# Update application
git pull
npm install
npm run build
pm2 restart peptide-builder
```

### Nginx Commands

```bash
# Test configuration
nginx -t

# Reload configuration
systemctl reload nginx

# View logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

## Troubleshooting

### Common Issues

1. **Port 3000 not accessible**
   - Check firewall: `ufw status`
   - Check if app is running: `pm2 status`

2. **Build errors**
   - Ensure Node.js version is 18+: `node --version`
   - Clear npm cache: `npm cache clean --force`

3. **Nginx 502 errors**
   - Check if app is running: `pm2 status`
   - Check app logs: `pm2 logs peptide-builder`

### Performance Optimization

1. **Enable gzip compression in Nginx**
   ```nginx
   gzip on;
   gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
   ```

2. **Add caching headers**
   ```nginx
   location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
       expires 1y;
       add_header Cache-Control "public, immutable";
   }
   ```

## Security Considerations

1. **Keep system updated**
   ```bash
   apt update && apt upgrade -y
   ```

2. **Configure firewall properly**
   ```bash
   ufw default deny incoming
   ufw default allow outgoing
   ufw allow ssh
   ufw allow 80
   ufw allow 443
   ufw enable
   ```

3. **Regular backups**
   - Backup your application code
   - Backup your data files
   - Consider automated backup solutions

## Support

For deployment issues:
1. Check the logs: `pm2 logs peptide-builder`
2. Verify Node.js version: `node --version`
3. Check system resources: `htop`
4. Review firewall settings: `ufw status`

---

**Remember**: This application is for research purposes only. Ensure compliance with local regulations. 