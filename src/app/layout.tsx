import type { Metadata } from "next";
import { DynaPuff } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import StoreProvider from "./StoreProvider";

const dynaPuff = DynaPuff({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Cozy Poke",
	description: "The quick help you want to play pokemon in cozy mode.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={dynaPuff.className}>
				<StoreProvider>
					<Navbar />
					{children}
				</StoreProvider>
			</body>
		</html>
	);
}
