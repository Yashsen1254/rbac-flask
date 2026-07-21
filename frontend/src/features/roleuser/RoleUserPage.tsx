import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
  useAddRoleUser,
  useDeleteRoleUser,
  useUpdateRoleUser,
} from "./hooks/mutations/roleUserMutations";
import { useRoleUsers } from "./hooks/queries/roleUserQueries";
import { useUsers } from "@/features/user/hooks/queries/userQueries";
import { useRoles } from "@/features/role/hooks/queries/roleQueries";
import { useMyPermissions } from "../auth/hooks/queries/useMyPermissions";
import type { RoleUser, RoleUserRequest } from "./types/roleUser";

const RoleUserPage = () => {
  const { data: roleUsers, isLoading, isError, error } = useRoleUsers();
  const { data: users } = useUsers();
  const { data: roles } = useRoles();
  const { data: perms } = useMyPermissions();
  const userPerms = perms?.permissions?.UserRole;

  const addRoleUserMutation = useAddRoleUser();
  const updateRoleUserMutation = useUpdateRoleUser();
  const deleteRoleUserMutation = useDeleteRoleUser();

  const [open, setOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedRoleUser, setSelectedRoleUser] = useState<RoleUser | null>(
    null,
  );

  const [roleUserToDelete, setRoleUserToDelete] = useState<RoleUser | null>(
    null,
  );

  const isEditMode = selectedRoleUser !== null;

  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RoleUserRequest>();

  useEffect(() => {
    if (selectedRoleUser) {
      setValue("User_Id", selectedRoleUser.User_Id);

      setValue("Role_Id", selectedRoleUser.Role_Id);
    } else {
      reset();
    }
  }, [selectedRoleUser, setValue, reset]);

  const onSubmit = (data: RoleUserRequest) => {
    if (isEditMode && selectedRoleUser) {
      updateRoleUserMutation.mutate(
        {
          id: selectedRoleUser.RoleUser_Id,
          data,
        },
        {
          onSuccess: () => {
            setOpen(false);

            setSelectedRoleUser(null);

            reset();
          },
        },
      );

      return;
    }

    addRoleUserMutation.mutate(data, {
      onSuccess: () => {
        setOpen(false);

        reset();
      },
    });
  };

  /* ===========================
        Delete
  =========================== */

  const handleDelete = () => {
    if (!roleUserToDelete) return;

    deleteRoleUserMutation.mutate(roleUserToDelete.RoleUser_Id, {
      onSuccess: () => {
        setDeleteOpen(false);

        setRoleUserToDelete(null);
      },
    });
  };

  /* ===========================
        Loading
  =========================== */

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          Loading Role Assignments...
        </CardContent>
      </Card>
    );
  }

  /* ===========================
        Error
  =========================== */

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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Role User Management</h1>

        {userPerms?.AddPermission && (
          <Button
            onClick={() => {
              reset();
              setSelectedRoleUser(null);
              setOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Assign Role
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>

                <TableHead>Role</TableHead>

                {(userPerms?.EditPermission || userPerms?.DeletePermission) && (
                  <TableHead className="text-right">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>

            <TableBody>
              {roleUsers?.map((roleUser) => (
                <TableRow key={roleUser.RoleUser_Id}>
                  <TableCell>{roleUser.User_Name}</TableCell>

                  <TableCell>{roleUser.Role_Name}</TableCell>

                  {(userPerms?.EditPermission || userPerms?.DeletePermission) && (
                    <TableCell className="text-right space-x-2">
                      {userPerms?.EditPermission && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedRoleUser(roleUser);
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
                            setRoleUserToDelete(roleUser);
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

      {/* ===========================
            Add / Edit Drawer
      =========================== */}

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="max-w-lg mx-auto">
          <DrawerHeader>
            <DrawerTitle>
              {isEditMode ? "Edit Role Assignment" : "Assign Role"}
            </DrawerTitle>
          </DrawerHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-4">
            {/* User */}

            <div>
              <Label>User</Label>

              <Select
                value={watch("User_Id") ? String(watch("User_Id")) : ""}
                onValueChange={(value) => setValue("User_Id", Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select User" />
                </SelectTrigger>

                <SelectContent>
                  {users?.map((user) => (
                    <SelectItem key={user.User_Id} value={String(user.User_Id)}>
                      {user.Name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {errors.User_Id && (
                <p className="text-sm text-red-500 mt-1">User is required</p>
              )}
            </div>

            {/* Role */}

            <div>
              <Label>Role</Label>

              <Select
                value={watch("Role_Id") ? String(watch("Role_Id")) : ""}
                onValueChange={(value) => setValue("Role_Id", Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Role" />
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

            <Button
              type="submit"
              className="w-full"
              disabled={
                addRoleUserMutation.isPending ||
                updateRoleUserMutation.isPending
              }
            >
              {isEditMode ? "Update Assignment" : "Assign Role"}
            </Button>
          </form>
        </DrawerContent>
      </Drawer>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Role Assignment</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to remove this role assignment? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteRoleUserMutation.isPending}
            >
              {deleteRoleUserMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RoleUserPage;
