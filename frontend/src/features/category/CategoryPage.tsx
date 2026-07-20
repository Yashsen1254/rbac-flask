import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useAddCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "./hooks/mutations/categoryMutations";
import { useCategories } from "./hooks/queries/categoryQueries";
import type { Category, CategoryRequest } from "./types/category";

const CategoryPage = () => {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CategoryRequest>();
  const [open, setOpen] = useState(false);
  const addCategoryMutation = useAddCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const isEditMode = selectedCategory !== null;
  const { data: categories, isLoading, isError, error } = useCategories();

  const onSubmit = (data: CategoryRequest) => {
    if (isEditMode && selectedCategory) {
      updateCategoryMutation.mutate(
        {
          id: selectedCategory.Category_Id,
          data,
        },
        {
          onSuccess: () => {
            setOpen(false);

            setSelectedCategory(null);

            reset();
          },
        },
      );

      return;
    }

    addCategoryMutation.mutate(data, {
      onSuccess: () => {
        setOpen(false);

        reset();
      },
    });
  };

  const handleDelete = () => {
    if (!categoryToDelete) return;

    deleteCategoryMutation.mutate(categoryToDelete.Category_Id, {
      onSuccess: () => {
        setDeleteOpen(false);

        setCategoryToDelete(null);
      },
    });
  };
  useEffect(() => {
    if (selectedCategory) {
      setValue("Category_Name", selectedCategory.Category_Name);
    } else {
      reset();
    }
  }, [selectedCategory, reset, setValue]);
  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          Loading Categories...
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-red-500">
          {(error as Error).message}
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Categories</CardTitle>

            <CardDescription>Manage Categories</CardDescription>
          </div>

          <Button
            onClick={() => {
              setSelectedCategory(null);

              reset();

              setOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>

                <TableHead>Category Name</TableHead>

                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {categories?.length > 0 ? (
                categories.map((category: Category) => (
                  <TableRow key={category.Category_Id}>
                    <TableCell>{category.Category_Id}</TableCell>

                    <TableCell>{category.Category_Name}</TableCell>

                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedCategory(category);

                          setOpen(true);
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setCategoryToDelete(category);

                          setDeleteOpen(true);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8">
                    No Categories Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Drawer
        open={open}
        onOpenChange={(value) => {
          setOpen(value);

          if (!value) {
            setSelectedCategory(null);

            reset();
          }
        }}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              {isEditMode ? "Edit Category" : "Add Category"}
            </DrawerTitle>

            <DrawerDescription>
              {isEditMode
                ? "Update category details."
                : "Create a new category."}
            </DrawerDescription>
          </DrawerHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="px-6 space-y-4">
            <div className="space-y-2">
              <Label>Category Name</Label>

              <Input
                placeholder="Enter Category Name"
                {...register("Category_Name", {
                  required: "Category Name is required",
                })}
              />

              {errors.Category_Name && (
                <p className="text-sm text-red-500">
                  {errors.Category_Name.message}
                </p>
              )}
            </div>

            <DrawerFooter>
              <Button
                type="submit"
                disabled={
                  addCategoryMutation.isPending ||
                  updateCategoryMutation.isPending
                }
              >
                {addCategoryMutation.isPending ||
                updateCategoryMutation.isPending
                  ? "Saving..."
                  : isEditMode
                    ? "Update"
                    : "Save"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(false);

                  reset();

                  setSelectedCategory(null);
                }}
              >
                Cancel
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete
              <span className="font-semibold">
                {" "}
                {categoryToDelete?.Category_Name}
              </span>
              ?
              <br />
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteCategoryMutation.isPending}
            >
              {deleteCategoryMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CategoryPage;
