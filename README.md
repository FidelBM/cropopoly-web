# Página web Cropopoly

Para instalar esta página web, es necesario tener Node.js. Puedes descargarlo de forma segura desde el siguiente enlace: [Descargar Node.js](https://nodejs.org/en/download/current).

Además, es importante tener configurada previamente la base de datos y el servidor, que se indica cómo instalar en el repositorio "cropopoly-server". Puedes encontrar más información en el siguiente enlace: [cropopoly-server en GitHub](https://github.com/FidelBM/cropopoly-server).

Una vez cumplidos estos requisitos, en la terminal donde se abrió el archivo ejecuta el siguiente comando para abrirlo localmente: `npm run dev`. Con esto, se te proporcionará un enlace del tipo localhost para poder ver tu página en el navegador.

En este proyecto, se utilizó un autenticador de Firebase, el cual es libre de uso. Por ahora, se está utilizando la configuración de ejemplo de nuestro proyecto. El script de la configuración está en la carpeta `src/context/authContext.jsx`. Si deseas utilizar tu propio autenticador de Firebase, puedes empezar desde el siguiente enlace: [Firebase](https://firebase.google.com/?hl=es). Solo necesitas crear tu aplicación y activar el componente de autenticación, permitiendo la autenticación por correo y Google. Luego, sustituye las credenciales en el script para que funcione correctamente.

Además, en los enlaces donde se llama al servidor, están puestos los enlaces de localhost. Si deseas llevar este proyecto a producción, es importante cambiarlos por el enlace del servidor en producción para que funcione correctamente.

