import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  useAddUser,
  useDeleteUser,
  useUpdateUser,
} from "./hooks/mutations/userMutations";
import { useUsers } from "./hooks/queries/userQueries";
import { useMyPermissions } from "../auth/hooks/queries/useMyPermissions";
import type { User, UserRequest } from "./types/user";

const UserPage = () => {
  const { data: users, isLoading, isError, error } = useUsers();
  const { data: perms } = useMyPermissions();
  const userPerms = perms?.permissions?.User;  
  const addUserMutation = useAddUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const isEditMode = selectedUser !== null;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UserRequest>();

  useEffect(() => {
    if (selectedUser) {
      setValue("Name", selectedUser.Name);
      setValue("Email", selectedUser.Email);
      setValue("Password", "");
    } else {
      reset();
    }
  }, [selectedUser, reset, setValue]);

  const onSubmit = (data: UserRequest) => {
    if (isEditMode && selectedUser) {
      updateUserMutation.mutate(
        {
          id: selectedUser.User_Id,
          data,
        },
        {
          onSuccess: () => {
            setOpen(false);
            setSelectedUser(null);
            reset();
          },
        },
      );
      return;
    }

    addUserMutation.mutate(data, {
      onSuccess: () => {
        setOpen(false);
        reset();
      },
    });
  };

  const handleDelete = () => {
    if (!userToDelete) return;

    deleteUserMutation.mutate(userToDelete.User_Id, {
      onSuccess: () => {
        setDeleteOpen(false);

        setUserToDelete(null);
      },
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          Loading Users...
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>

        {userPerms?.AddPermission && (
          <Button
            onClick={() => {
              reset();
              setSelectedUser(null);
              setOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>

                <TableHead>Name</TableHead>

                <TableHead>Email</TableHead>

                {(userPerms?.EditPermission || userPerms?.DeletePermission) && (
                  <TableHead className="text-right">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>

            <TableBody>
              {users?.map((user) => (
                <TableRow key={user.User_Id}>
                  <TableCell>{user.User_Id}</TableCell>

                  <TableCell>{user.Name}</TableCell>

                  <TableCell>{user.Email}</TableCell>

                  {(userPerms?.EditPermission || userPerms?.DeletePermission) && (
                    <TableCell className="text-right space-x-2">
                      {userPerms?.EditPermission && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
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
                            setUserToDelete(user);
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
            <DrawerTitle>{isEditMode ? "Edit User" : "Add User"}</DrawerTitle>
          </DrawerHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-4">
            <div>
              <Label>Name</Label>

              <Input
                autoFocus
                maxLength={100}
                placeholder="Enter Name"
                {...register("Name", {
                  required: "Name is required",
                })}
              />

              {errors.Name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.Name.message}
                </p>
              )}
            </div>

            <div>
              <Label>Email</Label>

              <Input
                type="email"
                placeholder="Enter Email"
                {...register("Email", {
                  required: "Email is required",
                })}
              />

              {errors.Email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.Email.message}
                </p>
              )}
            </div>

            {/* Password */}

            <div>
              <Label>Password</Label>

              <Input
                type="password"
                placeholder={
                  isEditMode
                    ? "Leave blank to keep existing password"
                    : "Enter Password"
                }
                {...register("Password", {
                  required: !isEditMode ? "Password is required" : false,
                })}
              />

              {errors.Password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.Password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={
                addUserMutation.isPending || updateUserMutation.isPending
              }
            >
              {isEditMode ? "Update User" : "Add User"}
            </Button>
          </form>
        </DrawerContent>
      </Drawer>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{userToDelete?.Name}</strong>? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteUserMutation.isPending}
            >
              {deleteUserMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UserPage;