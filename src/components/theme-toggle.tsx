"use client";

import { Moon, Sun } from "lucide-react";
import { useCallback, useRef, useSyncExternalStore } from "react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

function playThemeToggleSound(audio: HTMLAudioElement | null) {
  if (!audio) return;
  audio.currentTime = 0;
  void audio.play().catch(() => undefined);
}

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme } = useTheme();
  const soundRef = useRef<HTMLAudioElement | null>(null);
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  const handleToggle = useCallback(() => {
    playThemeToggleSound(soundRef.current);
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  if (!mounted) {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center border border-border bg-card/80 backdrop-blur transition hover:border-primary/40",
          compact ? "h-9 w-9 rounded-xl" : "h-9 w-9 rounded-full",
        )}
        aria-label="Toggle theme"
      />
    );
  }

  const isDark = theme === "dark";
  return (
    <>
      <audio ref={soundRef} src="/sounds/light-switch.mp3" preload="auto" />
      <button
        onClick={handleToggle}
        className={cn(
          "inline-flex items-center justify-center border border-border bg-card/80 backdrop-blur transition hover:border-primary/40 hover:scale-[1.03]",
          compact ? "h-9 w-9 rounded-xl" : "h-9 w-9 rounded-full hover:scale-105",
        )}
        aria-label="Toggle theme"
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
    </>
  );
}
