import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {["Users", "Roles", "Categories", "Products"].map((title) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent className="text-4xl font-bold">0</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;