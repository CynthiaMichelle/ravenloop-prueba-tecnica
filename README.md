# YouTube Channel Insights App

Esta aplicación desarrollada en TypeScript y React permite a los usuarios explorar información interesante sobre un canal de YouTube. Desde estadísticas del canal hasta listas de videos, la aplicación proporciona una experiencia intuitiva y rápida.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/CynthiaMichelle/PruebaTecnica.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd ravenloop
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

## Ejecutar la aplicación

Para iniciar la aplicación, utiliza el siguiente comando:

```bash
npm run dev
```

Esto abrirá la aplicación en tu navegador predeterminado.

## Funcionalidades

### Página de Inicio y Login

- La aplicación muestra inicialmente una página de login.
- Si el usuario no está logado, será redirigido automáticamente a la página de login.
- Se requiere la autenticación para acceder al resto de las funcionalidades.

### Página de Búsqueda

- Después de iniciar sesión, los usuarios son redirigidos a la página de búsqueda.
- Permite buscar canales de YouTube por su nombre.
- Al encontrar un canal, la aplicación carga una lista de videos del canal y estadísticas interesantes.

### Estadísticas del Canal

- Muestra información detallada sobre el canal, incluyendo el número total de visitas y suscriptores.
- Proporciona una gráfica histórica de visitas por mes para una visión más completa.

### Paginación y Carga Eficiente

- Implementa paginación en la lista de videos para evitar cargar todos los videos simultáneamente.
- Realiza llamadas eficientes a la API de YouTube para obtener la información necesaria sin sobrecargar la aplicación.

### Diseño Modular y Responsive

- Se ha seguido un patrón de diseño modular para garantizar mantenibilidad y escalabilidad.
- El diseño es completamente responsive, ofreciendo una experiencia de usuario óptima en cualquier tamaño de pantalla.

## Licencia

Este proyecto está bajo la licencia [MIT](LICENSE). ¡Siéntete libre de usar, modificar y distribuir el código!