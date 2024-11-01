import { Controller, Post, Body } from '@nestjs/common';
import { TwilioService } from './twilio.service';

@Controller('api')
export class TwilioController {
    constructor(private readonly twilioService: TwilioService) { }

    @Post('reply')
    async receiveWhatsappMessage(@Body() body: any): Promise<any> {
        const from = body.From; // Numéro de l'expéditeur (format: whatsapp:+123456789)
        const to = body.To; // Numéro de destination (format: whatsapp:+123456789)
        const messageBody = body.Body; // Contenu du message texte reçu

        console.log(`Message reçu de ${from}: ${messageBody}`);

        const message = "Depuis l'application nestjs, je te repond"

        this.twilioService.createMessage(message)
        return { message };

    }
}