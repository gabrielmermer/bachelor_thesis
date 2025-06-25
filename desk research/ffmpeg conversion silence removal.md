
ffmpeg -i fox.mp4 -ar 16000 -ac 1 -c:a pcm_s16le -af silenceremove=1:0:-50dB fox.wav

whisper cpp flag - can be 32 or 0 too but quality suffers
`--max-context 64 --entropy-thold 2.8`


https://old.reddit.com/r/LocalLLaMA/comments/1fyvc60/how_to_improve_whisper_translation_it_keeps/