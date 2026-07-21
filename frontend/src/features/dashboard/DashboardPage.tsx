import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUsers } from "../user/hooks/queries/userQueries";
import { useRoles } from "../role/hooks/queries/roleQueries";
import { useCategories } from "../category/hooks/queries/categoryQueries";
import { useProducts } from "../product/hooks/queries/productQueries";

const DashboardPage = () => {
  const { data: users } = useUsers();
  const { data: roles } = useRoles();
  const { data: categories } = useCategories();
  const { data: products } = useProducts();

  const stats = [
    { title: "Users", count: users?.length || 0 },
    { title: "Roles", count: roles?.length || 0 },
    { title: "Categories", count: categories?.length || 0 },
    { title: "Products", count: products?.length || 0 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader>
              <CardTitle>{stat.title}</CardTitle>
            </CardHeader>

            <CardContent className="text-4xl font-bold">{stat.count}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;