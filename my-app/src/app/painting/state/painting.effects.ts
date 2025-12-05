import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { PaintingsService } from '../../services/paintings.service';
import * as PaintingActions from './painting.actions';

@Injectable()
export class PaintingEffects {
    private actions$ = inject(Actions);
    private paintingsService = inject(PaintingsService);

    loadPaintings$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PaintingActions.loadPaintings),
            mergeMap(({ query }) =>
                this.paintingsService.getPaintings(query).pipe(
                    map((paintings) => PaintingActions.loadPaintingsSuccess({ paintings })),
                    catchError((error) => of(PaintingActions.loadPaintingsFailure({ error: error.message || 'Failed to load paintings' })))
                )
            )
        )
    );

    loadPainting$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PaintingActions.loadPainting),
            mergeMap(({ id }) =>
                this.paintingsService.getPaintingById(id).pipe(
                    map((painting) => PaintingActions.loadPaintingSuccess({ painting })),
                    catchError((error) => of(PaintingActions.loadPaintingFailure({ error: error.message || 'Failed to load painting' })))
                )
            )
        )
    );
}
