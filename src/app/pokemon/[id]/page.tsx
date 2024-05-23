"use client";
import { getPokeInfo } from "@/services/pokeApi";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
	params: {
		id: string;
	};
}

export default function Pokemon(props: Props) {
	const searchParams = useSearchParams();
	const [pokeInfo, setPokeInfo] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setLoading(true);
		getPokeInfo(props.params.id)
			.then((info) => {
				setPokeInfo(info);
			})
			.then(() => setLoading(false))
			.catch((e: Error | AxiosError) => (console.log(e), setLoading(false)));
	}, []);

	const renderTypes = () =>
		pokeInfo?.types?.map((tp: any) => (
			<div
				key={`2dt-${tp.type.name}`}
				className={`rounded p-2 capitalize text-center ${tp.type.name}`}
			>
				{tp.type.name}
			</div>
		));

	return (
		<div className="px-4 pt-4 h-full-screen">
			{loading ? (
				<div className="text-md">Loading pokemon info...</div>
			) : (
				<div className="flex flex-col gap-2 h-full items-center">
					<Link
						href="/pokemon-list"
						className="text-lg p-2 rounded-lg bg-secondary mb-8"
					>
						Back to Pokemon List
					</Link>
					<h1 className="text-xl capitalize">{searchParams.get("name")}</h1>
					<Image
						src={pokeInfo?.sprites?.front_default}
						alt="Pokemon's image"
						width={250}
						height={250}
					/>
					<h2>Type:</h2>
					<div className="flex gap-2 justify-between">{renderTypes()}</div>
					<h2>Female Ratio:</h2>
					<p>
						{pokeInfo?.species?.gender_rate &&
						pokeInfo?.species?.gender_rate > 0
							? `${pokeInfo?.species?.gender_rate}/8`
							: "No gender"}
					</p>
				</div>
			)}
		</div>
	);
}
