AngularJS with JAX-RS services
==============================

This is a simple example that combines angularjs frontend project together with
JAX-RS REST API. Project is packaged to WAR with maven.

Project is organized in multimodule maven project with 2 child projects: frontend
and service. Frontend project is using grunt and bower which are run using
maven. Service project is a very simple WAR packaged JAX-RS service.

## To build application, write

    mvn package

## To run application

Deploy application to some application server that supports JAX-RS 2.0, project
was developed using JBoss AS.

Project contains jboss-web.xml file which makes application accessible in
[context root aj](http://localhost:8080/aj). On other application servers the
application is deployed to default location.

