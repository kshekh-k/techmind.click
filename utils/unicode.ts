// const normalChars = Array.from(
//   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
// );

// const unicodeStyles = {
//   bold: Array.from("𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇"),
//   italic: Array.from("𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻"),
//   boldItalic: Array.from("𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯"),
// };

const offsets = {
  boldUpper: 0x1d5d4,
  boldLower: 0x1d5ee,
  italicUpper: 0x1d608,
  italicLower: 0x1d622,
  boldItalicUpper: 0x1d63c,
  boldItalicLower: 0x1d656,
};

 export function convertUnicode(
  text: string,
  style: "bold" | "italic" | "boldItalic"
) {
  return Array.from(text)
    .map((char) => {
      const code = char.charCodeAt(0);

      const isUpper = code >= 65 && code <= 90;
      const isLower = code >= 97 && code <= 122;

      if (!isUpper && !isLower) return char;

      let base;
      if (style === "bold") {
        base = isUpper ? offsets.boldUpper : offsets.boldLower;
      } else if (style === "italic") {
        base = isUpper ? offsets.italicUpper : offsets.italicLower;
      } else {
        base = isUpper
          ? offsets.boldItalicUpper
          : offsets.boldItalicLower;
      }

      const offset = isUpper ? code - 65 : code - 97;

      return String.fromCodePoint(base + offset);
    })
    .join("");
}