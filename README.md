# Proyecto ExamenReact

Este es la realizacion del examen para Grupo Salinas, para gestionar empleados. Permite ver, buscar y agregar empleados, así como cargar imagenes mediante una interfaz de usuario sencilla.

## Requisitos Previos

Asegurarse de tener instalados los siguientes programas en su máquina:

- [Node.js](https://nodejs.org/) (v14 o superior)
- [npm](https://www.npmjs.com/) (o [Yarn](https://yarnpkg.com/), si prefieres)

## Instalación


1. Clona el repositorio:

git clone https://github.com/tu-usuario/examenreact.git
cd examenreacr

2. Instala las dependencias

npm install react react-dom react-router-dom axios react-calendar lucide-react typescript @types/react @types/react-dom @types/react-router-dom


3. Variables de entorno

Este proyecto requiere de una URL para acceder a la API de empleados. Asegúrate de establecer la siguiente variable de entorno en el archivo .env:

REACT_APP_API_URL=https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/josafat_rodriguez

4. Ejecución en desarrollo

Para ejecutar el proyecto en modo desarrollo, utiliza el siguiente comando:

npm start

Esto abrirá el proyecto en http://localhost:3000.

5. Build de Producción

Para crear una versión optimizada del proyecto para producción, utiliza:

npm run build

6. Login

El sistema login es básico, y se puede ingresar con las siguientes credenciales:

- Usuario:GrupoSalinas

- Contraseña:04963225

Una vez autenticado, tendrás acceso al listado de empleados, con la opción de agregar nuevos empleados y gestionar imagenes.# ExamenReact
