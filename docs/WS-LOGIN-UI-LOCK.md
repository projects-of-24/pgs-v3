# WS-LOGIN-UI — Workspace login visual LOCK

**Gate:** WS-LOGIN-UI · `GO AHEAD WS-LOGIN-UI` · 2026-10-08  
**URL:** `/workspace/login`  
**Mock:** [`public/preview/feed-workspace-qc/chatgpt-mocks/shell-registry-desk.jpg`](../public/preview/feed-workspace-qc/chatgpt-mocks/shell-registry-desk.jpg) (panel 1)

| Item | Value |
|---|---|
| Layout | **Centered** hero + card (not Ops two-column marketing rail) |
| Brand | PGS · PurpleGuide Study · **Mentor-Student Workspace** |
| Form | Sign in to PGS Workspace · email · password · Sign In → · Forgot |
| Warning | Students not allowed — **below** form (mock order) |
| Auth | Unchanged · staff only · lands `/workspace` |
| Studio `/studio/login` | **Untouched** (still two-column LOCKED) |

## Linear order

1. **WS-LOGIN-UI** ← this gate  
2. **WS-HOME-1** — `/workspace` + header  
3. Later sidebar / footer / features  

## Owner QC

1. [http://localhost:3000/workspace/login](http://localhost:3000/workspace/login) (or `:7000` if that port is running)  
2. No “Operations Dashboard / Content Management” feature list  
3. Centered card · purple CTA · student warning  
4. Staff → empty `/workspace` · student rejected  

## Files

- `src/components/studio-login.tsx` — `surface=workspace` centered branch  
- `src/components/studio-login.module.css` — `.pageWorkspace` / `.workspaceStack`  
- `src/app/workspace/login/page.tsx` — copy  

## Accessibility

- Semantic HTML: PASS (`main`, `header`, `h1`/`h2`, labels, button)  
- Accessible names: PASS  
- Contrast: PASS target (purple CTA on white; warn ink on warn bg)  
- Keyboard: PASS (native form)  
- Focus: PASS (input outline)  
- Forms/labels: PASS  
- Zoom/reflow: PASS intent (single column)  
- Automated scan: NOT RUN  
