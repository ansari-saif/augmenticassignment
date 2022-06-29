import { Request, Response } from "express";
import { Customer, Lead, Project } from "../../../models";

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
};

export async function controllerStatusPut(
  req: Request,
  res: Response
) {
  const { id } = req.params;
  if (id) {
    try {
      let { project, status, plot, lead } = req.body;
      if (status === 'Lead Won') {
        const subPlot = project.subPlots.find((p: any) => p._id === plot);
        subPlot.leadsInfo.forEach((l: any) => {
          if (l.lead !== lead) {
            l.leadType = 'Lead Lost'
          }
        });
        subPlot.sold = true;
        project.subPlots[project.subPlots.findIndex((p: any) => p._id === plot)] = subPlot;
        const updateProject = await Project.findByIdAndUpdate(id, project);

        const leadData: any = await Lead.findById(lead);
        const cust = {
          firstName: leadData.firstName,
          lastName: leadData.lastName,
          email: leadData.email,
          phone: leadData.phone,
          lead: leadData._id,
          displayName: `${leadData.lastName} ${leadData.firstName}`,
          billingAddress: {
            addressLine1: leadData.address.addressLine1,
            addressLine2: leadData.address.addressLine2,
            city: leadData.address.city,
            state: leadData.address.state,
            zipcode: leadData.address.zipCode,
          },
        };
        const customer = await Customer.create(cust);
        await Lead.findByIdAndUpdate(lead, { customer: customer._id });

        return res.status(200).json(customer);
      }
      const updateProject = await Project.findByIdAndUpdate(id, project);
      return res.status(200).json(updateProject);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ msg: 'Some error occured while updating the status' })
    }
  } else {
    return res.status(400).send("No id was provided");
  }
}