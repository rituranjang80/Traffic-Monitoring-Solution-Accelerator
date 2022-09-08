import os
import yaml
import numpy as np
import cv2 as cv2
import pandas as pd 
import json
import azure.cosmos.cosmos_client as cosmos_client
from azure.cosmos import CosmosClient
import collections
import time
import json
import datetime
from flask import Flask, render_template, Response
from flask import request
import requests
import pyodbc
import requests
import base64
import json
input_size = 416

# Detection confidence threshold
confThreshold = 0.2
nmsThreshold = 0.2

font_color = (0, 0, 153)
font_size = 0.6
font_thickness = 3

# Store Coco Names in a list
classesFile = "coco.names"
classNames = open(classesFile).read().strip().split('\n')

# class index for our required detection classes
required_class_index = [2, 3, 5, 7]

# detected_classNames = []

## Model Files
modelConfiguration = 'yolov4.cfg'
modelWeigheights = 'yolov4.weights'

net = cv2.dnn.readNetFromDarknet(modelConfiguration, modelWeigheights)

# Configure the network backend

net.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
net.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA)

# Define random colour for each class
np.random.seed(42)
colors = np.random.randint(0, 255, size=(len(classNames), 3), dtype='uint8')

def Paylod_acc(img_path,cam, ID):
    with open(img_path, 'rb') as f:
        byte_im = f.read()
    im_b64 = base64.b64encode(byte_im).decode("utf8")
    payload= json.dumps({'image':im_b64, 'camera_id':cam, 'Id':ID})
    return payload

def load_config():
    dir_root = os.path.dirname(os.path.abspath(__file__))
    print('root_dir:', dir_root)
    with open(dir_root+ "/config.yaml", "r") as yamlfile:
        return yaml.load(yamlfile, Loader=yaml.FullLoader)
    
def upload_data(dict_1):
    config = load_config()
    # create cosmos client
    client = CosmosClient(config['Account'], config['Key'])
    database = client.get_database_client(config['DatabaseName'])
    container1 = database.get_container_client(config['containerName'])
    container1.upsert_item(dict_1)
    
def load_endpoint(camera_id):
    conn = pyodbc.connect(config['sql_connection_string'])
    cursor = conn.cursor()
    cursor.execute("SELECT [IP_Address] FROM [MicrosoftTrafficMgmt].[dbo].[CameraDetails] c where c.cameraID={0}".format(camera_id))
    streaming_point = cursor.fetchall()
    streaming_point = streaming_point[0][0]
    return streaming_point
    
    
def postProcess(outputs, img):
    # global detected_classNames
    height, width = img.shape[:2]
    boxes = []
    classIds = []
    confidence_scores = []
    detection = []
    for output in outputs:
        for det in output:
            scores = det[5:]
            classId = np.argmax(scores)
            confidence = scores[classId]
            if classId in required_class_index:
                if confidence > confThreshold:
                    # print(classId)
                    w, h = int(det[2] * width), int(det[3] * height)
                    x, y = int((det[0] * width) - w / 2), int((det[1] * height) - h / 2)
                    boxes.append([x, y, w, h])
                    classIds.append(classId)
                    confidence_scores.append(float(confidence))

    # Apply Non-Max Suppression
    indices = cv2.dnn.NMSBoxes(boxes, confidence_scores, confThreshold, nmsThreshold)

    detected_classNames = []
    if len(indices) > 0:
        for i in indices.flatten():
            x, y, w, h = boxes[i][0], boxes[i][1], boxes[i][2], boxes[i][3]
            name = classNames[classIds[i]]

            detected_classNames.append(name)

            color = [int(c) for c in colors[classIds[i]]]
            name = classNames[classIds[i]]

            # Draw classname and confidence score
            cv2.putText(img, f'{name.upper()} {int(confidence_scores[i] * 100)}%',
                        (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 1)

            # Draw bounding rectangle
            cv2.rectangle(img, (x, y), (x + w, y + h), color, 1)
            detection.append([x, y, w, h, required_class_index.index(classIds[i])])

    dict1 = dict(collections.Counter(detected_classNames))
    detected_classNames.clear()
    return dict1

def realTime(id_stream):
    stream_url = load_endpoint(id_stream)
    cap = cv2.VideoCapture(stream_url)
    #cap = cv2.VideoCapture("https://mspocmediaservice-usea.streaming.media.azure.net/3b1f6b2e-a36f-452f-9fb3-d7c4336a2d1a/32745.ism/manifest(format=m3u8-cmaf)")
    fps = (cap.get(cv2.CAP_PROP_FPS))
    print(int(fps))
    #print(video)
    # out = cv2.VideoWriter('test.mp4', cv2.VideoWriter_fourcc(*'mp4v'), 15, size)
    dict1 = {'car': 0, 'bus': 4, 'motorbike': 3, 'truck': 4}
    #print(dict1)
    #json_final_list = []
    camera_dict = {'camera_Id': id_stream}
    count=1
    while cap.isOpened():
        dict_vehicle = {}
        json_dict = {}
        success, img = cap.read()
        if success:
            # print("frame_count: ",frame_count)
            blob = cv2.dnn.blobFromImage(img, 1 / 255, (input_size, input_size), [0, 0, 0], 1, crop=False)

            # Set the input of the network
            net.setInput(blob)
            # start = time.time()
            layersNames = net.getLayerNames()
            outputNames = [(layersNames[i - 1]) for i in net.getUnconnectedOutLayers()]
            # Feed data to the network
            outputs = net.forward(outputNames)
            
            dict_v = postProcess(outputs, img)
            print('dict_v',dict_v)

            for i in dict1:
                if i in dict_v:
                    dict_vehicle[i] = dict_v[i]
                else:
                    dict_vehicle[i] = 0

            frame_stamp = (cap.get(cv2.CAP_PROP_POS_MSEC)) / 1000  # condition
            ct = datetime.datetime.now()
            ts = ct.timestamp()
            Id = {'id': '{0}'.format(count)}
            json_dict.update(Id)
            json_dict.update(camera_dict)
            json_dict.update(dict_vehicle)
            json_dict['frame_timestamp'] = frame_stamp
            json_dict['current_time'] = ts
 
            if count==1 or count%int(fps)==0:
               upload_data(json_dict)
               json_dict_1 = json_dict
               camera_id_1 = json_dict_1['camera_Id']
               Id_1 = count
               cv2.imwrite('temp.jpg', img)
               headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
               payload = Paylod_acc('temp.jpg', camera_id_1, Id_1)
               r = requests.post('http://20.81.114.67:8083/files/', data=payload, headers=headers)

            cv2.putText(img, "Car:" + " " + str(dict_vehicle['car']), (20, 40), cv2.FONT_HERSHEY_SIMPLEX, font_size,
                        font_color, font_thickness)
            cv2.putText(img, "Bus:" + " " + str(dict_vehicle['bus']), (20, 60), cv2.FONT_HERSHEY_SIMPLEX, font_size,
                        font_color, font_thickness)
            cv2.putText(img, "Truck:" + " " + str(dict_vehicle['truck']), (20, 80), cv2.FONT_HERSHEY_SIMPLEX, font_size,
                        font_color, font_thickness)
            cv2.putText(img, "Motorbike:" + " " + str(dict_vehicle['motorbike']), (20, 100), cv2.FONT_HERSHEY_SIMPLEX,
                        font_size, font_color, font_thickness)
            #print(dict_vehicle)
            dict_vehicle.clear()
            #cv2.imshow('output', img)
            count+=1
            ret, buffer = cv2.imencode('.jpg', img)
            frame = buffer.tobytes()
            #print(frame)
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # concat frame one by one and show result'''
            c = cv2.waitKey(1)
            if c & 0xFF == ord('q'):
                break
            
    cap.release()
    cv2.destroyAllWindows()   
    
app = Flask(__name__)


@app.route('/<int:id_3>')
def index(id_3):
    return render_template('index.html',id_3 = id_3)

@app.route('/video_feed/<int:id_3>')
def video_feed(id_3):
    #print(id)
    return Response(realTime(id_3), mimetype='multipart/x-mixed-replace; boundary=frame')
    


if __name__ == "__main__":
    app.run(debug= False)
