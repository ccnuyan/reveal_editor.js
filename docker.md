    docker rm -f re-0-0-2
    docker rmi -f revealeditor:0.0.2
    docker build -t revealeditor:0.0.2 .
    docker run -d --name re-0-0-2 -p 12000:8000 revealeditor:0.0.2
    docker logs re-0-0-2