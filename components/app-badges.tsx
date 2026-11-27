// Copyright 2026 Naija Kitchen team
// Licensed under the Apache License, Version 2.0 (see LICENSE)

// "Download our app" buttons. The app isn't built yet (card #54),
// so they're marked coming soon instead of linking to the stores.

function PhoneIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" strokeLinecap="round" />
    </svg>
  );
}

export function AppBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {["App Store", "Google Play"].map((store) => (
        <span
          key={store}
          className="inline-flex items-center gap-2 border border-white/40 bg-black px-3 py-1.5 text-white"
        >
          <PhoneIcon />
          <span className="flex flex-col leading-tight">
            <span className="text-[10px] text-white/80">Coming soon to</span>
            <span className="text-sm font-semibold">{store}</span>
          </span>
        </span>
      ))}
    </div>
  );
}