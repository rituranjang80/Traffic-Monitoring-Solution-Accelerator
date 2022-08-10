import json
from fastapi import FastAPI, UploadFile, File
import requests
from video_save import realTime
import shutil
import yaml
import os



app = FastAPI()


@app.post('/')
async def root(file: UploadFile = File(...)):
    with open(f'{file.filename}', 'wb') as buffer:
        shutil.copyfileobj(file.file, buffer)
        rt = realTime(video=file.filename)
        inference_json = json.dumps(rt, separators=(',', ':'))
        
        dir_root = os.path.dirname(os.path.abspath(__file__))
        
        with open(dir_root+ "/config.yaml", "r") as yamlfile:
            config = yaml.load(yamlfile, Loader=yaml.FullLoader)
        
        
        print('aa',inference_json)
        headers = {
            'content-type': "application/json",
            'cache-control': "no-cache",

        }

        response = requests.request("POST", config['Traffic_mon_url'], data = inference_json, headers=headers)
        print(response.text)


    return "Data Posted"

