# Administración ganado: Documentación de código

Aquí podrás consultar el funcionamiento tanto del **Backend** como del **Frontend** de la aplicación. Esta documentación está diseñada para ayudar a comprender la lógica detrás de cada **API, componente, biblioteca** y **módulo** que conforman esta aplicación.

## Descargar necesarias npm

Instalación de los Routes : `npm install react-router-dom`

Instalación de iconos: `npm install react-icons`

Instalar plugin para hacer peticiones a la API: `npm install axios`

Instalar Tailwind CSS para los estilos de la app: `npm install tailwindcss`

## Index.js

La linea `import { BrowserRouter, Route, Routes } from "react-router-dom";` es una libreria la cual se encarga de poder mantener una navegación de rutas protegidas dentro de nuestra aplicación.

### Contexto de autenticación

Módulo de autenticación con un contexto global

`import {AuthProvider} from './Auth.jsx'`

`import { Protector } from "./Protector.jsx";`

#### AuthProvider - Auth.jsx

![Código de Auth.jsx](./img/AuthProvider.png)

Importamos la libreria necesaria para poder crear un contexto y un **useState**.

> **useState**: Variable que podemos usar y consta de dos elementos, la **variable usable** y un **set** el cual usamos para asignarle un valor a la **variable usable**

> **Contexto**: Es una forma de pasar datos a través del **árbol de componentes** sin tener que pasar props manualmente en cada nivel.

Creamos un contexto el cual usaremos para despues obtener datos de forma global.

`export const AuthContext = createContext();` 

El **contexto almacena el nombre completo del usuario** y ese mismo es usado como **token** para saber si el cliente puede acceder o no a un panel de adminsitración. Para poder trabajar con ese token, se crea un useState el cual tendra los elementos de **autenticate** que es la variable que almacenará el token y **setAutenticate** que es el metodo que se utilizará para asignar un valor a **autenticate**.

#### Protector - Protector.jsx

`import { Navigate, Outlet } from "react-router-dom";`

> **Navigate**: Se utiliza para el enrutamiento en aplicaciones React.

> **Outlet**: Permite renderizar el componente hijo adecuado dentro de un layout de ruta padre.

Importamos el contexto que creamos anteriormente, esto con la finalidad de ponder acceder a los valores que tiene asigando la varible del **useState**.

`import { AuthContext } from "./Auth";`

![Componente para proteger las rutas](./img/Protector.png)

Este componente obtiene el valor de **autenticate** desde le contexto de ***Auth*** y después valida su contenido, si el contenido es *null* entonces el cliente será redirigido a la página raiz (que muestra el login de la plataforma).

En caso de que el valor de **autenticate** sea diferente a *null* entonces se renderizara el componente que este dentro de `<Outlet />`