from flask import Flask, request, send_file, Response, jsonify
import os
import requests
import json
from flask_cors import CORS, cross_origin

import IPython.display as ipd
import torch
import commons
import utils
from models import SynthesizerTrn
from text.symbols import symbols
from text import text_to_sequence
from scipy.io.wavfile import write

os.environ["CUDA_DEVICE_ORDER"] = "PCI_BUS_ID"
os.environ["CUDA_VISIBLE_DEVICES"]= "9"

class vits():
    def __init__(self, checkpoint_path, config_path):
        self.hps = utils.get_hparams_from_file(config_path)
        self.spk_count = self.hps.data.n_speakers
        self.net_g = SynthesizerTrn(
            len(symbols),
            self.hps.data.filter_length // 2 + 1,
            self.hps.train.segment_size // self.hps.data.hop_length,
            n_speakers=self.hps.data.n_speakers,
            **self.hps.model).cuda()
        _ = self.net_g.eval()
        _ = utils.load_checkpoint(checkpoint_path, self.net_g, None)

    def get_text(self, text, hps):
        text_norm = text_to_sequence(text, hps.data.text_cleaners)
        if hps.data.add_blank:
            text_norm = commons.intersperse(text_norm, 0)
        text_norm = torch.LongTensor(text_norm)
        return text_norm

    def infer(self, text, filename):
        ipd.clear_output()
        stn_tst = self.get_text(text, self.hps)
        with torch.no_grad():
            x_tst = stn_tst.cuda().unsqueeze(0)
            x_tst_lengths = torch.LongTensor([stn_tst.size(0)]).cuda()
            sid = torch.LongTensor(0).cuda()
            audio = self.net_g.infer(x_tst, x_tst_lengths, sid=sid, noise_scale=.667, noise_scale_w=0.8, length_scale=1)[0][0,0].data.cpu().float().numpy()
        write(f'infer/' + filename, self.hps.data.sampling_rate, audio)
        ipd.display(ipd.Audio(audio, rate=self.hps.data.sampling_rate,
                              normalize=False))

import re

def extract_number(f):
    s = re.findall('\d+', f)
    return (int(s[0]) if s else -1, f)

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})  # CORS 설정 추가


@app.route('/synthesize', methods=['GET'])
def synthesize():
    voice_id = request.args.get('voice_id')
    text = request.args.get('text')
    if not text:
        return 'No input text received.', 400

    dir_path = os.path.join(os.getcwd(), 'checkpoints')
    dir_path = os.path.join(dir_path, voice_id)

    name = 'G_0.pth'
    get_g = sorted(os.listdir(dir_path), key=extract_number)
    for i in get_g:
        if i[:2] == 'G_':
            name = i

    tts = vits('./checkpoints/' + voice_id + '/' + name, './checkpoints/' + voice_id + '/config.json')

    tts_file_name = voice_id +'.wav'
    
    tts.infer(text, tts_file_name)

    # Ensure that the file exists
    if not os.path.exists('infer/' + tts_file_name):
        return 'Synthesis failed.', 500

    return send_file('infer/' + tts_file_name, mimetype='audio/wav')

@app.route('/synthesize2', methods=['GET'])
def synthesize2():
    
    Authorization = request.headers.get('Authorization')
    
    transaction_id = request.args.get('transaction_id')
    voice_id = request.args.get('voice_id')
    text = request.args.get('text')
    
    if not text:
        return 'No input text received.', 400
    
    url=f'http://j9e105.p.ssafy.io/api/transactions/check?transactionid={transaction_id}&text={text}'
    
    headers = {
            'Authorization': Authorization,
            'Content-Type': 'application/json'
        }
        
    response=requests.get(url, headers=headers)
    
    print("@@@@@@@characters check@@@@@@@")
    
    response_data = json.loads(response.text)
    success = response_data["success"]
    print(response.text)

    print("@@@@@@@characters check@@@@@@@")
    
    if not success:
        content = {"success": False, "response": "Not enough characters", "apiError": None}
        
        response = jsonify(content)
        response.headers.extend(headers)
        return response, 400
    
    
    dir_path = os.path.join(os.getcwd(), 'checkpoints')
    dir_path = os.path.join(dir_path, voice_id)

    name = 'G_0.pth'
    get_g = sorted(os.listdir(dir_path), key=extract_number)
    for i in get_g:
        if i[:2] == 'G_':
            name = i

    tts = vits('./checkpoints/' + voice_id + '/' + name, './checkpoints/' + voice_id + '/config.json')


    tts.infer(text, voice_id + '.wav')
    
    # Ensure that the file exists
    if not os.path.exists('infer/' + voice_id + '.wav'):
        return 'Synthesis failed.', 500
    
    # POST : trst_id, text, file 
    headers = {'Authorization': Authorization,}
    files = {'file': open('infer/' + voice_id + '.wav', 'rb')}
    data = {'transactionid': transaction_id, 'text': text}
    response = requests.post('http://j9e105.p.ssafy.io/api/transactions', params=data, files=files, headers=headers)
    
    print('@@@@@ POST @@@@@')
    print(response.text)
    print('@@@@@ POST @@@@@')
    
    
    headers = {
            'Authorization': Authorization,
            'Content-Type': 'application/json'
        }
    content = {"success": True, "response": "Purchase Success", "apiError": None}
    
    response = jsonify(content)
    response.headers.extend(headers)
    return response, 200
    
    
@app.route('/synthesize3', methods=['GET'])
def synthesize3():
    
    Authorization = request.headers.get('Authorization')
    
    product_id = request.args.get('product_id')
    voice_id = request.args.get('voice_id')
    text = request.args.get('text')
    
    if not text:
        return 'No input text received.', 400
    
    url=f'http://j9e105.p.ssafy.io/api/tts'
    
    headers = {
            'Authorization': Authorization
        }
    data = {'productId' : product_id}
    response=requests.put(url, headers=headers, data=data)
    
    print('@@@@@ PUT @@@@@')
    print(Authorization)
    print(product_id)
    print(voice_id)
    print(text)
    print(response.text)
    print('@@@@@ PUT @@@@@')
    
    response_data = json.loads(response.text)
    success = response_data["success"]
    
    if not success:
        content = {"success": False, "response": "Not enough", "apiError": None}
        
        response = jsonify(content)
        response.headers.extend(headers)
    
        return response, 200
    
    dir_path = os.path.join(os.getcwd(), 'checkpoints')
    dir_path = os.path.join(dir_path, voice_id)

    name = 'G_0.pth'
    get_g = sorted(os.listdir(dir_path), key=extract_number)
    for i in get_g:
        if i[:2] == 'G_':
            name = i

    tts = vits('./checkpoints/' + voice_id + '/' + name, './checkpoints/' + voice_id + '/config.json')


    tts.infer(text, voice_id + '.wav')

    # Ensure that the file exists
    if not os.path.exists('infer/' + voice_id + '.wav'):
        return 'Synthesis failed.', 500

    return send_file('infer/' + voice_id + '.wav', mimetype='audio/wav')
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=1470)
