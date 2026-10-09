import type { ReactNode } from "react";

/** Match Studio login fill so Hostinger body/html default white cannot flash under the page. */
export default function StudioLoginLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        html, body {
          min-height: 100%;
          background: #f7f8fb;
        }
      `}</style>
      {children}
    </>
  );
}
