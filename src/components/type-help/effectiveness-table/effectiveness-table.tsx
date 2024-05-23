interface Props {
	title: string;
	effectTo: any[];
	effectFrom: any[];
}

export default function EffectivenessTable({
	title,
	effectTo,
	effectFrom,
}: Props) {
	const renderTypes = (effect: any) =>
		effect.length > 0 ? (
			effect.map((type: any) => (
				<div
					key={`2dt-${type.name}`}
					className={`rounded p-2 capitalize text-center ${type.name}`}
				>
					{type.name}
				</div>
			))
		) : (
			<div className="rounded p-2 text-center bg-tertiary">NA</div>
		);

	return (
		<div className="flex flex-col gap-2 items-center rounded-lg pb-2">
			<h2 className="text-lg rounded-lg p-2 m-0 w-full bg-secondary">
				{title}
			</h2>
			<div className="flex gap-2 items-top justify-center">
				<div className="rounded-lg bg-cyan-100">
					<h3 className="text-base rounded-lg p-1 m-0 w-full bg-primary">
						Attacking
					</h3>

					<div className={`flex flex-col gap-1 p-2 rounded-lg w-full`}>
						{renderTypes(effectTo)}
					</div>
				</div>
				<div className="rounded-lg bg-violet-100">
					<h3 className="text-base rounded-lg p-1 m-0 w-full bg-tertiary">
						Defending
					</h3>

					<div className={`flex flex-col gap-1 p-2 rounded-lg w-full`}>
						{renderTypes(effectFrom)}
					</div>
				</div>
			</div>
		</div>
	);
}
