"use client";
import { getAllPokeList } from "@/services/pokeApi";
import { AxiosError } from "axios";
import Error from "next/error";
import { useEffect, useState } from "react";
import styles from "./pokemon-list.module.css";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
	fetchAllPokemon,
	selectAllPokemon,
	selectPokeCount,
} from "@/lib/features/pokemonSlice";

export default function PokemonListPage() {
	const dispatch = useAppDispatch();
	const pokeList = useAppSelector(selectAllPokemon);
	const pokeCount = useAppSelector(selectPokeCount);
	const pokeState = useAppSelector((state) => state.pokemon.status);
	const [totalPages, setTotalPages] = useState(0);
	//const [pokeList, setPokeList] = useState<any>(null);
	const [filteredPokeList, setFilteredPokeList] = useState<any>([]);
	const [paginatedPokeList, setPaginatedPokeList] = useState<any>([]);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [pageLimit, setPageLimit] = useState(10);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (pokeState === "idle") {
			dispatch(fetchAllPokemon());
		} else if (pokeState === "succeeded") {
			setFilteredPokeList(pokeList);
			setTotalPages(Math.ceil(pokeCount / pageLimit));
			setPaginatedPokeList(paginateList(filterList(pokeList)));
		}
	}, [pokeState, dispatch]);

	useEffect(() => {
		if (pokeList) {
			setPaginatedPokeList(paginateList(filterList(pokeList)));
			setTotalPages(Math.ceil(filteredPokeList.length / pageLimit));
		}
	}, [page, pageLimit]);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (pokeList) {
				const filteredList = filterList(pokeList);
				setFilteredPokeList(filteredList);
				setPaginatedPokeList(paginateList(filteredList));
				setTotalPages(Math.ceil(filteredList.length / pageLimit));
			}
		}, 500);
		return () => clearTimeout(timeoutId);
	}, [searchTerm, 500]);

	const filterList = (list: any[]) =>
		list.filter((poke) =>
			searchTerm !== ""
				? poke.name.toLowerCase().includes(searchTerm.toLowerCase())
				: true
		);

	const paginateList = (list: any[]) => {
		const offset = (page - 1) * pageLimit;
		return list.slice(offset, offset + pageLimit);
	};

	const onSelectPageLimit = (e: any) => {
		let limit = parseInt(e.target.value);
		const newPageCount = Math.ceil(filterList.length / limit);
		if (page > newPageCount) setPage(newPageCount);
		setPageLimit(limit);
	};

	const onSelectPage = (e: any) => {
		setPage(parseInt(e.target.value));
	};

	const onNavigatePages = (e: any) => {
		if (e.target.id === "prev-page-btn") {
			if (page > 1) {
				setPage(page - 1);
			}
		} else if (e.target.id === "next-page-btn") {
			if (page < totalPages) {
				setPage(page + 1);
			}
		}
	};

	const onTypeSearch = (e: any) => {
		setSearchTerm(e.target.value);
	};

	const renderPokemon = () =>
		paginatedPokeList.map((pokemon: any) => (
			<Link
				className="rounded bg-tertiary w-full p-2 capitalize"
				key={pokemon.name}
				href={{
					pathname: `/pokemon/${pokemon.url.split("/").at(-2)}`,
					query: { name: pokemon.name },
				}}
			>
				{pokemon.name}
			</Link>
		));

	const renderPageNumbers = () =>
		[...Array(totalPages)].map((_, num) => {
			num++;
			return (
				<option value={num} key={num}>
					{num}
				</option>
			);
		});

	return (
		<div className="px-4 pt-4 h-full-screen">
			{pokeState === "loading" || pokeState === "idle" ? (
				<div className="text-md">Loading pokemon list...</div>
			) : (
				<div className="flex flex-col gap-4 h-full">
					<div className="w-full px-4 flex justify-center gap-2">
						<span>Search: </span>
						<input
							type="text"
							className={`border-b-2 rounded-md grow ${styles.searchInput}`}
							onChange={onTypeSearch}
						/>
					</div>
					<div className="flex flex-col gap-2 items-center text-center">
						{renderPokemon()}
					</div>
					<div className="flex gap-2 justify-between pb-4">
						<div className="flex flex-row gap-2 items-center">
							<label htmlFor="poke-list-limit-dropdown">Show:</label>
							<select
								name="poke-list-limit-dropdown"
								id="poke-list-limit-dropdown"
								value={pageLimit}
								onChange={onSelectPageLimit}
								className="rounded bg-secondary flex-1 p-2"
							>
								<option value={10}>10</option>
								<option value={20}>20</option>
								<option value={50}>50</option>
								<option value={100}>100</option>
							</select>
						</div>

						<div className="flex flex-row gap-2 items-center">
							<label htmlFor="poke-list-limit-dropdown">Page:</label>
							<select
								name="poke-list-limit-dropdown"
								id="poke-list-limit-dropdown"
								value={page}
								onChange={onSelectPage}
								className="rounded bg-secondary flex-1 p-2"
							>
								{renderPageNumbers()}
							</select>
							<span>/{totalPages}</span>
						</div>
					</div>
					<div className="flex flex-row justify-between gap-2 dark-text pb-4">
						<button
							className="rounded bg-primary py-2 px-4"
							id="prev-page-btn"
							onClick={onNavigatePages}
							disabled={page === 1}
						>
							{`<`}
						</button>
						<button
							className="rounded bg-primary py-2 px-4"
							id="next-page-btn"
							onClick={onNavigatePages}
							disabled={page === totalPages}
						>
							{`>`}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
