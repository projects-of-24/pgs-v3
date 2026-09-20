"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

type SaveableCard = {
  id: string;
  entityType?: "course" | "program" | "event";
  entityId?: string;
};

async function toggleSavedOnServer(
  entityType: "course" | "program" | "event",
  entityId: string,
  saved: boolean,
): Promise<boolean> {
  if (entityType === "event") return false;
  const kind = entityType === "course" ? "courses" : "programs";
  const response = await fetch(`/api/student/saved/${kind}/${entityId}`, {
    method: saved ? "POST" : "DELETE",
  });
  if (response.status === 401) return false;
  if (!response.ok) throw new Error("Save failed");
  return saved;
}

export function useCardSave(initialSavedIds: string[] = [], isLoggedIn = false) {
  const router = useRouter();
  const [savedIds, setSavedIds] = useState(() => new Set(initialSavedIds));
  const [pending, setPending] = useState<string | null>(null);

  const isSaved = useCallback((cardId: string) => savedIds.has(cardId), [savedIds]);

  const handleToggleSave = useCallback(
    async (card: SaveableCard): Promise<boolean> => {
      if (!card.entityType || !card.entityId) return false;
      if (!isLoggedIn) {
        router.push(`/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`);
        return false;
      }
      const currentlySaved = isSaved(card.id);
      const nextSaved = !currentlySaved;
      setPending(card.id);
      try {
        const ok = await toggleSavedOnServer(card.entityType, card.entityId, nextSaved);
        if (!ok) {
          router.push(`/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`);
          return false;
        }
        setSavedIds((prev) => {
          const copy = new Set(prev);
          if (nextSaved) copy.add(card.id);
          else copy.delete(card.id);
          return copy;
        });
        return true;
      } catch {
        return false;
      } finally {
        setPending(null);
      }
    },
    [isLoggedIn, isSaved, router],
  );

  return { isSaved, handleToggleSave, pending, loginPopup: null };
}
