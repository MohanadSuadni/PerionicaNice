"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import {
	CTA,
	Footer,
	Hero,
	LogoTicker,
	Pricing,
	ProductShowcase,
	Testimonials,
	FAQ,
	Usluga,
} from "@/components";
import MiniGalleryScroller from "@/components/MiniGalleryScroller";

export default function App() {
	useEffect(() => {
		const lenis = new Lenis();

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);
	}, []);
	return (
		<>
			<Hero />
			<LogoTicker />
			<ProductShowcase />
			<Usluga />
			<Pricing />
			<FAQ />
			<Testimonials />
			<CTA />
            <MiniGalleryScroller /> 
			<Footer />

		</>
	);
}
