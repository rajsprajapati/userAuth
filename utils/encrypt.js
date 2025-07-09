import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.CRYPTO_SECRET || 'vb456fghjbn';

export const encrypt = (data) => {
    const cipherText = CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
    return cipherText;
}

export const decrypt = (cipherText) => {
    try{
        const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);

        if(bytes.sigBytes > 0){
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            return decryptedData
        }
    } catch(error) {
        throw new Error('Decryption Failed invalid key')
    }
}