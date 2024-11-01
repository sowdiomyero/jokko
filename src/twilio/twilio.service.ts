import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { SpeechClient } from '@google-cloud/speech';
import axios from 'axios';

@Injectable()
export class TwilioService {

  private speechClient: SpeechClient;

  constructor() {
    this.speechClient = new SpeechClient();
  }
/*
  async transcribeAudio(audioUrl: string): Promise<string> {
    try {
      const response = await axios.get(audioUrl, { responseType: 'arraybuffer' });
      const audioBuffer = Buffer.from(response.data, 'binary');

      const request = {
        audio: { content: audioBuffer.toString('base64') },
        config: {
          encoding: 'OGG_OPUS',
          sampleRateHertz: 48000,
          languageCode: 'fr-FR', // Ajustez la langue si nécessaire
        },
      };

      const [operation] = await this.speechClient.recognize(request);
      const transcription = operation.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');

      return transcription;
    } catch (error) {
      console.error('Erreur lors de la transcription audio:', error);
      throw new Error('Transcription échouée');
    }
  }
  */



  async createMessage(message: string, dest: string) {

    const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";
    const from = `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`
    const to = `whatsapp:${dest}`
    const accountSid = process.env.TWILIO_ACCOUNT_SID 
    const authToken = process.env.TWILIO_AUTH_TOKEN 
    const client = twilio(accountSid, authToken);
    
    const whatsAppMessage = await client.messages.create({
      from,
      to,
      body: message,
    });
  
    console.log(whatsAppMessage.body);
  }
}