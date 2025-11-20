# 💬 React Chat App - Trabajo Final Integrador

Este proyecto es un clon de aplicación de chat desarrollado como **Trabajo Final Integrador** para el curso de **Desarrollo en React JS**.

A diferencia de una simple maqueta, esta aplicación implementa **mensajería en tiempo real** utilizando **Firebase** como backend, permitiendo a los usuarios crear perfiles y chatear entre sí desde distintos dispositivos.

## 🔗 Deploy
Puedes ver el proyecto funcionando aquí:
```bash
https://olive-integrador-react-git-main-saurons-projects-b2c1ec82.vercel.app?_vercel_share=6B1iC4D0BK8FWn3dzsRvt3lX7fsay91K
```

## 🚀 Funcionalidades

* **Tiempo Real (Firebase):** Los mensajes se sincronizan instantáneamente entre usuarios.
* **Sistema de Usuarios:**
    * Creación de nuevos usuarios dinámicamente.
    * Selección de usuarios existentes mediante un Dropdown personalizado.
* **Interfaz de Chat:**
    * Panel lateral con lista de usuarios (adaptable a móvil).
    * Burbujas de mensaje diferenciadas (Enviado vs. Recibido).
    * Scroll automático al último mensaje.
* **Diseño Responsive:**
    * Diseño fluido con CSS nativo (Flexbox).
    * En pantallas pequeñas (<800px), la lista de usuarios se oculta automáticamente y se puede alternar mediante un botón en el header.
* **Enrutamiento:** Manejo de rutas dinámicas con `react-router-dom` para gestionar las salas de chat (`/chat/:idFrom/:idTo`).

## 🛠️ Tecnologías Utilizadas

* **React JS** (Hooks: `useState`, `useEffect`, `useRef`)
* **Firebase Realtime Database**
* **React Router DOM**
* **CSS3 Nativo** (Variables, Flexbox, Media Queries, Animaciones)

## 📦 Instalación y Ejecución

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/FedericoOlive/Olive_Integrador_React.git](https://github.com/FedericoOlive/Olive_Integrador_React.git)
    cd downloads
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configuración de Firebase:**
    * El proyecto ya incluye la configuración en `src/Services/FireBase/DataBase.js`. Asegúrate de que las reglas de seguridad de tu base de datos permitan lectura/escritura.

4.  **Correr el proyecto:**
    ```bash
    npm start
    ```

## 📋 Estado del Proyecto vs. Consignas

| Requerimiento | Estado | Detalle |
| :--- | :---: | :--- |
| **Componentes, Props, State** | ✅ | Implementado correctamente en toda la app. |
| **Panel Lateral y Principal** | ✅ | Separación clara entre `UsersList` y `ChatBox`. |
| **Burbujas de Chat** | ✅ | Estilos diferenciados para emisor y receptor. |
| **Responsive Design** | ✅ | Adaptación completa para móviles ocultando paneles. |
| **CSS Nativo** | ✅ | Uso de archivos `.css` sin librerías externas de estilo. |
| **Extras Agregados** | ⭐ | Integración completa con Firebase (Backend Real). |

---
**Autor:** [Federico Olive]
**Curso:** [Desarrollo en React JS - UTN BA]