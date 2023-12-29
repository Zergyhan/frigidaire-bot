import { Events, Message } from "discord.js";

const re = /(https?:\/\/(twitter|x)\.com\/.+\/status\/\S+)/;

const replaceString = (input: string) => {
  return input.replace(re, (match, p1) => {
    const replacedDomain = p1.replace(/(twitter\.com|x\.com)/, "fxtwitter.com");
    return match.replace(p1, replacedDomain).replace(/\?.*/, "");
  });
};

module.exports = {
  name: Events.MessageCreate,
  async execute(message: Message) {
    const twitterLink = message.content.match(re);
    if (twitterLink !== null) {
      const rest = message.content.replace(twitterLink[0], "");
      message.delete();
      const newLink = replaceString(twitterLink[0]);
      message.channel.send(
        `> Sent by: ${message.author.globalName} 
> ${rest}
${newLink}`,
      );
    }
  },
};
