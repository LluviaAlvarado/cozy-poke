import axios from "axios";
import { redirect } from "next/navigation";

const pokeApiUrl = "https://pokeapi.co/api/v2/";

export const getAllTypes = async () => {
	const types = [];
	// currently there are 18 types
	try {
		for (let i = 1; i < 19; i++) {
			const type = await axios.get(`${pokeApiUrl}type/${i}`);
			types.push(type.data);
		}
	} catch (e: any) {
		console.log(e);
	}
	return types;
};

export const getAllPokeList = async () => {
	const list = await axios.get(`${pokeApiUrl}pokemon/?offset=0&limit=2000`);
	list.data.results = await Promise.all(
		list.data.results.map(async (poke: any) => {
			let pokeSpecie: any = null;
			pokeSpecie = await axios
				.get(`${pokeApiUrl}pokemon-species/${poke.url.split("/").at(-2)}`)
				.catch((e) => {});
			let jpName = "";

			if (pokeSpecie && pokeSpecie.data.names) {
				const spName = pokeSpecie.data.names.find(
					(spName: any) => spName.language.name === "ja-Hrkt"
				);
				if (spName) {
					jpName = spName.name;
				}
			}

			poke.name += ` (${jpName})`;

			return poke;
		})
	);

	return list.data;
};

export const getPokeInfo = async (id: string) => {
	const poke = await axios.get(`${pokeApiUrl}pokemon/${id}`).catch((e) => {
		redirect("/not-found");
	});
	const specie = await axios.get(poke.data.species.url).catch((e) => {
		redirect("/not-found");
	});
	poke.data.species = specie.data;
	return poke.data;
};
