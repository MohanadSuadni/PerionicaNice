import Image from "next/image";
import LogoMarquee from "./LogoMarquee";
import { logoMarqueeItems } from "@/constants";

export default function LogoTicker() {
	return (
		<div className="w-full [mask-image:linear-gradient(to_left,transparent,black_25%,black_75%,transparent)]">
			<LogoMarquee baseVelocity={1.5}>
				{logoMarqueeItems.map((item) => (
					<div
						className={`w-[200px] flex ${item.id == 6 && "mr-14"}`}
						key={item.id}>
					<Image
  src={item.src}
  alt="Logo perionice veša Nice"
  width={200}
  height={60}
  sizes="200px"
  className="h-auto max-w-[200px] object-contain"
/>
					</div>
				))}
			</LogoMarquee>
		</div>
	);
}