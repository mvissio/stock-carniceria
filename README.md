# StockCarniceria

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Enviromments
El directorio enviroments tiene los ambientes del sistema, tiene un subdirectorio config donde tenes la configuración de las rutas(son dos archivos el model: 'se definen las interfaces' y el api-values: 'donde se definen las rutas').

## Pages
En pages estan los componentes del sistema.

## Paginations
En shared pagination tenemos el componente paginación, ademas hay dos modelos de la paginación page y pageConfig. 

# DEPLOY

## Rewrite engine tomcat
1. Edite el `~/conf/server.xml` para agregar Valve a continuación dentro de la sección Host como se muestra a continuación:
```xml
...
      <Host name="localhost"  appBase="webapps"
            unpackWARs="true" autoDeploy="true">
        <Valve className="org.apache.catalina.valves.rewrite.RewriteValve" />
...
      </Host>
...
```
2. Cree la estructura del directorio - `~/conf/Catalina/localhost/` y cree el archivo **rewrite.config** dentro de él con el contenido a continuación -
```
RewriteCond %{REQUEST_PATH} !-f
RewriteRule ^/lapinta/(.*) /lapinta/index.html
```

## Deploy to server
Para hacer deploy en el server se debe ejecutar el comando `ng build --prod --base-href /lapinta/` luego copiar los archivos dentro del compilado de angular `dist/stock-carniceria` y pegarlos dentro de `webapps/lapinta` dentro del tomcat
