import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Categoria } from '@data/interfaces/categoria.interface';
import { CategoriaApi } from '@data/interfaces/categoria-api.interface';
@Injectable({
  providedIn: 'root',
})
export class CategoriaRepository {

  private readonly http = inject(HttpClient);

  private readonly endpoint =
    `${environment.apiUrl}/categorias`;

  private mapCategoria(
    categoria: CategoriaApi
  ): Categoria {

    return {
      id: categoria.id_categoria,
      nombre: categoria.nombre,
      estado: categoria.activo,
    };

  }

  getAll(): Observable<Categoria[]> {

    return this.http
      .get<CategoriaApi[]>(`${this.endpoint}/`)
      .pipe(
        map(categorias =>
          categorias.map(categoria =>
            this.mapCategoria(categoria)
          )
        )
      );

  }

create(dto: any) {
  return of(null);
}

update(dto: any) {
  return of(null);
}

toggleStatus(id: number) {
  return of(null);
}

}