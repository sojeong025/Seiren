import { atom } from 'recoil';

// record state
export const RecordState = atom({
  key: 'RecordState',
  default: 0,
});

export const RecordingState = atom({
  key: 'RecordingState',
  default:'idle',
})

export const VoiceIdState = atom({
  key: 'VoiceIdState',
  default: '',
})

export const AudioDataState = atom({
  key: 'audioDataState',
  default: null,
});

export const RecordCountState = atom({
  key: 'recordCountState',
  default: 0,
});