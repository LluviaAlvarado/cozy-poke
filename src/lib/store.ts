import { configureStore } from "@reduxjs/toolkit";
/**
 * Nextjs has some conditions for redux so
 * we followed the instructions here https://redux.js.org/usage/nextjs
 */

import pokeTypesReducer from "./features/pokeTypesSlice";
import pokemonReducer from "./features/pokemonSlice";

export const makeStore = () => {
	return configureStore({
		reducer: {
			pokemon: pokemonReducer,
			pokeTypes: pokeTypesReducer,
		},
	});
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
