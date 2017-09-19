    docker rm -f se001
    docker rmi -f syncollege-editor:001
    docker build -t syncollege-editor:001 .
    docker run -d --name se001 -p 29000:19000 syncollege-editor:001
    docker logs se001