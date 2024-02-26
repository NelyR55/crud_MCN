# API de Gestión de Empleados

Este es un sistema de gestión de empleados implementado en Node.js utilizando el framework Express y el paquete 'azle' para la creación de un servidor.

## Funcionalidades

El sistema proporciona las siguientes funcionalidades para la gestión de empleados:

- Obtener la lista de todos los empleados.
- Agregar un nuevo empleado.
- Actualizar la información de un empleado existente.
- Eliminar un empleado según su ID.

## Instalación

**Requisitos:**

- Windows solo es compatible a través de un entorno virtual de Linux, como WSL.
- En Ubuntu/WSL: 
  ```bash
  sudo apt-get install podman
  ```
- En Mac:
  ```bash
  brew install podman
  ```
- Se recomienda usar nvm y Node.js 20:
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  nvm install 20
  ```

**Instalación de herramientas de línea de comandos de dfx:**
```bash
DFX_VERSION=0.16.1 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```

**Agregar $HOME/bin a tu ruta:**
```bash
echo 'export PATH="$PATH:$HOME/bin"' >> "$HOME/.bashrc"
```

## Implementación

Clone el proyecto de github
```bash
 git clone https://github.com/NelyR55/crud_MCN.git
```

```bash
npx azle new crud_MCN
cd crud_MCN
npm install
dfx start --clean --host 127.0.0.1:8000
```

En una terminal separada en el directorio `crud_MCN`:
```bash
dfx deploy
```

Si estás construyendo un canister basado en HTTP y deseas que se recargue automáticamente en caso de cambios en los archivos (NO despliegues en mainnet con la recarga automática habilitada):
```bash
AZLE_AUTORELOAD=true dfx deploy
```

Visualiza tu frontend en un navegador web en `http://[canisterId].localhost:8000`.

Para obtener el `[canisterId]` de tu aplicación:
```bash
dfx canister id backend
```

## Endpoints

- `GET /empleados`: Devuelve la lista de todos los empleados.
- `POST /empleados`: Agrega un nuevo empleado.
- `PUT /empleados/:id`: Actualiza la información de un empleado existente.
- `DELETE /empleados/:id`: Elimina un empleado según su ID.

## Middleware

`middlewares.ts`: Contiene el middleware `logRequest` para registrar el tiempo de las solicitudes y el middleware `validarEmpleado` para validar la existencia de un empleado antes de agregarlo al sistema.

## Validación

- Se verifica si el ID del empleado ya existe antes de registrar un nuevo empleado.
- Se verifica si el teléfono del empleado ya existe antes de registrar un nuevo empleado.

## Notas

- Este servidor utiliza el framework express.
- Asegúrate de enviar los datos en el formato correcto al hacer solicitudes POST y PUT.
- Algunos campos como ID y teléfono son únicos para cada empleado y deben ser manejados correctamente para evitar duplicados.# crud_MCN
