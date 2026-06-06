import { Component, inject, signal, viewChild, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CategoriaForm } from '../../components/categoria-form/categoria-form';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CategoriaRepository } from '@data/repositories/categoria.repository';
import { Categoria } from '@data/interfaces/categoria.interface';
import { PageHeader } from '@shared/organisms/page-header/page-header';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { UpdateCategoriaDto } from '@data/dto/update-categoria.dto';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-categorias',
  imports: [
    PageHeader,
    TableModule,
    ButtonModule,
    CategoriaForm,
    DialogModule,
    ToastModule,
    InputTextModule,
    SelectModule,
    FormsModule,
    TagModule,
  ],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css',
  providers: [MessageService],
})
export class Categorias {
  private readonly categoriaRepository = inject(CategoriaRepository);
  readonly showDialog = signal(false);
  readonly categorias = signal<Categoria[]>([]);
  readonly searchTerm = signal('');
  readonly statusFilter = signal('all');
  openDialog(): void {
    this.selectedCategoria.set(null);

    this.dialogTitle.set('Nueva Categoría');

    this.showDialog.set(true);
  }
  constructor() {
    this.loadCategorias();
  }

  loadCategorias(): void {
    this.categoriaRepository.getAll().subscribe((categorias) => {
      this.categorias.set(categorias);
    });
  }

  closeDialog(): void {
    this.showDialog.set(false);

    this.selectedCategoria.set(null);

    this.categoriaForm()?.resetForm();
  }
  private readonly messageService = inject(MessageService);

  onCategoriaSaved(data: { nombre: string; estado: boolean }): void {
    console.log('ENTRO A GUARDAR');
    console.log(data);
    const categoria = this.selectedCategoria();

    if (categoria) {
      const dto: UpdateCategoriaDto = {
        id: categoria.id,
        nombre: data.nombre,
        estado: data.estado,
      };

      this.categoriaRepository.update(dto).subscribe(() => {
        this.loadCategorias();

        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Categoría actualizada correctamente',
        });

        this.closeDialog();
      });

      return;
    }

    this.categoriaRepository.create(data).subscribe(() => {
      this.loadCategorias();

      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Categoría creada correctamente',
      });

      this.closeDialog();
    });
  }
  readonly categoriaForm = viewChild(CategoriaForm);

  readonly selectedCategoria = signal<Categoria | null>(null);

  editCategoria(categoria: Categoria): void {
    this.selectedCategoria.set(categoria);

    this.dialogTitle.set('Editar Categoría');

    this.showDialog.set(true);
  }
  readonly dialogTitle = signal('Nueva Categoría');
  readonly filteredCategorias = computed(() => {
    const categorias = this.categorias();

    const search = this.searchTerm().toLowerCase().trim();

    const status = this.statusFilter();

    return categorias.filter((categoria) => {
      const matchesName = categoria.nombre.toLowerCase().includes(search);

      const matchesStatus =
        status === 'all' ||
        (status === 'active' && categoria.estado) ||
        (status === 'inactive' && !categoria.estado);

      return matchesName && matchesStatus;
    });
  });
  readonly statusOptions = [
    {
      label: 'Todos',
      value: 'all',
    },
    {
      label: 'Activos',
      value: 'active',
    },
    {
      label: 'Inactivos',
      value: 'inactive',
    },
  ];
  async toggleStatus(categoria: Categoria): Promise<void> {

  const action = categoria.estado
    ? 'desactivar'
    : 'activar';

  const result = await Swal.fire({
    title: `¿Desea ${action} la categoría?`,
    text: categoria.nombre,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#2563eb',
  });

  if (!result.isConfirmed) {
    return;
  }

  this.categoriaRepository
    .toggleStatus(categoria.id)
    .subscribe(() => {

      this.loadCategorias();

      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: categoria.estado
          ? 'Categoría desactivada correctamente'
          : 'Categoría activada correctamente',
      });

    });

}
}
