# Proyecto Final del Tramo III de argentina Programa, Lenguajes de Programación II Creación de Plataforma Interactiva de Viajes con Registro y Login

## Este proyecto es una aplicación web que utiliza Express como servidor backend y React con Vite como frontend.

### Requisitos
<div style="display: flex; justify-content: space-between; align-items: center;">
 <div><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--KkScstnJ--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zojuy79lo3fn3qdt7g6p.png" alt="imagen node + express" width="150"/> <p>

Node.js y Express.js instalados en tu sistema.</p></div>
<div>
<img src="https://miro.medium.com/v2/resize:fit:512/1*doAg1_fMQKWFoub-6gwUiQ.png" alt="imagen MongoDb" width="150"/><p>Este programa utiliza MongoDb como base de datos </p></div>

<div>
<img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/react_original_wordmark_logo_icon_146375.png" alt="React" width="150"/><p>Se necesita tambien la libreria React</p></div>
</div>

<img src="" alt="estructura del proyecto" width="150"/>

### Estructura del Proyecto
•	/Backend: Contiene el código del servidor Express.

•	/client: Contiene el código del cliente React Vite.


<img src="" alt="inicio rapido" width="150"/>


### Inicio rápido

1. Clone este repositorio.

2. Asegurese de tener instalada y abierta una base de datos MongoDb.

3. Crea una base de datos en MongoDb, agregandole la colección users. 

4. Abre una terminal en la carpeta raíz del proyecto.

5. En la terminal de VisualStudio Code ingresa a la carpeta Backend:
       
         cd Backend


6.	Instala las dependencias del servidor :
- Express
- Express-Validator
- nodemon
- dotenv
- Cors
- Morgan
- Mongoose
- Helmet
- jsonwebtoken
- bcrypt


7. Abre una nueva terminal e ingresa a la carpeta client:
      
         cd client
 

8.	Instala las dependencias del Frontend (nuestra carpeta de Frontend se denomina client)

- Vite
- Talwidcss
- react-router-dom
- react-hook-form
- Axios


9. En la carpeta Backend: define tus propios parámetros para el servidor Express, en un archivo .env, basandote en el archivo .env.example donde estan detalladas las variables de entorno que debes definir para que funciones este programa.

10. En la carpeta client: define la conexión con la Api en el archivo setCredentialAxios.js, definiendo el URL de la Api.



<img src="" alt="ejecución" width="150"/>


### Ejecución:
•	 Inicia el servidor Express desde la carpeta Backend

    npm run dev

•	Inicia el servidor de desarrollo React Vite desde la carpeta client.

    npm run dev


<img src="" alt="imagen MongoDb" width="150"/>

#### Puedes ingresar a la aplicación siguiendo el link que aparece en la terminal al inicializar client.



________________________________________
