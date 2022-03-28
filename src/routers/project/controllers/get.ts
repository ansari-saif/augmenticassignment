import { Request, Response } from "express";
import { IProject } from "../../../db/schema/project";
import { Project } from "../../../models/project";

export default async function controllerGet(req: Request, res: Response) {
  const id = req.params.id;
  if (id) {
    const project = await Project.findById(id)
      .populate("leads")
      .populate("members")
      .populate("createdBy")
      .populate("subPlots.leadsInfo.lead")
      .populate("subPlots.leadsInfo.lead.assignedTo")
      .populate("subPlots.soldBy")
      .populate("subPlots.soldTo");
    if (project) {
      res.json(project);
    } else {
      res.status(404).send("Not found");
    }
  } else {
    const { userId } = req.query;
    if (!userId) {
      const Projects: IProject[] = await Project.find()
        .populate("leads")
        .populate("members")
        .populate("createdBy");
      res.status(200).send(Projects);
    } else {
      const Projects: IProject[] = await Project.find({
        members: { $in: [userId] },
      })
        .populate("leads")
        .populate("members")
        .populate("createdBy");
      res.status(200).send(Projects);
    }
  }
}
