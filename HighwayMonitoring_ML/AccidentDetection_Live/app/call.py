import requests
import base64
import json
with open('accident_2.jpg', 'rb') as f:
    byte_im = f.read()
    #print(byte_im)
im_b64 = base64.b64encode(byte_im).decode("utf8")
print(im_b64)
headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
camera_id = 800
count = 8888990
payload= json.dumps({'image':im_b64, 'camera_id':camera_id, 'Id':count})
#r = requests.post('http://20.81.114.67:8083/files/', data=payload, headers=headers)
#r = requests.post('http://127.0.0.1:8000/files/', data=payload, headers=headers)
r= requests.post('http://localhost:8088/files/', data=payload, headers= headers)