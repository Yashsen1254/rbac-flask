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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  useAddProduct,
  useDeleteProduct,
  useUpdateProduct,
} from "./hooks/mutations/productMutations";
import { useProducts } from "./hooks/queries/productQueries";
import { useCategories } from "../category/hooks/queries/categoryQueries";
import type { Product, ProductRequest } from "./types/product";

const ProductPage = () => {
  const { data: products, isLoading, isError, error } = useProducts();
  const { data: categories } = useCategories();
  const addProductMutation = useAddProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const isEditMode = selectedProduct !== null;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductRequest>();

  useEffect(() => {
    if (selectedProduct) {
      setValue("Name", selectedProduct.Name);
      setValue("Price", selectedProduct.Price);
      setValue("Category_Id", selectedProduct.Category_Id);
    } else {
      reset();
    }
  }, [selectedProduct, reset, setValue]);

  const onSubmit = (data: ProductRequest) => {
    const payload = {
      ...data,
      Price: Number(data.Price),
      Category_Id: Number(data.Category_Id),
    };

    if (isEditMode && selectedProduct) {
      updateProductMutation.mutate(
        {
          id: selectedProduct.Product_Id,
          data: payload,
        },
        {
          onSuccess: () => {
            setOpen(false);

            setSelectedProduct(null);

            reset();
          },
        },
      );

      return;
    }

    addProductMutation.mutate(payload, {
      onSuccess: () => {
        setOpen(false);

        reset();
      },
    });
  };

  const handleDelete = () => {
    if (!productToDelete) return;
    deleteProductMutation.mutate(productToDelete.Product_Id, {
      onSuccess: () => {
        setDeleteOpen(false);
        setProductToDelete(null);
      },
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          Loading Products...
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
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage Products</CardDescription>
          </div>
          <Button
            onClick={() => {
              setSelectedProduct(null);
              reset();
              setOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">ID</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right w-40">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {products && products.length > 0 ? (
                products.map((product: Product) => (
                  <TableRow key={product.Product_Id}>
                    <TableCell>{product.Product_Id}</TableCell>
                    <TableCell>{product.Name}</TableCell>
                    <TableCell>
                      {product.Category_Name ??
                        categories?.find(
                          (category: any) =>
                            category.Category_Id === product.Category_Id,
                        )?.Category_Name ??
                        "-"}
                    </TableCell>
                    <TableCell>₹ {product.Price}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedProduct(product);
                          setOpen(true);
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          setProductToDelete(product);
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
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No Products Found
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
            setSelectedProduct(null);
            reset();
          }
        }}
      >
        <DrawerContent className="mx-auto max-w-lg">
          <DrawerHeader>
            <DrawerTitle>
              {isEditMode ? "Edit Product" : "Add Product"}
            </DrawerTitle>
            <DrawerDescription>
              {isEditMode ? "Update product details." : "Create a new product."}
            </DrawerDescription>
          </DrawerHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 px-6 pb-6"
          >
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={watch("Category_Id") ? String(watch("Category_Id")) : ""}
                onValueChange={(value) =>
                  setValue("Category_Id", Number(value))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category: any) => (
                    <SelectItem
                      key={category.Category_Id}
                      value={String(category.Category_Id)}
                    >
                      {category.Category_Name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Product Name</Label>

              <Input
                autoFocus
                placeholder="Enter Product Name"
                {...register("Name", {
                  required: "Product Name is required",
                })}
              />
              {errors.Name && (
                <p className="text-sm text-red-500">{errors.Name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Price</Label>
              <Input
                type="number"
                placeholder="Enter Price"
                {...register("Price", {
                  required: "Price is required",
                  min: {
                    value: 1,
                    message: "Price must be greater than zero",
                  },
                })}
              />
              {errors.Price && (
                <p className="text-sm text-red-500">{errors.Price.message}</p>
              )}
            </div>

            <DrawerFooter className="px-0">
              <Button
                type="submit"
                disabled={
                  addProductMutation.isPending ||
                  updateProductMutation.isPending
                }
              >
                {addProductMutation.isPending || updateProductMutation.isPending
                  ? isEditMode
                    ? "Updating..."
                    : "Saving..."
                  : isEditMode
                    ? "Update Product"
                    : "Save Product"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  setSelectedProduct(null);
                  reset();
                }}
              >
                Cancel
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>

      <AlertDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);

          if (!open) {
            setProductToDelete(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{productToDelete?.Name}</span>
              ?
              <br />
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteProductMutation.isPending}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteProductMutation.isPending}
            >
              {deleteProductMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductPage;