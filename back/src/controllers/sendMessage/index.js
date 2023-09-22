const TelegramBot = require("node-telegram-bot-api");
const chatIds = [
  1551855614 /* @Real_Coder */, 5004302592 /* Samandar bro */,
  // 150590941 /*@OltinsoyAKM_Baxodir*/,
];

const bot = new TelegramBot("5863998254:AAFQaZ7gzVl7sZ_gZjek4YnOaq0h48f24sI", {
  polling: false,
});

const FormSendMessage = async (req, res) => {
  let { name, phone, message } = req.body;
  //   phone = phone.replaceAll(" ", "");

  if (
    !name ||
    name.length === 0 ||
    !phone ||
    phone.length === 0 ||
    !message ||
    message.length === 0
  )
    return res.status(400).json({ error: "Barcha maydonlarni to'ldiring" });

  if (isNaN(phone)) {
    return res.status(403).json({ error: "Telefon raqamini to'gri kiriting" });
  }
  try {
    for (const chatId of chatIds) {
      await bot.sendMessage(
        chatId,
        `
        Oltisoyakm dan yangi xabar keldi: \n 
        <b>● Ismi: </b>${name} 
        <b>● Telefon Raqami: </b>${phone} 
        <b>● Xabar: </b>${message}
        <b>● Yuborilgan Sana : </b>${new Date().toLocaleDateString()}
        <b>● Yuborilgan Soati : </b>${new Date().toLocaleTimeString()}`,
        { parse_mode: "HTML" }
      );
    }
    return res.status(200).json({ message: "Muvvafaqiyatli yuborildi " });
  } catch (error) {
    console.error("Error sending message:", error.message);
    return res.status(400).json({ error: "Xatolik yuz berdi" });
  }
};

module.exports = {
  FormSendMessage,
};
