"use client";
import { useEffect, useState } from "react";

interface Props {
	types: string[];
	onChange: Function;
}

export default function TypeDropdown({ types, onChange }: Props) {
	const [selectedType, setSelectedType] = useState(types[0]);
	const [showDropdown, setShowDropdown] = useState(false);

	useEffect(() => {
		window.addEventListener("click", handleClickOutside);
		return () => {
			window.removeEventListener("click", handleClickOutside);
		};
	}, []);

	const handleClickOutside = (e: any) => {
		if (
			e.target.id !== "poke-type-dropdown-list" &&
			e.target.id !== "poke-type-dropdown-button"
		) {
			setShowDropdown(false);
		}
	};

	const onOpenDropdown = () => {
		setShowDropdown(true);
	};

	const onSelectType = (e: any) => {
		setShowDropdown(false);
		setSelectedType(e.target.value);
		onChange(e.target.value);
	};

	const renderTypes = (types: any) =>
		types.map((type: any) => (
			<button
				key={`opt-${type}`}
				value={type}
				onClick={onSelectType}
				className={`rounded py-2 capitalize text-center w-44  ${type}`}
			>
				{type}
			</button>
		));

	return (
		<div className="flex flex-col gap-2 text-xl items-center dark-text">
			<button
				id="poke-type-dropdown-button"
				onClick={onOpenDropdown}
				className={`rounded-lg py-2 px-12 capitalize text-center w-48 ${selectedType}`}
			>
				{selectedType}
			</button>
			{showDropdown && (
				<div
					className="flex flex-col gap-1 p-2 rounded-lg absolute z-10 h-64 overflow-scroll bg-tertiary"
					id="poke-type-dropdown-list"
				>
					{renderTypes(types)}
				</div>
			)}
		</div>
	);
}
