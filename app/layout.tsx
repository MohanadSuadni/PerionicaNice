import "@/styles/globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "Perionica veša Nice",
	description: "Profesionalno pranje i peglanje veša",
};
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
