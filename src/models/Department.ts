import { Document, model, models, Schema, Types } from 'mongoose';

interface IWorkingDay {
  start: string;
  end: string;
  isOpen: boolean;
}

interface IWorkingHours {
  monday: IWorkingDay;
  tuesday: IWorkingDay;
  wednesday: IWorkingDay;
  thursday: IWorkingDay;
  friday: IWorkingDay;
  saturday: IWorkingDay;
  sunday: IWorkingDay;
}

interface IEmergencyContact {
  name: string;
  phone: string;
  email?: string;
}

interface IBudget {
  allocated: number;
  spent: number;
  currency: string;
}

export interface IDepartmentDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  code: string;
  description?: string;
  head?: Types.ObjectId;
  location?: string;
  floor?: number;
  phoneExtension?: string;
  email?: string;
  isActive: boolean;
  staffCount?: number;
  specializations?: string[];
  workingHours?: IWorkingHours;
  facilities?: string[];
  emergencyContact?: IEmergencyContact;
  budget?: IBudget;
  createdAt: Date;
  updatedAt: Date;
}

const workingDaySchema = new Schema<IWorkingDay>(
  {
    start: { type: String, required: true, default: '09:00' },
    end: { type: String, required: true, default: '17:00' },
    isOpen: { type: Boolean, required: true, default: true },
  },
  { _id: false }
);

const workingHoursSchema = new Schema<IWorkingHours>(
  {
    monday: { type: workingDaySchema, required: true },
    tuesday: { type: workingDaySchema, required: true },
    wednesday: { type: workingDaySchema, required: true },
    thursday: { type: workingDaySchema, required: true },
    friday: { type: workingDaySchema, required: true },
    saturday: { type: workingDaySchema, required: true },
    sunday: { type: workingDaySchema, required: true },
  },
  { _id: false }
);

const DepartmentSchema = new Schema<IDepartmentDocument>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      unique: true,
    },
    description: { type: String, trim: true },
    head: { type: Schema.Types.ObjectId, ref: 'User' },
    location: { type: String, trim: true },
    floor: { type: Number, min: 0 },
    phoneExtension: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    isActive: { type: Boolean, default: true },
    staffCount: { type: Number, min: 0, default: 0 },
    specializations: [{ type: String, trim: true }],
    workingHours: { type: workingHoursSchema },
    facilities: [{ type: String, trim: true }],
    emergencyContact: {
      name: { type: String, trim: true },
      phone: { type: String, trim: true },
      email: { type: String, trim: true, lowercase: true },
    },
    budget: {
      allocated: { type: Number, min: 0, default: 0 },
      spent: { type: Number, min: 0, default: 0 },
      currency: { type: String, default: 'LKR', trim: true },
    },
  },
  { timestamps: true }
);

DepartmentSchema.index({ isActive: 1 });
DepartmentSchema.index({ floor: 1 });
DepartmentSchema.index({ head: 1 });

const Department =
  (models.Department as typeof models.Department) ||
  model<IDepartmentDocument>('Department', DepartmentSchema);

export default Department;
