import { Request, Response } from "express";
import { Project } from "../../../models";

export default async function controllerPut(
  req: Request,
  res: Response
): Promise<any> {
  const id = req.params.id;
  if (id) {
    const projectData = req.body;
    const project = await Project.findByIdAndUpdate(id, projectData);
    if (project) {
      return res.status(200).json(project);
    } else {
      return res.status(404).send("Not found");
    }
  } else {
    res.status(400).send("No id was provided");
  }
}
