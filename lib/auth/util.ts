import crypto from "crypto";

export async function hashPassword(plainTextPassword: string) {
    const secretKey = process.env.SECRET_KEY;
  
    if (!secretKey) {
      throw new Error("SECRET_KEY is not defined in the environment variables.");
    }
  
    return new Promise<string>((resolve, reject) => {
      crypto.pbkdf2(
        plainTextPassword,
        secretKey, // Use the validated secret key
        10000,
        64,
        "sha512",
        (err, derivedKey) => {
          if (err) {
            reject(err);
          } else {
            resolve(derivedKey.toString("hex"));
          }
        }
      );
    });
  }