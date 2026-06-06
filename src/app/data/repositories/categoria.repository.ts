import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Categoria } from '@data/interfaces/categoria.interface';
import { CreateCategoriaDto } from '@data/dto/create-categoria.dto';
import { UpdateCategoriaDto } from '@data/dto/update-categoria.dto';
import { CATEGORIAS_MOCK } from '@data/mocks/categorias.mock';

@Injectable({
  providedIn: 'root',
})
export class CategoriaRepository {

  private categorias: Categoria[] = [...CATEGORIAS_MOCK];

  getAll(): Observable<Categoria[]> {
  return of([...this.categorias]);
}

  create(dto: CreateCategoriaDto): Observable<Categoria> {
  console.log('CREATE REPOSITORY', dto);

    const nuevaCategoria: Categoria = {
      id: this.categorias.length + 1,
      nombre: dto.nombre,
      estado: dto.estado,
    };

    this.categorias.push(nuevaCategoria);

    return of(nuevaCategoria);
  }
  update(dto: UpdateCategoriaDto) {
      console.log('UPDATE REPOSITORY', dto);


  const index = this.categorias.findIndex(
    categoria => categoria.id === dto.id
  );

  if (index !== -1) {

    this.categorias[index] = {
      ...dto
    };

  }

  return of(this.categorias[index]);

}
toggleStatus(id: number): Observable<Categoria | undefined> {

  const categoria = this.categorias.find(
    categoria => categoria.id === id
  );

  if (categoria) {
    categoria.estado = !categoria.estado;
  }

  return of(categoria);

}

}
