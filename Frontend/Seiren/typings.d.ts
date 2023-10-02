declare module 'audiobuffer-to-wav' {
  const toWav: (buffer: AudioBuffer) => ArrayBuffer;
  export default toWav;
}