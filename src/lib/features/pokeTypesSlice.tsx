import { getAllTypes } from "@/services/pokeApi";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface PokeTypesState {
	pokeTypes: any[];
	status: string;
	error: any;
}

const initialState: PokeTypesState = {
	pokeTypes: [],
	status: "idle",
	error: null,
};

export const fetchTypes = createAsyncThunk(
	"pokeTypes/fetchPokeTypes",
	async () => {
		return (await getAllTypes()) as any[];
	}
);

const pokeTypesSlice = createSlice({
	name: "pokeTypes",
	initialState,
	reducers: {
		setTypes: (state, action: PayloadAction<any[]>) => {
			state.pokeTypes = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchTypes.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchTypes.fulfilled, (state, action: any) => {
				state.status = "succeeded";
				state.pokeTypes = state.pokeTypes.concat(action.payload);
			})
			.addCase(fetchTypes.rejected, (state, action: any) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const { setTypes } = pokeTypesSlice.actions;

export const selectAllTypes = (state: RootState) => state.pokeTypes.pokeTypes;

export const selectByName = (state: any, name: string) =>
	state.pokeTypes.pokeTypes.find((pokeType: any) => pokeType.name === name);

export default pokeTypesSlice.reducer;
