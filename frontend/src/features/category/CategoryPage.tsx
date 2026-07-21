import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
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
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

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
  useAddCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "./hooks/mutations/categoryMutations";

import { useCategories } from "./hooks/queries/categoryQueries";
import { useMyPermissions } from "../auth/hooks/queries/useMyPermissions";
import type { Category, CategoryRequest } from "./types/category";

const CategoryPage = () => {
  const { data: categories, isLoading, isError, error } = useCategories();
  const { data: perms } = useMyPermissions();
  const userPerms = perms?.permissions?.Category;
  
  const addCategoryMutation = useAddCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );
  const isEditMode = selectedCategory !== null;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CategoryRequest>();

  useEffect(() => {
    if (selectedCategory) {
      setValue("Category_Name", selectedCategory.Category_Name);
    } else {
      reset();
    }
  }, [selectedCategory, reset, setValue]);

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

          {userPerms?.AddPermission && (
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
          )}
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">ID</TableHead>

                <TableHead>Category Name</TableHead>

                {(userPerms?.EditPermission || userPerms?.DeletePermission) && (
                  <TableHead className="text-right w-40">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>

            <TableBody>
              {categories && categories.length > 0 ? (
                categories.map((category: Category) => (
                  <TableRow key={category.Category_Id}>
                    <TableCell>{category.Category_Id}</TableCell>

                    <TableCell>{category.Category_Name}</TableCell>

                    {(userPerms?.EditPermission || userPerms?.DeletePermission) && (
                      <TableCell className="text-right space-x-2">
                        {userPerms?.EditPermission && (
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
                        )}

                        {userPerms?.DeletePermission && (
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
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No Categories Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Drawer */}

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
        <DrawerContent className="mx-auto max-w-lg">
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

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 px-6 pb-6"
          >
            <div className="space-y-2">
              <Label htmlFor="Category_Name">Category Name</Label>

              <Input
                id="Category_Name"
                autoFocus
                maxLength={100}
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

            <DrawerFooter className="px-0">
              <Button
                type="submit"
                disabled={
                  addCategoryMutation.isPending ||
                  updateCategoryMutation.isPending
                }
              >
                {addCategoryMutation.isPending ||
                updateCategoryMutation.isPending
                  ? isEditMode
                    ? "Updating..."
                    : "Saving..."
                  : isEditMode
                    ? "Update Category"
                    : "Save Category"}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={
                  addCategoryMutation.isPending ||
                  updateCategoryMutation.isPending
                }
                onClick={() => {
                  setOpen(false);
                  setSelectedCategory(null);
                  reset();
                }}
              >
                Cancel
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
      {/* Delete Alert Dialog */}

      <AlertDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);

          if (!open) {
            setCategoryToDelete(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {categoryToDelete?.Category_Name}
              </span>
              ?
              <br />
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteCategoryMutation.isPending}>
              Cancel
            </AlertDialogCancel>
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
