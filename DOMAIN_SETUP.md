# Custom Domain Setup - about.ozyern.me

## DNS Configuration

To use the custom domain `about.ozyern.me`, follow these steps:

### For GitHub Pages:

1. **CNAME Record** (Recommended)
   - Go to your domain registrar (e.g., Namecheap, GoDaddy, etc.)
   - Add a CNAME record:
     - Name: `about`
     - Points to: `ozyern.github.io`

2. **A Records** (Alternative)
   - Add A records pointing to GitHub Pages IP addresses:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

### In GitHub Repository:

1. CNAME file is already present in the repository root
2. Go to GitHub repository Settings → Pages
3. Set custom domain to: `about.ozyern.me`
4. GitHub will validate the domain automatically

### Verification:

After DNS propagates (can take up to 24 hours):
- Visit `https://about.ozyern.me`
- Verify HTTPS works and redirects properly

### Troubleshooting:

- Check DNS propagation at: https://dnschecker.org
- Ensure CNAME file contains only: `about.ozyern.me`
- Clear browser cache if redirects feel slow
- Wait for SSL certificate to auto-provision (5-15 minutes)
