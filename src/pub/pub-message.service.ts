import { Injectable } from '@nestjs/common';
import { PubSub } from '@google-cloud/pubsub';
import { ConfigService } from 'src/config/config.service';
import { OAuth2Client, GoogleAuth, auth } from 'google-auth-library';
import { PubDto } from './pub.dto';

@Injectable()
export class PubMessageService {

  private pubSubClient: PubSub;
  serv: ConfigService;
    constructor(){
      this.serv  = new ConfigService('.env')
      this.pubSubClient = new PubSub({ projectId: new ConfigService('.env').get('PROJECT')});
    }
  
    async deleteSubscription(data: PubDto) {
      try {
        this.pubSubClient.subscription(data.subscriptionName).delete();
          return `Subscription  deleted.`;
      } catch (error) {
        console.error('Error deleting subscription:', error);
        throw error;
      }
  
      // subscription.delete()
      //   .then(() => {
      //     console.log('Subscription deleted successfully');
      //   })
      //   .catch((error) => {
      //   });
    }

    async createSubscription(data: PubDto) {
    try {
      const topic = this.pubSubClient.topic(data.topicName);
      const [subscription] = await topic.createSubscription(data.subscriptionName);
      return await [subscription];
    } catch (error) {
      console.error('Error Publishing message:', error);
      throw error;
    }
    }
    async createTopic(data: PubDto) {
      try {
        const [topic] = await this.pubSubClient.createTopic(data.topicName);
        return `Topic ${topic.name} created.`;
      } catch (error) {
        console.error('Error Publishing message:', error);
        throw error;
      }
    }
    async pullMessage(data:PubDto){
      const subscription = this.pubSubClient.subscription(data.subscriptionName);
      const messageHandler = async (message) => {
          console.log(`Received message ${message.id}:`);
          console.log(`\tData: ${message.data}`);
          console.log(`\tAttributes:
       
      ${JSON.stringify(message.attributes)}`);
      
          // Process the message data here
      
          // Acknowledge the message after processing
          await message.ack();
        };
      
        subscription.on('message', messageHandler);
  
        try {
        let result =  await subscription.open();
      //    await subscription.close()
             return result;
          console.log('Listening for messages...', result);
        } catch (error) {
          console.error('Error Publishing message:', error);
         throw error;
        }
    }

  async sendQuote(data: PubDto){
    try {
      const auth = new GoogleAuth({
        keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes: [
          'https://www.googleapis.com/auth/cloud-platform',
          'https://www.googleapis.com/auth/pubsub',
        ],
        // other configuration options
      });
      await auth.getClient();
        const topicNameOrId = this.serv.get('TOPIC');
        const dataBuffer = Buffer.from(`${data.message}`);
        let ourAttr = {};
        if(data.attributes){
            ourAttr["origin"] = 'nodejs-sample';
            ourAttr["type"] = 'send';
        }
        const messageId = await this.pubSubClient
    .topic(topicNameOrId)
    .publishMessage({data: dataBuffer, attributes: ourAttr});
  console.log(`Message ${messageId} published.`);
  return messageId;
    } catch (error) {
      console.error('Error Publishing message:', error);
      throw error;
    }
  }
}
