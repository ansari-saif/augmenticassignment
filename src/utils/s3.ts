import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  endpoint: "https://sgp1.digitaloceanspaces.com",
  region: "sgp1",
  credentials: {
    accessKeyId: "4B7JJC3JNTRRZHAXN3MM",
    secretAccessKey: "IQTFn+YoVbKPGylAqct/o6pvidHot0Eofv0WX3BfaTc",
  },
});

const putFile = async (file: Buffer, fileName: string) => {
  try {
    const data = await s3.send(
      new PutObjectCommand({
        Bucket: "kn-m",
        Key: fileName,
        Body: file,
        ACL: "public-read",
      })
    );
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

export default putFile;
