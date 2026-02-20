export type Organization = {
  id: string;
  name: string;
  region: string;
  clinics: number;
  staff: number;
  monthlyAppointments: number;
  status: "active" | "inactive";
};
