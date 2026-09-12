import { Libro } from '../models/Libro';

export class LibroService {
  private libros: Libro[] = [];

  public obtenerLibros(): Libro[] {
    return [...this.libros];
  }

  public agregarLibro(titulo: string, autor: string, anio: number): Libro {
    const id = Date.now().toString();
    const libro = new Libro(id, titulo, autor, anio);
    this.libros.push(libro);
    return libro;
  }

  public eliminarLibro(id: string): void {
    this.libros = this.libros.filter((libro) => libro.getId() !== id);
  }
}
