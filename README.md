# Portal Gun Explorer

Portal Gun Explorer es una aplicación desarrollada en Angular que permite explorar los personajes del universo de Rick and Morty a través de la API oficial. Los usuarios pueden buscar personajes, filtrarlos por estado y obtener detalles adicionales sobre su origen, ubicación y episodios en los que aparecen, así como también marcar un personaje favorito.

## Tecnologías Utilizadas

- **Angular 16**: Framework principal para el desarrollo de la aplicación.
- **Angular Material**: Biblioteca de componentes para mejorar la UI/UX.
- **RxJS**: Manejo de programación reactiva y peticiones asincrónicas.
- **TypeScript**: Lenguaje de programación utilizado.
- **SCSS/CSS**: Estilos de la aplicación.
- **API de Rick and Morty**: Fuente de datos para los personajes.

## Instalación y Configuración

### Prerrequisitos

- Node.js (versión recomendada: 16 o superior)
- Angular CLI

### Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/tu_usuario/portal-gun-explorer.git
   cd portal-gun-explorer
   ```
2. Instala las dependencias:
   ```sh
   npm i
   ```

### Ejecución

Para iniciar la aplicación en modo de desarrollo, ejecuta:
```sh
ng serve
```
Esto iniciará un servidor en `http://localhost:4200/`.

## Estructura del Proyecto

```
portal-gun-explorer/
│-- src/
│   │-- app/
│   │   │-- components/ (Componentes reutilizables)
│   │   │-- pages/ (Páginas principales)
│   │   │-- services/ (Servicios para peticiones a la API)
│   │   │-- models/ (Interfaces y tipos)
│   │   │-- pipes/ (Pipes personalizados)
│   │   │-- directives/ (Directivas personalizadas)
│   │-- assets/ (Recursos estáticos como imágenes)
│   │-- styles/ (Estilos globales)
```

## Funcionalidades

- **Búsqueda de personajes** Por nombre.
- **Filtrado por estado** 
- **Detalle de personajes**, incluyendo origen, ubicación y episodios en los que aparecen.
- **Marcado de personaje favorito**.
- **Paginación** de resultados.
- **Modal de detalles** con información ampliada.

## Servicios Principales

### `ApiService`
Maneja todas las peticiones HTTP a la API de Rick and Morty.
- `getData(filters: any): Observable<ApiResponse>`: Obtiene personajes según filtros.
- `getLocation(url: string): Observable<Location>`: Obtiene detalles de una ubicación.
- `getOrigin(url: string): Observable<Origin>`: Obtiene detalles del origen de un personaje.
- `getEpisode(url: string): Observable<Episode>`: Obtiene detalles de un episodio.

### `CharacterDetailsService`
Maneja la carga de detalles adicionales de personajes, incluyendo origen, ubicación y episodios.

## Licencia

Este proyecto está bajo la licencia MIT.


### Gracias por leer!.

