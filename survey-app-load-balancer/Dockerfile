FROM openjdk:17-jdk-alpine

COPY target/survey-app-load-balancer-0.0.1-SNAPSHOT.jar survey-app-load-balancer-0.0.1-SNAPSHOT.jar


EXPOSE 8089
ENTRYPOINT ["java","-jar","survey-app-load-balancer-0.0.1-SNAPSHOT.jar"]
