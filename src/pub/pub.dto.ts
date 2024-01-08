// import { IsNotEmpty, IsString } from "class-validator";

// export class PubDto {
//     @IsString()
//     @IsNotEmpty()
//     message?: string;
//     @IsString()
//     @IsNotEmpty()
//     topicName?: string;
//     @IsString()
//     @IsNotEmpty()
//     subscriptionName?: string;
//     attributes?:any;
//   }

// Define interfaces for each key type
import { IsNotEmpty, IsString } from 'class-validator';

export class PubDto {
  @IsString()
  @IsNotEmpty()
  message?: string;

  @IsString()
  @IsNotEmpty()
  topicName?: string;

  @IsString()
  @IsNotEmpty()
  subscriptionName?: string;

  attributes?: any;
}

// Individual types for each key
export class PublishMessage  {
  @IsString()
  @IsNotEmpty()
  message: string;
  attributes?: any;
};

export class TopicName {
  @IsString()
  @IsNotEmpty()
  topicName: string;
};

export class SubscriptionName {
  @IsString()
  @IsNotEmpty()
  subscriptionName: string;
};

export class CreateSubscription {
  @IsString()
  @IsNotEmpty()
  subscriptionName: string;
  @IsString()
  @IsNotEmpty()
  topicName: string;
};

