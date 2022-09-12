FROM maven:3-openjdk-11
WORKDIR /usr/src/ediea-delta/backend
COPY . .
RUN mvn spring-boot:start

EXPOSE 8080
CMD [ "mvn", "spring-boot:run" ]