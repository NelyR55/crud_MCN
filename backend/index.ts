import { Server } from 'azle';
import express, { NextFunction, Request, Response } from 'express';

type Empleado ={
    id: number,
    nombre: string,
    genero: string,
    direccion: string,
    telefono: string,
    correo: string,
    departamento: string,
    cargo: string,
    sueldo: number
}
let empleados: Empleado [] = [{
    id: 1,
    nombre: 'Mary',
    genero: 'Mujer',
    direccion: 'SFR #234',
    telefono: '4495111086',
    correo: 'maripvill@gmail.com',
    departamento: 'Ventas',
    cargo: 'Gerencia',
    sueldo: 1200
}];

// Middleware para registro de tiempo
function logRequest(req: Request, res: Response, next: NextFunction) {
    console.log(`Registro creado el día [${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}


function validarEmpleado(req: Request, res: Response, next: NextFunction) {
    const empleado: Empleado = req.body;

    // Verificar si el ID del empleado ya existe en la lista
    const empleadoExistente = empleados.find(e => e.id === empleado.id);
    if (empleadoExistente) {
        return res.status(409).json({ error: 'ID de empleado duplicado' });
    }

    // Llamar al siguiente middleware si todos los datos son válidos
    next();
}

export default Server(() => {
    const app = express();

    app.use(express.json());
    app.use('/empleados', validarEmpleado);

//GET
    app.get('/empleados', (req, res) => {
        res.json(empleados);
    });
//POST 
    app.post("/empleados", (req, res) => {
        const telefono= req.body.telefono;
        const empleado = empleados.find((empleado)=> empleado.telefono === telefono);
        if (!empleado){
            empleados = [...empleados, req.body];
            res.send("Registro exitoso");
        }else{
            res.status(404).send("Error: Teléfono existente");
            return;
        }
    });

//PUT
    app.put("/empleados/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const empleado = empleados.find((empleado) => empleado.id === id);

        if (!empleado) {
            res.status(404).send("No encontrado");
            return;
        }

        const updatedEmp = { ...empleado, ...req.body };
        
        empleados = empleados.map((b) => b.id === updatedEmp.id ? updatedEmp : b);

        res.send("Actualización correcta");
    });

//DELETE
    app.delete("/empleados/:id", (req, res) => {
        const id = parseInt(req.params.id);
        empleados = empleados.filter((empleado) => empleado.id !== id);
        res.send("Empleado eliminado correctamente");
    });
    return app.listen();
});