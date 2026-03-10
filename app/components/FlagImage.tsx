"use client";

export function FlagImage({ country, className = "w-5 h-3.5 rounded-sm object-cover" }: { country: string; className?: string }) {
    if (!country || country === "Unknown") return null;
    return (
        <img
            src={`https://flagcdn.com/20x15/${country.toLowerCase()}.png`}
            alt=""
            className={className}
            onError={(e: any) => { e.target.style.display = "none"; }}
        />
    );
}
