/**
* โปรเจคนี้โค๊ดคือตั้งแต่เริ่มต้นเขียน ไม่มีการลบทิ้งหรือปิดอาจจะนำเป็นแนวทางเบื้องต้นได้่
* ไม้ได้จะเรียงโค๊ดในแต่ละการทำงานนะครับ 
*/


require('dotenv').config()
const { Client, Intents } = require("discord.js");
const { joinVoiceChannel, createAudioResource, createAudioPlayer } = require('@discordjs/voice')
const { addSpeechEvent } = require('discord-speech-recognition')
const uuid = require('uuid')
const axios = require('axios');
const fetch = require('node-fetch')

// const ff = axios.get('https://voice.botnoi.ai/api/service/generate_audio')
// console.log(ff)

// var request = require('request');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGES,
    ],
});

addSpeechEvent(client, { lang: "th-TH" });
client.on('ready', () => {
    console.log('discord api online')
})

client.on('messageCreate', (message) => {
    if (message.content != "หนูๆ") {
        return
    }
    const voiceChannel = message.member?.voice.channel

    if (voiceChannel) {
        joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            selfDeaf: false,
        })
    }
})


       
// var options = {
//     'method': 'POST',
//     'url' : "https://voice.botnoi.ai/api/service/generate_audio",
//     body : JSON.stringify({"text":"สวัสดี", "speaker":"1", "volume":1, "speed":1, "type_media":"m4a"}),
//     headers : {
//       'Botnoi-Token': '22b9cdd92d35470e95fde9f77fb7328e8340b59350dae0b6c8f91c22357ee5a3',
//       'Content-Type': 'application/json'
//     }
//   };
//   request(options, function (error, response) {
//     if (error) throw new Error((error))
//     console.log(response.body);
//   });

client.on('speech', async (message) => {
    console.log('Me: ', message.content)

    const sessionId = uuid.v4()
    const sessionClient = fetch(`https://voice.botnoi.ai/api/service/generate_audio`, {
        method: 'POST',
        body : JSON.stringify({"text":"สวัสดี", "speaker":"1", "volume":1, "speed":1, "type_media":"m4a"}),
        headers: {
            'Botnoi-Token': process.env.BOTNOI_TOKEN,
            'Content-Type': 'application/json'
        }
        
    })
    // const session = await sessionClient.post('', {
    //     text: message.content,
    //     speaker: '1',
    //     volume: 1,
    //     speed: 1,
    //     type_media: 'm4a'
    // })
    console.log(sessionClient.body)


    //console.log(session.data.audio_url)
    // const voiceChannel = message.member?.voice.channel
    // if (voiceChannel) {
    //     joinVoiceChannel({
    //         channelId: voiceChannel.id,
    //         guildId: voiceChannel.guild.id,
    //         adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    //         selfDeaf: false,
    //     })
    // }
    // const player = createAudioPlayer();
    // const audioResource = await createAudioResource(session.data.audio_url)

    // const resource = createAudioResource(session.data.audio_url, {
    //     sessionId: sessionId,
    // })
    // player.play(audioResource)
    // console.log(audioResource)

    // const audioResource = await createAudioResource(session.data.audio_url)
    // const audioPlayer = await createAudioPlayer()
    // audioPlayer.play(audioResource)

    // const sessionClient = axios.create({
    //     baseURL: 'https://voice.botnoi.ai/api/service/generate_audio',
    //     headers: {
    //         'Botnoi-Token': process.env.BOTNOI_TOKEN,
    //         'Content-Type': 'application/json'
    //     }

    // })
    // const response = await sessionClient.post('',{
    //         sessionId,
    //         languageCode: 'th-TH',
    //         model: 'LINEAR_REGRESSION',
    //         audio: {
    //             content: message.content,
    //         },
    // })
    // const response = await sessionClient.post('', {
    //     text: message.content,
    //     speaker: '1',
    //     volume: 1,
    //     speed: 1,
    //     type_media: 'm4a',
    //     session_id: sessionId,
    // })
    // console.log(uf)



})


client.login('')
