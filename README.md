# Carla-Autonomous-Vehicle
Phase 1:Object Detection

First part of our project involved detecting real world objects in carla simulated environment. For this, we took help of a well known detection model called YOLO4(You Only Look once) because of its great tradeoff between Speed and Accuracy.

YOLO4 weights file can be downloaded from this Link and placed in the models folder

   

Phase 2: Road Detection using Semantic Segmentation
In this phase, we trained a road segmentation CNN model on the dataset of semantic images from carla to to detect road pixels from the camera image. After that we used Random sample consensus(RANSAC), that estimates the road plane from given set of points by taking multiple sets if 3 random points and passing a plane through it.
