import { Body, Controller, Get, Post, Put, Query, Req, Res, ValidationPipe } from '@nestjs/common';
import { PubMessageService } from '../pub-message.service';
import { Request, Response } from 'express';
// import { PubDto } from '../pub.dto';
import { CreateSubscription, PubDto, PublishMessage, SubscriptionName, TopicName } from './../pub.dto';

@Controller('pub-message-action')
export class PubMessageActionController {
    constructor(private  readonly msg: PubMessageService){}
    @Post('publish-message')
    async createSubRegion(@Body(ValidationPipe) msgDto: PublishMessage, @Req() req:Request, @Res() res:Response){
      try {
    
       const myMsg =  await this.msg.sendQuote(msgDto);
       if(!myMsg){
        console.error("SubRegion creation failed.");
        return res.status(500).send({
          success: false,
          message: "Error creating sub region.",
          status: 500,
        });
       
      }
      return res.status(200).send({
        success: true,
        message: "Message published successfully.",
        status: 200,
        data: myMsg,
      });
      } catch (error) {
        console.log("error===>", error);
        return res.status(500).send({
          success: false,
          message: error.message ? error.message : "Something went wrong.",
          status: 500,
          error,
        });
      }
    }

    @Get('pull-message')
    async pullMessage(@Query(ValidationPipe) data:SubscriptionName, @Req() req:Request, @Res() res:Response){
      try {
       const myMsg =  await this.msg.pullMessage(data);
      //  if(!myMsg){
      //   console.error("SubRegion creation failed.");
      //   return res.status(500).send({
      //     success: false,
      //     message: "Error creating sub region.",
      //     status: 500,
      //   });
       
      // }
      return res.status(200).send({
        success: true,
        message: "Message pull successfully.",
        status: 200,
        data: myMsg,
      });
      } catch (error) {
        console.log("error===>", error);
        return res.status(500).send({
          success: false,
          message: error.message ? error.message : "Something went wrong.",
          status: 500,
          error,
        });
      }
    }
    @Put('delete-subscription')
    async deleteSubscription(@Body(ValidationPipe) data:SubscriptionName, @Req() req:Request, @Res() res:Response){
      try {
       const myMsg =  await this.msg.deleteSubscription(data);
       if(!myMsg){
        console.error("Error deleting subscription.");
        return res.status(500).send({
          success: false,
          message: "Something went wrong.",
          status: 500,
        });
      }
      return res.status(200).send({
        success: true,
        message: myMsg,
        status: 200
      });
      } catch (error) {
        console.log("error===>", error);
        return res.status(500).send({
          success: false,
          message: error.message ? error.message : "Something went wrong.",
          status: 500,
          error,
        });
      }
    }

    @Post('create-subscription')
    async createSubscription(@Body(ValidationPipe) data:CreateSubscription, @Req() req:Request, @Res() res:Response){
      try {
       const myMsg =  await this.msg.createSubscription(data);
       if(!myMsg){
        console.error("Error creating subscription.");
        return res.status(500).send({
          success: false,
          message: "Something went wrong.",
          status: 500,
        });
      }
      let jsn =  {
        pushConfig: myMsg[0].metadata.name,
      }
      res.status(200).send({
        success: true,
        message: jsn,
        status: 200
      });
      } catch (error) {
        console.log("error===>", error);
        return res.status(500).send({
          success: false,
          message: error.message ? error.message : "Something went wrong.",
          status: 500,
          error,
        });
      }
    }
   
    @Post('create-topic')
    async createTopic(@Body(ValidationPipe) data:TopicName, @Req() req:Request, @Res() res:Response){
      try {
       const myTopic =  await this.msg.createTopic(data);
       if(!myTopic){
        console.error("Error creating topic.");
        return res.status(500).send({
          success: false,
          message: "Something went wrong.",
          status: 500,
        });
      }

      res.status(200).send({
        success: true,
        message: myTopic,
        status: 200
      });
      } catch (error) {
        console.log("error===>", error);
        return res.status(500).send({
          success: false,
          message: error.message ? error.message : "Something went wrong.",
          status: 500,
          error,
        });
      }
    }
}
