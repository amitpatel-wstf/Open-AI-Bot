export default class BucketServices {
  static bucket: any = {};

  static updateBucket = (ctx: any) => {
    if (!BucketServices.bucket[ctx.chat.id]) {
      BucketServices.bucket[ctx.chat.id] = [];
    }
    BucketServices.bucket[ctx.chat.id].push(ctx.update.message.text);
    let messages = BucketServices.bucket[ctx.chat.id].join("\n");
    return messages;
  };

  static clearBucket = (ctx: any) => {
    BucketServices.bucket[ctx.chat.id] = [];
  };
}
