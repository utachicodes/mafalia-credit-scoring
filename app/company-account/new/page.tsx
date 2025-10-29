import CompanyAccountForm from "@/components/company/company-account-form";

export const metadata = {
  title: "Créer un compte société",
};

export default function NewCompanyAccountPage() {
  return (
    <div className="container mx-auto max-w-3xl py-8">
      <h1 className="text-2xl font-semibold mb-6">Créer un compte société</h1>
      <CompanyAccountForm />
    </div>
  );
}
