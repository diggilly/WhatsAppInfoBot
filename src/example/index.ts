import LanguageProcessor from './intents'
import { createBaileysResponder } from '../BaileysResponder'
import makeWASocket, { useMultiFileAuthState } from "@adiwajshing/baileys";

const startBot = async () => {
    const { state, saveCreds } = await useMultiFileAuthState("./auth");
    const sock = makeWASocket({
        auth: state,
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", (update) => {
        const { qr, connection } = update;
        if (qr) {
            console.log("Scan this QR code to log in:");
            console.log(qr); // The QR code will appear in the terminal
        }
        if (connection === "open") {
            console.log("Bot connected!");
        }
    });
};

startBot();


createBaileysResponder(
    LanguageProcessor,
    { authFile: './auth_info.json' }
)
