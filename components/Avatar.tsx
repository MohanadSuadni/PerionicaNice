import Image from "next/image";

interface AvatarProps {
  src?: string | null;
  name: string;
  size?: number;
  className?: string;
}

export default function Avatar({ src, name, size = 48, className = "" }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0]?.toUpperCase())
    .slice(0, 2)
    .join("");

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gray-300 text-gray-800 font-semibold overflow-hidden ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {src ? (
        <Image src={src} alt={name} width={size} height={size} />
      ) : (
        initials
      )}
    </div>
  );
}
