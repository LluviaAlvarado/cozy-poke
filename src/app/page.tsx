import TypeHelp from "@/components/type-help/type-help";
import Link from "next/link";

export default function Home() {
	// todo usar redux para guardar llamadas a la api y seleccion de pagina
	// todo about y contact
	return (
		<main className="flex min-h-screen flex-col items-center p-8 gap-8">
			<Link
				href="/pokemon-list"
				className="text-lg rounded-lg bg-secondary p-2 w-44"
			>
				See Pokemon List
			</Link>
			<div className="w-full overflow-auto">
				<TypeHelp />
			</div>
		</main>
	);
}
