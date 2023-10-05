from flask import Flask, request
import subprocess
import requests

import time
import threading
from queue import Queue

import os
os.environ["CUDA_DEVICE_ORDER"] = "PCI_BUS_ID"
os.environ["CUDA_VISIBLE_DEVICES"]= "8"

app = Flask(__name__)
queue = Queue()

def worker():
    while True:
        item = queue.get()
        if item is None:
            break

        voice_id, Authorization = item
        
        command = f"python train2.py -c ./data123/{voice_id}/config.json -m {voice_id}"

        try:
            process = subprocess.Popen(command, shell=True)
            process.communicate()

            if process.returncode != 0:
                print({"error": "Command execution failed"})

            url = f"http://j9e105.p.ssafy.io/api/voices/state?voiceId={voice_id}"
            
            headers = {
                'Authorization': Authorization,
                'Content-Type': 'application/json'
            }
            
            response=requests.put(url, headers=headers)

            time.sleep(5)

            print("JSON response:", response.json())

            time.sleep(5)

        except Exception as e:
             print({"error": str(e)})

        queue.task_done()


@app.route('/train', methods=['POST'])
def train_model():
    voice_id = request.form['voice_id']
    Authorization = request.headers.get('Authorization')

    if not voice_id:
        return {"error": "User ID is required"}, 400

    queue.put((voice_id, Authorization))

    return {"message": "Training will be started soon"}, 200


if __name__ == '__main__':
    threading.Thread(target=worker).start()
    app.run(host='0.0.0.0', port=1469)
