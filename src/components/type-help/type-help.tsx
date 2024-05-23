"use client";

import { useEffect, useState } from "react";
import TypeDropdown from "./type-dropdown/type-dropdown";
import EffectivenessTable from "./effectiveness-table/effectiveness-table";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchTypes, selectAllTypes } from "@/lib/features/pokeTypesSlice";

export default function TypeHelp() {
	const dispatch = useAppDispatch();
	const types = useAppSelector(selectAllTypes);
	const typesState = useAppSelector((state) => state.pokeTypes.status);
	const [selectedType, setSelectedType] = useState<any>(null);

	useEffect(() => {
		if (typesState === "idle") {
			dispatch(fetchTypes());
		} else if (typesState === "succeeded") {
			setSelectedType(types[0]);
		}
	}, [typesState, dispatch]);

	return (
		<div className="px-2">
			{typesState === "loading" || typesState === "idle" ? (
				<div className="text-md">Loading pokemon types...</div>
			) : (
				<div className="flex flex-col gap-2 items-center text-center">
					<label htmlFor="defendingType" className="text-lg">
						Effectiveness of type:
					</label>
					<TypeDropdown
						types={types.map((type) => type.name)}
						onChange={(type: string) =>
							setSelectedType(types.find((t) => t.name === type))
						}
					/>
					{selectedType && (
						<div className="flex flex-col gap-2 items-center dark-text">
							<EffectivenessTable
								title="Supper Effective"
								effectTo={selectedType.damage_relations.double_damage_to}
								effectFrom={selectedType.damage_relations.double_damage_from}
							/>
							<EffectivenessTable
								title="Not Very Effective"
								effectTo={selectedType.damage_relations.half_damage_to}
								effectFrom={selectedType.damage_relations.half_damage_from}
							/>
							<EffectivenessTable
								title="No Effect"
								effectTo={selectedType.damage_relations.no_damage_to}
								effectFrom={selectedType.damage_relations.no_damage_from}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
