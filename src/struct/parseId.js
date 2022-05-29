const parseIdFromMention = (mention) => {
    // распарсиваем из пинга массив с разделёнными частями пинга
    const userMentionArr = mention.matchAll(/<@!?(\d{17,19})>/g).next().value;
    const channelMentionArr = mention.matchAll(/<#(\d{17,19})>/g ).next().value;
    const roleMentionArr = mention.matchAll(/<@&(\d{17,19})>/g).next().value;
  
    if(!userMentionArr && !channelMentionArr && !roleMentionArr){
      return null;
    }
  
    if(userMentionArr?.length > 0){
      return userMentionArr[1];
    }
    if(channelMentionArr?.length > 0){
      return channelMentionArr[1];
    }
    if(roleMentionArr?.length > 0){
      return roleMentionArr[1];
    }
    return id;
}
  
  
module.exports = parseIdFromMention;