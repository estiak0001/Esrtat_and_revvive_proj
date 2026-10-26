# ESRAT Associates - Deployment Guide

## Prerequisites
- Access to production server: `root@13.140.138.174`
- SSH key configured for passwordless login
- Working directory: `D:\RONY PROJ`
- Production URLs:
  - **Frontend**: `https://esratassociates.com`
  - **Backend API**: `http://13.140.138.174:8000`
  - **Admin Panel**: `https://esratassociates.com/admin`

---

## Frontend Deployment (React + Vite)

### Step 1: Build the Frontend
```powershell
cd "d:\RONY PROJ\esrat-associates"
npm run build
```
- Output: `dist/` folder
- Verify: No errors in build output (look for "built in XXXms")

### Step 2: Deploy to Production
```powershell
ssh root@13.140.138.174 "rm -rf /var/www/esrat-frontend/*"
scp -r "d:\RONY PROJ\esrat-associates\dist\*" root@13.140.138.174:/var/www/esrat-frontend/
echo "DEPLOYED"
```

### Step 3: Verify on Browser
1. Hard refresh production site (Ctrl+Shift+R or ⌘+Shift+R)
2. Check all pages load correctly
3. Test mobile responsiveness (Chrome DevTools)
4. Clear browser cache if needed

**Files affected**:
- `src/components/*.tsx` → Navbar, Footer, HeroCarousel, etc.
- `src/pages/*.tsx` → Home, About, Services, Contact, Industries
- `src/admin/pages/*.tsx` → Admin dashboard pages
- `src/index.css` → Global styles
- `vite.config.ts` → Build config (rarely changes)

---

## Backend Deployment (FastAPI + Python)

### Step 1: Transfer Backend Files
```powershell
cd "d:\RONY PROJ"
scp -r "backend\*" root@13.140.138.174:/var/www/esrat-api/
echo "BACKEND TRANSFERRED"
```

### Step 2: Restart Backend Service
```powershell
ssh root@13.140.138.174 "systemctl restart esrat-api && sleep 2 && systemctl is-active esrat-api"
```
- Output should show: `active`

### Step 3: Test API (Optional)
```powershell
ssh root@13.140.138.174 "curl -s http://localhost:8000/api/company | head -20"
```

**Files affected**:
- `models.py` → Database schemas (auto-migrates via SQLAlchemy)
- `routers/*.py` → API endpoints
- `auth.py` → Authentication logic
- `main.py` → FastAPI app initialization

---

## Database Migration (if schema changed)

If you modified `models.py` (added new tables/columns):

```powershell
ssh root@13.140.138.174 "cd /var/www/esrat-api && source venv/bin/activate && python init_db.py"
```

This will:
- Create missing tables
- Add new columns to existing tables
- Does NOT drop existing data

---

## Data Seeding (if needed)

For new content (consultants, testimonials, etc.):

```powershell
# Transfer seed script to server
scp "d:\RONY PROJ\seed_consultants_testimonials.py" root@13.140.138.174:/tmp/

# Run seed script
ssh root@13.140.138.174 "cd /var/www/esrat-api && source venv/bin/activate && python /tmp/seed_consultants_testimonials.py"
```

---

## Complete Deployment Workflow (All at Once)

```powershell
# Frontend: Build + Deploy
cd "d:\RONY PROJ\esrat-associates"
npm run build
ssh root@13.140.138.174 "rm -rf /var/www/esrat-frontend/*"
scp -r "dist\*" root@13.140.138.174:/var/www/esrat-frontend/

# Backend: Transfer + Restart (if changed)
cd "d:\RONY PROJ"
scp -r "backend\*" root@13.140.138.174:/var/www/esrat-api/
ssh root@13.140.138.174 "systemctl restart esrat-api && sleep 2 && systemctl is-active esrat-api"

echo "✅ FULL DEPLOYMENT COMPLETE"
```

---

## Post-Deployment Checklist

- [ ] Site loads at `https://esratassociates.com`
- [ ] Navbar renders (solid background, not transparent)
- [ ] Hero carousel works (images load, arrows functional)
- [ ] Mobile responsive (test on 390px viewport)
- [ ] Navigation links work (all pages accessible)
- [ ] API calls succeed (check browser DevTools Network tab)
- [ ] Admin panel accessible at `/admin/login`
- [ ] Forms submit without errors (Contact, Login)
- [ ] Images/logos display correctly
- [ ] Animations smooth (no janky scroll, navbar stays fixed)

---

## Rollback (if needed)

Keep the previous `dist/` folder backed up. If deployment breaks:

```powershell
# Restore from backup
scp -r "backup_dist\*" root@13.140.138.174:/var/www/esrat-frontend/
ssh root@13.140.138.174 "systemctl restart nginx"
```

---

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Navbar disappears on mobile scroll | Ensure `overscroll-behavior-y: none` in `index.css` + `position: fixed` inline style on navbar header |
| API 404 errors | Check backend is running: `systemctl is-active esrat-api` |
| Old styles cached | Browser hard refresh (Ctrl+Shift+R) or clear site data |
| Build fails with errors | Run `npm install` first, check Node version (14+) |
| SCP permission denied | Verify SSH key is added to server `authorized_keys` |

---

## Monitoring

Check server logs after deployment:

```powershell
# Backend logs
ssh root@13.140.138.174 "journalctl -u esrat-api -n 20 --no-pager"

# Nginx logs
ssh root@13.140.138.174 "tail -f /var/log/nginx/error.log"
```

---

## Environment Variables

Frontend (Vite):
- `VITE_API_URL` — defaults to `http://localhost:8000` (dev) or production backend (prod)

Backend (FastAPI):
- Database credentials in `/var/www/esrat-api/.env` (not in repo)
- JWT secret key
- CORS origins

Check `.env` on server before deploying if you changed secrets.

---

## Quick Reference (Copy & Paste)

### Frontend Only
```powershell
cd "d:\RONY PROJ\esrat-associates" && npm run build && ssh root@13.140.138.174 "rm -rf /var/www/esrat-frontend/*" && scp -r "dist\*" root@13.140.138.174:/var/www/esrat-frontend/ && echo "✅ Frontend deployed"
```

### Backend Only
```powershell
cd "d:\RONY PROJ" && scp -r "backend\*" root@13.140.138.174:/var/www/esrat-api/ && ssh root@13.140.138.174 "systemctl restart esrat-api && sleep 2 && systemctl is-active esrat-api" && echo "✅ Backend deployed"
```

### Both
```powershell
cd "d:\RONY PROJ\esrat-associates" && npm run build && ssh root@13.140.138.174 "rm -rf /var/www/esrat-frontend/*" && scp -r "dist\*" root@13.140.138.174:/var/www/esrat-frontend/ && cd "d:\RONY PROJ" && scp -r "backend\*" root@13.140.138.174:/var/www/esrat-api/ && ssh root@13.140.138.174 "systemctl restart esrat-api && sleep 2 && systemctl is-active esrat-api" && echo "✅ Full deployment complete"
```

---

**Last Updated**: 2026-06-12
**Prepared by**: GitHub Copilot
