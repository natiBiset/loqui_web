import { io } from "socket.io-client";
const socket = io('ws://34.195.113.89/socket.io');

const formData = new FormData();


var content = {
    // ID:'male',
    // username: 'mike',
    gender:'m',
    lang:'en-us',
    is_cloned:'no',
    audio:"yes"
  }
async function load_chat(userName,userID){  
  if (!userID){
    return
  }
  formData.append("ID",userID);
  content.ID = userID
  content.username = userName  
    socket.on('connect', () => {
        console.log('Successfully connected to the Socket.IO server!');
    });
    console.log('loading');
    console.log(content);
    socket.emit('load',content);
    socket.on('load',(response) =>{
        console.log(response)

    });
  }

var audioContext = null;
var meter = null;
var rafID = null;
var debuglog = true;

function record(){
  if (!DEFAULT_PARAMETERS_CONFIGURATION.recordingEnabled){
    DEFAULT_PARAMETERS_CONFIGURATION.recordingEnabled = true;
  }
    audioContext = new AudioContext();
    audioContext.resume().then( () => {
        console.log('User interacted with the page. Playback resumed successfully')
      })
      try {
        // ask for an audio input
        navigator.mediaDevices.getUserMedia(
        {
            'audio': {
                'mandatory': {
                    'googEchoCancellation': 'false',
                    'googAutoGainControl': 'false',
                    'googNoiseSuppression': 'false',
                    'googHighpassFilter': 'false'
                },
                'optional': []
            },
        }).then(audioStream)
        .catch(didntGetStream);
    } catch (e) {
        alert('getUserMedia threw exception :' + e);
    }
  

    document.addEventListener('signal', event => {
  
        const volume = event.detail.volume.toFixed(9)
        const timestamp = event.detail.timestamp
        const items = event.detail.items.toString().padEnd(3)
        const dBV = dB(event.detail.volume)
      
        const line = hystogramLine(volume)
        // const blob = event
        // console.log('blob',blob)
      
        if (debuglog)
          console.log(`signal  ${timestamp} ${items} ${volume} ${dBV} ${line}`)
      
        // document.querySelector('#audiostatuscell').style.background = 'green'
        // document.querySelector('#audiostatuscell').style.color = 'black'
        // document.querySelector('#audiostatus').style.background = 'green'
        // document.querySelector('#audiostatus').textContent = 'signal'
      
        //const theDiv = document.getElementById('log')
        //const content = document.createTextNode(text)
        //theDiv.appendChild(content)
      
      })
      
      //
      // silence handler
      //
      document.addEventListener('silence', event => {
      
        const volume = event.detail.volume.toFixed(9)
        const timestamp = event.detail.timestamp
        const items = event.detail.items.toString().padEnd(3)
        const dBV = dB(event.detail.volume)
      
        if (debuglog)
          console.log(`silence ${timestamp} ${items} ${volume} ${dBV}`)
      
        // document.querySelector('#audiostatuscell').style.background = 'black'
        // document.querySelector('#audiostatuscell').style.color = 'white'
        // document.querySelector('#audiostatus').style.background = 'black'
        // document.querySelector('#audiostatus').textContent = 'silence'
      
      })
      
      //
      // mute handler
      //
      document.addEventListener('mute', event => {
      
        const volume = event.detail.volume.toFixed(9)
        const timestamp = event.detail.timestamp
        const dBV = dB(event.detail.volume)
      
        if (debuglog)
          console.log(`mute    ${timestamp} ${volume} ${dBV}`)
      
        // document.querySelector('#audiostatus').textContent = 'mute'
      
      })
      
      
      //
      // prespeechstart handler
      //
      document.addEventListener('prespeechstart', event => {
      
        if (debuglog) {
          
          //const volume = event.detail.volume.toFixed(9)
          const timestamp = event.detail.timestamp
          //const dBV = dB(event.detail.volume)
      
          //console.log(`%cPRE SPEECH START    ${timestamp} ${volume} ${dBV}`, 'color:yellow')
          console.log(`%cPRE SPEECH START   ${timestamp}`, 'color:blue')
      
        }  
        
        restartRecording()
      
      })
      
      
      //
      // speechstart handler
      //
      document.addEventListener('speechstart', event => {
      
        if (debuglog) {
        
          //speechstartTime = event.detail.timestamp
          console.log('%cSPEECH START', 'color:greenyellow')
        }  
      
        // document.querySelector('#recordingcell').style.background = 'green'
        // document.querySelector('#recordingcell').style.color = 'white'
        // document.querySelector('#recording').style.background = 'green'
        // document.querySelector('#recording').style.color = 'white'
        // document.querySelector('#recording').textContent = 'start'
      
        startRecording()
      
      })
      
      //
      // speechstop handler
      //
      document.addEventListener('speechstop', event => {
      
        const duration = event.detail.duration
      
        if (debuglog) {
          
          const averageSignalLevel = averageSignal()
          
          console.log('%cSPEECH STOP', 'color:lime')
          console.log(`Total Duration in msecs  : ${duration}`)
          console.log(`Signal Duration in msecs : ${duration - MAX_INTERSPEECH_SILENCE_MSECS }`)
          console.log(`Average Signal level     : ${averageSignalLevel}`)
          console.log(`Average Signal dB        : ${dB(averageSignalLevel)}`)
          console.log(' ')
        }  
      
        // document.querySelector('#recordingcell').style.color = 'white'
        // document.querySelector('#recordingcell').style.background = 'black'
        // document.querySelector('#recording').style.color = 'white'
        // document.querySelector('#recording').style.background = 'black'
        // document.querySelector('#recording').textContent = `stop. len: ${duration} msecs`
      
        stopRecording()
      
      })
      
      //
      // speechabort handler
      //
      document.addEventListener('speechabort', event => {
      
        const abort = event.detail.abort
      
        if (debuglog) {
          
          const duration = event.detail.duration
          const averageSignalLevel = averageSignal()
          
          console.log('%cSPEECH ABORT', 'color:red')
          console.log(`Abort reason             : ${abort}`)
          console.log(`Total Duration in msecs  : ${duration}`)
          console.log(`Signal Duration in msecs : ${duration - MAX_INTERSPEECH_SILENCE_MSECS }`)
          console.log(`Average Signal level     : ${averageSignalLevel}`)
          console.log(`Average Signal dB        : ${dB(averageSignalLevel)}`)
          console.log(' ')
        }  
      
        // document.querySelector('#recordingcell').style.color = 'white'
        // document.querySelector('#recordingcell').style.background = 'red'
        // document.querySelector('#recording').style.color = 'white'
        // document.querySelector('#recording').style.background = 'red'
        // document.querySelector('#recording').textContent = `abort. ${abort}`
      
        abortRecording()
      
      })
      
      //
      // mutedmic handler
      //
      document.addEventListener('mutedmic', event => {
        const recordButton = document.querySelector('.recordButton img');
        recordButton.classList.remove('active')
      
        // document.querySelector('#microphonestatus').textContent = 'muted (off)'
        // document.querySelector('#microphonestatus').style.background = 'red'
        // document.querySelector('#microphonestatuscell').style.background = 'red'
      
        console.log('%cMICROPHONE MUTED', 'color:red')
        console.log(' ')
      
      })
      
      //
      // unmutedmic handler
      //
      document.addEventListener('unmutedmic', event => {
        const recordButton = document.querySelector('.recordButton img');
        recordButton.classList.add('active')
      
        // document.querySelector('#microphonestatus').textContent = 'unmuted (on)'
        // document.querySelector('#microphonestatus').style.background = 'green'
        // document.querySelector('#microphonestatuscell').style.background = 'green'
      
        console.log('%cMICROPHONE UNMUTED', 'color:green')
        console.log(' ')
      
      })
}

function didntGetStream(e) {
    alert('Stream generation failed.,',e);
} 
 


// let soundDetected
// const MIN_DECIBELS = -45;
// let silenceDuration = 0;
// let recordAudio;
// let recording = true;
// async function record(){
//     let chunks = [];
//     const resAudio = document.createElement("audio")
//     console.log('starting recording')
//     let stream = await navigator.mediaDevices.getUserMedia({audio: true});
//     recordAudio = new RecordRTCPromisesHandler(stream, {
//         type: 'audio'
//     });
       


//     while (recording) {
//         await recordAudio.startRecording();
//         const sleep = m => new Promise(r => setTimeout(r, m));
//         await sleep(3000);
//         const audioContext = new AudioContext();
//         const audioStreamSource = audioContext.createMediaStreamSource(stream);
//         const analyser = audioContext.createAnalyser();
//         analyser.minDecibels = MIN_DECIBELS;
//         audioStreamSource.connect(analyser);
//         const bufferLength = analyser.frequencyBinCount;
//         const domainData = new Uint8Array(bufferLength);
//         console.log('domain Data',domainData[0])
//         soundDetected = false;
//         console.log('sound silence',soundDetected)
//         analyser.getByteFrequencyData(domainData); 
//         for (let i = 0; i < bufferLength; i++) {
//             const value = domainData[i];
//             if (domainData[i] > 0) {
//                 soundDetected = true
//                 console.log('detected',soundDetected)
//                 }}
        
//         await recordAudio.stopRecording();
//         let blob = await recordAudio.getBlob();
//         const audioUrl = URL.createObjectURL(blob);
//         resAudio.src = audioUrl;
//         resAudio.play();
//         await sleep(3000);
//     }
    
//     // navigator.mediaDevices.getUserMedia({audio : true})
//     // .then(stream =>{
//     //   recorder = new MediaRecorder(stream);     
//     //   recorder.ondataavailable = (e) => {
//     //     chunks.push(e.data);     
//     //   };
//     // //   setInterval(() => {
//     // //     recorder.requestData();
//     // //   }, 1000); // Request data every 1 second
//     //   recorder.start()
//     //   console.log('initial state', recorder.state)
    
//     //     const detectSound = () => {
//     //         // console.log('sound detected', soundDetected)
//     //         // console.log('sotate', recorder.state)
//     //         // console.log(chunks)
//     //         // console.log(recorder.requestData())
//     //         if (soundDetected) {
//     //          return}
            
//     //         if (!soundDetected) {
//     //             silenceDuration += 10;   
//     //             if (silenceDuration >= 2000) {
                    
                
//     //                 stream.getTracks().forEach(track => track.stop());
//     //                 console.log('chunk length', chunks.length)
//     //                 const audioBlob = new Blob(chunks);
//     //                 const audioUrl = URL.createObjectURL(audioBlob);
//     //                 // const audio = new Audio(audioUrl);
//     //                 resAudio.src = audioUrl;
//     //                 resAudio.play()
//     //                 chunks = []
//     //                 // if (recorder.state === 'inactive'){
//     //                 //     recorder = new MediaRecorder(stream);  
//     //                 //     recorder.start()
//     //                 // }
//     //                 // recorder.start()
//     //                 // console.log('state', recorder.state)
//     //                 silenceDuration = 0;
//     //                 soundDetected = true; 
                    
//     //                 // recorder.resume()// Reset the silence duration
//     //             }
//     //         }
        
//     //         analyser.getByteFrequencyData(domainData); 
//     //         for (let i = 0; i < bufferLength; i++) {
//     //             const value = domainData[i];
    
//     //             if (domainData[i] > 0) {
//     //             soundDetected = true
//     //             console.log('detected',soundDetected)
//     //             }
//     //         } 
//     //         soundDetected = false;
//     //         window.requestAnimationFrame(detectSound);
//     //         }
//     //      // Reset the soundDetected flag
//     //     window.requestAnimationFrame(detectSound);
        
    

// }
// function record_stop(){
//     console.log('recording finished')
//     recording = false;
//     recordAudio.stopRecording();

//     // recorder.stop()
//     // soundDetected = true;
//     // console.log(recorder)
// }
function sst(){
    const formData = new FormData();
    formData.append("ID","sample");
    // navigator.mediaDevices.getUserMedia({audio : true})
}


function disconnect(){
    socket.emit('disconnect_now','')
}




 //   recorder.addEventListener("stop", () => {
    //     console.log('stop called')
    //     stream.getTracks().forEach(track => track.stop());
    //     const audioBlob = new Blob(chunks);
    //     const audioUrl = URL.createObjectURL(audioBlob);
    //     const audio = new Audio(audioUrl);
    //     audio.play();
        
    //     console.log('detected at stop',{soundDetected });
    //   });




    // detection

//audioDetectionConfig.js

const SAMPLE_POLLING_MSECS = 50
const MAX_INTERSPEECH_SILENCE_MSECS = 600
const POST_SPEECH_MSECS = MAX_INTERSPEECH_SILENCE_MSECS
const PRERECORDSTART_MSECS = 600
const MIN_SIGNAL_DURATION = 400
const VOLUME_SIGNAL = 0.02
const VOLUME_SILENCE = 0.001
const VOLUME_MUTE = 0.0001
const MIN_AVERAGE_SIGNAL_VOLUME = 0.04

const DEFAULT_PARAMETERS_CONFIGURATION = {

    timeoutMsecs: SAMPLE_POLLING_MSECS,
    
    prespeechstartMsecs: PRERECORDSTART_MSECS,
    
    speakingMinVolume: VOLUME_SIGNAL, 
    
    silenceVolume: VOLUME_SILENCE,
    
    muteVolume: VOLUME_MUTE,
  
    recordingEnabled: true
  
  }

///////////////////////audioDetection.js

let volumeState = 'mute'

let speechStarted = false

let silenceItems = 0
let signalItems = 0

let speechstartTime 
let prerecordingItems = 0

let speechVolumesList = [] 

/**
 * functions
 */

/*
 * average
 *
 * calculate the average value of an array of numbers
 *
 */ 
const average = (array) => array.reduce((a, b) => a + b) / array.length

const averageSignal = () => average(speechVolumesList).toFixed(4)

const maxSilenceItems = Math.round(MAX_INTERSPEECH_SILENCE_MSECS / SAMPLE_POLLING_MSECS)

const dispatchEvent = (eventName, eventData) => document.dispatchEvent(new CustomEvent( eventName, eventData ))

/**
 * mute
 *
 * Emits 2 custom events:
 *
 *  AUDIO SAMPLING:
 *    'mute'    -> audio volume is almost zero, the mic is off.
 *
 *  MICROPHONE:
 *    'mutedmic' -> microphone is MUTED (passing from ON to OFF)
 */
function mute(timestamp, duration) {

  const eventData = { 
    detail: { 
      event: 'mute',
      volume: meter.volume, 
      timestamp,
      duration
    } 
  }
  
  dispatchEvent( 'mute', eventData )
  
  // mic is muted (is closed)
  // trigger event on transition
  if (volumeState !== 'mute') {
    dispatchEvent( 'mutedmic', eventData )
    volumeState = 'mute'
  }  

}  


/**
 * signal
 *
 * Emits 3 custom events:
 *
 *  AUDIO SAMPLING:
 *    'signal'  -> audio volume is high, so probably user is speaking.
 *
 *  MICROPHONE:
 *    'unmutedmic'  -> microphone is UNMUTED (passing from OFF to ON)
 *
 *  RECORDING:
 *    'speechstart' -> speech START
 *
 */ 
function signal(timestamp, duration) {

  silenceItems = 0
  
  const eventData = { 
    detail: { 
      event: 'signal',
      volume: meter.volume, 
      timestamp,
      duration,
      items: ++ signalItems
    } 
  }
 
  if (! speechStarted) {

    dispatchEvent( 'speechstart', eventData )

    speechstartTime = timestamp
    speechStarted = true
    speechVolumesList = []
  }  

  speechVolumesList.push(meter.volume)

  dispatchEvent( 'signal', eventData )

  // mic is unmuted (is open)
  // trigger event on transition
  if (volumeState === 'mute') {
    dispatchEvent( 'unmutedmic', eventData )
    volumeState = 'signal'
  }  

}  

/**
 * silence
 *
 * Emits 3 custom events:
 *
 *  AUDIO SAMPLING:
 *    'silence' -> audio volume is pretty low, the mic is on but there is not speech.
 *
 *  MICROPHONE:
 *    'unmutedmic'  -> microphone is UNMUTED (passing from OFF to ON)
 *
 *  RECORDING:
 *    'speechstop'  -> speech recording STOP (success, recording seems a valid speech)
 *    'speechabort' -> speech recording ABORTED (because level is too low or audio duration length too short)
 *
 */ 
function silence(timestamp, duration) {

  signalItems = 0

  const eventData = { 
    detail: { 
      event: 'silence',
      volume: meter.volume, 
      timestamp,
      duration,
      items: ++ silenceItems
    } 
  }
 
  dispatchEvent( 'silence', eventData )

  // mic is unmuted (goes ON)
  // trigger event on transition
  if (volumeState === 'mute') {
    dispatchEvent( 'unmutedmic', eventData )
    volumeState = 'silence'
  }  

  //
  // after a MAX_INTERSPEECH_SILENCE_MSECS 
  // a virdict event is generated:
  //   speechabort if audio chunck is to brief or at too low volume 
  //   speechstop  if audio chunk appears to be a valid speech
  //
  if ( speechStarted && (silenceItems === maxSilenceItems) ) {

    const signalDuration = duration - MAX_INTERSPEECH_SILENCE_MSECS
    const averageSignalValue = averageSignal()

    // speech abort 
    // signal duration too short
    if ( signalDuration < MIN_SIGNAL_DURATION ) {

      eventData.detail.abort = `signal duration (${signalDuration}) < MIN_SIGNAL_DURATION (${MIN_SIGNAL_DURATION})`
      dispatchEvent( 'speechabort', eventData )
    }  

    // speech abort
    // signal level too low
    else if (averageSignalValue < MIN_AVERAGE_SIGNAL_VOLUME) {

      eventData.detail.abort = `signal average volume (${averageSignalValue}) < MIN_AVERAGE_SIGNAL_VOLUME (${MIN_AVERAGE_SIGNAL_VOLUME})`
      dispatchEvent( 'speechabort', eventData )
    }  

    // speech stop
    // audio chunk appears to be a valid speech
    else {

      dispatchEvent( 'speechstop', eventData )
    }  

    speechStarted = false
  }  

}  

/**
 
    volume level
0.0 .---->-.----->--.-------->--.-------->--.------> 1.0
    ^      ^        ^           ^           ^
    |      |        |           |           |
    mute   unmute   silence     speaking    clipping
               
*/ 

function sampleThresholdsDecision(muteVolume, speakingMinVolume) {

  const timestamp = Date.now()
  const duration = timestamp - speechstartTime

  //
  // MUTE
  // mic is OFF/mute (volume is ~0)
  //
  if (meter.volume < muteVolume )

    mute(timestamp, duration) 

  //
  // SIGNAL
  // audio detection, maybe it's SPEECH
  //
  else if (meter.volume > speakingMinVolume )

    signal(timestamp, duration)

  //
  // SILENCE
  // mic is ON. Audio level is low (background noise)
  //
  else //(meter.volume < config.silenceVolume )

    silence(timestamp, duration)

}


/**
 * prerecording
 *
 * Emits the event:
 *
 *  RECORDING:
 *    'prespeechstart' -> speech prerecording START
 *
 * Every prespeechstartMsecs milliseconds, 
 * in SYNC with the main sampling (every timeoutMsecs milliseconds)
 *
 * @param {Number} prespeechstartMsecs
 * @param {Number} timeoutMsecs
 *
 */ 
function prerecording( prespeechstartMsecs, timeoutMsecs ) {
  
  ++ prerecordingItems

  const eventData = { 
    detail: { 
      //event: 'prespeechstart',
      volume: meter.volume, 
      timestamp: Date.now(),
      items: prerecordingItems
    } 
  }

  // emit event 'prespeechstart' every prespeechstartMsecs.
  // considering that prespeechstartMsecs is a multimple of timeoutMsecs   
  if ( (prerecordingItems * timeoutMsecs) >= prespeechstartMsecs) {
    
    // emit the event if speech is not started   
    if ( !speechStarted )
      dispatchEvent( 'prespeechstart', eventData )

    prerecordingItems = 0
  }  

}  


/**
 * audio speech detection
 *
 * emit these DOM custom events: 
 *
 *  AUDIO SAMPLING:
 *    'clipping' -> TODO, audio volume is clipping (~1), 
 *                  probably user is speaking, but volume produces distorsion
 *    'signal'   -> audio volume is high, so probably user is speaking.
 *    'silence'  -> audio volume is pretty low, the mic is on but there is not speech.
 *    'mute'     -> audio volume is almost zero, the mic is off.
 *
 *  MICROPHONE:
 *    'unmutedmic'  -> microphone is UNMUTED (passing from OFF to ON)
 *    'mutedmic'    -> microphone is MUTED (passing from ON to OFF)
 *
 *  RECORDING:
 *    'prespeechstart' -> speech prerecording START
 *    'speechstart'    -> speech START
 *    'speechstop'     -> speech STOP (success, recording seems a valid speech)
 *    'speechabort'    -> speech ABORTED (because level is too low or audio duration length too short)
 *
 *
 * @param {Object} config 
 * @see DEFAULT_PARAMETERS_CONFIGURATION object in audioDetectionConfig.js 
 *
 * @see https://javascript.info/dispatch-events
 *
 */

function audioDetection(config) {

  setTimeout( 
    () => {

      prerecording( config.prespeechstartMsecs, config.timeoutMsecs )

      // to avoid feedback, recording could be suspended 
      // when the system play audio with a loudspeakers
      if (config.recordingEnabled) {

        sampleThresholdsDecision(config.muteVolume, config.speakingMinVolume)
      }  

      // recursively call this function
      audioDetection(config)

    }, 
    config.timeoutMsecs 
  )

}









/// audioStream

var mediaStreamSource = null
function audioStream(stream) {
    // Create an AudioNode from the stream.
    mediaStreamSource = audioContext.createMediaStreamSource(stream);
  
    // Create a new volume meter and connect it.
    meter = createAudioMeter(audioContext);
    mediaStreamSource.connect(meter);
  
    // kick off the visual updating
    //drawLoop();
  
    audioDetection(DEFAULT_PARAMETERS_CONFIGURATION)
  
    audioRecorder(stream)
  }



  //volume-meter
  function createAudioMeter(audioContext,clipLevel,averaging,clipLag) {
	var processor = audioContext.createScriptProcessor(512);
	processor.onaudioprocess = volumeAudioProcess;
	processor.clipping = false;
	processor.lastClip = 0;
	processor.volume = 0;
	processor.clipLevel = clipLevel || 0.98;
	processor.averaging = averaging || 0.95;
	processor.clipLag = clipLag || 750;

	// this will have no effect, since we don't copy the input to the output,
	// but works around a current Chrome bug.
	processor.connect(audioContext.destination);

	processor.checkClipping =
		function(){
			if (!this.clipping)
				return false;
			if ((this.lastClip + this.clipLag) < window.performance.now())
				this.clipping = false;
			return this.clipping;
		};

	processor.shutdown =
		function(){
			this.disconnect();
			this.onaudioprocess = null;
		};

	return processor;
}

function volumeAudioProcess( event ) {
	var buf = event.inputBuffer.getChannelData(0);
    var bufLength = buf.length;
	var sum = 0;
    var x;

	// Do a root-mean-square on the samples: sum up the squares...
    for (var i=0; i<bufLength; i++) {
    	x = buf[i];
    	if (Math.abs(x)>=this.clipLevel) {
    		this.clipping = true;
    		this.lastClip = window.performance.now();
    	}
    	sum += x * x;
    }

    // ... then take the square root of the sum.
    var rms =  Math.sqrt(sum / bufLength);

    // Now smooth this out with the averaging factor applied
    // to the previous sample - take the max here because we
    // want "fast attack, slow release."
    this.volume = Math.max(rms, this.volume*this.averaging);
}


///demos

///////demoAudioRecorder
var recorder = null

let audioPlay = true


function audioRecorder(stream) {

    recorder = new MediaRecorder(stream)
  
    // listen to dataavailable, 
    // which gets triggered whenever we have
    // an audio blob available
    recorder.addEventListener('dataavailable', onRecordingReady)
  
  }
  
  
  function onRecordingReady(e) {
    const recordButton = document.querySelector('.recordButton img');
    // stopButton = document.getElementById('stopButton');
    // recordButton.classList.add('active');
    // stopButton.disabled = true
    // listen recording (audio play) 
    // just if speech is not aborted
    //
    if (audioPlay) {
  
      //
      // you don't want to record while playing (through loudspeakers), 
      // to avoid that playback audio feedback in the mic input!
      // 
      suspendRecording()
  
    //   document.querySelector('#audiostatuscell').style.background = 'orange'
    //   document.querySelector('#audiostatuscell').style.color = 'black'
    //   document.querySelector('#audiostatus').style.background = 'orange'
    //   document.querySelector('#audiostatus').textContent = 'playback'
  
    //   const audio = document.createElement('audio')
        
      // e.data contains a blob representing the recording
    //   audio.src = URL.createObjectURL(e.data)
    const blob = e.data
    // console.log(blob)
    formData.append("audio",blob, "audio.webm");
    console.log(formData)
    console.log("sending data")
    fetch("http://34.195.113.89/api/sst/speech_to_text",{
        method:"POST",
        body:formData,
    })
    .then(response => response.json())
        .then(text => {if (text['text'].trim()){
            console.log(text['text']);
            
            // let message = text['text'];
            // // message = 'how are you doing?'
            // socket.off('message')
            // formData.delete('audio');
            // const messageBox = document.querySelector(".message-area");
            // const newMessage = document.createElement('div');
            
            // const audio = document.createElement('audio');
	          // const replyMessage = document.createElement('div');
	          // newMessage.classList.add('user-message');
	          // replyMessage.classList.add('ai-message');
	          // newMessage.textContent = message;
	          // messageBox.appendChild(newMessage);
            // content.message = message;
            // socket.emit('message',content);
            // let reply = {'text':[],'audio':[]}
            // let typing = false;
            // let playing = false;
            // let replye;
            // let audReplye;
            // socket.on('message',(response2)=>{
            // // suspendRecording()
            //   console.log(typeof response2)
            //   console.log(response2)
            //   if (typeof response2 === 'string'){
            //     reply['text'].push(response2)
            //     while(reply['text'].length > 0){
            //       if (!typing){
            //           replye = reply['text'].shift()
            //       }
            //       else{
            //           continue;
            //       }
            //       console.log(replye)
            //       let i = 0;
            //       // chatLoader.style.display = "none";
            //       const interval = setInterval(() => {
            //       typing = true
            //       if ( i < replye.length ) {
            //           replyMessage.innerHTML += replye[i];
            //           i++;
            //         } 
            //       else {
            //           clearInterval(interval);
            //           typing  = false;
    
            //         }
            //       }, 30);
            //       messageBox.appendChild(replyMessage);
                  
            //       message = '';
                  
            // }
            //   }
            //   else{
            //     reply['audio'].push(response2)
            //     while(reply['audio'].length > 0){
            //         audReplye = reply['audio'].shift()
            //         console.log("its a audio, processing")
            //         const blob = new Blob([audReplye]);
            //         const audioURL = URL.createObjectURL(blob);
            //         audio.src = audioURL;
            //         // playing = true;
            //         console.log('playing audio')
            //         audio.play()
            //         // audio.addEventListener("ended",()=>{
            //         // playing = false;
                    

            //     }
                
            //   }}
              
            // )
            // resumeRecording()
           
            
             }
   
  }
)


    
    //   audio.play()
      
      //
      // you want to resume recording after the audio playback
      //
    //   audio.onended = () => {
    //     resumeRecording() 
    //     //console.log('recordingEnabled ' + DEFAULT_PARAMETERS_CONFIGURATION.recordingEnabled)
    //   }  
    }
    
  }
  
  
  function startRecording() {
    // const recordButton = document.querySelector('.recordButton img');
    // recordButton.classList.add('active')
    recorder.start()
  }
  
  
  export function stopRecording() {
    // Stopping the recorder will eventually trigger the `dataavailable` event and we can complete the recording process
    recorder.stop()
    audioPlay = true}

  
  
  /**
   * restartRecording
   *
   * abort and start
   */ 
  function restartRecording() {
    
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/state
    //console.log('recorder ' +  recorder.state )
  
    // need otherwise I get on Chrome the error:
    // Failed to execute 'stop' on 'MediaRecorder': The MediaRecorder's state is 'inactive'.
    if (recorder.state != 'inactive')
      recorder.stop()
  
    audioPlay = false
    recorder.start()
    
  }
  
  export  function abortRecording() {
    // Stopping the recorder will eventually trigger the `dataavailable` event and we can complete the recording process
    // if (recorder){   
        console.log("aborting.............................")
        console.log(recorder.state)

        recorder.stop()
        console.log(recorder.state)
        audioPlay = false}
        // DEFAULT_PARAMETERS_CONFIGURATION.recordingEnabled = false
    
  // }
  export function abortRecordingBtn(){
    const recordButton = document.querySelector('.recordButton img');
    recordButton.classList.remove('active')
    abortRecording()
  }
  
  // to suspend recording when the system play audio with a loudspeaker, avoiding feedback
 export  function suspendRecordingBtn() {
  const recordButton = document.querySelector('.recordButton img');
  recordButton.classList.remove('active')
    DEFAULT_PARAMETERS_CONFIGURATION.recordingEnabled = false
  }  
  function suspendRecording() {
      DEFAULT_PARAMETERS_CONFIGURATION.recordingEnabled = false
    } 
  
  
  function resumeRecording() {
    DEFAULT_PARAMETERS_CONFIGURATION.recordingEnabled = true
  }  

  ////demoAudioDetectionListeners.js
  const dB = (signal) => - Math.round( 20 * Math.log10( 1 / signal ) ) 
  function hystogramLine( value ) {

    const maxCharsperLine = 200
    const valueInChars = maxCharsperLine * value 
    const char = '█'
  
    return char.repeat(valueInChars) 
  
  }  
  

  export  {load_chat,record}