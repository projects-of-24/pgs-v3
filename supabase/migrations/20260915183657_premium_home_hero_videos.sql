-- Premium Home H2 (W1): desk + mobile MP4 slots on premium_content_settings.
-- ADAPT existing key=video row. Display images stay Figma fixtures until a later image pass.
-- Scope: purplePREMIUM HOME H2 only. Other pathway pages = separate pass.

alter table public.premium_content_settings
  add column if not exists desktop_video_asset_id uuid references public.media_assets(id) on delete set null,
  add column if not exists mobile_video_asset_id uuid references public.media_assets(id) on delete set null;

comment on column public.premium_content_settings.desktop_video_asset_id is
  'purplePREMIUM HOME H2 — desktop MP4 in marketing-public (media_assets). Max 10 MB upload.';
comment on column public.premium_content_settings.mobile_video_asset_id is
  'purplePREMIUM HOME H2 — mobile MP4 in marketing-public (media_assets). Max 10 MB upload.';

-- Ensure the video row exists for CMS edit (seed was in 202608130004).
insert into public.premium_content_settings (key, title, published)
values ('video', 'Purple Premium Home hero video', false)
on conflict (key) do nothing;
