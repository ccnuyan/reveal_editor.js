    docker rm -f re-0-0-3
    docker rmi -f revealeditor:0.0.3
    docker build -t revealeditor:0.0.3 .
    docker run -d --name re-0-0-3 -p 12000:8000 revealeditor:0.0.3
    docker logs re-0-0-3