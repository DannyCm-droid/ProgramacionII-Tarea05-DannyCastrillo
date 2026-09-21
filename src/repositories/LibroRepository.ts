import { Libro } from '../models/Libro';

export class LibroRepository {
  private static instancia: LibroRepository;
  private libros: Libro[] = [];

  private constructor() {
    this.libros = [
      new Libro('1', 'Cien años de soledad', 'Gabriel García Márquez', 1967),
      new Libro('2', 'Pedro Páramo', 'Juan Rulfo', 1955),
      new Libro('3', 'La casa de los espíritus', 'Isabel Allende', 1982),
    ];
  }

  public static getInstance(): LibroRepository {
    if (!LibroRepository.instancia) {
      LibroRepository.instancia = new LibroRepository();
    }
    return LibroRepository.instancia;
  }

  public obtenerLibros(): Libro[] {
    return [...this.libros];
  }

  public agregarLibro(libro: Libro): Libro {
    this.libros.push(libro);
    return libro;
  }

  public eliminarLibro(id: string): void {
    this.libros = this.libros.filter((libro) => libro.getId() !== id);
  }
}
