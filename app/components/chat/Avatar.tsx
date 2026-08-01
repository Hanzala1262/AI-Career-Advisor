interface AvatarProps {
  role: "user" | "assistant";
  name?: string;
}

export default function Avatar({
  role,
  name = "",
}: AvatarProps) {
  const isAssistant = role === "assistant";

  const initial = isAssistant
    ? "AI"
    : name.trim().charAt(0).toUpperCase() || "U";

  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-bold shadow-md transition-all
        ${
          isAssistant
            ? "border-cyan-500 bg-cyan-500/20 text-cyan-300"
            : "border-violet-500 bg-violet-500/20 text-violet-300"
        }`}
    >
      {initial}
    </div>
  );
}