import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
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
  useAddRolePermission,
  useDeleteRolePermission,
  useUpdateRolePermission,
} from "./hooks/mutations/rolePermissionMutations";
import { useRolePermissions } from "./hooks/queries/rolePermissionQueries";
import { useRoles } from "@/features/role/hooks/queries/roleQueries";
import { usePages } from "@/features/page/hooks/queries/pageQueries";
import { useMyPermissions } from "./../auth/hooks/queries/useMyPermissions";
import type { RolePermission, RolePermissionRequest } from "./types/rolePermission";

const RolePermissionPage = () => {
  const { data: rolePermissions, isLoading, isError, error } = useRolePermissions();
  const location = useLocation();
  const roleIdFilter = location.state?.roleId;

  const filteredRolePermissions = useMemo(() => {
    if (!rolePermissions) return [];
    if (roleIdFilter) {
      return rolePermissions.filter((rp) => rp.Role_Id === Number(roleIdFilter));
    }
    return rolePermissions;
  }, [rolePermissions, roleIdFilter]);

  const { data: roles } = useRoles();
  const { data: pages, isLoading: isPagesLoading } = usePages();
  const { data: perms } = useMyPermissions();
  const userPerms = perms?.permissions?.RolePermission;
  
  const addMutation = useAddRolePermission();
  const updateMutation = useUpdateRolePermission();
  const deleteMutation = useDeleteRolePermission();

  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RolePermission | null>(null);
  const [itemToDelete, setItemToDelete] = useState<RolePermission | null>(null);

  const isEditMode = selectedItem !== null;

  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RolePermissionRequest>({
    defaultValues: {
      Role_Id: undefined,
      Page_Id: undefined,
      AddPermission: false,
      EditPermission: false,
      DeletePermission: false,
      ViewPermission: false,
    }
  });

  useEffect(() => {
    if (selectedItem) {
      setValue("Role_Id", selectedItem.Role_Id);
      setValue("Page_Id", selectedItem.Page_Id);
      setValue("AddPermission", selectedItem.AddPermission);
      setValue("EditPermission", selectedItem.EditPermission);
      setValue("DeletePermission", selectedItem.DeletePermission);
      setValue("ViewPermission", selectedItem.ViewPermission);
    } else {
      reset();
    }
  }, [selectedItem, setValue, reset]);

  const onSubmit = (data: RolePermissionRequest) => {
    if (isEditMode && selectedItem) {
      updateMutation.mutate(
        {
          id: selectedItem.RolePermission_Id,
          data,
        },
        {
          onSuccess: () => {
            setOpen(false);
            setSelectedItem(null);
            reset();
          },
        }
      );
      return;
    }

    addMutation.mutate(data, {
      onSuccess: () => {
        setOpen(false);
        reset();
      },
    });
  };

  const handleDelete = () => {
    if (!itemToDelete) return;
    deleteMutation.mutate(itemToDelete.RolePermission_Id, {
      onSuccess: () => {
        setDeleteOpen(false);
        setItemToDelete(null);
      },
    });
  };

  if (isLoading || isPagesLoading) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          Loading Role Permissions...
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

  const PermissionBadge = ({ hasPermission }: { hasPermission: boolean }) => (
    hasPermission ? 
      <Badge variant="default" className="bg-green-500 hover:bg-green-600">Yes</Badge> : 
      <Badge variant="secondary" className="text-gray-500">No</Badge>
  );

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Role Permissions</h1>
        </div>

        {userPerms?.AddPermission && (
          <Button
            onClick={() => {
              reset();
              setSelectedItem(null);
              setOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Assign Permission
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Page</TableHead>
                <TableHead className="text-center">Add</TableHead>
                <TableHead className="text-center">Edit</TableHead>
                <TableHead className="text-center">Delete</TableHead>
                <TableHead className="text-center">View</TableHead>
                {(userPerms?.EditPermission || userPerms?.DeletePermission) && (
                  <TableHead className="text-right">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredRolePermissions?.map((rp) => (
                <TableRow key={rp.RolePermission_Id}>
                  <TableCell className="font-medium">{rp.Role_Name}</TableCell>
                  <TableCell>{rp.PageName}</TableCell>
                  <TableCell className="text-center"><PermissionBadge hasPermission={rp.AddPermission} /></TableCell>
                  <TableCell className="text-center"><PermissionBadge hasPermission={rp.EditPermission} /></TableCell>
                  <TableCell className="text-center"><PermissionBadge hasPermission={rp.DeletePermission} /></TableCell>
                  <TableCell className="text-center"><PermissionBadge hasPermission={rp.ViewPermission} /></TableCell>
                  {(userPerms?.EditPermission || userPerms?.DeletePermission) && (
                    <TableCell className="text-right space-x-2">
                      {userPerms?.EditPermission && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedItem(rp);
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
                            setItemToDelete(rp);
                            setDeleteOpen(true);
                          }}
                        >
                          Delete
                        </Button>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="max-w-lg mx-auto">
          <DrawerHeader>
            <DrawerTitle>
              {isEditMode ? "Edit Role Permission" : "Assign Role Permission"}
            </DrawerTitle>
          </DrawerHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-4">
            <div>
              <Label>Role</Label>
              <Select
                value={watch("Role_Id") ? String(watch("Role_Id")) : ""}
                onValueChange={(value) => setValue("Role_Id", Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Role">
                    {watch("Role_Id")
                      ? roles?.find((r) => r.Role_Id === watch("Role_Id"))?.Role_Name
                      : undefined}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {roles?.map((role) => (
                    <SelectItem key={role.Role_Id} value={String(role.Role_Id)}>
                      {role.Role_Name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.Role_Id && (
                <p className="text-sm text-red-500 mt-1">Role is required</p>
              )}
            </div>

            <div>
              <Label>Page</Label>
              <Select
                value={watch("Page_Id") ? String(watch("Page_Id")) : ""}
                onValueChange={(value) => setValue("Page_Id", Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Page">
                    {watch("Page_Id")
                      ? pages?.find((p) => p.Page_Id === watch("Page_Id"))?.PageName
                      : undefined}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {pages?.map((page) => (
                    <SelectItem key={page.Page_Id} value={String(page.Page_Id)}>
                      {page.PageName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.Page_Id && (
                <p className="text-sm text-red-500 mt-1">Page is required</p>
              )}
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="add-perm" 
                  checked={watch("AddPermission")}
                  onCheckedChange={(checked) => setValue("AddPermission", checked as boolean)}
                />
                <Label htmlFor="add-perm">Add Permission</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="edit-perm" 
                  checked={watch("EditPermission")}
                  onCheckedChange={(checked) => setValue("EditPermission", checked as boolean)}
                />
                <Label htmlFor="edit-perm">Edit Permission</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="delete-perm" 
                  checked={watch("DeletePermission")}
                  onCheckedChange={(checked) => setValue("DeletePermission", checked as boolean)}
                />
                <Label htmlFor="delete-perm">Delete Permission</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="view-perm" 
                  checked={watch("ViewPermission")}
                  onCheckedChange={(checked) => setValue("ViewPermission", checked as boolean)}
                />
                <Label htmlFor="view-perm">View Permission</Label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={addMutation.isPending || updateMutation.isPending}
            >
              {isEditMode ? "Update Permission" : "Assign Permission"}
            </Button>
          </form>
        </DrawerContent>
      </Drawer>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Role Permission</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this role permission? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RolePermissionPage;
