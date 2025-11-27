import { createReducer, on } from '@ngrx/store';
import { Painting } from '../../services/paintings.service';
import * as PaintingActions from './painting.actions';

export interface PaintingState {
    paintings: Painting[];
    selectedPainting: Painting | null;
    loadingList: boolean;
    loadingDetails: boolean;
    errorList: string | null;
    errorDetails: string | null;
}

export const initialState: PaintingState = {
    paintings: [],
    selectedPainting: null,
    loadingList: false,
    loadingDetails: false,
    errorList: null,
    errorDetails: null,
};

export const paintingReducer = createReducer(
    initialState,
    on(PaintingActions.loadPaintings, (state) => ({
        ...state,
        loadingList: true,
        errorList: null,
    })),
    on(PaintingActions.loadPaintingsSuccess, (state, { paintings }) => ({
        ...state,
        paintings,
        loadingList: false,
    })),
    on(PaintingActions.loadPaintingsFailure, (state, { error }) => ({
        ...state,
        loadingList: false,
        errorList: error,
    })),
    on(PaintingActions.loadPainting, (state) => ({
        ...state,
        loadingDetails: true,
        errorDetails: null,
        selectedPainting: null,
    })),
    on(PaintingActions.loadPaintingSuccess, (state, { painting }) => ({
        ...state,
        selectedPainting: painting,
        loadingDetails: false,
    })),
    on(PaintingActions.loadPaintingFailure, (state, { error }) => ({
        ...state,
        loadingDetails: false,
        errorDetails: error,
    }))
);
