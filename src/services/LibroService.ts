import { Libro } from '../models/Libro';
import { LibroRepository } from '../repositories/LibroRepository';

export class LibroService {
  private repository: LibroRepository;

  constructor() {
    const instancia1 = LibroRepository.getInstance();
    const instancia2 = LibroRepository.getInstance();

    console.log('=== Comprobación Singleton ===');
    console.log('instancia1:', instancia1);
    console.log('instancia2:', instancia2);
    console.log('¿Misma instancia?', instancia1 === instancia2);

    this.repository = instancia1;
  }

  public obtenerLibros(): Libro[] {
    return this.repository.obtenerLibros();
  }

  public agregarLibro(titulo: string, autor: string, anio: number): Libro {
    const id = Date.now().toString();
    const libro = new Libro(id, titulo, autor, anio);
    return this.repository.agregarLibro(libro);
  }

  public eliminarLibro(id: string): void {
    this.repository.eliminarLibro(id);
  }
}
