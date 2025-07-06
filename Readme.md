start spring boot 
mvn spring-boot:run

## debug spign boot application 
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005"

start react
npm run start