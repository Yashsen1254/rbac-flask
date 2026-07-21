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
import { useAddRole, useDeleteRole, useUpdateRole } from "./hooks/mutations/roleMutations";
import { useRoles } from "./hooks/queries/roleQueries";
import { useMyPermissions } from "../auth/hooks/queries/useMyPermissions";
import type { Role, RoleRequest } from "./types/role";

const RolePage = () => {
  const { data: roles, isLoading, isError, error } = useRoles();
  const { data: perms } = useMyPermissions();
  const userPerms = perms?.permissions?.Role;
  
  const addRoleMutation = useAddRole();
  const updateRoleMutation = useUpdateRole();
  const deleteRoleMutation = useDeleteRole();
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  const isEditMode = selectedRole !== null;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<RoleRequest>();

  useEffect(() => {
    if (selectedRole) {
      setValue("Role_Name", selectedRole.Role_Name);
    } else {
      reset();
    }
  }, [selectedRole, reset, setValue]);

  const onSubmit = (data: RoleRequest) => {
    if (isEditMode && selectedRole) {
      updateRoleMutation.mutate(
        {
          id: selectedRole.Role_Id,
          data,
        },
        {
          onSuccess: () => {
            setOpen(false);

            setSelectedRole(null);

            reset();
          },
        },
      );

      return;
    }

    addRoleMutation.mutate(data, {
      onSuccess: () => {
        setOpen(false);

        reset();
      },
    });
  };

  const handleDelete = () => {
    if (!roleToDelete) return;
    deleteRoleMutation.mutate(roleToDelete.Role_Id, {
      onSuccess: () => {
        setDeleteOpen(false);
        setRoleToDelete(null);
      },
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          Loading Roles...
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
            <CardTitle>Roles</CardTitle>
            <CardDescription>Manage Roles</CardDescription>
          </div>
          {userPerms?.AddPermission && (
            <Button
              onClick={() => {
                setSelectedRole(null);
                reset();
                setOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Role
            </Button>
          )}
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">ID</TableHead>
                <TableHead>Role Name</TableHead>
                {(userPerms?.EditPermission || userPerms?.DeletePermission) && (
                  <TableHead className="text-right w-40">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>

            <TableBody>
              {roles && roles.length > 0 ? (
                roles.map((role: Role) => (
                  <TableRow key={role.Role_Id}>
                    <TableCell>{role.Role_Id}</TableCell>

                    <TableCell>{role.Role_Name}</TableCell>

                    {(userPerms?.EditPermission || userPerms?.DeletePermission) && (
                      <TableCell className="text-right space-x-2">
                        {userPerms?.EditPermission && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedRole(role);

                              setOpen(true);
                            }}
                          >
                            Edit
                          </Button>
                        )}

                        {userPerms?.DeletePermission && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setRoleToDelete(role);

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
                    No Roles Found
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
            setSelectedRole(null);

            reset();
          }
        }}
      >
        <DrawerContent className="mx-auto max-w-lg">
          <DrawerHeader>
            <DrawerTitle>{isEditMode ? "Edit Role" : "Add Role"}</DrawerTitle>

            <DrawerDescription>
              {isEditMode ? "Update role details." : "Create a new role."}
            </DrawerDescription>
          </DrawerHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 px-6 pb-6"
          >
            <div className="space-y-2">
              <Label>Role Name</Label>

              <Input
                autoFocus
                maxLength={100}
                placeholder="Enter Role Name"
                {...register("Role_Name", {
                  required: "Role Name is required",
                })}
              />

              {errors.Role_Name && (
                <p className="text-sm text-red-500">
                  {errors.Role_Name.message}
                </p>
              )}
            </div>

            <DrawerFooter className="px-0">
              <Button
                type="submit"
                disabled={
                  addRoleMutation.isPending || updateRoleMutation.isPending
                }
              >
                {addRoleMutation.isPending || updateRoleMutation.isPending
                  ? isEditMode
                    ? "Updating..."
                    : "Saving..."
                  : isEditMode
                    ? "Update Role"
                    : "Save Role"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(false);

                  setSelectedRole(null);

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
            setRoleToDelete(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Role</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{roleToDelete?.Role_Name}</span>
              ?
              <br />
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteRoleMutation.isPending}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteRoleMutation.isPending}
            >
              {deleteRoleMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RolePage;
