# Nest CLI Commands

Crear un nuevo proyecto

```
nest new task-management-service
```

Crear un modulo
```
nest g module tasks
```

Crear un controlador sin pruebas unitarias
```
nest g controller tasks --no-spec
```

Crear un servicio sin pruebas unitarias
```
nest g service tasks --no-spec
```

Crear una instancia de postgresSQL con docker
```
docker run --name postgres-docker -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```



