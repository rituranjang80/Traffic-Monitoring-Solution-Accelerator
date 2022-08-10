import cv2
import os
import json
from imageai.Prediction.Custom import CustomImagePrediction
from copy import deepcopy
from pathlib import Path
import datetime
import yaml
from azure.cosmos import CosmosClient

cwd = os.getcwd()


def load_config():
    dir_root = os.path.dirname(os.path.abspath(__file__))
    print('root_dir:', dir_root)
    with open(dir_root+ "/config.yaml", "r") as yamlfile:
        return yaml.load(yamlfile, Loader=yaml.FullLoader)


def upload_data(JsonList):
    config = load_config()
    # create cosmos client
    client = CosmosClient(config['Account'], config['Key'])
    database = client.get_database_client(config['DatabaseName'])
    container1 = database.get_container_client(config['containerName'])
    container1.upsert_item(JsonList)


def run_predict(camera_id, Id, img_path):
    predictor = CustomImagePrediction()
    predictor.setModelPath(model_path=os.path.join(cwd, "trafficnet_resnet_model_ex-055_acc-0.913750.h5"))
    predictor.setJsonPath(model_json=os.path.join(cwd, "model_class.json"))
    predictor.loadFullModel(num_objects=4)
    
    img_id = Id

    # Empty dictionary to store values
    json_dict = {}
 
    ct = datetime.datetime.now()
    ts = ct.timestamp()

    tAccidentStat = ""
    
    predictions, probabilities = predictor.classifyImage(image_input=img_path, result_count=1)
    if (predictions == ['Accident'] or predictions == ['Fire']) and probabilities[0] >= 50:
        predictions = "Accident"
        accident = "{:.2f}".format(probabilities[0])
        print(accident)
        tAccidentStat = accident
        no_accident = "0"

    elif (predictions == ['Sparse_Traffic'] or predictions == ['Dense_Traffic']) and probabilities[0] < 50:
        predictions = "No Accident"
        tAccidentStat = "0.0"
        no_accident = "0"

    else:
        predictions = "No Accident"
        tAccidentStat = "0.0"
        no_accident = "0"



    # Dumping all the required values in dictionary
    json_dict["id"] = str(Id)
    #json_dict.update(Id)
    json_dict['tAcamera_id'] = camera_id
    json_dict["taccident"] = int(float(tAccidentStat))
    json_dict['noaccident'] = int(no_accident)
    json_dict["tAccidentStatus"] = int(float(tAccidentStat))
    json_dict["tAccident_percent"] = int(float(tAccidentStat))
    json_dict["current_timestamp"] = ts
    json_dict["tAframe_Id"] = int(img_id)
    
    upload_data(json_dict)