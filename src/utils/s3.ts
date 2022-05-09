import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  endpoint: "https://fra1.digitaloceanspaces.com",
  region: "fra1",
  credentials: {
    accessKeyId: "AGEQ4MEVV2OQFRJ7OTJ6",
    secretAccessKey: "FF5h2Tb55NBsAS+7pHiSk4bt11Yj6YB/xpn+8tfeamc",
  },
});

const putFile = async (file: any, fileName: string) => {
  try {
    const data = await s3.send(
      new PutObjectCommand({
        Bucket: "knmulti",
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
