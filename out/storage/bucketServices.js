"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BucketServices {
}
BucketServices.bucket = {};
BucketServices.updateBucket = (ctx) => {
    if (!BucketServices.bucket[ctx.chat.id]) {
        BucketServices.bucket[ctx.chat.id] = [];
    }
    BucketServices.bucket[ctx.chat.id].push(ctx.update.message.text);
    let messages = BucketServices.bucket[ctx.chat.id].join("\n");
    return messages;
};
BucketServices.clearBucket = (ctx) => {
    BucketServices.bucket[ctx.chat.id] = [];
};
exports.default = BucketServices;
