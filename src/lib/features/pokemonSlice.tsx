import { getAllPokeList } from "@/services/pokeApi";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AllPokemon {
	pokemon: any[];
	count: number;
	status: string;
	error: any;
}

const initialState: AllPokemon = {
	pokemon: [],
	count: 0,
	status: "idle",
	error: null,
};

export const fetchAllPokemon = createAsyncThunk(
	"pokemon/fetchAllPokemon",
	async () => {
		return (await getAllPokeList()) as any;
	}
);

const pokemonSlice = createSlice({
	name: "pokemon",
	initialState,
	reducers: {
		setPokemon(state, action: PayloadAction<any>) {
			state.pokemon = action.payload.results;
			state.count = action.payload.count;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchAllPokemon.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchAllPokemon.fulfilled, (state, action: any) => {
				state.status = "succeeded";
				state.pokemon = state.pokemon.concat(action.payload.results);
				state.count = action.payload.count;
			})
			.addCase(fetchAllPokemon.rejected, (state, action: any) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const { setPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;

export const selectAllPokemon = (state: RootState) => state.pokemon.pokemon;
export const selectPokeCount = (state: RootState) => state.pokemon.count;

export const selectByName = (state: any, name: string) =>
	state.pokemon.pokemon.find((poke: any) => poke.name === name);
