docker build -t revealeditor:0.1 .

docker run -d --name test1 -p 12000:10000 revealeditor:0.1