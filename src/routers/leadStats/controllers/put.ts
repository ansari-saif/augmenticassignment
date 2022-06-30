import { Request, Response } from "express";
import { LeadStatus } from "../../../models/LeadStatus";

export default async function controllerPut(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = req.body;
    const leads = await LeadStatus.find();

    const lead: any = leads.find((l) => data.name === l.name);
    
    if (lead) {
      await LeadStatus.findByIdAndDelete(lead._id);

      if (data.position < lead.position) {
        const leadsArr = leads.reverse();
        for await (const l of leadsArr) {
          if (l.position < lead.position && l.position > data.position) {
            l.position += 1;
            await LeadStatus.findByIdAndUpdate(l._id, l);
          }
        };
        await LeadStatus.create(data);
      } else if (data.position > lead.position) {
        for await (const l of leads) {
          if (l.position > lead.position && l.position < data.position) {
            l.position -= 1;
            await LeadStatus.findByIdAndUpdate(l._id, l);
          }
        }
        await LeadStatus.create(data);
      } else {
        await LeadStatus.create(data);
      }
      return res.status(200);
    } else {
      return res.status(400).json({ msg: 'Lead status not found' })
    }
  } catch (err) {
    console.log(err)
    res.status(404).send({ msg: 'Error occured while creating status' })
  }};