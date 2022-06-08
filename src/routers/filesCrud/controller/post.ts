import { Request, Response } from "express";
import putFile from "../../../utils/s3";
import fs from 'fs';

export default async function controllerPost (req: any, res: Response) {
  try {
    if(req.file === null){
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    const fileName = req.file.filename;

    const pathToFile = req.file.path;

    const fileD = await fs.readFileSync(pathToFile);

    await putFile(fileD, `${req.file.filename}`, req.file );

    await fs.rmSync(pathToFile);

    res.status(200).json({ fileName: fileName, filePath: `https://knmulti.fra1.digitaloceanspaces.com/${fileName}` });
  } catch (err) {
    res.status(500).json({ msg : "Cannot able to upload Document" })
  }
}