import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  /** 404 for unknown addresses: own page with owned CSS (src/app/global-not-found.tsx). */
  experimental: { globalNotFound: true },
  /** Dev only: lets http://127.0.0.1:7100 load page scripts (Playwright baseURL + manual QC). */
  allowedDevOrigins: ["127.0.0.1"],
  async rewrites() {
    return [
      { source: "/ops", destination: "/admin" },
      { source: "/ops/students/:path*", destination: "/admin/students/:path*" },
      { source: "/ops/work", destination: "/admin/work" },
      { source: "/ops/team", destination: "/admin/staff" },
      { source: "/ops/team/:path*", destination: "/admin/staff/:path*" },
      { source: "/ops/notifications", destination: "/admin/notifications" },
      { source: "/ops/activity", destination: "/admin/audit" },
      { source: "/ops/admin-panel", destination: "/admin/stubs/admin-panel" },
      { source: "/ops/admin/permissions", destination: "/admin/stubs/permissions" },
      { source: "/ops/overall-comments", destination: "/admin/stubs/overall-comments" },
      { source: "/ops/loopboard", destination: "/admin/stubs/loopboard" },
      { source: "/ops/admin/users", destination: "/admin/users" },
      { source: "/ops/admin/users/:path*", destination: "/admin/users/:path*" },
      { source: "/ops/cms/courses/preview/:id", destination: "/admin/catalog/courses/preview/:id" },
      { source: "/ops/cms/courses", destination: "/admin/catalog/courses" },
      { source: "/ops/cms/universities", destination: "/admin/catalog/universities" },
      { source: "/ops/cms/webinar", destination: "/admin/stubs/webinar" },
      { source: "/ops/cms/testimonial", destination: "/admin/content/modules/testimonials" },
      { source: "/ops/cms/media", destination: "/admin/media" },
      { source: "/studio/change-password", destination: "/admin/change-password" },
      { source: "/studio/profile", destination: "/admin/profile" }
    ];
  },
  async headers() {
    let supabaseOrigin="";try{supabaseOrigin=process.env.NEXT_PUBLIC_SUPABASE_URL?new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).origin:"";}catch{supabaseOrigin="";}
    const isDev = process.env.NODE_ENV !== "production";
    const devScriptSrc = isDev ? " 'unsafe-eval'" : "";
    const devConnectSrc = isDev ? " ws://127.0.0.1:* ws://localhost:* http://127.0.0.1:* http://localhost:*" : "";
    const contentSecurityPolicy = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      `script-src 'self' 'unsafe-inline' https://core.sanity-cdn.com https://*.sanity-cdn.com${devScriptSrc}`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://core.sanity-cdn.com",
      "font-src 'self' data: https://fonts.gstatic.com https://cdnjs.cloudflare.com",
      "img-src 'self' data: blob: https:",
      "media-src 'self' blob: https:",
      `connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.api.sanity.io https://*.apicdn.sanity.io https://*.sanity.io https://sanity-cdn.com https://*.sanity-cdn.com https://core.sanity-cdn.com wss://*.api.sanity.io wss://*.sanity.io${supabaseOrigin?` ${supabaseOrigin} ${supabaseOrigin.replace(/^http/,"ws")}`:""}${devConnectSrc}`,
      "frame-src 'self' https://www.google.com https://maps.google.com https://*.sanity.io",
      "worker-src 'self' blob:",
      ...(process.env.NODE_ENV === "production" ? ["upgrade-insecure-requests"] : [])
    ].join("; ");
    const securityHeaders = [
      { key: "Content-Security-Policy", value: contentSecurityPolicy },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
      ...(process.env.NODE_ENV === "production" ? [{ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" }] : [])
    ];
    // Embedded Sanity Studio needs live listen / presence (SSE + WebSocket). Site-wide CSP blocks it.
    // Apply a Studio-only policy so Ops / student routes keep the strict CSP above.
    const sanityStudioCsp = [
      "default-src 'self' 'unsafe-inline' data: blob: https:",
      "base-uri 'self'",
      "object-src 'none'",
      "form-action 'self'",
      `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://core.sanity-cdn.com https://*.sanity-cdn.com https://*.sanity.io${devScriptSrc}`,
      "style-src 'self' 'unsafe-inline' https: data:",
      "font-src 'self' data: https:",
      "img-src 'self' data: blob: https:",
      "media-src 'self' blob: https:",
      `connect-src 'self' https: wss: blob:${devConnectSrc}`,
      "frame-src 'self' https:",
      "worker-src 'self' blob:",
      ...(process.env.NODE_ENV === "production" ? ["upgrade-insecure-requests"] : [])
    ].join("; ");
    const sanityStudioHeaders = [
      { key: "Content-Security-Policy", value: sanityStudioCsp },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" }
    ];
    const privateHeaders = [{ key: "Cache-Control", value: "private, no-cache, no-store, must-revalidate, max-age=0" }];
    return [
      { source: "/sanity", headers: sanityStudioHeaders },
      { source: "/sanity/:path*", headers: sanityStudioHeaders },
      // Do not stack strict CSP on /sanity (two CSP headers = broken Studio live sync).
      { source: "/((?!sanity).*)", headers: securityHeaders },
      ...["/api/auth/:path*", "/api/student/:path*", "/api/premium/:path*", "/api/staff/:path*", "/api/admin/:path*", "/auth/:path*", "/student/:path*", "/mentor/:path*", "/admin/:path*", "/ops", "/ops/:path*", "/cms", "/dashboard", "/feed_track_progress", "/upload_your_doc", "/saved", "/notifications", "/singup", "/change_password", "/studio/change-password", "/studio/profile"].map((source) => ({ source, headers: privateHeaders }))
    ];
  }
};

export default nextConfig;
