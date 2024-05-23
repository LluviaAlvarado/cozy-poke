import styles from "@/components/navbar/navbar.module.css";
import Link from "next/link";
export default function Navbar() {
	return (
		<div className={`flex flex-row justify-between p-4 ${styles.navbar}`}>
			<Link href="/">
				<h1 className="text-3xl font-bold">Cozy Poke</h1>
			</Link>

			{/* <div className="flex flex-row gap-4 text-xl items-center">
				<Link href="/about" className={`rounded p-1 ${styles.navlink}`}>
					About
				</Link>
				<Link href="/contact" className={`rounded p-1 ${styles.navlink}`}>
					Contact
				</Link>
			</div> */}
		</div>
	);
}
