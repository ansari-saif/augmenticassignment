import { Request, Response } from "express";
import { Customer, Lead, Project } from "../../../models";
import { LeadStatus } from "../../../models/LeadStatus";
import RequestWithUser from "../../../utils/requestWithUser";

export default async function controllerPut(
  req: RequestWithUser,
  res: Response
) {
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
  req: RequestWithUser,
  res: Response
) {
  const { id } = req.params;
  if (id) {
    try {
      let { project, status, plot, lead } = req.body;
      const leadStatus = await LeadStatus.find();
      if (status === 'Lead Won') {
        const subPlot = project.subPlots.find((p: any) => p._id === plot);
        subPlot.leadsInfo.forEach((l: any) => {
          if (l.lead !== lead) {
            l.leadType = 'Lead Lost'
          }
        });
        subPlot.sold = true;
        
        const leadData: any = await Lead.findById(lead);
        const cust = {
          firstName: leadData.firstName,
          lastName: leadData.lastName,
          email: leadData.email,
          phone: leadData.phone,
          lead: leadData._id,
          displayName: `${leadData.lastName} ${leadData.firstName}`,
          customerType: 'Individual',
          billingAddress: {
            addressLine1: leadData.address.addressLine1,
            addressLine2: leadData.address.addressLine2,
            city: leadData.address.city,
            state: leadData.address.state,
            zipcode: leadData.address.zipCode,
          },
        };
        const customer = await Customer.create(cust);
        const leadId: any = leadStatus.filter((v,i) => v.name === 'Lead Won');
        await Lead.findByIdAndUpdate(lead, {
          customer: customer._id,
          status: leadId[0]._id.toString(),
        });
        await Lead.findByIdAndUpdate(lead, {
          $push: { activities: {
            activityType: 'Status Update',
            description: `Status updated to ${status}`,
            dateTime: new Date(),
            employee: req.user.id,
          } }
        });
        subPlot.soldTo = customer._id;
        project.subPlots[project.subPlots.findIndex((p: any) => p._id === plot)] = subPlot;
        const updateProject = await Project.findByIdAndUpdate(id, project);

        return res.status(200).json(customer);
      }
      const updateProject = await Project.findByIdAndUpdate(id, project);
      const newLead = await Lead.findByIdAndUpdate(lead, {
        $push: { activities: {
          activityType: 'Status Update',
          description: `Status updated to ${status}`,
          dateTime: new Date(),
          employee: req.user.id,
        } }
      });
      return res.status(200).json(updateProject);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ msg: 'Some error occured while updating the status' })
    }
  } else {
    return res.status(400).send("No id was provided");
  }
}