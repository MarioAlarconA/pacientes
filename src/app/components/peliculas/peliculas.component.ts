import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PeliculasService } from '../../services/peliculas.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Pelicula } from '../../models/pelicula.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {
  peliculaForm: FormGroup;
  peliculas: Pelicula[] = [];
  user$!: Observable<any>;

  readonly soloLetrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  constructor(
    private fb: FormBuilder,
    private peliculasService: PeliculasService,
    private authService: AuthService,
    private router: Router
  ) {
    this.peliculaForm = this.fb.group({
      titulo: ['', [
        Validators.required
      ]],
      descripcion: ['', [
        Validators.required
      ]],
      anio: ['', [
        Validators.required
      ]],
      genero: ['', [
        Validators.required
      ]]
    });
  }

  ngOnInit() {
    this.user$ = this.authService.user$;
    this.loadPeliculas();
  }

  loadPeliculas() {
    this.peliculasService.getPeliculas().subscribe({
      next: (data) => {
        this.peliculas = data;
      },
      error: (error) => {
        console.error('Error al cargar películas:', error);
        alert('Error al cargar las películas');
      }
    });
  }

  onSubmit() {
    if (this.peliculaForm.valid) {
      const pelicula: Pelicula = {
        ...this.peliculaForm.value,
        anio: Number(this.peliculaForm.value.anio)
      };

      this.addPelicula(pelicula);
    } else {
      this.markFormGroupTouched(this.peliculaForm);
      alert('Completa todos los campos');
    }
  }

  addPelicula(pelicula: Pelicula) {
    this.peliculasService.addPelicula(pelicula).subscribe({
      next: () => {
        alert('Película agregada');
        this.resetForm();
        this.loadPeliculas();
      },
      error: (err) => {
        console.error(err);
        alert('Error al agregar');
      }
    });
  }

  deletePelicula(id: string | undefined) {
    if (!id) return;

    if (confirm('¿Quieres eliminar esta película?')) {
      this.peliculasService.deletePelicula(id).subscribe({
        next: () => {
          alert('Eliminada');
          this.loadPeliculas();
        }
      });
    }
  }

  resetForm() {
    this.peliculaForm.reset();
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

  goToPacientes() {
    this.router.navigate(['/pacientes']);
  }
}