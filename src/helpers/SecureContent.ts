// export const GenerateKeys = async (): Promise<CryptoKeyPair> => {
//   return await window.crypto.subtle.generateKey(
//     {
//       name: 'RSA-OAEP',
//       modulusLength: 4096,
//       publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
//       hash: { name: 'SHA-512' },
//     },
//     true,
//     ['encrypt', 'decrypt'],
//   );
// };

// export const Encrypt = async (content: string, publicKey: CryptoKey): Promise<string> => {
//   const endcoded = new TextEncoder().encode(content);

//   const encrypted = await window.crypto.subtle.encrypt(
//     {
//       name: 'RSA-OAEP',
//     },
//     publicKey,
//     endcoded,
//   );

//   return new TextDecoder().decode(encrypted);
// };

// export const Decrypt = async (encrypted: string, privateKey: CryptoKey): Promise<string> => {
//   const endcoded = new TextEncoder().encode(encrypted);
//   const decrypted = await window.crypto.subtle.decrypt(
//     {
//       name: 'RSA-OAEP',
//     },
//     privateKey,
//     endcoded,
//   );
//   return new TextDecoder().decode(decrypted);
// };
