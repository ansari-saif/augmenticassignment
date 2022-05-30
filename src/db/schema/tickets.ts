import { Schema, Types } from "mongoose";
import { Ticket } from "../../models";

interface ITicketReply {
  reply: string;
  user: Types.ObjectId;
  createdAt: Date;
}

interface ITicket extends Document {
  title: string;
  description: string;
  assignee: number;
  status: string;
  priority: string;
  responses: ITicketReply[];
  department: Types.ObjectId;
}

const ticketSchema = new Schema<ITicket>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    assignee: {
      type: Number,
      ref: "Employee",
    },
    status: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
    responses: {
      default: [],
      type: [
        {
          reply: {
            type: String,
            // required: true,
          },
          user: { type: Schema.Types.ObjectId, ref: "Employee" },
          createdAt: { type: Date, default: Date.now },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

ticketSchema.pre("save", function (next) {
  if (this.isNew) {
    Ticket.countDocuments({}, (err: any, count: any) => {
      if (err) return next(err);
      this._id = count + 1;
      next();
    });
  } else next();
});

export { ITicket, ticketSchema, ITicketReply };
